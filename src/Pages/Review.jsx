import React, { useState } from "react";
import "../style/review.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useSelector } from "react-redux";

import { useEffect } from "react";
const Review = () => {
  const [reviews, setReview] = useState([]);
  const { review, averageRating } = useSelector((state) => state?.Products?.seller_data);
  const [sortReview, setSortReveiw] = useState([...review])

  useEffect(() => {
    const sumArr = [0, 0, 0, 0, 0];
    review?.map((i) => {
      if (i.rating === 1) sumArr[0] += 1;
      else if (i.rating === 2) sumArr[1] += 1;
      else if (i.rating === 3) sumArr[2] += 1;
      else if (i.rating === 4) sumArr[3] += 1;
      else sumArr[4] += 1;
    });
    setReview([...sumArr]);
  }, []);
  const reviewSort = (e) => {
    if (e.target.value == "negative") {
      let newArray = sortReview.sort((a, b) => b.rating - a.rating)
      setSortReveiw([...newArray]);
    }
    else if (e.target.value == "positive") {
      let newArray = sortReview.sort((a, b) => a.rating - b.rating)
      setSortReveiw([...newArray]);
    }

    else if (e.target.value == "newest") {

      setSortReveiw([...review]);
      console.log(sortReview);
    }

  }

  return (
    <section className="review">
      <Header />
      <section className="r-body">
        <div className="r-left">
          <strong>Customer reviews</strong>
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
                      index <= averageRating ? "on" : "off"
                    }
                  >
                    <span className="star">&#9733;</span>
                  </button>
                );
              })}
            </div>
            <span>{averageRating} out of 5</span>
          </span>
          <span> {sortReview?.length} Total Rating</span>
          <div className="rating-bar">
            {reviews?.map((i, j) => {
              return (
                <div key={i?._id}>
                  <span>{j + 1} star</span>
                  <span>
                    {" "}
                    <span
                      className="review-len"
                      style={{
                        width: `${(100 * i) / sortReview?.length}%`,
                      }}
                    ></span>
                  </span>
                  <span>
                    {i ? Math.round((100 * i) / sortReview?.length) : 0}%
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
              <select onChange={reviewSort} id="">
                <option value="newest">Newest</option>
                <option value="positive">Positive</option>
                <option value="negative">Negative</option>
              </select>
            </span>
          </div>
          <div className="all-review-flex">
            {sortReview &&
              sortReview?.map((i) => {
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

                    </div>
                    <p>{i?.review}</p>
                    <hr />
                  </article>
                );
              })}
          </div>
        </div>
      </section>
      <Footer />
    </section>
  );
};

export default Review;
