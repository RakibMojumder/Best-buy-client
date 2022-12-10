import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../pages/Shared/Footer';
import Header from '../pages/Shared/Header';

const Main = () => {
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
            <Outlet />
            <Footer />
        </div>
    );
};

export default Main;