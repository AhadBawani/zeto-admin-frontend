import axios from "axios";
import React, { useEffect, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";
import "../style/prodHome.css";
import { Link } from "react-scroll";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Components/Header";
import {
  UserCartAction,
  CategoryToggleBtnAction,
  UserLocalCartAction,
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
  var { product, seller } = useSelector((state) => state?.Products?.seller_data);
  const category = useSelector((state) => state?.Products?.subCategory);
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

  const sellerCategory = category.filter(i => i?.sellerId == seller?._id)
  const filterData = (product, category) => {
    const res = product.filter((i) => {
      return i?.subCategoryId?._id == category;
    });
    return res

  };

  const ref = useRef(null);
  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };
  return (
    <>
      <div onClick={(e) => dispatch(SearchQueryAction(""))} className="Homapage">
        <Header />
        <section className="main_home">
          <section className="home">
            <div className="stickOnTop">
              {categoryToggle && <CategoryPopUp Category={sellerCategory} />}
              <div className="home_header">
                <h2>{seller?.sellerName}</h2>
                <span> ( we deliver same day)</span>
              </div>
              <div className="main__category">
                <img
                  onClick={() => dispatch(CategoryToggleBtnAction(true))}
                  src={menu}
                  alt=""
                />
                <img onClick={() => scroll(-40)} src={arrowL} alt="p" />
                <div className="main__slider" ref={ref}>
                  {product.length !== 0 ? (
                    <>
                      {sellerCategory.map((item) => {
                        return (
                          <Link
                            activeClass="active"
                            spy={true}
                            smooth={true}
                            offset={-140}
                            duration={300}
                            to={item?.subCategory}
                          >
                            {item?.subCategory}
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
              {product.length !== 0 ? (
                sellerCategory.map((i) => {
                  return (filterData(product, i?._id).length != 0) && (
                    <>
                      <div className="cat_header">
                        <h2 className={i?.subCategory}>{i?.subCategory}</h2>

                      </div>
                      <div className="product_category_gallery">
                        {filterData(product, i?._id).map((product) => {
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

    </>
  );
};

export default Home;
// ese matt kEO
