import React, { useRef } from "react";
import "../style/foodHome.css";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import SidebarCart from "../Components/SidebarCart";
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
  const [load, setLoad] = useState(false)
  const { seller } = useSelector((state) => state?.Products?.seller_data);
  const user = useSelector((state) => state?.User?.user);
  const category = useSelector((state) => state?.Products?.subCategory);
  const userCart = useSelector((state) => state?.User?.usercart) || [];
  const [getUserCart, setGetUserCart] = useState();
  const foodProducts =
    useSelector((state) => state?.Products?.seller_data)?.product || [];
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
            toast.success("Item Added to Cart");
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
          console.log(response);
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
  const ref1 = useRef(null);
  const scroll = (scrollOffset, curr) => {

    ref1.current.scrollLeft += scrollOffset;

  };
//  console.log( foodProducts?.filter(item =>(item?.deleteProduct)));
 
  return (
    <>
      <section className="foodpage">
        <Header />
        <div className="search-background"></div>
        <section className="fh_home">
          <section className="fh_main">
            <section className="fh_gallery">
              <div className="fh_hero">
                <div className="fh_hero_img">
                  <img src={UserRequests.SELLER_IMG + seller?.sellerImage} alt="" />
                  <div className="fh_seller_logo">
                    <img src={UserRequests.SELLER_IMG + seller?.sellerImage} />
                  </div>
                </div>
                <h2>{seller?.sellerName}</h2>
              </div>
              <hr />
              <section >
                {
                  category && category?.filter(i => i?.sellerId == seller?._id)?.map(category => {
                    return foodProducts?.filter(item =>!(item?.deleteProduct)&& (item?.subCategoryId?._id == category?._id)).length != 0 && <section className="food_slider">
                      <div className="fs_head">
                        <h3 className="down_border">{category?.subCategory}</h3>
                        <div>
                          <button onClick={() => scroll(-100, 1)} >&lt; </button>
                          <button onClick={() => scroll(100, 1)} >&gt; </button>

                        </div>
                      </div>
                      <div ref={ref1} className="fs_items" >
                        {foodProducts &&
                          foodProducts?.filter(item => !item?.deleteProduct&&(item?.subCategoryId?._id == category?._id))?.map((item) => {
                            return (
                              <div style={{ pointerEvents: load ? "none" : "auto" }} key={item._id} className={item?.disabled ? "fs_item_card disabled" : "fs_item_card"}>
                                <div className="fs_image">
                                  <img
                                    src={
                                      UserRequests.PRODUCT_IMG + item?.productImage
                                    }
                                    alt=""
                                  />
                                  {
                                    item?.disabled ? <>
                                      <span

                                      >
                                        coming soon
                                      </span>
                                    </> : <>
                                      <button

                                        onClick={() => AddToCart(item?._id, item?.price)}
                                      >
                                        ADD
                                      </button>
                                    </>
                                  }
                                </div>
                                <span>{item?.productName}</span>
                                <span>&#8377; {Math.round(item?.price)}</span>
                              </div>
                            );
                          })}
                      </div>
                    </section>
                  })
                }
              </section>

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
