import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar';
import Content from './Content';
import Web3 from 'web3';
import { connect } from 'react-redux'
import Token from '../abis/Token.json'
import { 
  loadWeb3, 
  loadAccount, 
  loadToken,
  loadExchange} 
  from '../store/interactions'

class App extends Component {

  componentWillMount() {
    this.loadBlockchainData(this.props.dispatch) 
  }

  async loadBlockchainData(dispatch) {
    const web3 = await loadWeb3(dispatch)
    await web3.eth.net.getNetworkType()
    const networkId = await web3.eth.net.getId()
    await loadAccount(web3, dispatch)
    const token = loadToken(web3, networkId, dispatch)
    loadExchange(web3, networkId, dispatch)
    
    
  }

  render() {

    return (
      <div className="App">
        <Navbar />
        <Content />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {

  }
}

export default connect(mapStateToProps)(App);
