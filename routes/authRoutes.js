const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    // passport GoogleStrategy has an internal identifier of 'google'
    passport.authenticate('google', {
      scope: ['profile', 'email'] // google's internal info we're asking for -- not made up, provided by google
    })
  );

  // this route,although similar to the above, is being sent with a response code that exchanged for data by the middleware
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      // response object has a method attached called redirect - it'll pass us to the new route, after the middleware has completed (passport.authenticate)
      res.redirect('/surveys');
    }
  );

  app.get('/api/logout', (req, res) => {
    // just like passport attaches the user to each req, it also attaches many other functions to manipulate the users authentication status
    req.logout();
    // res.send(req.user);
    // res.redirect('/'); // we'd use tihs if we wanted to logout without ajax and redux method and instead used the server side method (non-spa)
    req.session = null; // from cookie-session docs - sends a null value back to replace the cookie
    res.send(req.user);
  });

  // we can check to see if our authentication is working by viewing if the req object has a user property attached to it when we hit any route after being logged in
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
