import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../pages/Dashboard/Sidebar';
import Footer from '../pages/Shared/Footer';
import Header from '../pages/Shared/Header';

const DashboardLayout = () => {
    return (
        <div>
            <Header />
            <div className='min-h-screen md:grid grid-cols-12 gap-5'>
                <div className='md:col-span-4 lg:col-span-3 absolute md:static w-full z-50 md:z-auto'><Sidebar /> </div>
                <div className='md:col-span-8 lg:col-span-9 -z-10 md:z-auto'><Outlet /> </div>
            </div>
            <Footer />
        </div>
    );
};

export default DashboardLayout;