import React, { Component } from 'react';
import logo from './logo.svg';
import FormulaEditor from './components/FormulaEditor';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  handleChange = (value) => {
    this.setState({ value });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <FormulaEditor onChange={this.handleChange} value={this.state.value} />
      </div>
    );
  }
}

export default App;
