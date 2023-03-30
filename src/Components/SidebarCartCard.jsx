import React, { useEffect, useState } from "react";
import "../style/cartGallery.css";
import minus from "../icons/minus.png";
import deletei from "../icons/deletei.png";
import plus from "../icons/plus.svg";
import { useDispatch, useSelector } from "react-redux";
import UserRequests from "../Requests/UserRequests";
import { SignUpDialogAction } from "../Redux/Actions/Actions";
import axios from "axios";
import { UserCartAction, UserLocalCartAction } from "../Redux/Actions/Actions";
import { toast } from "react-toastify";
const SidebarCartCard = () => {
  const [simmer, setSimmer] = useState(false);
  const userCart = useSelector((state) => state?.User?.usercart) || [];
  const user = useSelector((state) => state?.User?.user);
  const Products = useSelector((state) => state?.Products?.Products) || [];
  const userLocalCart =
    useSelector((state) => state?.User?.userLocalCart) || [];
  const dispatch = useDispatch();
  const [change, setChange] = useState(false);
  const deleteCartItem = (response) => {
    if (user) {
      axios
        .delete(UserRequests.DELETE_CART_ITEM + response)
        .then((response) => {
          setChange(true);
          toast.success("Item Deleted");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      let index = userCart.findIndex((item) => item?.productId == response);
      userCart.splice(index, 1);
      localStorage.setItem("usercart", userCart);
      dispatch(UserLocalCartAction(userCart));
    }
  };
  const deleteLocalCartItem = (response) => {
    let result = userLocalCart.filter((item) => item?.productId !== response);
    dispatch(UserLocalCartAction(result));
    localStorage.setItem("usercart", JSON.stringify(result));
  };
  const RemoveQuantity = (response) => {
    setSimmer(true);
    if (user) {
      axios
        .patch(UserRequests.REMOVE_CART_QUANTITY + response)
        .then((response) => {
          setChange(true);
          setSimmer(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      let userCart = JSON.parse(localStorage.getItem("usercart"));
      let index = userCart.findIndex((item) => item?.productId == response);
      let currentQuantity = userCart[index]?.quantity;
      if (index >= 0) {
        if (currentQuantity - 1 === 1) {
          toast.success("Item Removed");
        }
        let price = userCart[index]?.price / currentQuantity;
        let obj = {
          productId: userCart[index]?.productId,
          quantity: currentQuantity - 1,
          price: (currentQuantity - 1) * price,
        };
        userCart[index] = obj;
      }
      localStorage.setItem("usercart", JSON.stringify(userCart));
      dispatch(UserLocalCartAction(userCart));
    }
  };
  const AddQuantity = (response) => {
    setSimmer(true);
    if (user) {
      axios
        .patch(UserRequests.ADD_CART_QUANTITY + response)
        .then((response) => {
          setChange(true);
          setSimmer(false);
        })
        .catch((error) => console.log(error));
    } else {
      let userCart = JSON.parse(localStorage.getItem("usercart"));
      let index = userCart.findIndex((item) => item?.productId == response);
      if (index >= 0) {
        let currentQuantity = userCart[index]?.quantity;
        let price = userCart[index]?.price / currentQuantity;
        let obj = {
          productId: userCart[index]?.productId,
          quantity: currentQuantity + 1,
          price: (currentQuantity + 1) * price,
        };
        userCart[index] = obj;
      }
      localStorage.setItem("usercart", JSON.stringify(userCart));
      dispatch(UserLocalCartAction(userCart));
    }
  };
  useEffect(() => {
    if (change) {
      setSimmer(true)
      axios
        .get(UserRequests.GET_USER_CART + user?._id)
        .then((response) => {
          dispatch(UserCartAction(response.data?.cart));
          setChange(false);
          setSimmer(false)
        })
        .catch((error) => {
          toast.error(error.data);
          setSimmer(false)
        });
    }
  }, [change]);
  return (
    <>
      {user ? (
        <>
          {userCart.map((item, i) => {
            return (
              <>
                <div
                  key={i}
                  onClick={() => dispatch(SignUpDialogAction(false))}
                  id={item?.productId?.disabled && "cartitemDisabled"}
                  className={
                    simmer ? `sidebar_cart_card simmer` : "sidebar_cart_card"
                  }
                >
                  <img
                    onClick={() => deleteCartItem(item?._id)}
                    src={plus}
                    alt=""
                  />
                  <div className="cart__image">
                    <img
                      alt=""
                      src={
                        UserRequests.PRODUCT_IMG + item?.productId?.productImage
                      }
                    />
                  </div>
                  <div className="cartCartDetail">
                    <span>{item?.productId?.productName}</span>
                    <div className="cart_product_quantity">
                      <strong>
                        {Math.round(
                          item?.productId?.mrp -
                          (item?.productId?.mrp * item?.productId?.discount) /
                          100
                        )}
                      </strong>
                      <div className="increment">
                        {item?.productId?.disabled ? (
                          <>Coming</>
                        ) : (
                          <>
                            {item?.quantity === 1 ? (
                              <img
                                src={deletei}
                                alt=""
                                onClick={() => deleteCartItem(item?._id)}
                              />
                            ) : (
                              <img
                                src={minus}
                                alt=""
                                onClick={() => RemoveQuantity(item?._id)}
                              />
                            )}
                            <span>{item?.quantity}</span>
                            <img
                              src={plus}
                              alt=""
                              onClick={() => AddQuantity(item?._id)}
                            />
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </>
      ) : (
        <>
          {userLocalCart.map((items, i) => {
            let item = Products?.find(
              (result) => result?._id == items?.productId
            );
            return (
              <>
                <div key={i + "p"} className="sidebar_cart_card">
                  <img
                    onClick={() => deleteLocalCartItem(item?._id)}
                    src={plus}
                    alt=""
                  />
                  <div className="cart__image">
                    <img
                      alt=""
                      src={UserRequests.PRODUCT_IMG + item?.productImage}
                    />
                  </div>
                  <div className="cartCartDetail">
                    <span>{item?.productName}</span>
                    <div className="cart_product_quantity">
                      <strong>
                        {Math.round(
                          item?.mrp - (item?.mrp * item?.discount) / 100
                        )}
                      </strong>

                      <div className="increment">
                        {items?.quantity === 1 ? (
                          <img
                            src={deletei}
                            alt=""
                            onClick={() =>
                              deleteLocalCartItem(items?.productId)
                            }
                          />
                        ) : (
                          <img
                            src={minus}
                            alt=""
                            onClick={() => RemoveQuantity(item?._id)}
                          />
                        )}
                        <span>{items?.quantity}</span>
                        <img
                          src={plus}
                          alt=""
                          onClick={() => AddQuantity(item?._id)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </>
      )}
    </>
  );
};

export default SidebarCartCard;
