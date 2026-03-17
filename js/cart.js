/**
 * Cattaleya - Carrito y checkout
 */
const CART_KEY = 'cattaleya_cart';
const USER_KEY = 'cattaleya_user';
const CLABE_DEMO = '0121800012345678901234';

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  if (typeof updateCartBadge === 'function') updateCartBadge();
}

function getCartTotal(cart) {
  return cart.reduce((sum, i) => sum + i.price * (i.qty || 1), 0);
}

function getUser() {
  return JSON.parse(localStorage.getItem(USER_KEY) || 'null');
}

function saveUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}
