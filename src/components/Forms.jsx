import React, { Component } from 'react';
import Evaluation from './Evaluation';
import { setEvasOnStorage, getEvasOnStorage } from '../services/localStorage';

class Forms extends Component {
  state = {
    email: '',
    textEvaluation: '',
    radioButton: '',
    buttonClick: false,
    avaliacao: [],

  };

  onInputChange = (event) => {
    const { target } = event;
    const { value, name } = target;

    this.setState({
      [name]: value,
    });
  };

  onClickButton = () => {
    const { email, radioButton, textEvaluation, avaliacao } = this.state;
    const valEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const valERegex = valEmail.test(email);
    const tudo = {
      email,
      text: textEvaluation,
      rating: radioButton,
    };
    if (email.length > 0 && radioButton !== '' && valERegex) {
      console.log('clicou');
      this.setState({
        avaliacao: [...avaliacao, tudo],
        email: '',
        radioButton: '',
        textEvaluation: '',
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
    const { email, textEvaluation, buttonClick, avaliacao } = this.state;
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
              name="radioButton"
              onChange={ this.onInputChange }
            />
          </label>
          <label>
            2
            <input
              type="radio"
              data-testid="2-rating"
              value="2"
              name="radioButton"
              onChange={ this.onInputChange }
            />
          </label>
          <label>
            3
            <input
              type="radio"
              data-testid="3-rating"
              value="3"
              name="radioButton"
              onChange={ this.onInputChange }
            />
          </label>
          <label>
            4
            <input
              type="radio"
              data-testid="4-rating"
              value="4"
              name="radioButton"
              onChange={ this.onInputChange }
            />
          </label>
          <label>
            5
            <input
              type="radio"
              data-testid="5-rating"
              value="5"
              name="radioButton"
              onChange={ this.onInputChange }
            />
          </label>
          <label>
            <input
              type="text"
              data-testid="product-detail-evaluation"
              name="textEvaluation"
              value={ textEvaluation }
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
              textEvaluation={ element.textEvaluation }
              radioButton={ element.radioButton }
            />
          ))
        )}
      </div>
    );
  }
}

export default Forms;
