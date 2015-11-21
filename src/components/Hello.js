import React from 'react'
import fetch from 'isomorphic-fetch'
import { createDataContainer } from '../InitialDataLoad'
import { checkResponseStatus } from '../utils'

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

export default createDataContainer(Hello, {
  quote: () => fetch('http://api.icndb.com/jokes/random')
    .then(checkResponseStatus)
    .then(res => res.json())
    .then(jokeRes => {
      if (jokeRes.type !== 'success') {
        const err = new Error('Response type was not success!')
        err.response = jokeRes
        throw err
      }
      return { quote: jokeRes.value.joke, author: 'Anonymous' }
    })
})
