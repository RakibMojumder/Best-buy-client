
import React from 'react';
import { Outlet } from 'react-router-dom';
import Advertise from '../pages/Home/Advertise/Advertise';
import Banner from '../pages/Home/Banner';
import Contact from '../pages/Home/Contact';
import ProductsCategory from '../pages/Home/Products/ProductsCategory';

const HomeLayout = () => {
    return (
        <div>
            <div>
                <Banner />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-12 gap-5 my-20'>
                <div className='md:col-span-4 lg:col-span-3 px-10 md:px-0'>
                    <ProductsCategory />
                </div>
                <div className='md:col-span-8 lg:col-span-9'>
                    <Outlet />
                </div>
            </div>
            <Advertise />
            <Contact />
        </div>
    );
};

export default HomeLayout;