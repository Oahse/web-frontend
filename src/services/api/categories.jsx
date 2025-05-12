import fetchData from "./fetch";

// Fetch all categories
export const fetchCategories = async ({ baseurl = 'http://localhost:8001' }) => {
    return fetchData('GET', `${baseurl}/api/v1/categories/`);
};

// Fetch a single category by ID
export const fetchCategory = async ({ baseurl = 'http://localhost:8001', id }) => {
    return fetchData('GET', `${baseurl}/api/v1/categories/${id}`);
};

// Fetch products under a specific category
export const fetchCategoryProducts = async ({ baseurl = 'http://localhost:8001', categoryId }) => {
    return fetchData('GET', `${baseurl}/api/v1/categories/${categoryId}/products`);
};

// Create a new category
export const createCategory = async ({ baseurl = 'http://localhost:8001', categoryData }) => {
    return fetchData('POST', `${baseurl}/api/v1/categories/`, categoryData);
};

// Update a category
export const updateCategory = async ({ baseurl = 'http://localhost:8001', id, categoryData }) => {
    return fetchData('PUT', `${baseurl}/api/v1/categories/${id}`, categoryData);
};

// Delete a category
export const deleteCategory = async ({ baseurl = 'http://localhost:8001', id }) => {
    return fetchData('DELETE', `${baseurl}/api/v1/categories/${id}`);
};
