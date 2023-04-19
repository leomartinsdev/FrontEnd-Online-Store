import React, { Component } from 'react';

export class Home extends Component {
  render() {
    return (
      <>
        <input type="text" />
        <div data-testid="home-initial-message">
          {'Digite algum termo de pesquisa ou escolha uma categoria.'}
        </div>
      </>
    );
  }
}

export default Home;
