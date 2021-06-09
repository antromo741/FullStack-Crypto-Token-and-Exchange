import React, { Component } from 'react'
import { connect } from 'react-redux'

class Trades extends Component {
    render() {
        return ( 
            <div className="card bg-dark text-white">
                <div className="card-header">
                Some title
                </div>
            <div className="card-body">


                
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