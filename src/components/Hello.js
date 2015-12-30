import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchNewQuote } from '../actions'

class Hello extends Component {
  static loadData () {
    return [fetchNewQuote()]
  }

  componentDidMount () {
    if (!this.props.quote) this.props.dispatch(fetchNewQuote())
  }

  render () {
    const { quote, dispatch } = this.props
    return <div>
      <h1>Hello!</h1>
      <button onClick={() => dispatch(fetchNewQuote()) }>Get new quote</button>
      { quote
        ? <blockquote>
            <p>{ quote.quote }</p>
            <footer>- { quote.author }</footer>
          </blockquote>
        : null }
    </div>
  }
}

Hello.propTypes = {
  quote: PropTypes.object,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  quote: state.quote
})

export default connect(mapStateToProps)(Hello)
