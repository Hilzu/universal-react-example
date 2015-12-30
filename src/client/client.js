import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router'
import { Provider } from 'react-redux'
import { syncReduxAndRouter } from 'redux-simple-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import he from 'he'
import routes from '../routes'
import reducer from '../reducers'
import { createStoreWithMiddleware } from '../utils'

const initialState = loadInitialState()
const store = createStoreWithMiddleware(reducer, initialState)
const history = createBrowserHistory()

syncReduxAndRouter(history, store)

ReactDOM.render(
  <Provider store={store}>
    <Router routes={routes} history={history} />
  </Provider>,
  document.getElementById('content')
)

function loadInitialState () {
  const element = document.getElementById('initial-state')
  if (!element) {
    console.error("Couldn't find initial state node!")
    return {}
  }
  const content = element.textContent
  return JSON.parse(he.decode(content))
}
