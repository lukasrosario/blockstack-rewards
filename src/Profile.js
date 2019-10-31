import React, { Component } from 'react';
import {
  Person,
} from 'blockstack';
import Business from './person_obj';
import Reward from './Reward.js';
import ScanQR from './ScanQR.js';

export default class Profile extends Component {
  constructor(props) {
  	super(props);
    const { userSession } = this.props;
    //console.log(current.verifydata());
  	this.state = {
  	  person: new Person(userSession.loadUserData().profile),
      user: new Business(userSession)
  	};
  }

  render() {
    const { handleSignOut, userSession, putFile } = this.props;
    const { person } = this.state;
    return (
      !userSession.isSignInPending() ?
      <div className='main-container'>
          <ScanQR/>
          <div className='row-container'>
            <Reward user={this.state.user}/>
            <Reward user={this.state.user}/>
            <Reward/>
          </div>
          <div className='row-container'>
            <Reward user={this.state.user}/>
            <Reward user={this.state.user}/>
            <Reward user={this.state.user}/>
          </div>
          <div className='row-container'>
            <Reward user={this.state.user}/>
            <Reward user={this.state.user}/>
            <Reward user={this.state.user}/>
          </div>
      </div> : null
    );
  }
}
