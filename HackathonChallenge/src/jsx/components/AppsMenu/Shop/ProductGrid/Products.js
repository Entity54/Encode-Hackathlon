import React from "react";
import { Link } from "react-router-dom";

const Products = ({ product: { previewImg, title, rating, price } }) => {
  return (
    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
      <div className="card">
        <div className="card-body">
          <div className="new-arrival-product">
            <div className="new-arrivals-img-contnent">
              <img className="img-fluid" src={previewImg} alt="" />
            </div>
            <div className="new-arrival-content text-center mt-3">
              <h4>
                {title}
              </h4>
              <span className="price">ACA {price}</span>
            </div>
            <div className="new-arrival-content text-center mt-3">
										<Link to={"#"} className="btn btn-primary  btn-lg rounded">BUY</Link>
						</div>
          </div>
        </div>
      </div>
    </div> 
  );
};

export default Products;
