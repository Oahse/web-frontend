import fetchData from "./fetch";

// Fetch all FAQs
export const fetchFaqs = async ({ baseurl = 'http://localhost:8001' }) => {
    return fetchData('GET', `${baseurl}/api/v1/faqs/`);
};

// Fetch a single FAQ by ID
export const fetchFaq = async ({ baseurl = 'http://localhost:8001', id }) => {
    return fetchData('GET', `${baseurl}/api/v1/faqs/${id}`);
};

// Update an FAQ by ID
export const updateFaq = async ({ baseurl = 'http://localhost:8001', id, faqData }) => {
    return fetchData('PUT', `${baseurl}/api/v1/faqs/${id}`, faqData);
};

// Delete an FAQ by ID
export const deleteFaq = async ({ baseurl = 'http://localhost:8001', id }) => {
    return fetchData('DELETE', `${baseurl}/api/v1/faqs/${id}`);
};

// Create a new FAQ
export const createFaq = async ({ baseurl = 'http://localhost:8001', faqData }) => {
    return fetchData('POST', `${baseurl}/api/v1/faqs/`, faqData);
};
