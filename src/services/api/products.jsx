import fetchData from "./fetch";

// Fetch all products
export const fetchProducts = async ({ baseurl = 'http://localhost:8001', query }) => {
  return fetchData('GET', `${baseurl}/api/v1/products/query?${query}`);
};

// Fetch a single product by ID
export const fetchProduct = async ({ baseurl = 'http://localhost:8001', id }) => {
    return fetchData('GET', `${baseurl}/api/v1/products/${id}`);
};
// Fetch related products
export const fetchRelatedProducts = async ({ baseurl = 'http://localhost:8001', id  }) => {
    return fetchData('GET', `${baseurl}/api/v1/products/${id}/related`);
};
// Fetch cart related products for a user
export const fetchCartRelatedProducts = async ({ baseurl = 'http://localhost:8001', cartId  }) => {
    return fetchData('GET', `${baseurl}/api/v1/carts/${cartId}/related`);
};


// Update a product by ID
export const updateProduct = async ({ baseurl = 'http://localhost:8001', id, productData }) => {
    return fetchData('PUT', `${baseurl}/api/v1/products/${id}`, productData);
};

// Create a new product
export const createProduct = async ({ baseurl = 'http://localhost:8001', productData }) => {
    return fetchData('POST', `${baseurl}/api/v1/products/`, productData);
};

// Delete a product by ID
export const deleteProduct = async ({ baseurl = 'http://localhost:8001', id }) => {
    return fetchData('DELETE', `${baseurl}/api/v1/products/${id}`);
};

// Fetch all reviews
export const fetchReviews = async ({ baseurl = 'http://localhost:8001' }) => {
    return fetchData('GET', `${baseurl}/api/v1/reviews/`);
};

// Fetch a single review
export const fetchReview = async ({ baseurl = 'http://localhost:8001', id }) => {
    return fetchData('GET', `${baseurl}/api/v1/reviews/${id}`);
};

// Update a review
export const updateReview = async ({ baseurl = 'http://localhost:8001', id, reviewData }) => {
    return fetchData('PUT', `${baseurl}/api/v1/reviews/${id}`, reviewData);
};

// Delete a review
export const deleteReview = async ({ baseurl = 'http://localhost:8001', id }) => {
    return fetchData('DELETE', `${baseurl}/api/v1/reviews/${id}`);
};
// Fetch all reviews for a specific product
export const fetchProductReviews = async ({ baseurl = 'http://localhost:8001', productId }) => {
    return fetchData('GET', `${baseurl}/api/v1/products/${productId}/reviews`);
};

// Fetch a specific review for a product
export const fetchProductReview = async ({ baseurl = 'http://localhost:8001', productId, reviewId }) => {
    return fetchData('GET', `${baseurl}/api/v1/products/${productId}/reviews/${reviewId}`);
};

// Create a new review for a product
export const createProductReview = async ({ baseurl = 'http://localhost:8001', productId, reviewData }) => {
    return fetchData('POST', `${baseurl}/api/v1/products/${productId}/reviews`, reviewData);
};

// Update an existing review for a product
export const updateProductReview = async ({ baseurl = 'http://localhost:8001', productId, reviewId, reviewData }) => {
    return fetchData('PUT', `${baseurl}/api/v1/products/${productId}/reviews/${reviewId}`, reviewData);
};

// Delete a review for a product
export const deleteProductReview = async ({ baseurl = 'http://localhost:8001', productId, reviewId }) => {
    return fetchData('DELETE', `${baseurl}/api/v1/products/${productId}/reviews/${reviewId}`);
};

// Create a PayPal order
export const createPaypalOrder = async ({ baseurl = 'http://localhost:8001', orderData }) => {
  return fetchData('POST', `${baseurl}/api/v1/paypal/create-order`, orderData);
};

// Capture a PayPal order
export const capturePaypalOrder = async ({ baseurl = 'http://localhost:8001', orderId }) => {
  return fetchData('POST', `${baseurl}/api/v1/paypal/capture-order`, { orderId });
};
