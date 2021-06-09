import React, { Component } from 'react'
import { connect } from 'react-redux'

class Trades extends Component {
    render() {
        return (
            <div className="vertical">
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
                                </tr>
                            </thead>
                            
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {

    }
}
export default connect(mapStateToProps)(Trades)