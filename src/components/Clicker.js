import React from 'react';

module.exports = class Clicker extends React.Component {
  constructor () {
    super();
    this.state = { n: 0 };
  }

  render () {
    return <div className="clicker">
      <h1>Clicked {this.state.n} times</h1>
      <button onClick={this.handleClick}>Click me!</button>
    </div>;
  }

  handleClick = () => {
    this.setState({ n: this.state.n + 1 });
  }
}
