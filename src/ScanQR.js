import React, { Component } from 'react';
import QrReader from 'react-qr-reader'

export default class ScanQR extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scanning: false
    }
  }

  handleScan = (data) => {
    if (data) {
      this.setState({scanning: false});
      console.log(data);
    }
  }

  handleError = (err) => {
    console.error(err)
  }

  render() {
    return (
      !this.state.scanning ?
      <div onClick={() => {this.setState({scanning: true})}} className='scan-button'>
          <i className='material-icons scan-icon'>camera_enhance</i>
          <p className='scan-text'>Scan Code</p>
      </div> :
      <>
      <div className='scannerContainer'>
        <div className='scannerBanner'>
          <p className='scanning-text'>Scan QR Code</p>
          <div className='stopScan' onClick={() => {this.setState({scanning: false})}}>
            <i className='material-icons stopScanIcon'>cancel</i>
          </div>
        </div>
        <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '100%' }}
        />
      </div>
      </>
    )
  }
}
