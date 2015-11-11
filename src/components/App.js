import React from 'react';
import Nav from './Nav';

module.exports = class App extends React.Component {
  render () {
    return <div className="app">
      <Nav />
      { this.props.children }
    </div>;
  }
}
