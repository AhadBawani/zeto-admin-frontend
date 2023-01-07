import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminDashboard from "../Pages/AdminDashboard";
import { EditProductAction } from "../Redux/Actions/Action";

const Routing = () => {
    const routes = useSelector((state) => state?.Admin?.adminOption);
    const editProduct = useSelector((state) => state?.Utils?.EditProduct);
    const dispatch = useDispatch();
    useEffect(() => {
        if(routes !== "create_product" && editProduct !== null){
            dispatch(EditProductAction(null))
        }
    }, [routes])
    return <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AdminDashboard/>}/>
            </Routes>
        </BrowserRouter>
    </>
}

export default Routing;