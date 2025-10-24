# API Client Documentation

## Overview

The API client has been consolidated into a single, type-safe interface that mirrors the backend models exactly. All API operations are available through the main `apiClient` instance.

## Usage

### Import the API client

```typescript
import { apiClient } from './apis';
// or
import apiClient from './apis';
```

### Authentication

```typescript
// Login
const loginResponse = await apiClient.login({
  email: 'user@example.com',
  password: 'password123'
});

// Register
const registerResponse = await apiClient.register({
  email: 'user@example.com',
  password: 'password123',
  firstname: 'John',
  lastname: 'Doe',
  phone: '+1234567890'
});

// Logout
await apiClient.logout();
```

### User Management

```typescript
// Get current user
const user = await apiClient.getCurrentUser();

// Update profile
await apiClient.updateProfile({
  firstname: 'Jane',
  phone: '+0987654321'
});

// Change password
await apiClient.changePassword({
  current_password: 'oldpass',
  new_password: 'newpass'
});
```

### Products

```typescript
// Get products with filters
const products = await apiClient.getProducts({
  category_id: 1,
  min_price: 10,
  max_price: 100,
  featured: true,
  page: 1,
  limit: 20
});

// Get single product
const product = await apiClient.getProduct(123);

// Get product with full details
const productWithDetails = await apiClient.getProductWithDetails(123);

// Search products
const searchResults = await apiClient.searchProducts('organic rice');

// Get featured products
const featured = await apiClient.getFeaturedProducts(10);
```

### Cart Operations

```typescript
// Get cart
const cart = await apiClient.getCart();

// Add to cart
await apiClient.addToCart(variantId, quantity);

// Update cart item
await apiClient.updateCartItem(itemId, newQuantity);

// Remove from cart
await apiClient.removeFromCart(itemId);

// Clear cart
await apiClient.clearCart();
```

### Orders

```typescript
// Get orders
const orders = await apiClient.getOrders({
  status: 'pending',
  page: 1,
  limit: 10
});

// Get single order
const order = await apiClient.getOrder(orderId);

// Create order
const newOrder = await apiClient.createOrder({
  shipping_address_id: 1,
  shipping_method_id: 1,
  payment_method_id: 1,
  notes: 'Please handle with care'
});

// Cancel order
await apiClient.cancelOrder(orderId);

// Track order
const tracking = await apiClient.trackOrder(orderId);
```

### Reviews

```typescript
// Get product reviews
const reviews = await apiClient.getProductReviews(productId, page, limit);

// Create review
await apiClient.createReview({
  product_id: 123,
  rating: 5,
  comment: 'Great product!'
});

// Update review
await apiClient.updateReview(reviewId, { rating: 4 });

// Delete review
await apiClient.deleteReview(reviewId);
```

### Wishlists

```typescript
// Get wishlists
const wishlists = await apiClient.getWishlists();

// Get single wishlist
const wishlist = await apiClient.getWishlist(wishlistId);

// Create wishlist
await apiClient.createWishlist({
  name: 'My Favorites',
  is_public: false
});

// Add to wishlist
await apiClient.addToWishlist(wishlistId, productId, quantity);

// Remove from wishlist
await apiClient.removeFromWishlist(wishlistId, itemId);
```

## Type Safety

All methods return properly typed responses that match the backend models exactly:

```typescript
import { User, Product, Order, Cart } from './types';

// All responses are typed
const user: ApiResponse<User> = await apiClient.getCurrentUser();
const products: ApiResponse<PaginatedResponse<Product>> = await apiClient.getProducts();
const cart: ApiResponse<Cart> = await apiClient.getCart();
```

## Error Handling

The client automatically handles:
- Authentication token refresh
- Network errors
- API error responses
- User-friendly error messages via toast notifications

```typescript
try {
  const result = await apiClient.getProducts();
  // Handle success
} catch (error) {
  // Error is automatically logged and shown to user
  // You can handle specific error cases here
}
```

## Legacy API Support

For backwards compatibility, the old API classes are still available:

```typescript
import { API } from './apis';

// Legacy usage
await API.auth.login(credentials);
await API.products.getProducts();
await API.cart.addToCart(variantId, quantity);
```

## Recommended Usage

For new code, use the consolidated `apiClient` directly:

```typescript
import apiClient from './apis';

// Modern usage (recommended)
await apiClient.login(credentials);
await apiClient.getProducts();
await apiClient.addToCart(variantId, quantity);
```