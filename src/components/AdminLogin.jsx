// src/components/AdminLogin.js
import React, { useState } from 'react';
import axios from 'axios'; // Import axios for API calls
import { baseUrl } from '../BaseUrl';
import { Link } from 'react-router-dom';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await axios.post(`${baseUrl}/admin/admin-login`, { email, password }); // Adjust the endpoint as necessary
      localStorage.setItem('token', response.data.token); // Store the JWT token in localStorage
      // Redirect to admin dashboard or perform other actions upon successful login
      window.location.href = '/admin'; // Change this to your desired redirect
    } catch (err) {
      setError('Invalid credentials'); // Handle errors
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-[#241010a6] shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="text-red-500 mb-4">{error}</div>} {/* Display error message */}
          <div className="mb-4">
            <label className="block text-white font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Your Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Handle email input
              className="w-full px-4 py-2 bg-[#130b0bd3] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Handle password input
              className="w-full px-4 py-2 bg-[#130b0bd3] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Login
          </button>
          <p className="text-center text-gray-300 mt-6"> login as a User  <Link to='/login' className='text-blue-500'> SignIn</Link> </p>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
