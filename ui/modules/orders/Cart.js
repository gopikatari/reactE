import React, {useEffect} from 'react';
import * as orderActions from '../../redux/orders/order.actions';
import * as orderReducer from '../../redux/orders/order.reducer';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

let Cart = () => {
    let dispatch = useDispatch();

    let orderInfo = useSelector((state) => {
        return state[orderReducer.orderFeatureKey];
    });

    let {cartItems} = orderInfo;

    useEffect(() => {

    }, []);

    let calcTotal = () => {
        let total = 0;
        for(let cartItem of cartItems){
            total += (cartItem.price * cartItem.qty)
        }
        return total;
    };

    let calcTax = () => {
        let tax = Number(process.env.REACT_APP_PRODUCT_TAX);
        return calcTotal() * tax / 100;
    };

    let calcGrandTotal = () => {
        return calcTotal() + calcTax();
    };

    let clickIncrCartItemQty = (productId) => {
        dispatch(orderActions.incrCartItemQty(productId));
    };

    let clickDecrCartItemQty = (productId) => {
        dispatch(orderActions.decrCartItemQty(productId));
    };

    let clickDeleteCartItem = (productId) => {
        dispatch(orderActions.deleteCartItem(productId));
    };

    return (
        <React.Fragment>
            <section className="bg-brown text-dark p-2">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h3>
                                <i className="fa fa-shopping-cart"/> Your Cart</h3>
                        </div>
                    </div>
                </div>
            </section>
            {
                cartItems.length > 0 ?
                    <React.Fragment>
                        <section>
                            <div className="container mt-3">
                                <div className="row">
                                    <div className="col-md-8">
                                        <div className="card">
                                            <div className="card-header bg-dark text-brown">
                                                <p className="h4">Your Cart Items</p>
                                            </div>
                                            <div className="card-body">
                                                <table className="table table-hover text-center bg-brown table-striped">
                                                    <thead className="bg-brown text-dark">
                                                    <tr>
                                                        <th>SNO</th>
                                                        <th>Image</th>
                                                        <th>Name</th>
                                                        <th>Price</th>
                                                        <th>Qty</th>
                                                        <th>Action</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            cartItems.map((cartItem, index) => {
                                                                return (
                                                                    <tr key={cartItem._id}>
                                                                        <td>{index + 1}</td>
                                                                        <td>
                                                                            <img src={cartItem.image} alt="" width="30" height="45"/>
                                                                        </td>
                                                                        <td>{cartItem.name}</td>
                                                                        <td>&#8377;{cartItem.price.toFixed(2)}</td>
                                                                        <td>
                                                                            <i className="fa fa-minus-circle mx-1" onClick={clickDecrCartItemQty.bind(this,cartItem._id)}/>
                                                                            {cartItem.qty}
                                                                            <i className="fa fa-plus-circle mx-1" onClick={clickIncrCartItemQty.bind(this,cartItem._id)}/>
                                                                        </td>
                                                                        <td>
                                                                            <button className="btn btn-danger btn-sm" onClick={clickDeleteCartItem.bind(this, cartItem._id)}>delete</button>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card">
                                            <div className="card-header bg-dark text-brown">
                                                <p className="h4">Your Total</p>
                                            </div>
                                            <div className="card-body">
                                                <ul className="list-group">
                                                    <li className="list-group-item bg-brown">
                                                        Total : <span className="font-weight-bold">&#8377;{calcTotal().toFixed(2)}</span>
                                                    </li>
                                                    <li className="list-group-item bg-brown">
                                                        Tax : <span className="font-weight-bold">&#8377;{calcTax().toFixed(2)}</span>
                                                    </li>
                                                    <li className="list-group-item bg-brown">
                                                        Grand Total : <span className="font-weight-bold">&#8377;{calcGrandTotal().toFixed(2)}</span>
                                                    </li>
                                                </ul>
                                                <div className="mt-2">
                                                    <Link to="/orders/checkout" className="btn btn-success btn-sm">Checkout</Link>
                                                    <Link to="/" className="btn btn-secondary btn-sm">Shop More</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </React.Fragment> :
                    <React.Fragment>
                        <div className="mt-4 text-center">
                            <p className="h4 text-brown">--------- Cart is Empty -------</p>
                            <Link to="/" className="btn btn-brown btn-sm text-dark">Shop Now</Link>
                        </div>
                    </React.Fragment>
            }
        </React.Fragment>
    )
};
export default Cart;