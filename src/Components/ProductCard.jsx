import React, { useEffect, useState } from "react";
import "../style/product.css";
import rupeeB from "../icons/rupeeB.svg";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import UserRequests from "../Requests/UserRequests";
import { UserCartAction, UserLocalCartAction } from "../Redux/Actions/Actions";
import { toast } from "react-toastify";

const ProductCard = ({ cartData }) => {
  let product = cartData;
  const [load, setLoad] = useState(false)
  const user = useSelector((state) => state?.User?.user);
  const userCart = useSelector((state) => state?.User?.usercart) || [];
  const { seller } = useSelector((state) => state?.Products?.seller_data);
  const [getUserCart, setGetUserCart] = useState();
  const dispatch = useDispatch();
  const AddToCart = (response, price) => {
    if (user) {
      let result = userCart.find((item) => item?.productId?._id == response);
      if (result) {
        axios
          .patch(UserRequests.ADD_CART_QUANTITY + result?._id)
          .then((response) => {
            setGetUserCart(true);
          })
          .catch((error) => console.log(error));
      } else {
        let obj = {
          userId: user?._id,
          productId: response,
          quantity: 1,
        };
        axios
          .post(UserRequests.ADD_TO_CART, obj)
          .then((response) => {
            setGetUserCart(true);
            toast.success("Item Added to Cart");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      let userCart = localStorage.getItem("usercart");
      if (userCart == null || userCart.length == 0) {
        var ar = [];
        let obj = {
          productId: response,
          quantity: 1,
          price: price,
          sellerId: seller?._id
        };
        ar.push(obj);
        localStorage.setItem("usercart", JSON.stringify(ar));
        dispatch(UserLocalCartAction(ar));
        toast.success("Item Added to Cart");
      } else {

        let userCart = JSON.parse(localStorage.getItem("usercart"));
        if (userCart) {
          for (let i = 0; i < userCart.length; i++) {
            if (userCart[i]?.sellerId !== seller?._id) {
              userCart = []
              toast.success("Previous Item Deleted");
            }
          }
          let index = userCart.findIndex((item) => item?.productId == response);
          if (index >= 0) {
            let currentQuantity = userCart[index]?.quantity;
            let price = userCart[index]?.price / currentQuantity;
            let obj = {
              productId: userCart[index]?.productId,
              quantity: currentQuantity + 1,
              price: (currentQuantity + 1) * price,
              sellerId: seller?._id
            };
            userCart[index] = obj;
          } else {
            let obj = {
              productId: response,
              quantity: 1,
              price: price,
              sellerId: seller?._id
            };
            userCart.push(obj);
            toast.success("Item Added to Cart");
          }
          localStorage.setItem("usercart", JSON.stringify(userCart));
          dispatch(UserLocalCartAction(userCart));
        } else {
          var ar = [];
          let obj = {
            productId: response,
            quantity: 1,
            price: price,
            sellerId: seller?._id
          };
          ar.push(obj);
          localStorage.setItem("usercart", JSON.stringify(ar));
          toast.success("Item Added to Cart");
          dispatch(UserLocalCartAction(ar));
        }
      }

    }
  };

  useEffect(() => {
    if (getUserCart) {
      setLoad(true)
      axios
        .get(UserRequests.GET_USER_CART + user?._id)
        .then((response) => {
          dispatch(UserCartAction(response.data?.cart));
          setGetUserCart(false);
          setLoad(false)
        })
        .catch((error) => {
          setLoad(false)
          console.log(error);
        });
    }
  }, [getUserCart]);
  return (
    <>
      <div id={product?.categoryId?._id} className={product.disabled ? "product disabled" : "product"}>
        <div className="product__detail">
          <span className="product__name">{product?.productName}</span>
          <span className="product__desc">
            {product?.description.slice(0, 90)}
          </span>
          <div className="product__price">
            <span>
              <span>
                <img src={rupeeB} alt="" />
              </span>{" "}
              {Math.round(product?.mrp - (product?.mrp * product?.discount) / 100)}
            </span>
            <span>
              MRP <span>&#x20b9;{product.mrp}</span>
            </span>
            <span>{product?.discount}% off</span>
          </div>
        </div>
        <div className="cardImg">
          <img src={UserRequests.PRODUCT_IMG + product.productImage} />
        </div>
        {!product.disabled ? (
          <button
            disabled={load}
            className="addBtn"
            onClick={() => AddToCart(product?._id, product?.price)}
          >
            ADD
          </button>
        ) : (
          <button className="addBtn disabled">Coming Soon</button>
        )}
      </div>
    </>
  );
};
export default ProductCard;
