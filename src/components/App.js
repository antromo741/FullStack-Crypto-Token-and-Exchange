import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';
import { connect } from 'react-redux'
import Token from '../abis/Token.json'
import {loadWeb3} from '../store/interactions'

class App extends Component {

  componentWillMount() {
    this.loadBlockchainData(this.props.dispatch) 
  }

  async loadBlockchainData(dispatch) {
    const web3 = await loadWeb3(dispatch)
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
function mapStateToProps(state) {
  return {

  }
}

export default connect(mapStateToProps)(App);
