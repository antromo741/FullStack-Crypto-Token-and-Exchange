import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadBalnces } from '../store/interactions'

class Balance extends Component {
    componentWillMount() {
        this.loadBlockchainData()
    }

    async loadBlockchainData(props) {
        const { exchange, dispatch } = props
        await loadBalances(dispatch, web3, exchange, token, account)
    }
    
    render() {
    return (
        <div className=" card bg-dark tex-white">
            <div className="card-header">
                Balance
                </div>
            <div className="card-body">

            </div>
        </div>
    )
}
}
function mapStateToProps(state) {

}

export default connect(mapStateToProps)(Balance)
