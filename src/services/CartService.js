import axios from 'axios';

const BASE_URL_CART = 'http://localhost:8080/store/cart';
const BASE_URL_ITEM = 'http://localhost:8080/store/items';

const cartService = {
  // Create a new cart
  createCart(cart) {
    return axios.post(`${BASE_URL_CART}/create`, cart)
      .then(response => response.data)
      .catch(error => {
        console.error('Error creating cart:', error);
        throw error;
      });
  },

  // Get carts by user ID
  getCartsByUserId(userId) {
    return axios.get(`${BASE_URL_CART}/byUser/${userId}`)
      .then(response => response.data)
      .catch(error => {
        console.error(`Error fetching carts for user ID ${userId}:`, error);
        throw error;
      });
  },

  // Update existing cart
  updateCart(cart) {
    return axios.put(`${BASE_URL_CART}/update`, cart)
      .then(response => response.data)
      .catch(error => {
        console.error('Error updating cart:', error);
        throw error;
      });
  },

  // Delete cart by user ID
  deleteCart(userId) {
    return axios.delete(`${BASE_URL_CART}/delete/${userId}`)
      .then(response => response.data)
      .catch(error => {
        console.error(`Error deleting cart for user ID ${userId}:`, error);
        throw error;
      });
  },

  // Create a new cart item
  createCartItem(cartItem) {
    return axios.post(`${BASE_URL_ITEM}/create`, cartItem)
      .then(response => response.data)
      .catch(error => {
        console.error('Error creating cart item:', error);
        throw error;
      });
  },

  // Get cart item by ID
  getCartItemById(cartItemId) {
    return axios.get(`${BASE_URL_ITEM}/get/${cartItemId}`)
      .then(response => response.data)
      .catch(error => {
        console.error(`Error fetching cart item with ID ${cartItemId}:`, error);
        throw error;
      });
  },

  // Update existing cart item
  updateCartItem(cartItem) {
    return axios.put(`${BASE_URL_ITEM}/update`, cartItem)
      .then(response => response.data)
      .catch(error => {
        console.error('Error updating cart item:', error);
        throw error;
      });
  },

  // Delete cart item by ID
  deleteCartItem(cartItemId) {
    return axios.delete(`${BASE_URL_ITEM}/delete/${cartItemId}`)
      .then(response => response.data)
      .catch(error => {
        console.error(`Error deleting cart item with ID ${cartItemId}:`, error);
        throw error;
      });
  },

  // Get all cart items
  getAllCartItems() {
    return axios.get(`${BASE_URL_ITEM}/getAll`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error fetching all cart items:', error);
        throw error;
      });
  },
};

export default cartService;
