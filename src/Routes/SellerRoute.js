import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../components/Loader';
import { AuthContext } from '../contexts/AuthProvider';
import getStoredUser from '../sharedAPI/getStoredUser';

const SellerRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [storedUser, setStoredUser] = useState({});
    const location = useLocation();
    useEffect(() => {
        getStoredUser(user?.email)
            .then(data => {
                setStoredUser(data)
                setLoading(false)
            })
    }, [user]);
    if (loading) {
        return <Loader />
    }

    if (!user || (storedUser?.role !== 'admin' && storedUser?.role !== "seller")) {
        return <Navigate to='/login' state={{ from: location }} replace></Navigate>
    }

    return children
};

export default SellerRoute;