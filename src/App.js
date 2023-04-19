import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import HomeComponent from './components/Home';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ HomeComponent } />
    </Switch>
  );
}

export default App;
