import React from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import * as userReducer from '../../redux/users/user.reducers';
import * as orderReducer from '../../redux/orders/order.reducer';
import * as orderActions from '../../redux/orders/order.actions';
import Spinner from "../../layout/util/spinner/Spinner";
import StripeCheckout from 'react-stripe-checkout';
import stripeImage from '../../assets/img/uibrains.png';
import {useHistory} from 'react-router-dom';


let CheckOut = () => {
    let dispatch = useDispatch();
    let history = useHistory();

    let userInfo = useSelector((state) => {
        return state[userReducer.userFeatureKey];
    });

    let cartInfo = useSelector((state) => {
        return state[orderReducer.orderFeatureKey];
    });

    let {loading , user} = userInfo;
    let {cartItems} = cartInfo;

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

    let clickPayment = (token) => {
        let items = cartItems.map(item => {
            return {
                name : item.name,
                brand : item.brand,
                price : item.price,
                qty : item.qty
            }
        });
        let order = {
            items : items,
            tax : calcTax(),
            total : calcTotal()
        }

        let product = {
            price : Number(calcGrandTotal()) * 100,
            name : 'Products from  BrainsKart'
        };
        let body = {
            token , product
        };
        dispatch(orderActions.makeStripePayment(body , history, order));
    };



    return (
        <React.Fragment>
            <section className="bg-brown text-dark p-2">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h3>
                                <i className="fa fa-check-circle"/> Checkout Your Items</h3>
                        </div>
                    </div>
                </div>
            </section>
            {
                loading ? <Spinner/> :
                    <React.Fragment>
                        {
                            Object.keys(user).length > 0 &&
                            <section className="mt-3 mb-5">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-8">
                                            <div className="card">
                                                <div className="card-header bg-dark text-brown">
                                                    <p className="h4">Billing Address
                                                        <Link to="/users/profile" className="btn btn-brown btn-sm text-dark float-right">Update Address</Link>
                                                    </p>
                                                </div>
                                                <div className="card-body">
                                                    <ul className="list-group">
                                                        <li className="list-group-item bg-brown text-dark">
                                                            <small>HNO : {user?.address.flat}</small><br/>
                                                            <small>Street : {user?.address.street}</small><br/>
                                                            <small>Landmark : {user?.address.landmark}</small><br/>
                                                            <small>City : {user?.address.city}</small><br/>
                                                            <small>State : {user?.address.state}</small><br/>
                                                            <small>Country : {user?.address.country}</small><br/>
                                                            <small>PinCode : {user?.address.pin}</small><br/>
                                                            <small>Mobile : {user?.address.mobile}</small><br/>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="card mt-3">
                                                <div className="card-header bg-dark text-brown">
                                                    <p className="h4">Payment Details</p>
                                                </div>
                                                <div className="card-body">
                                                    <form>
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="radio" name="exampleRadios"
                                                                   id="exampleRadios1" value="option1"/>
                                                                <label className="form-check-label" htmlFor="exampleRadios1">
                                                                    Cash On Delivery
                                                                </label>
                                                        </div>
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="radio" name="exampleRadios"
                                                                   id="exampleRadios2" value="option2" />
                                                                <label className="form-check-label" htmlFor="exampleRadios2">
                                                                    Credit Card Payment
                                                                </label>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="card">
                                                <div className="card-header bg-dark text-brown">
                                                    <p className="h4">Your Cart</p>
                                                </div>
                                                <div className="card-body">
                                                    {
                                                        cartItems.length > 0 &&
                                                        <ul className="list-group">
                                                            {
                                                                cartItems.map((cartItem) => {
                                                                    return (
                                                                        <li key={cartItem._id} className="list-group-item">
                                                                            <div className="row align-items-center">
                                                                                <div className="col-md-2">
                                                                                    <img src={cartItem.image} alt="" className="img-fluid"/>
                                                                                </div>
                                                                                <div className="col-md-8">
                                                                                    <small>{cartItem.name}</small><br/>
                                                                                    <small>&#8377; {cartItem.price.toFixed(2)}</small><br/>
                                                                                    <small>Qty : {cartItem.qty}</small><br/>
                                                                                </div>
                                                                            </div>
                                                                        </li>
                                                                    )
                                                                })
                                                            }
                                                        </ul>
                                                    }
                                                    <ul className="list-group mt-2">
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
                                                    <StripeCheckout token={clickPayment}
                                                                    stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
                                                                    name="Stripe Payment"
                                                                    amount={calcGrandTotal() * 100}
                                                                    description="Payments with Stripe"
                                                                    currency="INR"
                                                                    image={stripeImage}>
                                                        <button className="btn btn-danger btn-sm btn-block mt-3">PAY &#8377; {calcGrandTotal().toFixed(2)}</button>
                                                    </StripeCheckout>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        }
                    </React.Fragment>
            }
        </React.Fragment>
    )
};
export default CheckOut;