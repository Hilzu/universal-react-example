import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Router } from 'react-router'
import { Provider } from 'react-redux'
import { syncReduxAndRouter } from 'redux-simple-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import routes from '../routes'
import reducer from '../reducers'

const store = createStore(reducer)
const history = createBrowserHistory()

syncReduxAndRouter(history, store)

ReactDOM.render(
  <Provider store={store}>
    <Router routes={routes} history={history} />
  </Provider>,
  document.getElementById('content')
)
