import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../style/cartGallery.css";
import rupee from "../icons/rupee.svg";
import { Link } from "react-router-dom";
import SidebarCartCard from "./SidebarCartCard";
import { CartToggleAction } from "../Redux/Actions/Actions";
const SidebarCart = () => {
  const dispatch = useDispatch()
  const userCart = useSelector((state) => state?.User?.usercart) || [];
  const seller = useSelector((state) => state?.Products?.all_seller);
  const Products = useSelector((state) => state.Products?.Products) || [];
  const userLocalCart =
    useSelector((state) => state?.User?.userLocalCart) || [];
  const CartToggle = useSelector((state) => state.Toggle?.CartToggle);
  const user = useSelector((state) => state?.User?.user);
  const sellerData = useSelector((state) => state?.Products?.seller_data?.seller);
  const [total, setTotal] = useState();

  const [sellerDetail, setSellerDetail] = useState(sellerData)
  const findSeller = (productId) => {
    let s = Products.findIndex(ele => productId === ele?._id)

    return s >= 0 ? Products[s]?.sellerID : null
  }
  useEffect(() => {
    if (user) {
      if (userCart.length > 0) {
        let sellerid = findSeller(userCart[0]?.productId?._id);
        if (sellerid) {

          const cartseller = seller?.find(ele => ele?.seller?._id === sellerid);
          setSellerDetail({ ...cartseller?.seller })

        }
      }
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
      if (userLocalCart.length > 0) {
        let sellerid = findSeller(userLocalCart[0]?.productId);
        if (sellerid) {
          const cartseller = seller?.find(ele => ele?.seller?._id === sellerid);
          setSellerDetail({ ...cartseller?.seller });
        }
      }
      let amount = 0;
      userLocalCart.map((item) => {
        amount += item?.price;
      });
      setTotal(amount);
    }
  }, [userLocalCart]);
  const [time, setTime] = useState(new Date().getHours())
  const orderLimit = 18;
  return (
    <>

      <section
        id={total <= 0 && "less"}
        className={CartToggle ? "cartGallery" : "cartGallery cartActive"}
      >
        <button onClick={() => {
          dispatch(CartToggleAction(!CartToggle));
        }} className="cart-close-icon">&#43;</button>
        <h4>Your Cart from</h4>
        <h1>{sellerDetail?.sellerName}: <span style={{ color: "red" }}>{
          time <= orderLimit ? <span> Delivery 7PM-9PM</span> : <span>Out of Stock </span>
        }</span></h1>
        {(time <= orderLimit) ? <Link to={"/checkout"} >
          <div className="checkoutBtn cartBtn ">
            <span>Checkout</span>
            <span>
              <img src={rupee} alt="" />
              <span>{Math.round(total)}</span>
            </span>
          </div>
        </Link> : <div style={
          {
            cursor: "pointer",
            pointerEvents: "none",
            opacity: "0.5",
          }
        } className="checkoutBtn cartBtn ">
          <span>Checkout</span>
          <span>
            <img src={rupee} alt="" />
            <span>{Math.round(total)}</span>
          </span>
        </div>

        }
        <hr />

        <div className="cartPropucts">
          <SidebarCartCard />
        </div>
      </section>
    </>
  );
};

export default SidebarCart;
