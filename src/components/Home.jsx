import React, { Component } from 'react';
import { IconButton } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';

class Home extends Component {
  state = {
    categories: [], // salva o array de categorias retornado pela API no state
  };

  async componentDidMount() {
    const categoriesFromAPI = await getCategories();
    this.setState({
      categories: categoriesFromAPI,
    });
  }

  render() {
    const { categories } = this.state;
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
        <nav>
          <p>Categorias</p>
          <ul>
            {
              categories.map((category) => (
                <li key={ category.id }>
                  <label
                    htmlFor={ category.id }
                    data-testid="category"
                  >
                    <input
                      type="radio"
                      name="category"
                      id={ category.id }
                      value={ category.id }
                    />
                    { category.name }
                  </label>
                </li>
              ))
            }
          </ul>
        </nav>
        <form>
          <label>
            Digite aqui:
            <input
              data-testid="query-input"
              name="queryInput"
            />
            <button
              data-testid="query-button"
              type="button"
            >
              Pesquisar
            </button>
          </label>
        </form>
      </>
    );
  }
}

export default Home;
