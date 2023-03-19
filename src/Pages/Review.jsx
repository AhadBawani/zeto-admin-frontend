import React, { useState } from "react";
import "../style/review.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useSelector } from "react-redux";

import { useEffect } from "react";
const Review = () => {
  const [review, setReview] = useState([]);
  const sellerReview = useSelector((state) => state?.Products?.seller_data);
  useEffect(() => {
    const sumArr = [0, 0, 0, 0, 0];
    sellerReview?.review?.map((i) => {
      if (i.rating === 1) sumArr[0] += 1;
      else if (i.rating === 2) sumArr[1] += 1;
      else if (i.rating === 3) sumArr[2] += 1;
      else if (i.rating === 4) sumArr[3] += 1;
      else sumArr[4] += 1;
    });
    setReview([...sumArr]);
  }, []);

  return (
    <section className="review">
      <Header />
      <section className="r-body">
        <div className="r-left">
          <strong>Costomer reviews</strong>
          <span>
            <div className="star-rating">
              {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                  <button
                    type="button"
                    key={index}
                    id="reviewStar"
                    className={
                      index <= sellerReview?.averageRating ? "on" : "off"
                    }
                  >
                    <span className="star">&#9733;</span>
                  </button>
                );
              })}
            </div>
            <span>{sellerReview?.averageRating} out of 5</span>
          </span>
          <span> {sellerReview?.review?.length} Total Rating</span>
          <div className="rating-bar">
            {review?.map((i, j) => {
              return (
                <div>
                  <span>{j + 1} star</span>
                  <span>
                    {" "}
                    <span
                    className="review-len"
                      style={{
                        width: `${(100 * i) / sellerReview?.review?.length}%`,
                      }}
                    ></span>
                  </span>
                  <span>
                    {i ? Math.round((100 * i) / sellerReview?.review?.length) : 0}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="r-right">
          <div className="r-sorting">
            <span>Product</span>
            <span>
              Sort By
              <select name="" id="">
                <option value="newest">Newest</option>
                <option value="positive">Positive</option>
                <option value="negative">Negative</option>
              </select>
            </span>
          </div>
          {sellerReview?.review &&
            sellerReview?.review?.map((i) => {
              return (
                <article className="user-review">
                  <div className="reviewer">
                    <span>
                      <strong>{i?.userId?.username}</strong>
                      <div className="star-rating">
                        {[...Array(5)].map((star, index) => {
                          index += 1;
                          return (
                            <button
                              type="button"
                              key={index}
                              id="reviewStar"
                              className={index <= i?.rating ? "on" : "off"}
                            >
                              <span className="star">&#9733;</span>
                            </button>
                          );
                        })}
                      </div>
                    </span>
                    <span>2 Days ago</span>
                  </div>
                  <p>{i?.review}</p>
                  <hr />
                </article>
              );
            })}
        </div>
      </section>
      <Footer />
    </section>
  );
};

export default Review;
