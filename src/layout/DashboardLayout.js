import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../pages/Dashboard/Sidebar';
import Header from '../pages/Shared/Header';

const DashboardLayout = () => {
    return (
        <div>
            <Header />
            <div className='min-h-screen md:grid grid-cols-12 gap-5'>
                <div className='md:col-span-4 lg:col-span-3 absolute md:static w-full'><Sidebar /> </div>
                <div className='md:col-span-8 lg:col-span-9'><Outlet /> </div>
            </div>
        </div>
    );
};

export default DashboardLayout;