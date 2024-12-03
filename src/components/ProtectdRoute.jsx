import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode} from 'jwt-decode';

const ProtectdRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            const isAdmin = decodedToken.isAdmin; // Assuming the token contains an `isAdmin` field

            if (isAdmin) {
                return children;
            } else {
                alert('Access denied')
                return <Navigate to='/admin-login' />;
            }
        } catch (error) {
            console.error('Error decoding token:', error);
            return <Navigate to='/admin-login' />;
        }
    } else {
        return <Navigate to='/admin-login' />;
    }
};

export default ProtectdRoute;
