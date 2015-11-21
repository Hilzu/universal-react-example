import React from 'react'
import Nav from './Nav'
import { createDataContainer } from '../InitialDataLoad'

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

export default createDataContainer(App, {
  luckyNumber: new Promise((resolve, reject) => {
    resolve(777)
  })
})
