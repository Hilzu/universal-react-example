import React from 'react';
import { Link } from 'react-router';

export default class Nav extends React.Component {
  render () {
    return <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/clicker">Clicker</Link>
        </li>
        <li>
          <Link to="/does-not-exist">This link goes nowhere</Link>
        </li>
      </ul>
    </nav>;
  }
}
