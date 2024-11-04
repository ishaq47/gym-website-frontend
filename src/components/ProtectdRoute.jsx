import React from 'react'
import { Navigate } from 'react-router-dom';

const ProtectdRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to='/admin-login' />
}

export default ProtectdRoute
