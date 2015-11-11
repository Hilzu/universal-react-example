import React from 'react';
import Nav from './Nav';

export default class App extends React.Component {
  render () {
    return <div className="app">
      <Nav />
      { this.props.children }
    </div>;
  }
}
