import React, { Component } from 'react';
import { IconButton } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import { getProductsOnStorage, setProductsOnStorage } from '../services/localStorage';

class Home extends Component {
  state = {
    categories: [], // salva o array de categorias retornado pela API no state
    queryInput: '', // salva o que é digitado no input
    arrApi: [], // salva o retorno da api
    // radioInput: [], // salva os radio buttons selecionados
    arrApiRadio: [], // salva o retorno da api quando utilizado o radio button
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

  handleRadioButton = async ({ target }) => {
    const productId = target.value;
    const runRadioBtnApi = await getProductsFromCategoryAndQuery(productId, '');
    this.setState({
      arrApiRadio: runRadioBtnApi.results,
      arrApi: [],
    });
  };

  onClickButton = async () => {
    const { queryInput } = this.state;

    const apiAlgo = await getProductsFromCategoryAndQuery('', queryInput);
    this.setState({
      queryInput: '',
      arrApiRadio: [],
      arrApi: apiAlgo.results,
    });
  };

  addProductsToCart = (product) => {
    const oldList = getProductsOnStorage();
    const newList = [...oldList, { ...product, quantity: 1 }];
    setProductsOnStorage(newList);
  };

  render() {
    const { categories, queryInput, arrApi, arrApiRadio } = this.state;
    return (
      <>
        <form>
          <label>
            <input
              data-testid="query-input"
              name="queryInput"
              value={ queryInput }
              onChange={ this.onInputChange }
              placeholder="Digite aqui"
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
                      onClick={ this.handleRadioButton }
                    />
                    { category.name }
                  </label>
                </li>
              ))
            }
          </ul>
        </nav>
        {arrApi.length === 0 && arrApiRadio.length === 0
          ? (<h2>Nenhum produto foi encontrado</h2>)
          : (arrApi.map((element) => (
            <section
              data-testid="product"
              key={ element.id }
            >
              <Link
                data-testid="product-detail-link"
                key={ element.id }
                to={ `/productDetail/${element.id}` }
              >
                <h4>{element.title}</h4>
                <img
                  src={ element.thumbnail }
                  alt={ element.name }
                />
                <h4>{element.price}</h4>
                <button
                  data-testid="product-add-to-cart"
                  type="button"
                  onClick={ () => this.addProductsToCart(element) }
                >
                  Adicione ao carrinho
                </button>
              </Link>
            </section>
          )))}
        {arrApiRadio.length > 0
          && (arrApiRadio.map((elemento) => (
            <section
              data-testid="product"
              key={ elemento.id }
            >
              <Link
                data-testid="product-detail-link"
                key={ elemento.id }
                to={ `/productDetail/${elemento.id}` }
              >
                <h4>{elemento.title}</h4>
                <img
                  src={ elemento.thumbnail }
                  alt={ elemento.name }
                />
                <h4>{elemento.price}</h4>
              </Link>
              <button
                data-testid="product-add-to-cart"
                type="button"
                onClick={ () => this.addProductsToCart(elemento) }
              >
                Adicione ao carrinho
              </button>
            </section>
          )))}
      </>
    );
  }
}

export default Home;
