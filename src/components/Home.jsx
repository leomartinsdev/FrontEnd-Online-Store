import React, { Component } from 'react';
import { IconButton } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <>
        <input type="text" />
        <Link to="/cart">
          <IconButton data-testid="shopping-cart-button">
            <ShoppingCart />
          </IconButton>
        </Link>
        <div data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </div>

      </>
    );
  }
}

export default Home;
