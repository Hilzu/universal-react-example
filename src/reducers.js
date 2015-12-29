import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'
import { SET_LUCKY_NUMBER, SET_QUOTE } from './actions'

const luckyNumber = (state = 777, action) => {
  switch (action.type) {
    case SET_LUCKY_NUMBER:
      return action.luckyNumber
    default:
      return state
  }
}

const quote = (state = null, action) => {
  switch (action.type) {
    case SET_QUOTE:
      return action.quote
    default:
      return state
  }
}

const rootReducer = combineReducers({
  routing: routeReducer,
  luckyNumber,
  quote
})

export default rootReducer
