import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    orderBookSelector,
    orderBookLoadedSelector
} from '../store/selectors'

class OrderBook extends Component {
    render() {
        console.log(this.props.showOrderBook, this.props.orderBook)
        return (
            <div className="vertical">
                <div className="card bg-dark text-white">
                    <div className="card-header">
                        OrderBook
                    </div>
                    <div className="card-body order-book">
                        <table className="table table-dark table-sm small">

                        </table>
                    </div>
                 </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    
    return {
        orderBook: orderBookSelector(state),
        showOrderBook: orderBookLoadedSelector(state)
    }
}

export default connect(mapStateToProps)(OrderBook);