import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import { Email, Password } from './input'
import useAuth from '@/hooks/useAuth';
import Link from '../Button/Link';
import { notify } from '@/services/notifications/ui';
import { useState } from 'react';

const Login =()=>{
    const navigate = useNavigate();
    const { loading, error, user, login, logout } = useAuth();

    // Local state for form inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();  // Prevent page reload
        login({ email, password });
        // notify({ text: `Successfully logged in as ${user?.firstname} ${user?.lastname}`, type: 'success' });
        navigate('/', { state: { user } })
    };
    return(
        <div className="tf-login-form">
            <form className="" onSubmit={handleSubmit} acceptCharset="utf-8" data-mailchimp="true">
                <Email value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                <Password value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                <div>
                    <Link to='#forgotPassword' data-bs-toggle="modal" text='Forgot your password?' />
                </div>
                <div className="bottom">
                    <div className="w-100">
                        <Button type="submit" fill={true} text='Log In'/>
                    </div>
                    <div className="w-100">
                        <Link to='#register' data-bs-toggle="modal" text='New customer? Create your account' icon='icon-arrow1-top-left' />
                    </div>
                </div>
            </form>
        </div>
    )
}
export default Login;