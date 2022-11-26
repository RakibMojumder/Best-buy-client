import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../pages/Dashboard/Sidebar';
import Header from '../pages/Shared/Header';

const DashboardLayout = () => {
    return (
        <div>
            <Header />
            <div className='min-h-screen flex mt-10'>
                <div><Sidebar /> </div>
                <div className='flex-1 ml-9'><Outlet /> </div>
            </div>
        </div>
    );
};

export default DashboardLayout;