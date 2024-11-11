import { useState, useEffect, useCallback } from 'react';

import axios from 'axios';

// import React, { createContext, useContext } from 'react';
// import { useLogin } from './useLogin';
// import { useLogout } from './useLogout';
// // Other hooks

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const login = useLogin();
//     const logout = useLogout();
//     // Other auth hooks like useVerifyEmail, useRegister, etc.

//     return (
//         <AuthContext.Provider value={{ login, logout /* Add other hooks */ }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => {
//     return useContext(AuthContext);
// };

export const useVerifyEmail = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const verifyEmail = async (email) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.post('/api/verify-email', { email });
            setSuccess(res.data.message);
        } catch (err) {
            setError(err.response.data.message || 'Verification failed');
        } finally {
            setLoading(false);
        }
    };

    return { verifyEmail, loading, error, success };
};


export const useOtpVerification = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const verifyOtp = async (otp) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.post('/api/verify-otp', { otp });
            setSuccess(res.data.message);
        } catch (err) {
            setError(err.response.data.message || 'OTP verification failed');
        } finally {
            setLoading(false);
        }
    };

    return { verifyOtp, loading, error, success };
};


export const usePasswordReset = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const resetPassword = async (email) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.post('/api/password-reset', { email });
            setSuccess(res.data.message);
        } catch (err) {
            setError(err.response.data.message || 'Password reset failed');
        } finally {
            setLoading(false);
        }
    };

    return { resetPassword, loading, error, success };
};

export const useRegister = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    // Flexible register function based on userType
    const register = async (API_URL, params, userType) => {
        setLoading(true);
        setError(null);

        try {
            // Dynamically set the API endpoint based on userType
            const apiUrl = `${API_URL}/api/users/${userType}/`; // 'clients', 'deliverers', etc.
            console.log(API_URL,'========', apiUrl)
            const res = await axios.post(apiUrl, params);
            setUser(res.data.user);
            
            // Store the token and user data in localStorage after successful registration
            if (res.data.access && res.data.refresh && res.data.user) {
                localStorage.setItem('o_t_z_Y_G_access', res.data.access);
                localStorage.setItem('o_t_z_Y_G_refresh', res.data.refresh);
                localStorage.setItem('o_t_z_Y_G_user', JSON.stringify(res.data.user));
            }
        } catch (err) {
            // Handle different types of errors
            const errorMessage = err.response?.data?.message || 'Registration failed';
            setError(errorMessage);
            console.log(err, '============')
        } finally {
            setLoading(false);
        }
    };

    return { register, loading, error, user };
};


export const useLogout = () => {
    const [success, setSuccess] = useState(false);

    const logout = () => {
        // Clear the token from storage
        localStorage.removeItem('o_t_z_Y_G_access');
        localStorage.removeItem('o_t_z_Y_G_refresh');
        localStorage.removeItem('o_t_z_Y_G_user');
        setSuccess(true);
    };

    return { logout, success };
};


export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    const login = useCallback(async (API_URL, email, password) => {
        setLoading(true);
        setError(null);

        try {
            const res = await axios.post(`${API_URL}/api/users/login/`, { email, password });
            setUser(res.data.user);

            // Store the token and user data in localStorage after successful login
            localStorage.setItem('o_t_z_Y_G_access', res.data.access);
            localStorage.setItem('o_t_z_Y_G_refresh', res.data.refresh);
            localStorage.setItem('o_t_z_Y_G_user', JSON.stringify(res.data.user));

            // console.log('Login successful:', res.data);
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Login failed';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    return { login, loading, error, user };
};


export const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Retrieve user data from localStorage
        const storedUser = localStorage.getItem('o_t_z_Y_G_user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser); // Parse the stored user data

                // Check if the user data is valid
                if (parsedUser && parsedUser.id) {
                    setIsLoggedIn(true);
                    setUserDetails(parsedUser);
                } else {
                    setIsLoggedIn(false);
                    setUserDetails(null);
                }
            } catch (error) {
                console.error('Error parsing user data from localStorage', error);
                setIsLoggedIn(false);
                setUserDetails(null);
            }
        } else {
            setIsLoggedIn(false);
            setUserDetails(null);
        }

        setLoading(false); // Set loading state to false after checking localStorage
    }, []); // Empty dependency array ensures it only runs once after mount

    return { isLoggedIn, userDetails, loading };
};

