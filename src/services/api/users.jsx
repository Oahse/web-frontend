import fetchData from "./fetch";

// Fetch all users
export const fetchUsers = async ({ baseurl = 'http://localhost:8001' }) => {
    return fetchData('GET', `${baseurl}/api/v1/users/`);
};

// Fetch a single user by ID
export const fetchUser = async ({ baseurl = 'http://localhost:8001', id }) => {
    return fetchData('GET', `${baseurl}/api/v1/users/${id}`);
};

// Update a user by ID
export const updateUser = async ({ baseurl = 'http://localhost:8001', id, userData }) => {
    return fetchData('PUT', `${baseurl}/api/v1/users/${id}`, userData);
};

// Create a new user (usually admin)
export const createUser = async ({ baseurl = 'http://localhost:8001', userData }) => {
    return fetchData('POST', `${baseurl}/api/v1/users/`, userData);
};

// Delete a user by ID
export const deleteUser = async ({ baseurl = 'http://localhost:8001', id }) => {
    return fetchData('DELETE', `${baseurl}/api/v1/users/${id}`);
};

// User login
export const loginUser = async ({ baseurl = 'http://localhost:8001', email, password, token }) => {
    return fetchData('POST', `${baseurl}/api/v1/auth/login`, { email, password, token }, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

// User register
export const registerUser = async ({ baseurl = 'http://localhost:8001', userData }) => {
    return fetchData('POST', `${baseurl}/api/v1/auth/register`, userData);
};

// Request password reset (forgot password)
export const requestPasswordReset = async ({ baseurl = 'http://localhost:8001', email }) => {
    return fetchData('POST', `${baseurl}/api/v1/auth/forgot-password`, { email });
};

// Reset password
export const resetPassword = async ({ baseurl = 'http://localhost:8001', token, newPassword }) => {
    return fetchData('POST', `${baseurl}/api/v1/auth/reset-password/${token}`, { password: newPassword });
};

// Refresh token (if using JWT refresh)
export const refreshToken = async ({ baseurl = 'http://localhost:8001', refreshToken }) => {
    return fetchData('POST', `${baseurl}/api/v1/auth/refresh`, { refreshToken });
};

// Logout (if applicable server-side)
export const logoutUser = async ({ baseurl = 'http://localhost:8001' }) => {
    return fetchData('POST', `${baseurl}/api/v1/auth/logout`);
};
