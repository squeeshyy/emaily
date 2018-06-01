import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import * as actions from '../actions';
import Payments from './Payments';

class Header extends Component {
  // this helper method will decide and return the output of what we want to show depending on whether we are or arent logged in
  /*
  to implement server logout, all we have to do is attach an href attribute to the logout <a> tag that will redirect us to /api/logout on our back end server
  once that page is hit -- we can add a res.redirect on our authRoutes on our server to send us back to the home page res.redirect('/');
  */

  onLogoutClick = async () => {
    await this.props.logoutUser();
    await this.props.history.push('/');
  };

  renderContent() {
    switch (this.props.auth) {
      case null:
        return null;

      case false:
        return (
          <li>
            <a href="/auth/google">Log In with Google</a>
          </li>
        );

      default:
        return [
          <li key="1">
            <Payments />
          </li>,
          <li key="1.5" style={{ margin: '0px 10px' }}>
            Credits : {this.props.auth.credits}
          </li>,
          <li key="2">
            <Link to="/" onClick={this.onLogoutClick}>
              Log Out
            </Link>
          </li>
        ];
    }
  }

  render() {
    // console.log(this.props);
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            className="left brand-logo"
            to={this.props.auth ? '/surveys' : '/'}
          >
            Emaily
          </Link>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}
// map state to props gets called with the entire state out of the redux store; - that function returns an object that will be called to the header as props using connect
function mapStateToProps({ auth }) {
  return { auth: auth };
}
// use withRouter to teach the header about react router and be able to let it navigate
// it gives react-router-dom a history object to use inside the component
export default connect(mapStateToProps, actions)(withRouter(Header));
