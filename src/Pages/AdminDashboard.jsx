import React, { useEffect } from "react";
import "../Styles/adminDashboard.css";
import home from "../Icons/home.png";
import add from "../Icons/add.png";
import analytics from "../Icons/analytics.png";
import bag from "../Icons/bag.png";
import rating from "../Icons/rating.png";
import tag from "../Icons/tag.png";
import delivery from "../Icons/delivery.png";
import logo from "../Icons/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { AdminOptionAction, OrderDeliveredAction, OrdersAction, ProductsAction, SellerAction } from "../Redux/Actions/Action";
import Dashboard from "../Components/Dashboard";
import AddProduct from "../Components/AddProduct";
import Delivery from "../Components/Delivery";
import Products from "../Components/Products";
import Analytics from "../Components/Analytics";
import Order from "../Components/Order";
import Rating from "../Components/Rating";
import OrderDetail from "../Components/OrderDetail";
import axios from "axios";
import AdminRequest from "../Requests/AdminRequests";
import Soapkeeper from "../Components/AddShopkeeper";
import Shopkeeper from "../Components/Shopkeeper";
import AddShopkeeper from "../Components/AddShopkeeper";

const AdminDashboard = () => {
  const adminOption = useSelector((state) => state?.Admin?.adminOption);
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get(AdminRequest.GET_ALL_PRODUCTS)
      .then((response) => {
        dispatch(ProductsAction(response.data));
      })
      .catch((error) => {
        console.log(error)
      })

    axios.get(AdminRequest.GET_ALL_ORDERS)
      .then((response) => {
        let delivered = response.data.filter((item) => item.orderDelivered == true);
        let pending = response.data.filter((item) => item.orderDelivered == false);
        dispatch(OrderDeliveredAction(delivered));
        dispatch(OrdersAction(pending));
      })
      .catch((error) => {
        console.log(error)
      })

    axios.get(AdminRequest.GET_ALL_SELLER)
      .then((response) => {
        dispatch(SellerAction(response.data));
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  return (
    <>
      <section className="admin-dashboard">
        <section className="dashboard-left">
          <img src={logo} />
          <div
            onClick={() => dispatch(AdminOptionAction("dashboard"))}
            className={
              adminOption === "dashboard"
                ? "admin_actions shadow"
                : "admin_actions"
            }
          >
            <img src={home} alt="" />
            <span>Dashboard</span>
          </div>
          <div
            onClick={() => dispatch(AdminOptionAction("create_product"))}
            className={
              adminOption === "create_product"
                ? "admin_actions shadow"
                : "admin_actions"
            }
          >
            <img src={add} alt="" />
            <span>Create Product</span>
          </div>
          <div
            onClick={() => dispatch(AdminOptionAction("product"))}
            className={
              adminOption === "product"
                ? "admin_actions shadow"
                : "admin_actions"
            }
          >
            <img src={tag} alt="" />
            <span>Product</span>
          </div>
          <div
            onClick={() => dispatch(AdminOptionAction("order"))}
            className={
              adminOption === "order" ? "admin_actions shadow" : "admin_actions"
            }
          >
            <img src={bag} alt="" />
            <span>Orders</span>
          </div>
          <div
            onClick={() => dispatch(AdminOptionAction("delivery"))}
            className={
              adminOption === "delivery"
                ? "admin_actions shadow"
                : "admin_actions"
            }
          >
            <img src={delivery} alt="" />
            <span>Delivery</span>
          </div>
          <div
            onClick={() => dispatch(AdminOptionAction("analytics"))}
            className={
              adminOption === "analytics"
                ? "admin_actions shadow"
                : "admin_actions"
            }
          >
            <img src={analytics} alt="" />
            <span>Analytics</span>
          </div>
          <div
            onClick={() => dispatch(AdminOptionAction("shopkeeper"))}
            className={
              adminOption === "shopkeeper"
                ? "admin_actions shadow"
                : "admin_actions"
            }
          >
            <img src={rating} alt="" />
            <span>Shopkeeper</span>
          </div>
          <div
            onClick={() => dispatch(AdminOptionAction("rating"))}
            className={
              adminOption === "rating"
                ? "admin_actions shadow"
                : "admin_actions"
            }
          >
            <img src={rating} alt="" />
            <span>Rating</span>
          </div>
        </section>
        <section className="dashboard-right">
          {adminOption === "dashboard" && <Dashboard />}
          {adminOption === "create_product" && <AddProduct />}
          {adminOption === "product" && <Products />}
          {adminOption === "delivery" && <Delivery />}
          {adminOption === "order" && <Order />}
          {adminOption === "rating" && <Rating />}
          {adminOption === "orders-detail" && <OrderDetail />}
          {adminOption === "shopkeeper" && <Shopkeeper />}
          {adminOption === "add-shopkeeper" && <AddShopkeeper />}
        </section>
      </section>
    </>
  );
};

export default AdminDashboard;
