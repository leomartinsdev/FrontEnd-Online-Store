export function setProductsOnStorage(cartProducts) {
  localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
}

export function getProductsOnStorage() {
  const cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
  if (cartProducts) {
    return cartProducts;
  }
  return [];
}

export function setEvaOnStorage(avaliacao) {
  localStorage.setItem('evaluation', JSON.stringify(avaliacao));
}

export function getEvaOnStorage() {
  const avaliacao = JSON.parse(localStorage.getItem('evaluation'));
  if (avaliacao) {
    return avaliacao;
  }
  return [];
}
