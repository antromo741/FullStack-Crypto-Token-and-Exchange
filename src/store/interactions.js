import '@metamask/legacy-web3'
import Web3 from 'web3';
import {
    web3Loaded,
    web3AccountLoaded,
    tokenLoaded

} from './actions'
import Token from '../abis/Token.json'

export const loadWeb3 = async (dispatch) => {
    if (typeof window.ethereum !== 'undefined') {
        const web3 = new Web3(window.ethereum)
        dispatch(web3Loaded(web3))
        return web3
    } else {
        window.alert('Please install MetaMask')
        window.location.assign("https://metamask.io/")
    }
}

export const loadAccount = async (web3, dispatch) => {
    const accounts = await web3.eth.getAccounts()
    const account = await accounts[0] 
    await window.ethereum.enable()
    if (typeof account !== 'undefined') {
       
        dispatch(web3AccountLoaded(account))
        return account
    } else {
        window.alert('Please login with MetaMask')
        return null
    }
}

export const loadToken = async (web3, networkId, dispatch) => {
    try {
        const token = new web3.eth.Contract(Token.abi, Token.networks[networkId].address)
        dispatch(tokenLoaded(token))
        return token
    } catch (error) {
        console.log('Contract not deployed to the current network. Please select another network with Metamask.')
        return null
    }
}