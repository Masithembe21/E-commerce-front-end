<template>
  <div>
    <h1>Your Shopping Cart</h1>
    <div v-if="cartItems.length === 0" class="empty-cart">
      <p>Your cart is empty.</p>
    </div>
    <div v-else>
      <div v-for="item in cartItems" :key="item.id" class="product-container">
        <img :src="item.image" alt="Product Image" class="product-image" />
        <div class="details-wrap">
          <h3>{{ item.name }}</h3>
          <p>Price: {{ item.price }}</p>
        </div>
        <button class="remove-button" @click="removeCartItem(item.id)">Remove</button>
      </div>
      <button class="checkout-button" @click="checkout">Checkout</button>
    </div>
  </div>
</template>

<script>
import CartService from '@/services/CartService'; // Adjust the path as needed

export default {
  name: "ShoppingCartPage",
  data() {
    return {
      cartItems: [],
    };
  },
  created() {
    this.fetchCartItems();
  },
  methods: {
    async fetchCartItems() {
      try {
        const response = await CartService.getAllCartItems(); // Fetch all cart items
        this.cartItems = response; // Directly assign the response data
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    },
    async removeCartItem(cartItemId) {
      try {
        await CartService.deleteCartItem(cartItemId); // Delete the cart item
        this.cartItems = this.cartItems.filter(item => item.id !== cartItemId); // Update the cart items list
      } catch (error) {
        console.error("Error removing cart item:", error);
      }
    },
    checkout() {
      // Implement checkout logic
      alert('Proceeding to checkout!');
    },
  },
};
</script>


<style scoped>
h1 {
  text-align: center;
  text-shadow: 1px 1px 2px black;
  border-bottom: 5px solid #162836;
  margin: 0;
  margin-top: 16px;
  padding: 16px;
  background-color: #ad815c;
}

.product-container {
  align-content: center;
  border-bottom: 10px solid #df1111;
  display: flex;
  padding: 16px;
  width: 100%;
}

.product-image {
  flex: 1;
  height: 100px;
  max-width: 100px;
}

.details-wrap {
  padding: 0 16px;
  flex: 3;
}

.remove-button {
  flex: 1;
  margin: auto;
  background-color: black;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  outline: 0;
  padding: 16px;
}

.checkout-button {
  width: 100%;
  background-color: green;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  outline: 0;
  padding: 16px;
  margin-top: 16px;
}

.empty-cart {
  text-align: center;
  margin-top: 20px;
}
</style>
