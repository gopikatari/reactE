import React, {useEffect} from 'react';
import product from "../../assets/img/products/women/women_7.jpg";
import {useDispatch, useSelector} from "react-redux";
import * as productReducer from "../../redux/products/product.reducer";
import * as productActions from "../../redux/products/product.actions";
import Spinner from "../../layout/util/spinner/Spinner";
import {Link, useHistory} from "react-router-dom";
import * as orderActions from "../../redux/orders/order.actions";

let WomensWear = () => {
    let dispatch = useDispatch();
    let history = useHistory();

    // get products data from the REDUX Store
    let productInfo = useSelector((state) => {
        return state[productReducer.productFeatureKey];
    });

    let {loading , products} = productInfo;

    useEffect(() => {
        dispatch(productActions.getWomenProducts());
    }, []);

    let clickAddToCart = (product) => {
        product.qty = 1;
        dispatch(orderActions.addToCart(product , history));
    };

    return (
        <React.Fragment>
            <section className="bg-brown text-dark p-2">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h3>Women's Wear</h3>
                        </div>
                    </div>
                </div>
            </section>
            {
                loading ? <Spinner/> :
                    <React.Fragment>
                        {
                            products.length > 0 ?
                                <React.Fragment>
                                    <section>
                                        <div className="container mt-3">
                                            <div className="row">
                                                {
                                                    products.map(product => {
                                                        return (
                                                            <div className="col-md-3" key={product._id}>
                                                                <div className="card">
                                                                    <div className="card-header bg-white text-center">
                                                                        <Link to={`/products/${product._id}`}>
                                                                            <img src={product.image} alt=""/>
                                                                        </Link>
                                                                    </div>
                                                                    <div className="card-body text-center">
                                                                        <small className="lead font-weight-bold">{product.name}</small><br/>
                                                                        <small className="lead font-weight-bold">{product.brand}</small><br/>
                                                                        <small className="font-weight-bold">&#8377; {product.price.toFixed(2)}</small><br/>
                                                                        <button onClick={clickAddToCart.bind(this,product)} className="btn btn-brown text-dark btn-sm">Add to Cart</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </section>
                                </React.Fragment> : null
                        }
                    </React.Fragment>
            }

        </React.Fragment>
    )
};
export default WomensWear;