import fetchData from "./fetch";

// Fetch all stores
export const fetchStores = async ({ baseurl = 'http://localhost:8001' }) => {
    return fetchData('GET', `${baseurl}/api/v1/stores/`);
};

// Fetch a single store by ID
export const fetchStore = async ({ baseurl = 'http://localhost:8001', id }) => {
    return fetchData('GET', `${baseurl}/api/v1/stores/${id}`);
};

// Update a store by ID
export const updateStore = async ({ baseurl = 'http://localhost:8001', id, storeData }) => {
    return fetchData('PUT', `${baseurl}/api/v1/stores/${id}`, storeData);
};

// Delete a store by ID
export const deleteStore = async ({ baseurl = 'http://localhost:8001', id }) => {
    return fetchData('DELETE', `${baseurl}/api/v1/stores/${id}`);
};

// Create a new store
export const createStore = async ({ baseurl = 'http://localhost:8001', storeData }) => {
    return fetchData('POST', `${baseurl}/api/v1/stores/`, storeData);
};
