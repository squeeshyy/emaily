const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');
// when you make a post request to an express server, it doesnt NOT by default parse the object - we need a module to work on top of express
// that'll take the request body and parse it and make it available inside the application
// here we pass in our requireLogin middleware only for this route as the second argument to the function
// we reference the function whenever a request comes in, we don't instantiate it bc we don't want it to run everytime
// we can arbitrarily pass in any number of argument to these express functions, the only requirement is that eventually one must return a response
module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    // console.log(req.body);
    // how are we supposed to bill for a variable amount?  and how do we change the description based on the users id or email?
    // if on user exists we'll return from the request handler by using the requireLogin Middleware
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id
    });
    // console.log(charge);

    //Whenever we are making use of passport and a user has signed in, we can access the current user model as req.user --> passport sets this up automatically
    // this is where we add the credits to users account after we've charged them above
    req.user.credits += 5;
    const user = await req.user.save();
    // then we return the user model back to whoever made the request
    res.send(user);
  });
};
