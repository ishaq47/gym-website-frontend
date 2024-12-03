// src/components/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../services/authService';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { setProfilePicture } = useAuth();
  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/signup`, formData); // Assuming API URL is '/api/signup'
      navigate('/login');
    } catch (error) {
      console.error('Error signing up', error);
    }
  };
  const handleGoogleLogin = (response) => {
    console.log('Google Login Response:', response);
    const { credential } = response;
    axios.post(`${API_URL}/auth/google`, { idToken: credential })
      .then(res => {
        console.log('Token Exchange Response:', res);
        localStorage.setItem('token', res.data.token); // Save JWT token
        console.log(res.data, 'Data');
        setProfilePicture(res.data.user.name); // Set profile picture URL
        navigate('/');
      })
      .catch(error => {
        console.error('Error logging in with Google', error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center background">
      <div className="w-full max-w-md bg-[#2410108f] shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white font-semibold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-[#130b0bd3] text-white px-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

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
              className="w-full px-4 py-2  bg-[#130b0bd3] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 mb-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Sign Up
          </button>
          <GoogleOAuthProvider clientId="845640890977-tutiubdi4sc5usb67j3bo14p3a5roig7.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => {
                console.log('Login Failed');
              }}
            />
          </GoogleOAuthProvider>
        </form>
        <p className="text-center text-gray-300 mt-6">
          Already have an account?{' '}
          <a href="/login" className="text-indigo-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
