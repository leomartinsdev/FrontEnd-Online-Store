import React, { Component } from 'react';
import { getProductsOnStorage } from '../services/localStorage';

class Cart extends Component {
  state = {
    cartProducts: [],
  };

  componentDidMount() {
    const cartProductsFromStorage = getProductsOnStorage();
    this.setState({
      cartProducts: cartProductsFromStorage,
    });
  }

  render() {
    const { cartProducts } = this.state;
    return (
      <div data-testid="shopping-cart-empty-message">
        {
          cartProducts.length === 0
            ? 'Seu carrinho está vazio'
            : cartProducts.map((element) => (
              <>
                <p data-testid="shopping-cart-product-name">{element.title}</p>
                <p>{element.price}</p>
                <p data-testid="shopping-cart-product-quantity">{element.quantity}</p>
              </>
            ))
        }
      </div>
    );
  }
}

export default Cart;
