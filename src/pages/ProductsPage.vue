<template>
  <div>
    <!-- Navigation Component -->
    <navigation />
    <v-divider></v-divider>

    <!-- Title -->
    <h1>African Art & Crafts</h1>

    <!-- Grid container for displaying products -->
    <v-container>
      <!-- Display Products -->
      <v-row>
        <v-col
          v-for="product in products"
          :key="product.id" 
          cols="12"
          sm="auto"
          md="auto"
        >
          <!-- Updated ProductCard Props to match the new data structure -->
          <product-card
            :productId="product.id"
            :name="product.name"
            :description="product.description"
            :price="product.price"
            :stockQuantity="product.stockQuantity || 'N/A'"  
            :subCategories="product.subCategories" 
            :imagePath="product.imagePath"
            @view-details="handleViewDetails"  
            @add-to-cart="handleAddToCart"  
          />
        </v-col>
      </v-row>

      <!-- Display error message if products fail to load -->
      <v-row v-if="errorMessage" class="error-message">
        <v-col>
          <v-alert type="error">{{ errorMessage }}</v-alert>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";
import productsService from "@/services/productsService";
import CartService from "@/services/CartService";

export default {
  components: {
    ProductCard,
  },
  name: "ProductsPage",
  data() {
    return {
      products: [], // Holds the list of products fetched from the service
      errorMessage: null, // Error message state
    };
  },
  created() {
    this.fetchProducts(); // Fetch products on component creation
  },
  methods: {
    // Fetch all products from the API
    async fetchProducts() {
      try {
        const response = await productsService.getAllProducts();
        this.products = response.data; // Populate the products array
        this.errorMessage = null; // Reset error message on success
      } catch (error) {
        console.error("There was an error fetching the products!", error);
        this.errorMessage = "Failed to load products. Please try again later."; // Set error message on failure
      }
    },
    // Handle the 'View Details' button click
    handleViewDetails(productId) {
      this.$router.push(`/products/${productId}`); // Navigate to product details page
    },
    // Handle the 'Add to Cart' button click
    async handleAddToCart(productId) {
  try {
    // Fetch all products to find the specific product
    const productsResponse = await productsService.getAllProducts();
    const product = productsResponse.find(item => item.id === productId); // Find the specific product

    if (product) {
      console.log(`Found product:`, product); // Log the found product details

      // Check if the cart exists for the user
      const userId = this.$store.state.userId; // Replace with the method to get the current user's ID
      console.log(`Fetching cart for user ID: ${userId}`);
      const cartResponse = await CartService.getCartsByUserId(userId);

      if (cartResponse.length > 0) {
        console.log(`Cart found for user ID ${userId}:`, cartResponse); // Log the existing cart details
        // If a cart exists, add/update the cart item
        const cartId = cartResponse[0].id; // Assuming the user can have only one active cart
        console.log(`Using cart ID: ${cartId}`);

        const existingCartItems = await CartService.getCartItemsByCartId(cartId);
        console.log(`Existing cart items:`, existingCartItems);

        const existingItem = existingCartItems.find(item => item.productId === product.id);
        if (existingItem) {
          // Update the quantity if the item already exists in the cart
          existingItem.quantity += 1; // Increment the quantity
          console.log(`Updating quantity for existing item:`, existingItem);
          await CartService.updateCartItem(existingItem);
          alert(`Updated quantity for ${product.name} in the cart!`);
        } else {
          // Create the cart item object based on the product details
          const cartItem = {
            productId: product.id,
            quantity: 1, // Set the initial quantity
          };
          console.log(`Creating new cart item:`, cartItem);

          // Use the createCartItem service to add the product to the cart
          await CartService.createCartItem(cartItem);
          alert(`Product ${product.name} has been added to the cart!`);
        }
      } else {
        console.log(`No existing cart found for user ID ${userId}. Creating a new cart.`);
        // Create a new cart if it doesn't exist
        const newCart = { userId }; // Adjust as necessary for your cart structure
        const createdCart = await CartService.createCart(newCart); // Create the cart
        console.log(`New cart created:`, createdCart);
        
        const cartItem = {
          productId: product.id,
          quantity: 1, // Set the initial quantity
        };
        console.log(`Adding product to the new cart:`, cartItem);

        // Use the createCartItem service to add the product to the new cart
        await CartService.createCartItem(cartItem);
        alert(`Product ${product.name} has been added to a new cart!`);
      }
    } else {
      console.error(`Product with ID ${productId} not found`);
    }
  } catch (error) {
    console.error("Error adding product to cart:", error);
  }
}


  },
};
</script>

<style scoped>
/* Center the page title and apply custom styling */
h1 {
  text-align: center;
  -webkit-text-fill-color: #C8915F;
  text-shadow: 1px 1px 2px #7e5e41;
}

/* Style for the error message container */
.error-message {
  margin-top: 20px;
}
</style>
