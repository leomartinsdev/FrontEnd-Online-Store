import React, { Component } from 'react';
import { IconButton } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

class Home extends Component {
  state = {
    categories: [], // salva o array de categorias retornado pela API no state
    queryInput: '', // salva o que é digitado no input
    arrApi: [], // salva o retorno da api
  };

  async componentDidMount() {
    const categoriesFromAPI = await getCategories();
    this.setState({
      categories: categoriesFromAPI,
    });
  }

  onInputChange = (event) => {
    const { target } = event;
    const { value, name } = target;

    this.setState({
      [name]: value,
    });
  };

  onClickButton = async () => {
    const { queryInput } = this.state;

    const apiAlgo = await getProductsFromCategoryAndQuery('', queryInput);
    this.setState({
      queryInput: '',
      arrApi: apiAlgo.results,
    });
  };

  render() {
    const { categories, queryInput, arrApi } = this.state;
    return (
      <>
        <form>
          <label>
            Digite aqui:
            <input
              data-testid="query-input"
              name="queryInput"
              value={ queryInput }
              onChange={ this.onInputChange }
            />
            <button
              data-testid="query-button"
              type="button"
              onClick={ this.onClickButton }
            >
              Pesquisar
            </button>
          </label>
        </form>
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
        {arrApi.length === 0
          ? (<h2>Nenhum produto foi encontrado</h2>)
          : (arrApi.map((element) => (
            <section
              data-testid="product"
              key={ element.id }
            >
              <h4>{element.title}</h4>
              <img
                src={ element.thumbnail }
                alt={ element.name }
              />
              <h4>{element.price}</h4>
            </section>
          )))}
      </>
    );
  }
}

export default Home;
