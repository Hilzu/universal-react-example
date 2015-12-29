import React from 'react'
import { connect } from 'react-redux'
import { fetchNewQuote } from '../actions'

function Hello ({ quote, dispatch }) {
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

const mapStateToProps = state => ({
  quote: state.quote
})

export default connect(mapStateToProps)(Hello)
