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
import  {contractsLoadedSelector } from '../store/selectors'

class App extends Component {

  componentWillMount() {
    this.loadBlockchainData(this.props.dispatch) 
  }

  async loadBlockchainData(dispatch) {
    const web3 = await loadWeb3(dispatch)
    await web3.eth.net.getNetworkType()
    const networkId = await web3.eth.net.getId()
    await loadAccount(web3, dispatch)
    const token = await loadToken(web3, networkId, dispatch)
    if(!token) {
      window.alert('Token smart contract not dedected on the current network. Please select another network with metamask.')
      return
    }

    const exchange = await loadExchange(web3, networkId, dispatch)
    if (!exchange) {
      window.alert('Exchange smart contract not dedected on the current network. Please select another network with metamask.')
    return
    }
    
  }

  render() {

    return (
      <div className="App">
        <Navbar />
        {  this.props.contractsLoaded ? <Content /> : <div className="content" ></div>}
       
      </div>
    );
  }
}
function mapStateToProps(state) {
  
  return {
    contractsLoaded: contractsLoadedSelector(state)
  }
}

export default connect(mapStateToProps)(App);
