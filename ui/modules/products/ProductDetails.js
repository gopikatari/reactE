import React, {useEffect, useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import * as productActions from '../../redux/products/product.actions';
import * as productReducer from '../../redux/products/product.reducer';
import {useDispatch, useSelector} from "react-redux";
import Spinner from "../../layout/util/spinner/Spinner";
import * as orderActions from '../../redux/orders/order.actions';

let ProductDetails = () => {
    let dispatch = useDispatch();
    let history = useHistory();

    let [selectedQty , setSelectedQty] = useState('');

    let productId = useParams().productId;

    let selectedProductInfo = useSelector((state) => {
        return state[productReducer.productFeatureKey];
    });

    let {loading , selectedProduct} = selectedProductInfo;

    useEffect(() => {
        dispatch(productActions.getProduct(productId))
    }, [productId]);

    let submitAddToCart = (event) => {
        event.preventDefault();
        selectedProduct.qty = (selectedQty !== '') ? Number(selectedQty) : 1;
        dispatch(orderActions.addToCart(selectedProduct, history));
    }

    return (
        <React.Fragment>
            <section className="bg-brown text-dark p-2">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h3>Your Selected Product</h3>
                        </div>
                    </div>
                </div>
            </section>
            {
                loading ? <Spinner/> :
                    <React.Fragment>
                        <section className="mt-4">
                            <div className="container">
                                <div className="row">
                                    {
                                        Object.keys(selectedProduct).length > 0 &&
                                        <React.Fragment>
                                            <div className="col-md-4 text-center">
                                                <img src={selectedProduct.image} alt="" className="img-fluid product-img"/>
                                            </div>
                                            <div className="col-md-8">
                                                <p className="h3">NAME : {selectedProduct.name}</p>
                                                <p className="h5">Brand : {selectedProduct.brand}</p>
                                                <p className="h5">Price :
                                                    <span className="font-weight-bold">&#8377;{selectedProduct.price.toFixed(2)}</span>
                                                </p>
                                                <div>
                                                    <form className="form-inline" onSubmit={submitAddToCart}>
                                                        <div className="form-group">
                                                            <select
                                                                value={selectedQty}
                                                                onChange={e => setSelectedQty(e.target.value)}
                                                                className="form-control">
                                                                <option value="">Select a Qty</option>
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4</option>
                                                                <option value="5">5</option>
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <input type="submit" className="btn btn-brown btn-sm text-dark" value="Add to Cart"/>
                                                        </div>
                                                    </form>
                                                </div>
                                                <p>{selectedProduct.usage}</p>
                                                <p>{selectedProduct.description}</p>
                                            </div>
                                        </React.Fragment>
                                    }
                                </div>
                            </div>
                        </section>
                    </React.Fragment>
            }
        </React.Fragment>
    )
};
export default ProductDetails;