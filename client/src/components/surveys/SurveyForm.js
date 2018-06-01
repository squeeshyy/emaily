// SurveyForm shows a form for a user to add input
import _ from 'lodash';
// lodash has a map function to iterate over arrays
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';
// field component is a helper provided by redux form that helps us render any traditional html form element
// it needs some instructions/props to be told how to configure/display
// the name property can be any string we want - it tells reduxform that we have one piece of data produced by our form called 'surveyTitle'
// redux form will see what we type into the <Field/> and automatically put it in our redux form store with a key of whatever we give it in the "name" prop - surveyTitle
// common practice is to replace the component prop of 'input' with a custom component we make - a la SurveyField which we will create
// this.props.handleSubmit is a helper that is provided by redux-form.  if we call it and pass it a function of our own, it'll automatically call our function
//  whenever a user tries to submit our form

class SurveyForm extends Component {
  // define a helper method that'll render our 4 separate surveyfields
  // label is a custom prop that is passed in and destructured in our SurveyField component and used to uniquely id a rendered field
  // redux form will automatically forward it on to the survey field component
  renderFields() {
    return _.map(formFields, ({ label, name }) => {
      return (
        <Field
          component={SurveyField}
          type="text"
          label={label}
          name={name}
          key={name}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Review Order
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

// it takes only one argument as an object that contains some config that we want
// this is the only similarity between 'connect' and redux-form ^^ (along with the way it's called with the 2 parenthesis)
// one of the config options is called validate - if we pass in a function under the key validate, redux form will automatically run any time the user attempts
// to submit the form
// it takes a single argument of an object that contains all of the values passed from the form
// we define an errors object to start, and if we return an EMPTY errors object at the end of the validation, redux form will assume the validation is successful
function validate(values) {
  // if any of the properties on this error object matchup with any of the fields that we are attempting to render, it'll pass it to that instance of the field component
  // the validation of the email list is going to be done in a function that we'll house in a separate file - and try to make reusable
  const errors = {};
  // this is the validation function of the email array pulled from another file
  errors.recipients = validateEmails(values.recipients || '');

  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = 'You must provide a value';
    }
  });

  return errors;
}
// this helper initializes and configures the from we render to the user
export default reduxForm({
  form: 'surveyForm',
  validate: validate,
  destroyOnUnmount: false
})(SurveyForm);
