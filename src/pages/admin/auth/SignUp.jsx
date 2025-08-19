import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from "@/services/api/users"; // ← You should have a createUser API call
import { ToastContainer, toast } from 'react-toastify';
import Toast from "@/components/Toast";
import SignUpimg from '@/assets/images/images-section/signup.avif';
import useAdminStyles from '@/hooks/useAdminStyles';


const AdminSignUp = ({isLoggedIn, loggedInUser,categories=[] }) => {
  useAdminStyles(); // ✅ dynamically manages admin styles
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked  } = e.target;
    let val = value;

    if (type === 'radio' && name === 'active') {
        val = value === 'true'; // Convert string to boolean
    }

    setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : val ,
    }));
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password, confirmPassword, agree } = formData;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      toast.error(<Toast title="Missing Fields" subtitle="Please fill all fields" />);
      return;
    }

    if (password !== confirmPassword) {
      toast.error(<Toast title="Password Mismatch" subtitle="Passwords do not match" />);
      return;
    }

    if (!agree) {
      toast.error(<Toast title="Agreement Required" subtitle="You must agree to the privacy policy" />);
      return;
    }

    try {
      const result = await registerUser({
        userData:formData,
      });

      if (!result.error) {
        toast.success(<Toast title="Account Created" subtitle="Redirecting to login..." />);
        setTimeout(() => navigate('/admin/login'), 1500);
      } else {
        toast.error(<Toast title={result.error} subtitle="Signup failed" />);
      }
    } catch (error) {
      toast.error(<Toast title={error} subtitle="Something went wrong." />);
    }
  };

  return (
    <div id="wrapper">
      <div id="page" className="">
        <div className="login-page">
          <div className="left">
            <div className="login-box type-signup">
              <div>
                <h3>Create your account</h3>
                <div className="body-text text-white">Or enter your personal details to create an account</div>
              </div>

              <form className="form-login flex flex-column gap22 w-full" onSubmit={handleSubmit}>
                <div>
                  <div className="body-title mb-10 text-white">Your name <span className="tf-color-1">*</span></div>
                  <div className="cols gap10">
                    <fieldset className="name">
                      <input
                        className="flex-grow"
                        type="text"
                        placeholder="First name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </fieldset>
                    <fieldset className="name">
                      <input
                        className="flex-grow"
                        type="text"
                        placeholder="Last name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </fieldset>
                  </div>
                </div>

                <fieldset className="email">
                  <div className="body-title mb-10 text-white">Email address <span className="tf-color-1">*</span></div>
                  <input
                    className="flex-grow"
                    type="email"
                    placeholder="Enter your email address"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </fieldset>

                <fieldset className="password">
                  <div className="body-title mb-10 text-white">Password <span className="tf-color-1">*</span></div>
                  <input
                    className="password-input"
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </fieldset>

                <fieldset className="password">
                  <div className="body-title mb-10 text-white">Confirm password <span className="tf-color-1">*</span></div>
                  <input
                    className="password-input"
                    type="password"
                    placeholder="Confirm your password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                </fieldset>

                <div className="flex gap10">
                  <input
                    className="tf-check"
                    type="checkbox"
                    id="signed"
                    name="agree"
                    checked={formData.agree}
                    onChange={handleInputChange}
                  />
                  <label className="body-text text-white" htmlFor="signed">Agree with Privacy Policy</label>
                </div>

                <button type="submit" className="tf-button w-full">Sign Up</button>
              </form>

              <ToastContainer />
              <div className="bottom body-text text-center text-white w-full">
                Already have an account?
                <Link to="/admin/login" className="body-text tf-color">Sign in here</Link>
              </div>
            </div>
          </div>

          <div className="right">
            <img src={SignUpimg} alt="Sign up" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSignUp;
