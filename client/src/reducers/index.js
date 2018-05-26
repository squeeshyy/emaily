import { combineReducers } from 'redux';
import authReducer from './authReducer';

// whatever keys we provide to this object represent the keys that are inside of the state object
export default combineReducers({
  // the auth keyed piece of state is being handled by the auth reducer
  auth: authReducer
});
