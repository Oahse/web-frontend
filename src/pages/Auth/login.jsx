import useDeviceType from '@/hooks/useDeviceType'
import { useState } from "react";
import Loader from "@/components/loader";
import Header from "@/components/toolbar/header";
import TopHeader from '@/components/toolbar/topHeader'
import Footer from "@/components/footer";
import { Link, useNavigate } from 'react-router-dom';
import Extras from '@/components/extra';
import useAuth from '@/hooks/useAuth';
import BreadCrumbs from '@/components/breadcrumbs';
import { ToastContainer, notify } from '@/services/notifications/ui';

const Login = ({categories=[]}) => {
    const navigate = useNavigate();
    const { loading, error, user, login, logout } = useAuth();

    // Local state for form inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();  // Prevent page reload
        login({ email, password });
        if (error){
            notify({ text: `${error}`, type: 'error' });
        }else{
            notify({ text: `Successfully logged in as ${user?.firstname} ${user?.lastname}`, type: 'success' });
        }
        
        // navigate('/', { state: { user } })
    };

    return (
        <div className="preload-wrapper color-primary-8 color-main-text-2">
        
        {loading && <Loader />}

        <div id="wrapper">
            <TopHeader />
            <Header />
            <div className="tf-page-title style-2">
            <div className="container-full">
                <div className="heading text-center">Login</div>
                <BreadCrumbs
                            dir='center'
                            links={[
                                { name: 'Home', href: '/' },
                                { name: 'Login' }
                            ]}
                            // prev={{ href: `/products/${product?.id}`, tooltip: 'Previous Product' }}
                            // next={{ href: `/products/${product?.id}`, tooltip: 'Next Product' }}
                            // back={{ href: '/products', tooltip: 'Back to Products' }}
                        />
                
            </div>
            </div>
            <section className="flat-spacing-10">
            <div className="container">
                <div className="form-register-wrap">
                <div className="flat-title align-items-start gap-0 mb_30 px-0">
                    <h5 className="mb_18">Login</h5>
                    {error && <p className="text-danger">{error}</p>}
                </div>
                <div>
                    <form id="register-form" onSubmit={handleSubmit} acceptCharset="utf-8" data-mailchimp="true">
                    <div className="tf-field style-1 mb_15">
                        <input
                            className="tf-field-input tf-input"
                            placeholder=" "
                            type="email"
                            id="property3"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label className="tf-field-label fw-4 text_black-2" htmlFor="property3">Email *</label>
                    </div>
                    <div className="tf-field style-1 mb_30">
                        <input
                        className="tf-field-input tf-input"
                        placeholder=" "
                        type="password"
                        id="property4"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                        <label className="tf-field-label fw-4 text_black-2" htmlFor="property4">Password *</label>
                    </div>
                    <div className="mb_20">
                        <button
                        type="submit"
                        className="tf-btn w-100 radius-3 btn-fill animate-hover-btn justify-content-center"
                        disabled={loading}
                        >
                        Login
                        </button>
                    </div>
                    <div className="text-center">
                        <Link to="/register" className="tf-btn btn-line">
                        Do not have an account? Sign Up here
                        <i className="icon icon-arrow1-top-left"></i>
                        </Link>
                    </div>
                    </form>
                </div>
                </div>
            </div>
            </section>
            <Footer />
        </div>
        <Extras categories={categories} />
        </div>
    );
}

export default Login;
