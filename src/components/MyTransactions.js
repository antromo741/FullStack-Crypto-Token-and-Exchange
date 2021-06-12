import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tabs, Tab } from 'react-bootstrap'

import {
    myFilledOrdersSelector,
    myFilledOrdersLoadedSelector,
    myOpenOrdersSelector,
    myOpenOrdersLoadedSelector,
} from '../store/selectors'


class MyTransactions extends Component {
    render() {
        return(
        <div className="card bg-dark text-white">
            <div className="card-header">
                My Transactions
            </div>
            <div className="card-body">
            <Tabs defaultActiveKey="trades" className="bg-dark text-white">
                <Tab eventkey="trades" title="Trades" className="bg-dark">
                    <table className="table table-dark table-sm small">
                        <thead>
                            <tr>
                                <th>TIme</th>
                                <th>ROM</th>
                                <th>ROM/ETH</th>
                            </tr>
                        </thead>
                    </table>
                
                </Tab>
                <Tab eventKey="orders" title="Orders">
                    <table className="table table-dark table-sm small">
                        <thead>
                            <tr>
                                <th>Amount</th>
                                <th>ROM/ETH</th>
                                <th>Cancel</th>
                            </tr>
                        </thead>
                    </table>
                </Tab>
            </Tabs>
            </div>
        </div>


        )
    }
}

function mapStateToProps(state){
    return{
        myFilledOrders: myFilledOrdersSelector(state),
        showMyFilledOrders: myFilledOrdersLoadedSelector(state),
        myOpenOrders: myOpenOrdersSelector(state),
        showMyOpenOrders: myOpenOrdersLoadedSelector(state)
    }
}


export default connect(mapStateToProps)(MyTransactions)