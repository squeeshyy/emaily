const mongoose = require('mongoose');
const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
  // this makes a get request to retrieve all the surveys created by the currently logged in user
  // we need to use require login middleware to make sure the user is logged in
  app.get('/api/surveys', requireLogin, async (req, res) => {
    // go through the list of surveys and find the ones based on this _user criteria
    const surveys = await Survey.find({ _user: req.user.id })
      // then select based on this criteria - chaining in mongoose
      .select({ recipients: false });
    res.send(surveys);
  });

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for your input');
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');

    // in this method chain, we map over all the events in the request body, and we do some processing, remove all the undefined values, and then remove duplicates
    // see the ignored routes file for a more indepth explanation
    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return {
            email: email,
            surveyId: match.surveyId,
            choice: match.choice
          };
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        // we dont care about the entire EVENT property passed in so we destructure
        // the survey is async - but we don't call async or await on this though, bc in the context of the webhook we don't have anything to respond back to sendgrid with
        // we don't need to respond to them with anything. - we don't have to wait for the query to finish to send back a response if we even wanted to send them one back
        Survey.updateOne(
          {
            // in the mongodb world - anytime we want to use mongodb id we have to use _id
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date()
          }
        ).exec(); // call this to execute the mongodb query
      })
      .value();

    res.send({});
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    // Great place to send an email!
    const mailer = new Mailer(survey, surveyTemplate(survey));
    // we'll include a try-catch block, to see if anything can go wrong in the 3 async operations we perform
    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      // once the user is saved and it's async, we consider req.user stale, we move forward using the new user defined here
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
