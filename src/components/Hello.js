import React from 'react'

function Hello ({ quote }) {
  return <div>
    <h1>Hello!</h1>
    { quote
      ? <blockquote>
          <p>{ quote.quote }</p>
          <footer>- { quote.author }</footer>
        </blockquote>
      : null }
  </div>
}

export default Hello
