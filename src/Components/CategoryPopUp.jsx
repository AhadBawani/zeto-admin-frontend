import React, { useEffect, useRef } from "react";
import "../style/categoryPopup.css";
import close from "../icons/close.png";
import { Link } from "react-scroll";
import { useDispatch } from "react-redux";
import { CategoryToggleBtnAction } from "../Redux/Actions/Actions";
function useOutsideAlerter(ref) {
  const dispatch = useDispatch();
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        dispatch(CategoryToggleBtnAction(false));
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
const CategoryPopUp = ({ Category }) => {
  const dispatch = useDispatch();

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  return (
    <>
      <div ref={wrapperRef} className="categoryPopup">
        <div className="popUpHeading">
          <h1>Item Category</h1>
          <img
            onClick={() => dispatch(CategoryToggleBtnAction(false))}
            src={close}
            alt=""
          />
        </div>
        {Category &&
          Category.map((item) => {
            return (
              <>
                <div onClick={() => dispatch(CategoryToggleBtnAction(false))} className="category__list">
                  <Link
                    activeClass="active"
                    spy={true}
                    smooth={true}
                    offset={-160}
                    duration={300}
                    to={item}
                    key={item}
                  >
                    {item}
                  </Link>
                  <span></span>
                </div>
              </>
            );
          })}
        <span></span>
      </div>
    </>
  );
};

export default CategoryPopUp;
