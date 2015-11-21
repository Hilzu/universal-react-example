import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import createLocation from 'history/lib/createLocation'
import { RoutingContext, match } from 'react-router'
import routes from '../routes'
import views from './views'
import { DataRoot, loadInitialFromComponents } from '../InitialDataLoad'

const app = express()

app.set('x-powered-by', false)

app.use('/public', express.static('public'))

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
    loadInitialFromComponents(renderProps.components)
      .then((initialData) => {
        const pageContent = ReactDOMServer.renderToString(
          <DataRoot initialData={initialData} component={RoutingContext} {...renderProps} />)
        const initialDataForBrowser = views.script(
          { content: JSON.stringify(initialData), id: 'initialData', type: 'application/json' })
        res.send(views.page('Hello world!', pageContent, { extraBody: initialDataForBrowser }))
      })
      .catch((err) => next(err))
  })
})

app.use(errorHandler)

export default app

function errorHandler (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send(views.errorPage(err.message))
}
