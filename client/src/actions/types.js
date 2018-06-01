export const FETCH_USER = 'fetch_user';

// here we're defining an action type to logout our user on the client side for our ajax logout
export const LOGOUT_USER = 'logout_user';

// action type that will make a network request to our server, and dispatch an action that will  in the end return the surveys produced by a user with a given id
// we have to make a reducer that'll catch this action
export const FETCH_SURVEYS = 'fetch_surveys';
