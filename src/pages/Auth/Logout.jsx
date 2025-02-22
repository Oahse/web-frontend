import React, { useEffect } from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../../services/auth'; // Assuming the hook is in services/auth.js

const LogoutPage = () => {
    const navigate = useNavigate();
    const { logout, success } = useLogout();

    // Handle the logout process when the component mounts
    useEffect(() => {
        logout(); // Log the user out by clearing local storage
    }, [logout]);

    useEffect(() => {
        // Redirect the user after logout is successful
        if (success) {
            setTimeout(() => {
                navigate('/'); // Redirect to the homepage or login page
            }, 2000); // Add a small delay before redirecting
        }
    }, [success, navigate]);

    return (
        <div className="logout-page mt-4" style={{ textAlign: 'center', paddingTop: '50px' }}>
            <Result
                status="success"
                title="Successfully Logged Out"
                subTitle="You have been successfully logged out. Redirecting you to the login page."
                extra={[
                    <Button type="primary" key="home" onClick={() => navigate('/')}>
                        Go to Home
                    </Button>,
                ]}
            />
        </div>
    );
};

export default LogoutPage;
