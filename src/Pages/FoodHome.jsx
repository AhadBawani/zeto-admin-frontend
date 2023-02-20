import React, { useRef } from "react";
import "../style/foodHome.css";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import SidebarCart from "../Components/SidebarCart";
import arrowL from "../icons/arrowL.png";
import arrowR from "../icons/arrowR.png";
import { useDispatch, useSelector } from "react-redux";
import UserRequests from "../Requests/UserRequests";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { UserCartAction, UserLocalCartAction } from "../Redux/Actions/Actions";
const FoodHome = () => {
  document.title = "Zetomart | Street food";
  const dispatch = useDispatch();
  const {seller} = useSelector((state) => state?.Products?.seller_data);
  const user = useSelector((state) => state?.User?.user);
  const userCart = useSelector((state) => state?.User?.usercart) || [];
  const [getUserCart, setGetUserCart] = useState();
  const foodProducts =
    useSelector((state) => state?.Products?.seller_data)?.product || [];
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
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
        };
        ar.push(obj);
        localStorage.setItem("usercart", JSON.stringify(ar));
        dispatch(UserLocalCartAction(ar));
      } else {
        let userCart = JSON.parse(localStorage.getItem("usercart"));

        if (userCart) {
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
          } else {
            let obj = {
              productId: response,
              quantity: 1,
              price: price,
            };
            userCart.push(obj);
          }
          localStorage.setItem("usercart", JSON.stringify(userCart));
          dispatch(UserLocalCartAction(userCart));
        } else {
          var ar = [];
          let obj = {
            productId: response,
            quantity: 1,
            price: price,
          };
          ar.push(obj);
          localStorage.setItem("usercart", JSON.stringify(ar));
          dispatch(UserLocalCartAction(ar));
        }
      }
      toast.success("Item Added to Cart");
    }
  };

  useEffect(() => {
    if (getUserCart) {
      axios
        .get(UserRequests.GET_USER_CART + user?._id)
        .then((response) => {
          dispatch(UserCartAction(response.data?.cart));
          setGetUserCart(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [getUserCart]);

  const scroll = (scrollOffset, curr) => {
    if (curr === 1) {
      ref1.current.scrollLeft += scrollOffset;
    } else if (curr === 2) {
      ref2.current.scrollLeft += scrollOffset;
    } else if (curr === 3) {
      ref3.current.scrollLeft += scrollOffset;
    }
  };
  return (
    <>
      <section className="foodpage">
        <Header />
        <section className="fh_home">
          <section className="fh_main">
            <section className="fh_gallery">
              <div className="fh_hero">
                <div className="fh_hero_img">
                  <img src={UserRequests.SELLER_IMG+seller?.sellerImage} alt="" />
                  <div className="fh_seller_logo">
                    <img src={UserRequests.SELLER_IMG+seller?.sellerImage} />
                  </div>
                </div>
                <h2>{seller?.sellerName}</h2>
              </div>
              <hr />
              <section className="food_slider">
                <div className="fs_head">
                  <h3 className="down_border">Featured Items</h3>
                  <div>
                    <img src={arrowL} onClick={() => scroll(-100, 1)} />
                    <img src={arrowR} onClick={() => scroll(100, 1)} />
                  </div>
                </div>
                <div className="fs_items" ref={ref1}>
                  {foodProducts &&
                    foodProducts.map((item) => {
                      return (
                        <div className="fs_item_card">
                          <div className="fs_image">
                            <img
                              src={
                                UserRequests.PRODUCT_IMG + item?.productImage
                              }
                              alt=""
                            />
                            <span
                              onClick={() => AddToCart(item?._id, item?.price)}
                            >
                              ADD
                            </span>
                          </div>
                          <span>{item?.productName}</span>
                          <span>&#8377; {Math.round(item?.price)}</span>
                        </div>
                      );
                    })}
                </div>
              </section>
              {/* <section className="food_slider">
                <div className="fs_head">
                  <h3 className="down_border">Dessert</h3>
                  <div>
                    <img src={arrowL} onClick={() => scroll(-100, 2)} />
                    <img src={arrowR} onClick={() => scroll(100, 2)} />
                  </div>
                </div>
                <div className="fs_items" ref={ref2}>
                  <div className="fs_item_card">
                    <div className="fs_image">
                      <img src={seller} alt="" />
                      <span>ADD</span>
                    </div>
                    <span>Panneer Momos</span>
                    <span>&#8377; 555</span>
                  </div>
                  <div className="fs_item_card">
                    <div className="fs_image">
                      <img src={seller} alt="" />
                      <span>ADD</span>
                    </div>
                    <span>Panneer Momos</span>
                    <span>&#8377; 555</span>
                  </div>
                  <div className="fs_item_card">
                    <div className="fs_image">
                      <img src={seller} alt="" />
                      <span>ADD</span>
                    </div>
                    <span>Panneer Momos</span>
                    <span>&#8377; 555</span>
                  </div>
                  <div className="fs_item_card">
                    <div className="fs_image">
                      <img src={seller} alt="" />
                      <span>ADD</span>
                    </div>
                    <span>Panneer Momos</span>
                    <span>&#8377; 555</span>
                  </div>
                  <div className="fs_item_card">
                    <div className="fs_image">
                      <img src={seller} alt="" />
                      <span>ADD</span>
                    </div>
                    <span>Panneer Momos</span>
                    <span>&#8377; 555</span>
                  </div>
                  <div className="fs_item_card">
                    <div className="fs_image">
                      <img src={seller} alt="" />
                      <span>ADD</span>
                    </div>
                    <span>Panneer Momos</span>
                    <span>&#8377; 555</span>
                  </div>
                  <div className="fs_item_card">
                    <div className="fs_image">
                      <img src={seller} alt="" />
                      <span>ADD</span>
                    </div>
                    <span>Panneer Momos</span>
                    <span>&#8377; 555</span>
                  </div>
                  <div className="fs_item_card">
                    <div className="fs_image">
                      <img src={seller} alt="" />
                      <span>ADD</span>
                    </div>
                    <span>Panneer Momos</span>
                    <span>&#8377; 555</span>
                  </div>
                  <div className="fs_item_card">
                    <div className="fs_image">
                      <img src={seller} alt="" />
                      <span>ADD</span>
                    </div>
                    <span>Panneer Momos</span>
                    <span>&#8377; 555</span>
                  </div>
                </div>
              </section>
              <section className="food_slider">
                <div className="fs_head">
                  <h3 className="down_border">Drink </h3>
                  <div>
                    <img src={arrowL} onClick={() => scroll(-100, 3)} />
                    <img src={arrowR} onClick={() => scroll(100, 3)} />
                  </div>
                </div>
                <div className="fs_items" ref={ref3}>
                  <div className="fs_item_card">
                    <div className="fs_image">
                      <img src={seller} alt="" />
                      <span>ADD</span>
                    </div>
                    <span>Panneer Momos</span>
                    <span>&#8377; 555</span>
                  </div>
                  <div className="fs_item_card">
                    <div className="fs_image">
                      <img src={seller} alt="" />
                      <span>ADD</span>
                    </div>
                    <span>Panneer Momos</span>
                    <span>&#8377; 555</span>
                  </div>
                  <div className="fs_item_card">
                    <div className="fs_image">
                      <img src={seller} alt="" />
                      <span>ADD</span>
                    </div>
                    <span>Panneer Momos</span>
                    <span>&#8377; 555</span>
                  </div>
                  <div className="fs_item_card">
                    <div className="fs_image">
                      <img src={seller} alt="" />
                      <span>ADD</span>
                    </div>
                    <span>Panneer Momos</span>
                    <span>&#8377; 555</span>
                  </div>
                  <div className="fs_item_card">
                    <div className="fs_image">
                      <img src={seller} alt="" />
                      <span>ADD</span>
                    </div>
                    <span>Panneer Momos</span>
                    <span>&#8377; 555</span>
                  </div>
                  <div className="fs_item_card">
                    <div className="fs_image">
                      <img src={seller} alt="" />
                      <span>ADD</span>
                    </div>
                    <span>Panneer Momos</span>
                    <span>&#8377; 555</span>
                  </div>
                  <div className="fs_item_card">
                    <div className="fs_image">
                      <img src={seller} alt="" />
                      <span>ADD</span>
                    </div>
                    <span>Panneer Momos</span>
                    <span>&#8377; 555</span>
                  </div>
                  <div className="fs_item_card">
                    <div className="fs_image">
                      <img src={seller} alt="" />
                      <span>ADD</span>
                    </div>
                    <span>Panneer Momos</span>
                    <span>&#8377; 555</span>
                  </div>
                  <div className="fs_item_card">
                    <div className="fs_image">
                      <img src={seller} alt="" />
                      <span>ADD</span>
                    </div>
                    <span>Panneer Momos</span>
                    <span>&#8377; 555</span>
                  </div>
                </div>
              </section> */}
            </section>
            <SidebarCart />
          </section>
        </section>
        <Footer />
      </section>
    </>
  );
};

export default FoodHome;
