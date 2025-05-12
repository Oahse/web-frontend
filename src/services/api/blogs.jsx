import fetchData from "./fetch";

// Fetch all blogs
export const fetchBlogs = async ({ baseurl = 'http://localhost:8001' }) => {
    return fetchData('GET', `${baseurl}/api/v1/blogs/`);
};

// Fetch a single blog by ID
export const fetchBlog = async ({ baseurl = 'http://localhost:8001', id }) => {
    return fetchData('GET', `${baseurl}/api/v1/blogs/${id}`);
};

// Create a new blog
export const createBlog = async ({ baseurl = 'http://localhost:8001', blogData }) => {
    return fetchData('POST', `${baseurl}/api/v1/blogs/`, blogData);
};

// Update a blog by ID
export const updateBlog = async ({ baseurl = 'http://localhost:8001', id, blogData }) => {
    return fetchData('PUT', `${baseurl}/api/v1/blogs/${id}`, blogData);
};

// Delete a blog by ID
export const deleteBlog = async ({ baseurl = 'http://localhost:8001', id }) => {
    return fetchData('DELETE', `${baseurl}/api/v1/blogs/${id}`);
};
