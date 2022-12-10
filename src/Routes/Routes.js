
import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import ErrorPage from "../pages/Shared/ErrorPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import AllBuyers from "../pages/Dashboard/Admin/AllBuyers";
import AllSellers from "../pages/Dashboard/Admin/AllSellers";
import ReportedItems from "../pages/Dashboard/Admin/ReportedItems";
import AddProduct from "../pages/Dashboard/Seller/AddProduct";
import MyBuyers from "../pages/Dashboard/Seller/MyBuyers";
import MyProducts from "../pages/Dashboard/Seller/MyProducts";
import AdminRoute from "./AdminRoute";
import MyOrders from "../pages/Dashboard/Buyer/MyOrders";
import MyWishList from "../pages/Dashboard/Buyer/MyWishList";
import SellerRoute from "./SellerRoute";
import Admin from "../pages/Dashboard/Admin/Admin";
import ProductDetails from "../pages/Home/Products/ProductDetails";
import HomeLayout from "../layout/HomeLayout";
import Product from "../pages/Home/Products/Product";
import CategoriesProduct from "../pages/Home/Products/CategoriesProduct";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <HomeLayout />,
                children: [
                    {
                        path: '/',
                        element: <Product />
                    },
                    {
                        path: '/category/:brand',
                        element: <CategoriesProduct />
                    }
                ]
            },
            {
                path: '/product/:id',
                element: <PrivateRoute><ProductDetails /></PrivateRoute>
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/dashboard/admin/allAdmin',
                element: <AdminRoute><Admin /></AdminRoute>
            },
            {
                path: "/dashboard/admin/allSellers",
                element: <AdminRoute><AllSellers /></AdminRoute>
            },
            {
                path: '/dashboard/admin/allBuyers',
                element: <AdminRoute><AllBuyers /></AdminRoute>
            },
            {
                path: "/dashboard/admin/reportedItem",
                element: <AdminRoute><ReportedItems /></AdminRoute>
            },
            {
                path: "/dashboard/Admin/addProduct",
                element: <AdminRoute><AddProduct /></AdminRoute>
            },
            {
                path: "/dashboard/Admin/myProducts",
                element: <AdminRoute><MyProducts /></AdminRoute>
            },
            {
                path: '/dashboard/addProduct',
                element: <SellerRoute><AddProduct /></SellerRoute>
            },
            {
                path: '/dashboard/myBuyers',
                element: <SellerRoute><MyBuyers /></SellerRoute>
            },
            {
                path: '/dashboard/myProducts',
                element: <SellerRoute><MyProducts /></SellerRoute>
            },
            {
                path: '/dashboard/myOrders',
                element: <MyOrders />
            },
            {
                path: '/dashboard/wishlist',
                element: <MyWishList />
            }
        ]
    }
]);

export default router;