import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <h1>Loading....</h1>
    }

    if (user) {
        return children
    }

    <Navigate to='/' state={{ from: location }}></Navigate>
};

export default PrivateRoute;