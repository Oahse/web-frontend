
import { useState } from 'react';
import { loginUser } from '@/services/api/users';

const useAuth = () => {
    const [auth, setAuth] = useState({
        loading: false,
        user: null,
        token: localStorage.getItem('b-aB3daE9knLmNr0pe') || null,
        error: null,
    });

    // Login function
    const login = async ({ email, password }) => {
        setAuth(prev => ({ ...prev, loading: true, error: null }));
        try {
            const response = await loginUser({ email, password, token:auth.token });

            if (response?.data?.token) {
                localStorage.setItem('b-aB3daE9knLmNr0pe', response?.data?.token);
                setAuth({
                    loading: false,
                    user: response?.data?.user,
                    token: response?.data?.token,
                    error: null,
                });
            } else {
                setAuth({ loading: false, user: null, token: null, error: 'Login failed' });
            }
            } catch (error) {
            setAuth({ loading: false, user: null, token: null, error: error.message || 'Login error' });
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem('b-aB3daE9knLmNr0pe');
        setAuth({ loading: false, user: null, token: null, error: null });
    };

    return { ...auth, login, logout };
};

export default useAuth;
