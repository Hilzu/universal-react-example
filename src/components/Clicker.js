import React from 'react'

const Clicker = React.createClass({
  getInitialState: () => ({
    n: 0
  }),

  handleClick () {
    this.setState({ n: this.state.n + 1 })
  },

  render () {
    return <div className='clicker'>
      <h1>Clicked {this.state.n} times</h1>
      <button onClick={this.handleClick}>Click me!</button>
    </div>
  }
})

export default Clicker
