require('./models/user'); // this user require statement needs to go before the passport call, otherwise an error will be thrown - so passport can use after it's been defined
require('./services/passport');
const keys = require('./config/keys');
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session'); //give us access to cookies
const passport = require('passport'); // need this to tell passport we're going to make use of the cookies

mongoose.connect(keys.mongoURI);

const app = express();

// tell express to enable/use cookie session, call it, and provide it a configuration object
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //this cookie will last 30 days - have to convert to ms - 30 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
    keys: [keys.cookieKey] // this key will be used to sign or encrypt our cookie --> pass it in an array in case you want to specify multiple keys
  })
);
// this essentially tells passport to use cookies to manage our session
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app); // call the functions defined in the authRoutes on the APP

const PORT = process.env.PORT || '5000';
app.listen(PORT, () => {
  console.log('app running on port 5000');
});
