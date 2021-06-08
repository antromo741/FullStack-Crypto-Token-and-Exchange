import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';
import { connect } from 'react-redux'
import Token from '../abis/Token.json'
import { loadWeb3, loadAccount} from '../store/interactions'

class App extends Component {

  componentWillMount() {
    this.loadBlockchainData(this.props.dispatch) 
  }

  async loadBlockchainData(dispatch) {
    const web3 = await loadWeb3(dispatch)
    const network = await web3.eth.net.getNetworkType()
    const networkId = await web3.eth.net.getId()
    const accounts = await loadAccount(web3, dispatch)
    const token = new web3.eth.Contract(Token.abi, Token.networks[networkId].address)
    const totalSupply = await token.methods.totalSupply().call()
    
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
