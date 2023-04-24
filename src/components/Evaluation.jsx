import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Evaluation extends Component {
  render() {
    const { email, textEvaluation, radioButton } = this.props;
    return (
      <div>
        <p data-testid="review-card-email">
          {email}
        </p>
        <p data-testid="review-card-rating">
          {radioButton}
        </p>
        <p data-testid="review-card-evaluation">
          {textEvaluation}
        </p>
      </div>
    );
  }
}

Evaluation.propTypes = {
  email: PropTypes.string,
  textEvaluation: PropTypes.string,
  radioButton: PropTypes.string,
}.isRequired;

export default Evaluation;
