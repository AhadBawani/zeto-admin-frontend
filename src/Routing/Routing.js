import React, { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AllSellerAction, ProductsAction, SellerAction, subCategoryAction, UserAction, UserCartAction } from "../Redux/Actions/Actions";
import UserRequests from "../Requests/UserRequests";
import Checkout from "../Pages/Checkout";
import Home from "../Pages/Home";
import ProdHome from "../Pages/ProdHome";
import FoodHome from "../Pages/FoodHome";
import axios from "axios";
import OrderSuccess from "../Components/OrderSucess";
import Order from "../Pages/Order";
import PrivacyAndPolicy from "../Pages/PrivacyAndPolicy";
import Profile from "../Pages/Profile";
import { ToastContainer } from "react-toastify";
import Contact from "../Pages/Contact";
import AboutUs from "../Pages/AboutUs";
import Review from "../Pages/Review";
import ScrollTop from "../Components/ScrollAndRefresh";

const Routing = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.User?.user);
  const seller = useSelector((state) => state?.Products?.all_seller);
  const userId = localStorage.getItem("id");
  useLayoutEffect(() => {
    axios.get(UserRequests.SUBCATEGORY).then(res => {

      dispatch(subCategoryAction(res?.data));
    })
      .catch(err => {
        console.error(err)
      })

    if (userId) {
      axios
        .get(UserRequests.GET_USER + userId)
        .then((res) => {
          dispatch(UserAction(res?.data));
        })
        .catch((err) => {
          console.log(err);
        });
    }
    axios
      .get(UserRequests.GET_SELLER)
      .then((res) => {
        dispatch(AllSellerAction(res?.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    axios.get(UserRequests.GET_USER_CART + user?._id)
      .then(response => {
        dispatch(UserCartAction(response?.data?.cart))
      })
  }, [user])
  useEffect(() => {
    const sellerAllProd = seller?.map(i => i?.product)
    const arr = [].concat.apply([], sellerAllProd);
    dispatch(ProductsAction(arr))
  }, [seller])
  return (
    <>
      <BrowserRouter>
        <ScrollTop />
        <Routes>
          {
            user !== null && <>
              <Route path="/profile" element={<Profile />} />
              <Route path="/order" element={<Order />} />

            </>
          }
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<ProdHome />} />
          <Route path="/food" element={<FoodHome />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/privacy" element={<PrivacyAndPolicy />} />
          <Route path="/review" element={<Review />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/OrderPlaced" element={<OrderSuccess />} />
          {/* <Route path="/404" element={<Page404 />} /> */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </>
  );
};

export default Routing;
