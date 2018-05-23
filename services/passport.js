const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// this pulls/fetches a schema out of mongoose once it's been loaded in -- e.g. in the user.js file where the schema is designated and defined
const User = mongoose.model('users');

// user comes from the googleStrategy callback function's return -- whatever we Just pulled from the database
// we need to take that model, and generate an identifying piece of information from it, and return it from this function
// we will pass it to serialize user and passport will generate a cookie for us
passport.serializeUser((user, done) => {
  // done is a callback that we call after a have done some work nudging passport along - first argument again is an error, second
  // is the identifying piece of information
  done(null, user.id); // this id is not the profile id (or the google id) -- this is the mongodb unique ID - we do this bc there might be a linkedIn or FB id, not just google
  // also, user.id is a shortcut, instead of referencing user._id.$oid
});

// this function is the opposite of serialUser --> it turns an id (gotten from the cookie) into a mongodb user object
// search for a user with an ID, and once we find a particular user, we call done
// first arg is an ID, second is the done function we call after we turn the ID back into a User
passport.deserializeUser((id, done) => {
  User.findById(id) // this is async, we so wait for it to finish, and then chain on callback/.then() with what to proceed with
    .then(user => {
      done(null, user);
    });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback', // this url has to match the url in the google developers console
      proxy: true // will allow the use of a proxy if we are sure we trust it e.g. heroku using Amazon Web Services
    },
    (accessToken, refreshToken, profile, done) => {
      // console.log('access', accessToken);
      // console.log('refresh', refreshToken);
      // console.log('profile', profile);
      User.findOne({ googleID: profile.id }) // this will return a promise -- it's async
        .then(existingUser => {
          if (existingUser) {
            // we already have a record with the given profile id
            done(null, existingUser); // first argument is an error object, but since everything succeeded we say null - second is a user object
          } else {
            // no user record with this id - make a new one
            new User({ googleID: profile.id })
              .save() // calling .save() will save the User to the db, otherwise it'd just be instantiated -- async so we chain the promise and call done after it's done
              .then(user => done(null, user));
          }
        });
    }
  )
);
