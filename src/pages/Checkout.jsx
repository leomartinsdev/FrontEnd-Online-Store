import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductsOnStorage } from '../services/localStorage';

export default class Checkout extends Component {
  state = {
    cartProducts: [],
    fullname: '',
    email: '',
    cpf: '',
    phone: '',
    cep: '',
    address: '',
    payment: '',
    buttonClick: false,
  };

  componentDidMount() {
    const cartProductsFromStorage = getProductsOnStorage();
    this.setState({
      cartProducts: cartProductsFromStorage,
    });
  }

  onClickButton = () => {
    const { fullname, email, cpf, phone, cep, address, payment } = this.state;
    const { history } = this.props;
    const numberMin = 0;
    const valF = fullname.length > numberMin;
    const valE = email.length > numberMin;
    const valC = cpf.length > numberMin;
    const valPhone = phone.length > numberMin;
    const valCep = cep.length > numberMin;
    const valA = address.length > numberMin;
    const valP = payment.length > numberMin;
    if (valF && valE && valC && valPhone && valCep && valA && valP) {
      this.setState({
        buttonClick: false,
        cartProducts: localStorage.removeItem('cartProducts') });
      history.push('/');
      console.log('if');
    } else {
      this.setState({ buttonClick: true });
      console.log('else');
    }
  };

  onInputChange = (event) => {
    const { target } = event;
    const { value, name } = target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    const { cartProducts,
      fullname,
      email,
      cpf,
      phone,
      cep,
      address,
      buttonClick,
    } = this.state;
    return (
      <div>
        {cartProducts.map((element) => (
          <div key={ element.id }>
            {element.title}
          </div>
        ))}
        <form>
          <label>
            <input
              type="text"
              placeholder="Nome Completo"
              data-testid="checkout-fullname"
              name="fullname"
              value={ fullname }
              onChange={ this.onInputChange }
            />
          </label>
          <label>
            <input
              type="email"
              placeholder="Email"
              data-testid="checkout-email"
              name="email"
              value={ email }
              onChange={ this.onInputChange }
            />
          </label>
          <label>
            <input
              type="text"
              placeholder="CPF"
              data-testid="checkout-cpf"
              name="cpf"
              value={ cpf }
              onChange={ this.onInputChange }
            />
          </label>
          <label>
            <input
              type="text"
              placeholder="Telefone"
              data-testid="checkout-phone"
              name="phone"
              value={ phone }
              onChange={ this.onInputChange }
            />
          </label>
          <label>
            <input
              type="text"
              placeholder="CEP"
              data-testid="checkout-cep"
              name="cep"
              value={ cep }
              onChange={ this.onInputChange }
            />
          </label>
          <label>
            <input
              type="text"
              placeholder="Endereço"
              data-testid="checkout-address"
              name="address"
              value={ address }
              onChange={ this.onInputChange }
            />
          </label>
          <label>
            Boleto
            <input
              type="radio"
              data-testid="ticket-payment"
              name="payment"
              value="1"
              onChange={ this.onInputChange }
            />
          </label>
          <label>
            Visa
            <input
              type="radio"
              data-testid="visa-payment"
              name="payment"
              value="1"
              onChange={ this.onInputChange }
            />
          </label>
          <label>
            Master
            <input
              type="radio"
              data-testid="master-payment"
              name="payment"
              value="1"
              onChange={ this.onInputChange }
            />
          </label>
          <label>
            Elo
            <input
              type="radio"
              data-testid="elo-payment"
              name="payment"
              value="1"
              onChange={ this.onInputChange }
            />
          </label>
          <button
            type="button"
            data-testid="checkout-btn"
            onClick={ this.onClickButton }
          >
            Finalizar compra
          </button>
        </form>
        {buttonClick && (
          <p data-testid="error-msg">Campos inválidos</p>
        )}
      </div>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.func.isRequired,
};
