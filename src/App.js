import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import HomeComponent from './components/Home';
import CartComponent from './components/Cart';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ HomeComponent } />
      <Route exact path="/cart" component={ CartComponent } />
      <Route exact path="/productDetail/:id" component={ ProductDetail } />
      <Route exact path="/checkout" component={ Checkout } />
    </Switch>
  );
}

export default App;
