import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import createLocation from 'history/lib/createLocation'
import { RoutingContext, match } from 'react-router'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from '../reducers'
import routes from '../routes'
import views from './views'

const app = express()

app.set('x-powered-by', false)

app.use(express.static('public'))

app.all('*', (req, res, next) => {
  const location = createLocation(req.url)

  match({ routes, location }, (err, redirectLocation, renderProps) => {
    if (redirectLocation) {
      return res.redirect(301, redirectLocation.pathname + redirectLocation.search)
    }
    if (err) {
      return next(err)
    }
    if (renderProps == null || renderProps.routes[0].path === '*') {
      const pageContent = ReactDOMServer.renderToString(<RoutingContext {...renderProps} />)
      return res.status(404).send(views.page('Not found', pageContent))
    }
    const store = createStore(reducer)
    const pageContent = ReactDOMServer.renderToString(
      <Provider store={store}>
        <RoutingContext {...renderProps} />
      </Provider>
    )
    res.send(views.page('Hello world!', pageContent))
  })
})

app.use(errorHandler)

export default app

function errorHandler (err, req, res, next) {
  console.error(err.stack)
  if (err.response) console.error('Error response:', err.response.status, err.response.url, err.response.statusText)
  res.status(500).send(views.errorPage(err.message))
}
