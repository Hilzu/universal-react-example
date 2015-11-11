import React from 'react';
import Nav from './Nav';

export default function App ({ children }) {
  return <div className="app">
    <Nav />
    { children }
  </div>
}
