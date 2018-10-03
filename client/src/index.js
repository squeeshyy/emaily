// this is responsible for our redux part of our application. like all the state and/or data
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
// redux thunk allows you to skip returning an action immediately from the action creator, and instead return a function that returns the action object
import reduxThunk from 'redux-thunk';

import 'materialize-css/dist/css/materialize.css';
import './index.css';
import App from './components/App';
import reducers from './reducers';

// ********************************************************************
// we'll create a pseudo postman testing environment by using axios in our client side to help bypass our oAuth flow
// temporary test code to test our api/survey api route
import axios from 'axios';
window.axios = axios;
// we can now use the axios library in the browser's console to test out our email send logic etc
// ********************************************************************

// first argument is where you call your reducers, second is for server side rendering, third is middleware
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
// action creators are where change is initiated inside of redux store

// provider is a react component that provides state all the way down to all the components inside of it -- in this case our entire app
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
