import React, { Component } from 'react';
import Profile from './Profile.js';
import Signin from './Signin.js';
import {
  UserSession,
  AppConfig
} from 'blockstack';
import Nav from 'react-bootstrap/Nav';

const appConfig = new AppConfig()
const userSession = new UserSession({ appConfig: appConfig })

export default class App extends Component {


  handleSignIn(e) {
    e.preventDefault();
    userSession.redirectToSignIn();
  }

  handleSignOut(e) {
    e.preventDefault();
    userSession.signUserOut(window.location.origin);
  }

  render() {
    return (
      <div className="site-wrapper">
        <Nav className="navbar navbar-dark bg-dark navbar-static-top">
          <a className="navbar-brand" href="#">
            <h1 className="landing-heading">{ !userSession.isUserSignedIn() ?
              'Loyal Bits'
              : userSession.loadUserData().profile.name }
            </h1>
          </a>
          { !userSession.isUserSignedIn() ?
            null
            : <Nav.Item>
              <button
                className="btn btn-primary btn-lg"
                id="signout-button"
                onClick={ this.handleSignOut.bind(this) }
              >
                Sign Out
              </button>
            </Nav.Item> }
        </Nav>
        <div className="site-wrapper-inner">
          { !userSession.isUserSignedIn() ?
            <Signin userSession={userSession} handleSignIn={ this.handleSignIn } />
            : <Profile userSession={userSession} handleSignOut={ this.handleSignOut } />
          }
        </div>
      </div>
    );
  }

  componentDidMount() {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        window.history.replaceState({}, document.title, "/")
        this.setState({ userData: userData})
      });
    }
  }
}
