import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

export default class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/carteira" component={ Wallet } />
          <Route path="/" component={ Login } />
        </Switch>
      </BrowserRouter>
    );
  }
}
