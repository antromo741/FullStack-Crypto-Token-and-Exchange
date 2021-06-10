import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
    filledOrdersLoadedSelector,
    filledOrdersSelector 
} from '../store/selectors'

const showFilledOrders = (filledOrders) => {
    return (
        <tbody>
            { filledOrders.map((order) => {
                return (
                    <tr>
                        <td>foo</td>
                        <td>bar</td>
                        <td>baz</td>
                    </tr>
                )
            })}
        </tbody>
    )
}
class Trades extends Component {
    render() {
    return (
    
        <div className="card bg-dark text-white">
            <div className="card-header">
            Trades
            </div>
            <div className="card-body">
                <table className="table table-dark table-sm small">
                        <thead>
                        <tr>
                        <th>Time</th>
                        <th>ROM</th>
                        <th>ROM/ETH</th> 
                        {this.props.filledOrdersLoaded ? showFilledOrders(this.props.filledOrders) : <tbody></tbody>}
                        </tr>
                        </thead>
                   
                </table>
            </div>
        </div>
    
    )
    }
    }


function mapStateToProps(state) {
    return {
        filledOrdersLoaded: filledOrdersLoadedSelector(state),
        filledOrders: filledOrdersSelector(state)
    }
}
export default connect(mapStateToProps)(Trades)