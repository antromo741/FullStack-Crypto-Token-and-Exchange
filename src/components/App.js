import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';
import Token from '../abis/Token.json'

class App extends Component {

  componentWillMount() {
     this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = new Web3(window.ethereum);
    const network = await web3.eth.net.getNetworkType()
    const accounts = await web3.eth.getAccounts()
    const abi = Token.abi
    const networks = Token.networks
    const networkId = await web3.eth.net.getId()
    console.log("accounts", accounts)
    console.log("network", network)
    console.log("abi", abi)
    console.log("networks", networks)
    console.log("network-data", Token.networks[networkId])
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
