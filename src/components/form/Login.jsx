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
        notify({ text: `Successfully logged in as ${user?.firstname} ${user?.lastname}`, type: 'success' });
        // navigate('/', { state: { user } })
    };
    return(
        <div className="tf-login-form">
            <form className="" onSubmit={handleSubmit} acceptCharset="utf-8" data-mailchimp="true">
                <Email value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                <Password value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                <div className='d-flex justify-content-center align-items-center'>
                    <Link to='#forgotPassword' data-bs-toggle="modal" text='Forgot your password?' />
                    <ul className=" ms-auto tf-social-icon d-flex gap-10">
                        <li>
                            <Link to="#" className="box-icon w_34 round social-google social-line">
                                <img src="https://imagepng.org/wp-content/uploads/2019/08/google-icon-1.png" alt="Google" style={{ width: 16, height: 16 }} />
                            </Link>
                        </li>
                        <li><Link to="#" className="box-icon w_34 round social-facebook social-line"><i className="icon fs-14 icon-fb"></i></Link></li>
                        <li><Link to="#" className="box-icon w_34 round social-twiter social-line"><i className="icon fs-12 icon-Icon-x"></i></Link></li>
                        <li><Link to="#" className="box-icon w_34 round social-instagram social-line"><i className="icon fs-14 icon-instagram"></i></Link></li>
                        <li><Link to="#" className="box-icon w_34 round social-tiktok social-line"><i className="icon fs-14 icon-tiktok"></i></Link></li>
                        <li><Link to="#" className="box-icon w_34 round social-pinterest social-line"><i className="icon fs-14 icon-pinterest-1"></i></Link></li>
                    </ul>
                </div>
                <div className="bottom">
                    <div className="w-100">
                        <Button type="submit" fill={true} text='Log In'/>
                    </div>
                    <div className="w-100">
                        <Link to='/register' text='New customer? Create your account' icon='icon-arrow1-top-left' />
                    </div>
                </div>
            </form>
        </div>
    )
}
export default Login;