// src/context/AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [profilePicture, setProfilePicture] = useState(null);

  return (
    <AuthContext.Provider value={{ profilePicture, setProfilePicture }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
