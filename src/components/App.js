import React from 'react'
import { connect } from 'react-redux'
import Nav from './Nav'

const App = React.createClass({
  propTypes: {
    children: React.PropTypes.node,
    luckyNumber: React.PropTypes.number
  },

  render () {
    const { children, luckyNumber } = this.props
    return <div className='app'>
      <Nav />
      <p className='luckyNumber'>Todays lucky number is {luckyNumber}!</p>
      { children }
    </div>
  }
})

const mapStateToProps = (state) => ({
  luckyNumber: state.luckyNumber
})

export default connect(mapStateToProps)(App)
