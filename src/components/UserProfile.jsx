// src/components/UserProfile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../BaseUrl';

function UserProfile() {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/profile`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile', error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <h2>Your Profile</h2>
      <p>Name: {profile.name}</p>
      <p>Email: {profile.email}</p>
      <p>Subscription Status: {profile.subscriptionStatus}</p>
    </div>
  );
}

export default UserProfile;
