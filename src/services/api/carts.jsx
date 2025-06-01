import fetchData from "./fetch";

// --- CART APIs ---

// Fetch all cart items
export const fetchCartItems = async ({ baseurl = 'http://localhost:8001',userId }) => {
    return fetchData('GET', `${baseurl}/api/v1/cart/${userId}`);
};
// Fetch all carts (admin or general use)
export const fetchAllCarts = async ({ baseurl = 'http://localhost:8001' }) => {
    return fetchData('GET', `${baseurl}/api/v1/carts/`);
};

// Fetch a cart for a specific user by user ID
export const fetchCartByUser = async ({ baseurl = 'http://localhost:8001', userId }) => {
    return fetchData('GET', `${baseurl}/api/v1/carts/${userId}`);
};
// Fetch a single cart item by ID
export const fetchCartItem = async ({ baseurl = 'http://localhost:8001', id,userId }) => {
    return fetchData('GET', `${baseurl}/api/v1/cart/${userId}/${id}`);
};

// Add item to cart
export const addToCart = async ({ baseurl = 'http://localhost:8001', itemData,userId }) => {
    return fetchData('POST', `${baseurl}/api/v1/cart/${userId}`, itemData);
};

// Update cart item by ID
export const updateCartItem = async ({ baseurl = 'http://localhost:8001', id, itemData,userId }) => {
    return fetchData('PUT', `${baseurl}/api/v1/cart/${userId}/${id}`, itemData);
};

// Remove cart item by ID
export const deleteCartItem = async ({ baseurl = 'http://localhost:8001', id,userId }) => {
    return fetchData('DELETE', `${baseurl}/api/v1/cart/${userId}/${id}`);
};

// --- WISHLIST APIs ---

// Fetch all wishlist items
export const fetchWishlistItems = async ({ baseurl = 'http://localhost:8001',userId }) => {
    return fetchData('GET', `${baseurl}/api/v1/wishlist/${userId}`);
};
// Fetch all carts (admin or general use)
export const fetchAllWishlist = async ({ baseurl = 'http://localhost:8001' }) => {
    return fetchData('GET', `${baseurl}/api/v1/wishlist/`);
};

// Fetch a cart for a specific user by user ID
export const fetchWishlistByUser = async ({ baseurl = 'http://localhost:8001', userId }) => {
    return fetchData('GET', `${baseurl}/api/v1/wishlist/${userId}`);
};
// Fetch a single wishlist item by ID
export const fetchWishlistItem = async ({ baseurl = 'http://localhost:8001', id,userId }) => {
    return fetchData('GET', `${baseurl}/api/v1/wishlist/${userId}/${id}`);
};

// Add item to wishlist
export const addToWishlist = async ({ baseurl = 'http://localhost:8001', itemData,userId }) => {
    return fetchData('POST', `${baseurl}/api/v1/wishlist/${userId}/`, itemData);
};

// Update wishlist item by ID
export const updateWishlistItem = async ({ baseurl = 'http://localhost:8001', id, itemData,userId }) => {
    return fetchData('PUT', `${baseurl}/api/v1/wishlist/${userId}/${id}`, itemData);
};

// Remove wishlist item by ID
export const deleteWishlistItem = async ({ baseurl = 'http://localhost:8001', id,userId }) => {
    return fetchData('DELETE', `${baseurl}/api/v1/wishlist/${userId}/${id}`);
};
