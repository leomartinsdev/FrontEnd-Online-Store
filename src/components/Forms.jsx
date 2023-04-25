import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Evaluation from './Evaluation';
import { setEvaOnStorage, getEvaOnStorage } from '../services/localStorage';

class Forms extends Component {
  state = {
    email: '',
    text: '',
    rating: '',
    buttonClick: false,
    avaliacao: [],
  };

  componentDidMount() {
    const { id } = this.props;
    const arrAvaliacao = getEvaOnStorage(id);
    this.setState({
      avaliacao: arrAvaliacao,
    });
  }

  onInputChange = (event) => {
    const { target } = event;
    const { value, name } = target;

    this.setState({
      [name]: value,
    });
  };

  onClickButton = () => {
    const { email, rating, text, avaliacao } = this.state;
    const valEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const valERegex = valEmail.test(email);
    const tudo = {
      email,
      text,
      rating,
    };
    if (email.length > 0 && rating !== '' && valERegex) {
      console.log('clicou');
      const { id } = this.props;
      const arrAvaliacao = getEvaOnStorage();
      const arrAvaliacaoNew = [...arrAvaliacao, tudo];
      setEvaOnStorage(id, arrAvaliacaoNew);
      this.setState({
        avaliacao: [...avaliacao, tudo],
        email: '',
        rating: '',
        text: '',
        buttonClick: false,
      });
    } else {
      this.setState({
        buttonClick: true,
      });
    }
    console.log(avaliacao);
  };

  render() {
    const { email, text, buttonClick, avaliacao } = this.state;
    return (
      <div>
        <h2>Avaliação do produto</h2>

        <form>
          <label>
            <input
              type="email"
              placeholder="Email"
              data-testid="product-detail-email"
              name="email"
              value={ email }
              onChange={ this.onInputChange }
            />
          </label>
          <label>
            1
            <input
              type="radio"
              data-testid="1-rating"
              value="1"
              name="rating"
              onChange={ this.onInputChange }
            />
          </label>
          <label>
            2
            <input
              type="radio"
              data-testid="2-rating"
              value="2"
              name="rating"
              onChange={ this.onInputChange }
            />
          </label>
          <label>
            3
            <input
              type="radio"
              data-testid="3-rating"
              value="3"
              name="rating"
              onChange={ this.onInputChange }
            />
          </label>
          <label>
            4
            <input
              type="radio"
              data-testid="4-rating"
              value="4"
              name="rating"
              onChange={ this.onInputChange }
            />
          </label>
          <label>
            5
            <input
              type="radio"
              data-testid="5-rating"
              value="5"
              name="rating"
              onChange={ this.onInputChange }
            />
          </label>
          <label>
            <input
              type="text"
              data-testid="product-detail-evaluation"
              name="text"
              value={ text }
              onChange={ this.onInputChange }
            />
          </label>
          <button
            type="button"
            data-testid="submit-review-btn"
            onClick={ this.onClickButton }
          >
            Enviar
          </button>
        </form>
        {/* <div>{validation && <p data-testid="error-msg">Campos inválidos</p>}</div> */}
        {buttonClick ? (
          <p data-testid="error-msg">Campos inválidos</p>
        ) : (
          avaliacao.map((element, index) => (
            <Evaluation
              key={ index }
              email={ element.email }
              text={ element.text }
              rating={ element.rating }
            />
          ))
        )}
      </div>
    );
  }
}

Forms.propTypes = {
  id: PropTypes.string,
}.isRequired;

export default Forms;
