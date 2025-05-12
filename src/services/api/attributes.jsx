import fetchData from "./fetch";

// Fetch all attributes
export const fetchAttributes = async ({ baseurl = 'http://localhost:8001' }) => {
    return fetchData('GET', `${baseurl}/api/v1/attributes/`);
};

// Fetch a single attribute by ID
export const fetchAttribute = async ({ baseurl = 'http://localhost:8001', id }) => {
    return fetchData('GET', `${baseurl}/api/v1/attributes/${id}`);
};

// Create a new attribute
export const createAttribute = async ({ baseurl = 'http://localhost:8001', attributeData }) => {
    return fetchData('POST', `${baseurl}/api/v1/attributes/`, attributeData);
};

// Update an attribute
export const updateAttribute = async ({ baseurl = 'http://localhost:8001', id, attributeData }) => {
    return fetchData('PUT', `${baseurl}/api/v1/attributes/${id}`, attributeData);
};

// Delete an attribute
export const deleteAttribute = async ({ baseurl = 'http://localhost:8001', id }) => {
    return fetchData('DELETE', `${baseurl}/api/v1/attributes/${id}`);
};
