// survey form review shows users their form inputs for review
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import formFields from './formFields';
import * as actions from '../../actions';

const SurveyFormReview = props => {
  const reviewFields = _.map(formFields, field => {
    return (
      <div key={field.name}>
        <label>{field.label}</label>
        <div>{props.formValues[field.name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields}
      <button
        className="yellow darken-3 white-text btn-flat"
        onClick={props.onCancel}
      >
        Back
      </button>
      <button
        className="teal btn-flat right white-text"
        onClick={() => props.submitSurvey(props.formValues, props.history)}
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};
// mapstate to props is named by contention - it takes some redux state and transforms it into props that can be passed down to the component
// it is called with the entire redux state and it returns some values that'll be passed down into the component as props
function mapStateToProps(state) {
  // console.log(state);
  return {
    formValues: state.form.surveyForm.values
  };
}
// we use withRouter to teach this component about React-Router -- it wraps only the component that we want to teach.
// it gives react-router-dom a history object to use inside the component
// history object is passed in with the props - so we'll pass those props along to the action creator
// in the action creator we'll give the props to the function
export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
