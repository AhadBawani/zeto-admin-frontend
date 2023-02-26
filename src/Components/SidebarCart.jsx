import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../style/cartGallery.css";
import rupee from "../icons/rupee.svg";
import { Link } from "react-router-dom";
import SidebarCartCard from "./SidebarCartCard";
const SidebarCart = () => {
  const userCart = useSelector((state) => state?.User?.usercart) || [];
  const { seller } = useSelector((state) => state?.Products?.seller_data);
  const userLocalCart =
    useSelector((state) => state?.User?.userLocalCart) || [];
  const CartToggle = useSelector((state) => state.Toggle?.CartToggle);
  const user = useSelector((state) => state?.User?.user);
  const [total, setTotal] = useState();
  useEffect(() => {
    if (user) {
      let amount = 0;
      userCart.map((item) => {
        if (!item?.productId?.disabled)
          amount +=
            item?.quantity *
            (item?.productId?.mrp -
              (item?.productId?.mrp * item?.productId?.discount) / 100);
      });
      setTotal(Math.round(amount));
    }
  }, [userCart]);
  useEffect(() => {
    if (!user) {
      let amount = 0;
      userLocalCart.map((item) => {
        amount += item?.price;
      });
      setTotal(amount);
    }
  }, [userLocalCart]);
  const [time, setTime] = useState(new Date().getHours())
  useEffect(() => {


  }, [time])
  const orderLimit = 17;
  return (
    <section
      id={total <= 0 && "less"}
      className={CartToggle ? "cartGallery" : "cartGallery cartActive"}
    >
      <h4>Your Cart from</h4>
      <h1>{seller?.sellerName}: <span style={{ color: "red" }}>{
        time <= orderLimit ? <span> Delivery 7PM-9PM</span> : <span>Tommorow 7PM-9PM</span>
      }</span></h1>
      <Link to={"/checkout"} onClick={() => sessionStorage.setItem('location', '/checkout')}>
        <div className="checkoutBtn cartBtn ">
          <span>Checkout</span>
          <span>
            <img src={rupee} alt="" />
            <span>{Math.round(total)}</span>
          </span>
        </div>
      </Link>
      <hr />

      <div className="cartPropucts">
        <SidebarCartCard />
      </div>
    </section>
  );
};

export default SidebarCart;
