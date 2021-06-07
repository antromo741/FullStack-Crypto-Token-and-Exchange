import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';

class App extends Component {

  componentWillMount() {
     this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = new Web3(window.ethereum);
    const network = await web3.eth.net.getNetworkType()
    console.log("network", network)
  }

  render() {
    return (
      <div className="App">
      <h1>Hello</h1>
      <p>Romo</p>
      </div>
    );
  }
}

export default App;
