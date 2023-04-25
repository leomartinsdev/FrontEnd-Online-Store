import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Evaluation extends Component {
  render() {
    const { email, text, rating } = this.props;
    return (
      <div>
        <p data-testid="review-card-email">
          {email}
        </p>
        <p data-testid="review-card-rating">
          {rating}
        </p>
        <p data-testid="review-card-evaluation">
          {text}
        </p>
      </div>
    );
  }
}

Evaluation.propTypes = {
  email: PropTypes.string,
  text: PropTypes.string,
  rating: PropTypes.string,
}.isRequired;

export default Evaluation;
