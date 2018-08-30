import React, { Component } from 'react';
import './react-progress-button.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './components/login/login';
import Dashboard from './components/layout/dashboard';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

library.add(faUser, faLock);

class App extends Component {

  hasSession() {
    return sessionStorage.getItem('token') !== null;
  }

  render() {
    return (
      <div className="App">
        {!this.hasSession() ? (
          <Login></Login>
        ) : (
            <Dashboard></Dashboard>
          )
        }
      </div>
    );
  }
}

export default App;
