const mongoose = require('mongoose');
const { Schema } = mongoose;

// this is set up to be able to make clicks on the links on our recipients surveys unique - also it is created as a subdocument class
const recipientSchema = new Schema({
  email: String,
  responded: { type: Boolean, default: false }
});

module.exports = recipientSchema;
