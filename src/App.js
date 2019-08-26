import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      showErrMsg: false
    }
  }

  decrementButtonHandler = () => {
    if (this.state.counter === 0) {
      this.setState({ showErrMsg: true })
    }
    if (this.state.counter > 0) {
      this.setState({ counter: this.state.counter - 1})
    }
  }

  incrementButtonHandler = () => {
    this.setState({ 
      counter: this.state.counter + 1,
      showErrMsg: false
    });
  }

  render() {
    return (
      <div data-test="component-app">
        <h1 data-test="counter-display">The counter is currently {this.state.counter}</h1>
        {this.state.showErrMsg && 
          <p data-test="error-message">Counter cannot go below zero</p>
        }
        <button 
          data-test="increment-button"
          onClick={this.incrementButtonHandler}
        >Increment counter
        </button>
        <button
          data-test="decrement-button"
          onClick={this.decrementButtonHandler}
        >Decrement counter
        </button>
      </div>
    );
  }
}

export default App;
