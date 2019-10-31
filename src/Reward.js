import React, { Component } from 'react';

export default class Reward extends Component {

  constructor(props) {
    super(props);
    this.state = {
      addingNew: false,
      populated: props.populated,
      rewardName: '',
      rewardPts: ''
    }
  }

  static defaultProps = {
    populated: false
  }

  handleReward = () => {
    if (!this.props.populated) {
      this.setState({addingNew: true});
    }
  }

  handleNameChange = (e) => {
    this.setState({rewardName: e.target.value});
  }

  handlePtsChange = (e) => {
    this.setState({rewardPts: e.target.value});
  }

  uploadReward = async () => {
    let rewardName = this.state.rewardName,
        rewardPts = parseInt(this.state.rewardPts, 10),
        user = this.props.user;
    user.addReward(rewardName, rewardPts);
    let rewards = await user.getRewards();
    this.setState({populated: true});
  }

  render() {
    return (
      !this.state.populated ?
        (!this.state.addingNew ?
          (<div onClick={this.handleReward} className='reward-view'>
            <i className='material-icons add-button'>control_point</i>
            <p className='reward-title'>Add Reward</p>
          </div>) :
          (<div onClick={this.handleReward} className='reward-view'>
            <div className="inputs">
            <label className="reward-label">
              Reward Name:
              <input className="reward-input" type="text" value={this.state.rewardName} onChange={this.handleNameChange} />
            </label>
            <label className="reward-label">
              Points Required:
              <input className="reward-input" type="text" value={this.state.rewardPts} onChange={this.handlePtsChange} />
            </label>
            <button className="add-confirm" onClick={this.uploadReward}>Add Reward</button>
            </div>
          </div>)) :
          (<div className='reward-view'>
            <div className='active-container'>
              <p className='reward-active'>{this.state.rewardName}</p>
              <p className='reward-active'>{this.state.rewardPts + ' points'}</p>
            </div>
          </div>)
    )
  }
}
