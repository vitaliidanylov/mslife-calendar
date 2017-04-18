import React, { Component } from 'react';
import { Calendar } from './components/Calendar';
import logo from './logo.svg';
import './css/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>MasterLife Calendar</h2>
        </div>
        <Calendar />
      </div>
    );
  }
}

export default App;
