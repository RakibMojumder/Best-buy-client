import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import getStoredUser from '../Hooks/getStoredUser';

const AdminRoute = ({ children }) => {
    const { user, loading, logOut } = useContext(AuthContext);
    const [storedUser, setStoredUser] = useState(null);
    const location = useLocation();
    useEffect(() => {
        getStoredUser(user?.email)
            .then(data => setStoredUser(data))
    }, [user]);

    if (loading) {
        return <h1>Loading....</h1>
    }

    if (!user || storedUser?.role !== 'admin') {
        return <Navigate to='/login' state={{ from: location }} replace></Navigate>
    }

    return children
};

export default AdminRoute;