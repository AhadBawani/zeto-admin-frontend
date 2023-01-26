import axios from "axios";
import React, { useEffect, useRef } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/prodHome.css";
import { Link } from "react-scroll";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Components/Header";
import {
  UserCartAction,
  CategoryToggleBtnAction,
  UserLocalCartAction,
  SignUpDialogAction,
  SearchQueryAction,
} from "../Redux/Actions/Actions";
import UserRequests from "../Requests/UserRequests";
import arrowR from "../icons/arrowR.png";
import menu from "../icons/menu.svg";
import arrowL from "../icons/arrowL.png";
import ProductCard from "../Components/ProductCard";
import SidebarCart from "../Components/SidebarCart";
import Loder from "../Components/Loder";
import Footer from "../Components/Footer";
import CategoryPopUp from "../Components/CategoryPopUp";
const Home = () => {
  document.title = "Zetomart | Groceries";
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.User?.user);
  const Products = useSelector((state) => state.Products?.Products) || [];
  const categoryToggle = useSelector((state) => state?.Toggle?.CategoryPopUp);
  let userCart = localStorage.getItem("usercart");

  useEffect(() => {
    if (!user) {
      if (!(userCart == null || userCart.length == 0)) {
        let arr = [];
        let userCart = JSON.parse(localStorage.getItem("usercart"));
        userCart.map((item) => {
          let obj = {
            productId: item?.productId,
            quantity: item?.quantity,
            price: item?.price,
          };
          arr.push(obj);
        });
        dispatch(UserLocalCartAction(arr));
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      if (!(userCart == null || userCart.length == 0)) {
        let userCart = JSON.parse(localStorage.getItem("usercart"));
        userCart.map((item) => {
          let obj = {
            userId: user?._id,
            productId: item?.productId,
            quantity: item?.quantity,
          };
          axios
            .post(UserRequests.ADD_TO_CART, obj)
            .then((response) => {
              axios
                .get(UserRequests.GET_USER_CART + user?._id)
                .then((response) => {
                  dispatch(UserCartAction(response.data?.cart));
                  localStorage.removeItem("usercart");
                  dispatch(UserLocalCartAction(null));
                })
                .catch((error) => { });
            })
            .catch((error) => {
              console.log(error);
            });
        });
      }
    }
  }, [user]);

  const UniqueCategory = [];
  Products.map((item) => {
    if (UniqueCategory.includes(item.category)) return null;
    return UniqueCategory.push(item.category);
  });
  const filterData = (product, category) => {
    return product.filter((i) => {
      return i.category == category;
    });
  };

  const ref = useRef(null);
  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
    console.log("scroll");
  };
  return (
    <>
      <div onClick={(e) => dispatch(SearchQueryAction(""))} className="Homapage">
        <Header />
        <section onClick={() => dispatch(SignUpDialogAction(false))} className="main_home">
          <section className="home">
            <div className="stickOnTop">
              {categoryToggle && <CategoryPopUp Category={UniqueCategory} />}
              <div className="home_header">
                <h2>groceries</h2>
                <span>(we deliver same day)</span>
              </div>
              <div className="main__category">
                <img
                  onClick={() => dispatch(CategoryToggleBtnAction(true))}
                  src={menu}
                  alt=""
                />
                <img onClick={() => scroll(-40)} src={arrowL} alt="p" />
                <div className="main__slider" ref={ref}>
                  {Products.length !== 0 ? (
                    <>
                      {UniqueCategory.map((item) => {
                        return (
                          <Link
                            activeClass="active"
                            spy={true}
                            smooth={true}
                            offset={-140}
                            duration={300}
                            to={item}
                          >
                            {item}
                          </Link>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      <a className="skeleton skeleton-text catLoading"> </a>
                      <a className="skeleton skeleton-text catLoading"></a>
                      <a className="skeleton skeleton-text catLoading"></a>
                      <a className="skeleton skeleton-text catLoading"></a>
                      <a className="skeleton skeleton-text catLoading"></a>
                    </>
                  )}
                </div>
                <img onClick={() => scroll(40)} src={arrowR} alt="p" />
              </div>
            </div>


            <div className="product__gallery">
              {Products.length !== 0 ? (
                UniqueCategory.map((i) => {
                  return (
                    <>
                      <div className="cat_header">
                        <h2 className={i}>{i}</h2>
                        <span>Fresh vegetables for good health.</span>
                      </div>
                      <div className="product_category_gallery">
                        {filterData(Products, i).map((product) => {
                          return <ProductCard cartData={product} />;
                        })}
                      </div>
                    </>
                  );
                })
              ) : (
                <>
                  <Loder />
                </>
              )}
            </div>
          </section>
          <SidebarCart />
        </section>
        <Footer />
      </div>
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

export default Home;
// ese matt kEO
