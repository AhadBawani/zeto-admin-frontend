import axios from "axios";
import React, { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { UserOrderAction } from "../Redux/Actions/Actions";
import UserRequests from "../Requests/UserRequests";
import "../style/rating.css";

function useOutsideAlerter(ref, setOrderId) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOrderId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

const Rating = ({ orderId, setOrderId }) => {
  const wrapperRef = useRef(null);
  const dispatch = useDispatch();

  useOutsideAlerter(wrapperRef, setOrderId);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const user = useSelector((state) => state?.User?.user);
  const userOrder = useSelector((state) => state?.User?.userOrders) || [];

  const submitHandler = () => {
    if (user) {
      let obj = {
        orderId: orderId.toString(),
        userId: user?._id,
        rating: rating,
        review: review,
      };
      axios
        .post(UserRequests.ORDER_REVIEW, obj)
        .then((res) => {
          toast.success(res?.data?.message);
          axios
            .get(UserRequests.GET_ORDER + user?._id)
            .then((res) => {
              dispatch(UserOrderAction(res.data));
            })
            .catch((err) => {
              toast.error(err);
            });

          setOrderId(null);
        })
        .catch((err) => {
          toast.success(err.response.data.message);
          setOrderId(null);
        });
    } else {
      toast.error("TO submit Review you Have to login");
    }
  };
  return (
    <>
      {orderId && (
        <section ref={wrapperRef} className="rating signInMdel">
          <div className="star-rating">
            {[...Array(5)].map((star, index) => {
              index += 1;
              return (
                <button
                  type="button"
                  key={index}
                  id="reviewStar"
                  className={index <= rating ? "on" : "off"}
                  onClick={() => setRating(index)}
                >
                  <span className="star">&#9733;</span>
                </button>
              );
            })}
          </div>
          <textarea
            onChange={(e) => setReview(e.target.value)}
            rows={10}
          ></textarea>
          <button onClick={submitHandler}>Submit Review</button>
        </section>
      )}
    </>
  );
};

export default Rating;
