/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import axios from 'axios';

// Helper function to fetch data
const fetchData = async (url, params) => {
    try {
        const response = await axios.get(url, { params });
        
        return response.data.data;  // Assumes the data you need is inside `data.data`
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;  // Rethrow for handling in the hook
    }
};

// Hook to get products with customizable parameters
const useProducts = (url, params) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Serialize params for proper dependency tracking
    const paramsString = JSON.stringify(params);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchData(`${url}api/products/`, params);
                setProducts(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [url, paramsString]);  // Use serialized params for deep comparison

    return { products, loading, error };
};

// Hook to get trending products
const useTrendingProducts = (url, params) => {
    const [trendingProducts, setTrendingProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Serialize params for proper dependency tracking
    const paramsString = JSON.stringify(params);

    useEffect(() => {
        const fetchTrendingProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchData(`${url}api/products/`, params);
                setTrendingProducts(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTrendingProducts();
    }, [url, paramsString]); // Use serialized params for deep comparison

    return { trendingProducts, loading, error };
};

// Hook to get new arrivals products
const useNewArrivalsProducts = (url, params) => {
    const [newArrivals, setNewArrivals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Serialize params for proper dependency tracking
    const paramsString = JSON.stringify(params);

    useEffect(() => {
        const fetchNewArrivals = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchData(`${url}api/products/`, params);
                setNewArrivals(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchNewArrivals();
    }, [url, paramsString]); // Use serialized params for deep comparison

    return { newArrivals, loading, error };
};

// Hook to get categories
const getCategories = async (url, params) => {
    return fetchData(`${url}api/categories/`, params);
};
const useCategories = (url) => {
    const [categories, setCategories] = useState(
        [{ id: 'e420b1ab-a8c7-4cc9-ada3-8d2ac918ced5', label: 'All Categories' },
            {id:'e420b1ab-a8c7-4cc9-ada3-8d2ac918ced4',label:'Electrical'},
            {id:'e420b1ab-a8c7-4cc9-ada3-8d2ac918ced3',label:'Mechanical'},
            {id:'e420b1ab-a8c7-4cc9-ada3-8d2ac918ced2',label:'Industrial'},{id:'e420b1ab-a8c7-4cc9-ada3-8d2ac918ced1',label:'Construction'},
            {id:'e420b1ab-a8c7-4cc9-ada3-8d2ac918ced6',label:'Electronics'},{id:'e420b1ab-a8c7-4cc9-ada3-8d2ac918ced0',label:'Chemical'},
            {id:'e420b1ab-a8c7-4cc9-ada3-8d2ac918ced7',label:'Energy'},{id:'e420b1ab-a8c7-4cc9-ada3-8d2ac918ced8',label:'Aerospace'},
            {id:'e420b1ab-a8c7-4cc9-ada3-8d2ac918cee5',label:'Automotive'}
        ]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        const fetchCategories = async () => {
            
            try {
                const data = await fetchData(`${url}api/categories/`);
                setCategories(data);
            } catch (err) {
                setError(err);
                console.log(err,'=====')
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, [url]); // Only depend on url as params is not used

    return { categories, loading, error };
};

// Utility function to fetch products directly
const getProducts = async (url, params) => {
    return fetchData(`${url}api/products/`, params);
};

export { getProducts,getCategories, useCategories, useNewArrivalsProducts, useProducts, useTrendingProducts };
