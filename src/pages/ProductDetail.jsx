import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import { getProductsOnStorage, setProductsOnStorage } from '../services/localStorage';

export default class ProductDetail extends Component {
  state = {
    currentProductInfo: '',
  };

  async componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const productInfo = await getProductById(id);
    console.log(productInfo);

    this.setState({
      currentProductInfo: productInfo,
    });
  }

  addProductsToCart = (product) => {
    const oldList = getProductsOnStorage();
    const newList = [...oldList, { ...product, quantity: 1 }]; // recupera a lista antiga, acrescentando nela o novo produto
    setProductsOnStorage(newList);
  };

  render() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    console.log(id);
    const { currentProductInfo } = this.state;
    return (
      <div>
        <h2 data-testid="product-detail-name">{currentProductInfo.title}</h2>
        <img
          data-testid="product-detail-image"
          src={ currentProductInfo.thumbnail }
          alt={ currentProductInfo.name }
        />
        <h3 data-testid="product-detail-price">{ currentProductInfo.price }</h3>
        <button
          data-testid="product-detail-add-to-cart"
          type="button"
          onClick={ () => this.addProductsToCart(currentProductInfo) }
        >
          Adicione ao carrinho
        </button>
        <Link data-testid="shopping-cart-button" to="/cart">
          <button type="button">Carrinho</button>
        </Link>

        <h2>Avaliação do produto</h2>

        <form>
          <label>
            <input
              type="email"
              placeholder="Email"
              data-testid="product-detail-email"
            />
          </label>
          <label>
            1
            <input
              type="radio"
              data-testid="1-rating"
              value="1"
              name="radioButton"
            />
          </label>
          <label>
            2
            <input
              type="radio"
              data-testid="2-rating"
              value="2"
              name="radioButton"
            />
          </label>
          <label>
            3
            <input
              type="radio"
              data-testid="3-rating"
              value="3"
              name="radioButton"
            />
          </label>
          <label>
            4
            <input
              type="radio"
              data-testid="4-rating"
              value="4"
              name="radioButton"
            />
          </label>
          <label>
            5
            <input
              type="radio"
              data-testid="5-rating"
              value="5"
              name="radioButton"
            />
          </label>
          <label>
            <input
              type="text"
              data-testid="product-detail-evaluation"
            />
          </label>
          <button
            type="button"
            data-testid="submit-review-btn"
          >
            Enviar
          </button>
        </form>
      </div>
    );
  }
}

ProductDetail.propTypes = {
  match: PropTypes.any,
  params: PropTypes.any,
  id: PropTypes.any,
}.isRequired;
