import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../style/cartGallery.css";
import rupee from "../icons/rupee.svg";
import { Link } from "react-router-dom";
import SidebarCartCard from "./SidebarCartCard";
const SidebarCart = () => {
  const userCart = useSelector((state) => state?.User?.usercart) || [];
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
          amount += item?.quantity * item?.productId?.price;
      });
      setTotal(amount);
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

  return (
    <section
      id={total <= 0 && "less"}
      className={CartToggle ? "cartGallery" : "cartGallery cartActive"}
    >
      <h4>Your Cart from</h4>
      <h1>D-Mart</h1>
      <Link to={"/checkout"}>
        <div className="checkoutBtn cartBtn ">
          <span>Checkout</span>
          <span>
            <img src={rupee} alt="" />
            <span>{total}</span>
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
