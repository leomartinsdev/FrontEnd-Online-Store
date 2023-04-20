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
