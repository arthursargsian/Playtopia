import React from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Auth from "./page/auth/Auth";
import NotFound from "./page/common/NotFound";
import PrivateRouteAdmin from "./customs/PrivateRouteAdmin";
import PublicRoute from "./customs/PublicRoute";
import ProductsList from "./page/dashboard/products/ProductsList";
import Categories from "./page/dashboard/Categories";
import Administration from "./page/dashboard/Administration";
import Users from "./page/dashboard/Users";
import AddProduct from "./page/dashboard/products/AddProduct";
import UpdateProducts from "./page/dashboard/products/UpdateProducts";
import AddAdmin from "./page/dashboard/AddAdmin";
import Discover from "./page/main/Discover";
import Browse from "./page/main/Browse";
import Single from "./page/main/Single";
import Favorite from "./page/main/Favorite";
import PrivateRoute from "./customs/PrivateRoute";
import CardPayment from "./page/payment/CardPayment";
import Confirm from "./page/payment/Confirm";
import Basket from "./page/payment/Basket";
import CardPaymentBasket from "./page/payment/CardPaymentBasket";
import ConfirmBasket from "./page/payment/ConfirmBasket";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PublicRoute><Auth/></PublicRoute>}/>

                {/* Dashboard Routes */}
                <Route path="/admin/products" element={<PrivateRouteAdmin><ProductsList/></PrivateRouteAdmin>}/>
                <Route path="/admin/categories" element={<PrivateRouteAdmin><Categories/></PrivateRouteAdmin>}/>
                <Route path="/admin/administration" element={<PrivateRouteAdmin><Administration/></PrivateRouteAdmin>}/>
                <Route path="/admin/users" element={<PrivateRouteAdmin><Users/></PrivateRouteAdmin>}/>
                <Route path="/admin/products/add-product" element={<PrivateRouteAdmin><AddProduct/></PrivateRouteAdmin>}/>
                <Route path="/admin/products/update-product/:id" element={<PrivateRouteAdmin><UpdateProducts/></PrivateRouteAdmin>}/>
                <Route path="/admin/users-list" element={<PrivateRouteAdmin><Users/></PrivateRouteAdmin>}/>
                <Route path="/admin/administration/add-admin" element={<PrivateRouteAdmin><AddAdmin/></PrivateRouteAdmin>}/>

                {/* Everyone */}
                <Route path="/discover" element={<><Discover/></>}/>
                <Route path="/browse" element={<><Browse/></>}/>
                <Route path="/single/:id" element={<><Single/></>}/>

                {/* Private */}
                <Route path="/favorite" element={<PrivateRoute><Favorite/></PrivateRoute>}/>
                <Route path="/card/:id" element={<PrivateRoute><CardPayment/></PrivateRoute>}/>
                <Route path="/complete" element={<PrivateRoute><Confirm/></PrivateRoute>}/>
                <Route path="/basket" element={<PrivateRoute><Basket/></PrivateRoute>}/>
                <Route path="/card-basket" element={<PrivateRoute><CardPaymentBasket/></PrivateRoute>}/>
                <Route path="/complete-basket" element={<PrivateRoute><ConfirmBasket/></PrivateRoute>}/>

                {/* not found Routes */}
                <Route path="/not-found" element={<NotFound/>}/>
                <Route path="*" element={<Navigate to="not-found"/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
