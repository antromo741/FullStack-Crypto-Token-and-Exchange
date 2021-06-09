import React, { Component } from 'react'
import { connect } from 'react-redux'


class Content extends Component {

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
        
    }
}

export default connect(mapStateToProps)(Content)
