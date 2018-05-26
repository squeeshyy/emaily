import axios from 'axios';

import { FETCH_USER, LOGOUT_USER } from './types';

// the purpose of the redux thunk middleware is to inspect whatever value is returned from the below action creator
// if redux thunk sees that we return a function from the action call, it'll automatically pass in the dispatch as argument and call the function
// redux function as a middleware will see that we returned a function, and automatically call it with the dispatch.  We then make a request, wait until we get a
// response back from our API, and then once we have the response, only at that point will we dispatch the action
export const fetchUser = () => async dispatch => {
  // first we create an ajax request using axios to the back end - then once it has a response, we dispatch an action to the action creator
  const res = await axios.get('/api/current_user');
  // res is an object that is returned from the underlying request to the back end server - the .data property is all we care about from the ajax request
  dispatch({ type: FETCH_USER, payload: res.data });
};

// creating the action creator to handle our ajax request to our backend to log us out -- from here we need to add LOGOUTUSER case in our authReducers
export const logoutUser = () => async dispatch => {
  const res = await axios.get('/api/logout');
  dispatch({ type: LOGOUT_USER, payload: res.data });
};

// action creator that handles our ajax request to backend to handle stripe token and verify and add funds to user model
export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);
  // because the server sends back a response of the current user model with the updated credits number, we can re use the same fetch_user type
  // if we dispatch an action of fetchUser and it contains a payload of the user model, the authReducer will automatically pick it up and in theory, anything inside
  // of the application that depends on it will be automatically updated
  // we assume we're going to get back the exact same user model, and we will assume that we want to dispatch the exact same action type to update the user model
  // inside the auth reducer
  dispatch({ type: FETCH_USER, payload: res.data });
};
