import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import HomeComponent from './components/Home';
import CartComponent from './components/Cart';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ HomeComponent } />
      <Route exact path="/cart" component={ CartComponent } />
    </Switch>
  );
}

export default App;
