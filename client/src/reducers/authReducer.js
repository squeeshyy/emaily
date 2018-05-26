import { FETCH_USER, LOGOUT_USER } from '../actions/types';
// this reducer is responsible for deciding whether or not a user is currently logged in

// first argument is state responsible for this function, second is an action object
// we can't return undefined when this is called without state, so our initial state is set here
export default function(state = null, action) {
  // console.log(action);
  // authReducer can only return 1 of 3 possible values - null when it's pending, false when not logged in, or the payload when logged in.
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;

    // we return false when creating our logoutuser reducer bc it is one of our 3 cases, not logged in at all
    case LOGOUT_USER:
      return false;

    default:
      return state;
  }
}
