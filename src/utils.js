import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'

export function checkResponseStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

export const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore)
