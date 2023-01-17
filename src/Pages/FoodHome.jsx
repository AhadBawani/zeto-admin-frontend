import React, { useRef } from "react";
import "../style/foodHome.css";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import SidebarCart from "../Components/SidebarCart";
import seller from "../icons/pppp.webp";
import hero from "../icons/hero.png";
import arrowL from "../icons/arrowL.png";
import arrowR from "../icons/arrowR.png";

const FoodHome = () => {
  document.title = "Zetomart | Street food";
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
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
                  <img src={seller} alt="" />
                  <div className="fh_seller_logo">
                    <img src={hero} />
                  </div>
                </div>
                <h2>Ruhi Momos</h2>
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
