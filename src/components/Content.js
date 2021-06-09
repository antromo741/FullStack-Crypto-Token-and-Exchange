import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadAllOrders } from '../store/interactions'
import { exchangeSelector } from '../store/selectors'
class Content extends Component {
    
    
    componentWillMount() {
        this.loadBlockchainData(this.props.dispatch)
    }

    async loadBlockchainData(dispatch) {
        await loadAllOrders(this.props.exchange, dispatch)
    }


render() {
    return (
        <div> 
        <h1>Hello</h1>
        <p>Romo</p>
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
