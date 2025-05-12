import fetchData from "./fetch";

// Fetch all coupons
export const fetchCoupons = async ({ baseurl = 'http://localhost:8001' }) => {
    return fetchData('GET', `${baseurl}/api/v1/coupons/`);
};

// Fetch a single coupon
export const fetchCoupon = async ({ baseurl = 'http://localhost:8001', id }) => {
    return fetchData('GET', `${baseurl}/api/v1/coupons/${id}`);
};

// Create a new coupon
export const createCoupon = async ({ baseurl = 'http://localhost:8001', couponData }) => {
    return fetchData('POST', `${baseurl}/api/v1/coupons/`, couponData);
};

// Update coupon
export const updateCoupon = async ({ baseurl = 'http://localhost:8001', id, couponData }) => {
    return fetchData('PUT', `${baseurl}/api/v1/coupons/${id}`, couponData);
};

// Delete coupon
export const deleteCoupon = async ({ baseurl = 'http://localhost:8001', id }) => {
    return fetchData('DELETE', `${baseurl}/api/v1/coupons/${id}`);
};
