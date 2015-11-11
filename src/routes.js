import { Route, IndexRoute } from 'react-router'
import React from 'react'
import App from './components/App'
import Hello from './components/Hello'
import Clicker from './components/Clicker'
import NotFound from './components/NotFound'

export default [
  <Route path='/' component={App}>
    <IndexRoute component={Hello} />
    <Route path='clicker' component={Clicker} />
  </Route>,
  <Route path='*' component={NotFound} />
]
