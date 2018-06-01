// this part of our application is responsible for our view layer
import React, { Component } from 'react';
// Browser Router is the brains of react-router and it dictates what's visible based on the url. Route is a react component that sets up rules between routes and components
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

// set up dummy components that'll eventually get replaced once want to expand on them
// const Header = () => <h2>Header</h2>;
// const Dashboard = () => <h2>Dashboard</h2>;
// const SurveyNew = () => <h2>SurveyNew</h2>;
// const Landing = () => <h2>Landing</h2>;
import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

class App extends Component {
  componentDidMount() {
    // we can call fetchUser from actions as props here because we have called the imported actions from the export default connect
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

// first argument using conncet is mapStateToProps, second is all the different action creators we want to wire up
// once we use the actions in the connect call below, theyre passed to the APP component as props
export default connect(null, actions)(App);
