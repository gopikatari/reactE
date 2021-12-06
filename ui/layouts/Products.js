import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as productActions from "../redux/product/product.actions";
import * as productReducer from "../redux/product/product.reducer";
import Spinner from "./utils/spinner/Spinner";

const Products = () => {
  const dispatch = useDispatch();
  const product_info = useSelector((state) => {
    return state[productReducer.productFeatureKey];
  });

  useEffect(() => {
    dispatch(productActions.getCategories());
  }, [dispatch]);
  let { loading, categories } = product_info;

  return (
    <React.Fragment>
      <section className="paddingTop">
        <div className="container">
          <div className="row"></div>
        </div>
      </section>
      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <div className="container mt-4">
            <div className="row">
              {categories?.map((cat) => (
                <div className="col-md-4 animated rotateIn" key={cat._id}>
                  <Link to={`/products/${cat.name}`}>
                    <div className="card products_card bg-default text-center align-items-center justify-content-center">
                      <p className="h4 text-white font-weight-bold">
                        {cat.name}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Products;
