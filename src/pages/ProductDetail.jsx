import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';

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
        <Link data-testid="shopping-cart-button" to="/cart">
          <button type="button">Carrinho</button>
        </Link>
      </div>
    );
  }
}

ProductDetail.propTypes = {
  match: PropTypes.any,
  params: PropTypes.any,
  id: PropTypes.any,
}.isRequired;
