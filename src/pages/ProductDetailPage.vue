<template>
  <div>
    <navigation />
    <v-divider></v-divider>
    <h1>Details</h1>
    <div class="img-wrap">
      <!-- Display product image using the imagePath property -->
      <img :src="product.imagePath" alt="Product Image" v-if="product" />
    </div>
    <div class="product-details" v-if="product">
      <!-- Display product name -->
      <h1>{{ product.name }}</h1>
      <div class="price-wrap">
        <!-- Display product price -->
        <h3 class="price">R{{ product.price }}</h3>
      </div>
      <div class="product-description">
        <!-- Display product Details-->
        <h3 class="description">{{ product.description }}</h3>
      </div>
      <div class="button-group">
        <!-- Button to add product to the cart -->
        <button class="add-to-cart" @click="addToCart">Add to cart</button>

        <button class="add-to-wish" @click="addToWish">
          <img :src="heart" alt="Heart Icon" />
        </button>
      </div>
    </div>
    <div v-else>
      <!-- Display a loading message or placeholder if product is not yet loaded -->
      <p>Loading product details...</p>
    </div>
  </div>
</template>

<script>
import productsService from "@/services/productsService"; // Import the products service
import heart from "@/assets/heart.svg";
import CartService from "@/services/CartService";

export default {
  name: "ProductDetailPage",
  data() {
    return {
      product: null, // Initialize product as null to handle loading state
      heart,
    };
  },
  methods: {
    // Method to fetch product details from the backend using the productId from the route
    async fetchProductDetails() {
      const productId = this.$route.params.productId; // Get productId from route params
      try {
        const response = await productsService.getProductById(productId); // Fetch product details
        this.product = response.data; // Set the product data from the response
      } catch (error) {
        console.error("Failed to fetch product details:", error); // Handle any errors
      }
    },
    // Method to handle adding the product to the cart
    async addToCart() {
      try {
        await CartService.createCart(this.product.id); 
        console.log(this.product);// Call the cart service to add the product
        alert(`${this.product.name} added to cart!`); // Notify the user
      } catch (error) {
        alert("Failed to add to cart. Please try again."); // Handle error
      }
    },
    // Add to wishlist method
    addToWish() {
      alert(`${this.product.name} added to Wish List`);
    },
  },
  mounted() {
    this.fetchProductDetails(); // Fetch product details when the component is mounted
  },
};
</script>

<style scoped>
/* Styling for the main product title */
h1 {
  text-align: center;
  text-shadow: 1px 1px 2px black;
  margin: 0;
  margin-top: 16px;
  padding: 16px;
}

/* Container for the image */
.img-wrap {
  margin-top: 32px;
  text-align: center;
}

/* Image styling */
.img-wrap img {
  width: 400px;
}

/* Container for product details */
.product-details {
  padding: 16px;
  position: relative;
}

.product-description {
  padding-right: 30%;
  padding-left: 30%;
}

/* Center-align the price */
.price-wrap {
  text-align: center;
}

/* Styling for the price text */
.price {
  display: block;
  margin-top: 16px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
}

/* Styling for the "Add to Cart" button */
.add-to-cart {
  width: 75%;
  background-color: black;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  padding: 16px;
}

/* Styling for the "Add to Wish List" button */
.add-to-wish {
  width: 20%;
  background-color: rgb(13, 29, 252);
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  padding: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Button hover effect */
.add-to-cart:hover {
  background-color: #333;
}

.add-to-wish:hover {
  background-color: #337ee0;
}
</style>
