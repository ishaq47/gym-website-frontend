// src/components/Login.js
/* global FB */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../services/authService';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { setProfilePicture } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '1265898437884168',
        cookie     : true,
        xfbml      : true,
        version    : 'v15.0'
      });

      FB.AppEvents.logPageView();
    };

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/login`, formData);
      localStorage.setItem('token', response.data.token); // Save JWT token
      navigate('/');
    } catch (error) {
      console.error('Error logging in', error);
    }
  };

  const handleFacebookLogin = () => {
    FB.login((response) => {
      if (response.authResponse) {
        FB.api('/me', { fields: 'id,name,email,picture' }, (userInfo) => {
          setProfilePicture(userInfo.picture.data.url);
          axios.post(`${API_URL}/auth/facebook`, { accessToken: response.authResponse.accessToken })
            .then(res => {
              localStorage.setItem('token', res.data.token); // Save JWT token
              navigate('/');
            })
            .catch(error => {
              console.error('Error logging in with Facebook', error);
            });
        });
      } else {
        console.error('User cancelled login or did not fully authorize.');
      }
    }, {scope: 'public_profile,email'});
  };

  return (
    <div className="min-h-screen flex items-center justify-center background1">
      <div className="w-full max-w-md bg-[#241010a6] shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-[#130b0bd3] text-white  rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div className="mb-6">
            <label className="block text-white font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Your Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-[#130b0bd3] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Login
          </button>
        </form>
        <button
          onClick={handleFacebookLogin}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-4"
        >
          Login with Facebook
        </button>
        <p className="text-center text-gray-300 mt-6">
          Don't have an account?{' '}
          <a href="/" className="text-indigo-400 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
