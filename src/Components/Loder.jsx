import React from "react";
import "../style/loading.css";
const arr =[1,2,3,4,5,6,6,7,4,5,4]
const Loder = () => {
  return (
    <>
      <div className="loading">
        {
          arr.map(()=>{
           return <div className="card">
          <div className="text" data-body>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
          </div>
          <img alt = "" className="header-img skeleton" />
        </div>
          })
        }
    
      </div>
    </>
  );
};

export default Loder;
