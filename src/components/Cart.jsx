import React, { Component } from 'react';
import { Add, Remove, Clear } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { getProductsOnStorage, setProductsOnStorage } from '../services/localStorage';

class Cart extends Component {
  state = {
    cartProducts: [],
  };

  componentDidMount() {
    const cartProductsFromStorage = getProductsOnStorage();
    this.setState({
      cartProducts: cartProductsFromStorage, // recupera a lista salva no storage e seta ela no state
    });
  }

  // operation(increase,decrease) = aumentar ou diminuir a quantidade de itens do produto
  setProductQuantity = (id, operation) => {
    const { cartProducts } = this.state;
    const item = cartProducts.find((product) => product.id === id);

    if (operation === 'increase') {
      item.quantity += 1;
    } else if (item.quantity > 1) {
      item.quantity -= 1;
    }

    this.setState({
      cartProducts,
    });

    setProductsOnStorage(cartProducts);
  };

  // deletando o produto pelo id
  deleteProduct(id) {
    const { cartProducts } = this.state;
    const itemToRemove = cartProducts.find((product) => product.id === id);
    const index = cartProducts.indexOf(itemToRemove);
    cartProducts.splice(index, 1);

    this.setState({
      cartProducts,
    });
  }

  render() {
    const { cartProducts } = this.state;
    return (
      <div data-testid="shopping-cart-empty-message">
        {cartProducts.length === 0
          ? 'Seu carrinho está vazio'
          : cartProducts.map((element) => (
            <div key={ element.id }>
              <IconButton
                data-testid="remove-product"
                onClick={ () => this.deleteProduct(element.id) }
              >
                <Clear />
              </IconButton>
              <img
                style={ { marginRight: '10px' } }
                src={ element.thumbnail }
                alt={ element.title }
              />
              <span
                style={ { marginRight: '10px' } }
                data-testid="shopping-cart-product-name"
              >
                {element.title}
              </span>
              <span style={ { marginRight: '10px' } }>{element.price}</span>

              <IconButton
                data-testid="product-decrease-quantity"
                onClick={ () => this.setProductQuantity(element.id, 'decrease') }
              >
                <Remove />
              </IconButton>
              <span
                style={ { marginRight: '10px' } }
                data-testid="shopping-cart-product-quantity"
              >
                {element.quantity}
              </span>
              <IconButton
                data-testid="product-increase-quantity"
                onClick={ () => this.setProductQuantity(element.id, 'increase') }
              >
                <Add />
              </IconButton>
            </div>
          ))}
      </div>
    );
  }
}

export default Cart;
