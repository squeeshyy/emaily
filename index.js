require('./models/user'); // this user require statement needs to go before the passport call, otherwise an error will be thrown - so passport can use after it's been defined
require('./services/passport');
const keys = require('./config/keys');
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session'); //give us access to cookies
const passport = require('passport'); // need this to tell passport we're going to make use of the cookies
const bodyParser = require('body-parser');

mongoose.connect(keys.mongoURI);

const app = express();

// tell express to use body-parser middleware that'll takke express that whenever there is a post or put request, or any request that has a request body
// comes into the application, the middleware will parse the body and assign it to the body property of the incoming request (req.body)
app.use(bodyParser.json());
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
require('./routes/billingRoutes')(app); // call the functions and routes defined in the billing routes on the APP component

// how to have express jive with express in production to allow routes not recognized by our express server and instead by react
if (process.env.NODE_ENV === 'production') {
  // express will serve up production assets, like our main.js file, or main.css file
  // if any get request comes in for any file asset build and we do not understand what it's looking for, then look into the client/build directory and see if anything
  // matches -- if there is, the respond with that
  // order of operations -- this happens first
  app.use(express.static('client/build'));
  // express will serve up the index.html file if it doesn't recognize the route
  // if someone makes a request for a route we don't understand, give them the index.html document - assume react-router will be responsible and kick user to clientside
  // this second part is the catchall - if there is nothing on ANY above routes, and nothing inside our clients/build directory then look here
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || '5000';
app.listen(PORT, () => {
  console.log('app running on port 5000');
});
