import path from 'path';
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import cons from 'consolidate';
import createLocation from 'history/lib/createLocation';
import { RoutingContext, match } from 'react-router';
import routes from '../routes';
import App from '../components/App';

const app = express();

app.set('x-powered-by', false);
app.engine('mustache', cons.mustache);
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

app.use('/public', express.static('public'));

app.all('*', (req, res, next) => {
  const location = createLocation(req.url);

  match({ routes, location }, (err, redirectLocation, renderProps) => {
    if (redirectLocation) {
      return res.redirect(301, redirectLocation.pathname + redirectLocation.search);
    }
    if (err) {
      return next(err);
    }
    if (renderProps == null || renderProps.routes[0].path === '*') {
      res.status(404);
    }
    var pageContent = ReactDOMServer.renderToString(<RoutingContext {...renderProps} />);
    app.render('page', { content: pageContent }, (err, pageHtml) => {
      if (err) return next(err);
      res.render('base', { title: 'Hello world!', body: pageHtml });
    });
  });
});

app.use(errorHandler);

export default app;

function errorHandler (err, req, res, next) {
  console.error(err.stack);
  app.render('500', { errorMessage: err.message }, (err, html) => {
    if (err) res.status(500).send(err.message);
    res.render('base', { title: 'Internal server error!', body: html });
  })
}
