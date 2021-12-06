import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as orderActions from "../../../redux/order/order.action";

const ProductCard = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { product } = props;

  const handleAddtoCart = (event, item) => {
    event.preventDefault();
    item.qty = 1;
    dispatch(orderActions.addToCart(item, history));
  };

  return (
    <div className="col-md-3 mt-3">
      <div className="card">
        <div className="card-header text-center">
          <Link to={`/product-item/${product._id}`}>
            <img src={product.image} alt="" height="200" width="230" />
          </Link>
        </div>
        <div className="card-body text-center bg-light">
          <p className="h5 text-success font-weight-bold">{product.brand}</p>

          <span className="font-weight-bolder text-danger">
            &#8377; {product?.price}
          </span>
          <br />
          <button
            onClick={(e) => handleAddtoCart(e, product)}
            className="btn btn-brown btn-sm"
          >
            Add to Cart!
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
