import { useState, useEffect } from 'react';
import axios from 'axios';

const getProducts = async (url, params) => {
    try {
        const response = await axios.get(url+'api/products/', { params });
        return response.data.data; // Return the data from the response
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error; // Rethrow the error for further handling
    }
};


const useProducts = (url, params) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${url}api/products/`, { params });
                setProducts(response.data.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [url, params]);

    return { products, loading, error };
};

const useTrendingProducts = (url, params) => {
    const [trendingProducts, setTrendingProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrendingProducts = async () => {
            try {
                const response = await axios.get(`${url}api/products/`, { params });
                setTrendingProducts(response.data.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTrendingProducts();
    }, [url, params]);

    return { trendingProducts, loading, error };
};

const useNewArrivalsProducts = (url, params) => {
    const [newArrivals, setNewArrivals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNewArrivals = async () => {
            try {
                const response = await axios.get(`${url}api/products/`, { params });
                setNewArrivals(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchNewArrivals();
    }, [url, params]);

    return { newArrivals, loading, error };
};

const useCategories = (url) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${url}api/categories/`);
                setCategories(response.data.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, [url]);
    
    return { categories, loading, error };
};

export { getProducts,useCategories,useNewArrivalsProducts,useProducts,useTrendingProducts };

