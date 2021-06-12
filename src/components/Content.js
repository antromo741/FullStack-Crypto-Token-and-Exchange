import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadAllOrders } from '../store/interactions'
import { exchangeSelector } from '../store/selectors'
import  Trades  from './Trades'
import OrderBook from './OrderBook'
import MyTransactions from './MyTransactions'
class Content extends Component {
    
    
    componentWillMount() {
        this.loadBlockchainData(this.props.dispatch)
    }

    async loadBlockchainData(dispatch) {
        await loadAllOrders(this.props.exchange, dispatch)
    }


render() {
    return (
        <div className="content"> 
            <Trades />
            <OrderBook />
            <MyTransactions />
            
        </div>

    )
}
}
function mapStateToProps(state) {
    return {
        exchange: exchangeSelector(state)
    }
}

export default connect(mapStateToProps)(Content)
