import { useState } from 'react';
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

    const register = async (email, password, username) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.post('/api/register', { email, password, username });
            setUser(res.data.user);
        } catch (err) {
            setError(err.response.data.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return { register, loading, error, user };
};


export const useLogout = () => {
    const [success, setSuccess] = useState(false);

    const logout = () => {
        localStorage.removeItem('token'); // Clear the token from storage
        setSuccess(true);
    };

    return { logout, success };
};

export const useLogin = ({API_URL, email, password}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.post(`${API_URL}/api/users/login/`, { email, password });
            console.log(res.data,'==========')
            setUser(res.data.user);
            //localStorage.setItem('token', res.data.access); // Store token in localStorage
        } catch (err) {
            setError(err.response.data.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error, user };
};
