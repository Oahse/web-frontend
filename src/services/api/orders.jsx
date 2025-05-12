import fetchData from "./fetch";


// Fetch all orders
export const fetchOrders = async ({ baseurl = 'http://localhost:8001' }) => {
    return fetchData('GET', `${baseurl}/api/v1/orders/`);
};

// Fetch a single order by ID
export const fetchOrder = async ({ baseurl = 'http://localhost:8001', id }) => {
    return fetchData('GET', `${baseurl}/api/v1/orders/${id}`);
};

// Update order status by ID
export const updateOrder = async ({ baseurl = 'http://localhost:8001', id, orderData }) => {
    return fetchData('PUT', `${baseurl}/api/v1/orders/${id}`, orderData);
};


// Delete an order by ID
export const deleteOrder = async ({ baseurl = 'http://localhost:8001', id }) => {
    return fetchData('DELETE', `${baseurl}/api/v1/orders/${id}`);
};

// Fetch all orders for a specific user
export const fetchUserOrders = async ({ baseurl = 'http://localhost:8001', userId }) => {
    return fetchData('GET', `${baseurl}/api/v1/users/${userId}/orders`);
};

// Fetch a single order for a user
export const fetchUserOrder = async ({ baseurl = 'http://localhost:8001', userId, orderId }) => {
    return fetchData('GET', `${baseurl}/api/v1/users/${userId}/orders/${orderId}`);
};

// Update an order for a user
export const updateUserOrder = async ({ baseurl = 'http://localhost:8001', userId, orderId, orderData }) => {
    return fetchData('PUT', `${baseurl}/api/v1/users/${userId}/orders/${orderId}`, orderData);
};

// Create a new order for a user
export const createUserOrder = async ({ baseurl = 'http://localhost:8001', userId, orderData }) => {
    return fetchData('POST', `${baseurl}/api/v1/users/${userId}/orders`, orderData);
};

// Delete a user's order
export const deleteUserOrder = async ({ baseurl = 'http://localhost:8001', userId, orderId }) => {
    return fetchData('DELETE', `${baseurl}/api/v1/users/${userId}/orders/${orderId}`);
};
