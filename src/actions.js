import fetch from 'isomorphic-fetch'
import { checkResponseStatus } from './utils'

export const SET_LUCKY_NUMBER = 'SET_LUCKY_NUMBER'
export const SET_QUOTE = 'SET_QUOTE'

export const setLuckyNumber = (luckyNumber) => ({
  type: SET_LUCKY_NUMBER, luckyNumber
})

export const fetchNewQuote = () => dispatch => {
  fetch('http://api.icndb.com/jokes/random')
    .then(checkResponseStatus)
    .then(res => res.json())
    .then(jokeRes => {
      if (jokeRes.type !== 'success') {
        const err = new Error('Response type was not success!')
        err.response = jokeRes
        throw err
      }
      dispatch(setQuote({ quote: jokeRes.value.joke, author: 'Anonymous' }))
    })
}

export const setQuote = (quote) => ({
  type: SET_QUOTE, quote
})
