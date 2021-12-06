import React, { useEffect } from "react";
import * as productReducer from "../../redux/product/product.reducer";
import * as productActions from "../../redux/product/product.actions";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "./../../layouts/utils/spinner/Spinner";

import ProductCard from "./../../layouts/components/common/productCard";
import { useParams } from "react-router-dom";

const ProductList = (props) => {
  let category = useParams().category;
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(productActions.getProductsByCategory(category));
  }, [dispatch, category]);
  let products_info = useSelector((state) => {
    return state[productReducer.productFeatureKey];
  });
  let { products, loading } = products_info;

  return (
    <React.Fragment>
      <section className="paddingTop">
        <div className="container-fluid">
          <div className="row p-3 bg-info">
            <div className="container">
              <div className="col text-white">
                <p className="h4">Product List</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div>
            {loading ? (
              <Spinner />
            ) : (
              <div className="row animated fadeInRight">
                {products.length === 0 && (
                  <div className="container mt-4 text-danger text-center">
                    <p className="h2"> No Products found </p>
                  </div>
                )}
                <React.Fragment>
                  {products.map((product) => (
                    <ProductCard product={product} key={product._id} />
                  ))}
                </React.Fragment>
              </div>
            )}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default ProductList;
