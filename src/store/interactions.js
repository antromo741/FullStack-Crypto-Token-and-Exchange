import '@metamask/legacy-web3'
import Web3 from 'web3';
import {
    web3Loaded,
    web3AccountLoaded,
    tokenLoaded,
    exchangeLoaded,
    cancelledOrdersLoaded,
    filledOrdersLoaded,
    allOrdersLoaded,
    orderCancelling,
    orderCancelled,

} from './actions'
import Token from '../abis/Token.json'
import Exchange from '../abis/Exchange.json'

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

export const loadExchange = async (web3, networkId, dispatch) => {
    try {
        const exchange = new web3.eth.Contract(Exchange.abi, Exchange.networks[networkId].address)
        dispatch(exchangeLoaded(exchange))
        return exchange
    } catch (error) {
        console.log('Contract not deployed to the current network. Please select another network with Metamask.')
        return null
    }
}

export const loadAllOrders = async (exchange, dispatch) => {
    //Fetch cancelled orders with the cancel event steam
    const cancelStream = await exchange.getPastEvents('Cancel', { fromBlock: 0, toBlock: 'latest'})
    //Format Cancelled Orders
    const cancelledOrders = await cancelStream.map((event) => event.returnValues)
    //add cancelled orders to redux store
    dispatch(cancelledOrdersLoaded(cancelledOrders))


    //fetch filled orders with the trade event stream
    const tradeStream = await exchange.getPastEvents('Trade', { fromBlock: 0, toBlock: 'latest' })
    //Format Filled Orders
    const filledOrders = await tradeStream.map((event) => event.returnValues)
    //add filled orders to redux store
    dispatch(filledOrdersLoaded(filledOrders))

    //Load Order stream
    const orderStream = await exchange.getPastEvents('Order', { fromBlock:0, toBlock: 'latest' })
    //Format orderStream
    const allOrders = orderStream.map((event) => event.returnValues)
    //add all open orders to the redux store
    dispatch(allOrdersLoaded(allOrders))
    
}
export const cancelOrder = (dispatch, exchange, order, account) => {
    exchange.methods.cancelOrder(order.id).send({ from: account })
        .on('transactionHash', (hash) => {
            dispatch(orderCancelling())
        })
        .on('error', (error) => {
            console.log(error)
            window.alert('There was an error!')
        })
}

export const subscribeToEvents = async (exchange, dispatch) => {
    exchange.events.Cancel({}, (error, event) => {
        dispatch(orderCancelled(event.returnValues))
    })
}