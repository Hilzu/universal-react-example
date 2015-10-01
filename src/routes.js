import { Router, Route, Link } from 'react-router';
import React from 'react';
import App from './components/App';
import NotFound from './components/NotFound';

export default [
  <Route path="/" component={App} />,
  <Route path="*" component={NotFound} />
];
