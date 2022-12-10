import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../pages/Dashboard/Sidebar';
import Footer from '../pages/Shared/Footer';
import Header from '../pages/Shared/Header';

const DashboardLayout = () => {
    const [scroll, setScroll] = useState(false);

    const changeBackground = () => {
        if (window.scrollY >= 20) {
            setScroll(true);
        } else {
            setScroll(false)
        }
    }

    useEffect(() => {
        changeBackground();
        window.addEventListener('scroll', changeBackground)
    }, [])
    return (
        <div>
            <div className={`sticky top-0 z-50 ${scroll && "bg-[#F2F4F8] dark:bg-slate-800"}`}>
                <Header />
            </div>
            <div className='min-h-screen md:grid grid-cols-12 gap-5'>
                <div className='md:col-span-4 lg:col-span-3 absolute md:static w-full z-50 md:z-auto'><Sidebar /> </div>
                <div className='md:col-span-8 lg:col-span-9 -z-10 md:z-auto'><Outlet /> </div>
            </div>
            <Footer />
        </div>
    );
};

export default DashboardLayout;