import Axios from "axios";
import * as alertActions from '../alert/alert.actions';

import * as userUtil from "../../layout/util/userUtil";
import * as tokenUtil from "../../layout/util/tokenUtil";

export const ADD_TO_CART = 'ADD_TO_CART';
export const ADD_TO_CART_FAILURE = 'ADD_TO_CART_FAILURE';

export const INCR_CART_ITEM_QTY = 'INCR_CART_ITEM_QTY';
export const INCR_CART_ITEM_QTY_FAILURE = 'INCR_CART_ITEM_QTY_FAILURE';

export const DECR_CART_ITEM_QTY = 'DECR_CART_ITEM_QTY';
export const DECR_CART_ITEM_QTY_FAILURE = 'DECR_CART_ITEM_QTY_FAILURE';

export const DELETE_CART_ITEM = 'DELETE_CART_ITEM';
export const DELETE_CART_ITEM_FAILURE = 'DELETE_CART_ITEM_FAILURE';

export const STRIPE_PAYMENT_REQUEST = 'STRIPE_PAYMENT_REQUEST';
export const STRIPE_PAYMENT_SUCCESS = 'STRIPE_PAYMENT_SUCCESS';
export const STRIPE_PAYMENT_FAILURE = 'STRIPE_PAYMENT_FAILURE';

export const PLACE_ORDER_REQUEST = 'PLACE_ORDER_REQUEST';
export const PLACE_ORDER_SUCCESS = 'PLACE_ORDER_SUCCESS';
export const PLACE_ORDER_FAILURE = 'PLACE_ORDER_FAILURE';

export const CLEAR_CART_ITEMS = 'CLEAR_CART_ITEMS';
export const CLEAR_CART_ITEMS_FAILURE = 'CLEAR_CART_ITEMS_FAILURE';

export const GET_ALL_ORDERS_REQUEST = 'GET_ALL_ORDERS_REQUEST';
export const GET_ALL_ORDERS_SUCCESS = 'GET_ALL_ORDERS_SUCCESS';
export const GET_ALL_ORDERS_FAILURE = 'GET_ALL_ORDERS_FAILURE';

export const addToCart = (item, history) => {
    return (dispatch) => {
        try {
            dispatch({type : ADD_TO_CART , payload : {item : item}});
            history.push('/orders/cart');
        }
        catch (error) {
            dispatch({type : ADD_TO_CART_FAILURE , payload : error});
        }
    }
};

export const incrCartItemQty = (productId) => {
    return (dispatch) => {
        try {
            dispatch({type : INCR_CART_ITEM_QTY , payload : {productId : productId}});
        }
        catch (error) {
            dispatch({type : INCR_CART_ITEM_QTY_FAILURE , payload : error});
        }
    }
};

export const decrCartItemQty = (productId) => {
    return (dispatch) => {
        try {
            dispatch({type : DECR_CART_ITEM_QTY , payload : {productId : productId}});
        }
        catch (error) {
            dispatch({type : DECR_CART_ITEM_QTY_FAILURE , payload : error});
        }
    }
};

export const deleteCartItem = (productId) => {
    return (dispatch) => {
        try {
            dispatch({type : DELETE_CART_ITEM , payload : {productId : productId}});
        }
        catch (error) {
            dispatch({type : DELETE_CART_ITEM_FAILURE , payload : error});
        }
    }
};

export const makeStripePayment = (body , history , order) => {
    return async (dispatch) => {
        try {
            // setting the token to request header to send to server
            if(userUtil.isLoggedIn()){
                tokenUtil.setAuthToken(userUtil.getToken());
            }
            dispatch({type : STRIPE_PAYMENT_REQUEST});
            let dataURL = `${process.env.REACT_APP_EXPRESS_SERVER}/api/payments/pay`;
            let response = await Axios.post(dataURL , body);
            dispatch({type : STRIPE_PAYMENT_SUCCESS , payload : response.data});
            // dispatch an action to place an order
            dispatch(placeOrder(order , history));
        }
        catch (error) {
            dispatch({type : STRIPE_PAYMENT_FAILURE , payload : error });
        }
    }
};

// place an order
export const placeOrder = (order , history) => {
    return async (dispatch) => {
        try {
            // setting the token to request header to send to server
            if(userUtil.isLoggedIn()){
                tokenUtil.setAuthToken(userUtil.getToken());
            }
            dispatch({type : PLACE_ORDER_REQUEST});
            let dataURL = `${process.env.REACT_APP_EXPRESS_SERVER}/api/orders/`;
            let response = await Axios.post(dataURL , order);
            dispatch({type : PLACE_ORDER_SUCCESS , payload : response.data});
            dispatch(clearCartItems());
            history.push('/orders/order-success');
        }
        catch (error) {
            console.error(error);
            dispatch({type : PLACE_ORDER_FAILURE , payload : error});
        }
    }
};

// clear Cart Items
export const clearCartItems = () => {
    return (dispatch) => {
        try {
            dispatch({type : CLEAR_CART_ITEMS})
        }
        catch (error) {
            console.error(error);
            dispatch({type : CLEAR_CART_ITEMS_FAILURE , payload : error})
        }
    }
};

// get all Orders
export const getAllOrders = () => {
    return async (dispatch) => {
        try {
            // setting the token to request header to send to server
            if(userUtil.isLoggedIn()){
                tokenUtil.setAuthToken(userUtil.getToken());
            }
            dispatch({type : GET_ALL_ORDERS_REQUEST});
            let dataURL = `${process.env.REACT_APP_EXPRESS_SERVER}/api/orders/all`;
            let response = await Axios.get(dataURL);
            dispatch({type : GET_ALL_ORDERS_SUCCESS , payload : response.data});
         }
        catch (error) {
            console.error(error);
            dispatch({type : GET_ALL_ORDERS_FAILURE , payload : error});
        }
    }
};