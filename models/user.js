const mongoose = require('mongoose');
const { Schema } = mongoose;

// define our Schema or class object - can put more than just ID in here, but this is all we need for this project
const userSchema = new Schema({
  googleID: String,
  credits: {
    type: Number,
    default: 0
  }
});

//pseudo export of our schema, adds it to the mongoose model as 'users'
mongoose.model('users', userSchema);
