const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    // passport GoogleStrategy has an internal identifier of 'google'
    passport.authenticate('google', {
      scope: ['profile', 'email'] // google's internal info we're asking for -- not made up, provided by google
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google')); // this route,although similar to the above, is being sent with a response code that exchanged for data

  app.get('/api/logout', (req, res) => {
    // just like passport attaches the user to each req, it also attaches many other functions to manipulate the users authentication status
    req.logout();
    res.send(req.user);
  });

  // we can check to see if our authentication is working by viewing if the req object has a user property attached to it when we hit any route after being logged in
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
