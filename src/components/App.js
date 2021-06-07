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
    const networkId = await web3.eth.net.getId()
    const token = new web3.eth.Contract(Token.abi, Token.networks[networkId].address)
    const totalSupply = await token.methods.totalSupply().call()
    console.log("token", token)
    console.log("totalSupply", totalSupply)
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
