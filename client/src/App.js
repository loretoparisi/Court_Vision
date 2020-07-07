import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import './App.css';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

function App() {
    return ( 
      <Provider store={store}>
        <Router>
          <div className = 'App' >
            <NavBar / >
            <Route exact path='/' component={ HomePage } />
            <div id='container'>
              <Route exact path='/register' component={ Register } />
              <Route exact path='/login' component={ Login } />
            </div>
          </div>
        </Router>
      </Provider>
    );
}

export default App;