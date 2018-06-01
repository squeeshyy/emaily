const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  // an array of recipeientSchema records imported from recipient.js - this is how a subdocument collection is created
  recipients: [RecipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  // this is a reference to another instance of a user - to make mongoose understand this -  we assign an object to this property with a type of Schema.types.objectId -
  // so whenenever a schema gets saved to our database we will see an ID of the user woh owns the record assigned to it and the object that we're making the
  // reference to belongs to the users collection
  _user: { type: Schema.Types.ObjectId, ref: 'User' }, // we prefixed with an underscore by convention to make it obvious to any onlooker it's a relationship field
  dateSent: Date, // record the date at which survey was sent
  lastResponded: Date //latest time a survey was responded to
});

mongoose.model('surveys', surveySchema);
