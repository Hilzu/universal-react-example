import path from 'path';
import express from 'express';
import React from 'react';
import cons from 'consolidate';
import App from '../components/App';

const app = express();

app.set('x-powered-by', false);
app.engine('mustache', cons.mustache);
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res, next) => {
  app.render('page', { content: React.renderToString(<App />) }, (err, pageHtml) => {
    if (err) return next(err);
    res.render('base', { title: 'Hello World!', body: pageHtml });
  });
});

app.use('/public', express.static('public'));

app.use(errorHandler);

export default app;

function errorHandler (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Internal system error!');
}
