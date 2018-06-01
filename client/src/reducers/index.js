import { combineReducers } from 'redux';
// we import reducer this way because this is what it is caled in the redux form library - use es2015 module imports to rename
// redux form basically takes care of all the creation of action creators and reducers for form for us
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';

// whatever keys we provide to this object represent the keys that are inside of the state object
export default combineReducers({
  // the auth keyed piece of state is being handled by the auth reducer
  auth: authReducer,
  // we assign the redux form reducer to the form property, because that is where redux form assumes the key will be
  // redux form is going to assume that the values being produced by this reducer will be on the 'form' key
  // this is all it takes to wire redux-form to our application
  form: reduxForm,
  surveys: surveysReducer
});
