import * as userUtil from "../../utils/authUtil";
import * as tokenUtil from "../../utils/tokenUtil";
import axios from "axios";
import { toast } from "react-toastify";

export const ADD_TO_CART = "ADD_TO_CART";
export const ADD_TO_CART_FAILURE = "ADD_TO_FAILURE";

export const DEC_ORDER_QTY = "DEC_ORDER_QTY";
export const DEC_ORDER_QTY_FAILURE = "DEC_ORDER_QTY_FAILURE";

export const INC_ORDER_QTY = "INC_ORDER_QTY";
export const INC_ORDER_QTY_FAILURE = "INC_ORDER_QTY_FAILURE";

export const HANDLE_DELETE = "HANDLE_DELETE";
export const HANDLE_DELETE_FAILURE = "HANDLE_DELETE_FAILURE";

export const STRIPE_PAYMENT_REQUEST = "STRIPE_PAYMENT_REQUEST";
export const STRIPE_PAYMENT_SUCCESS = "STRIPE_PAYMENT_SUCCESS";
export const STRIPE_PAYMENT_FAILURE = "STRIPE_PAYMENT_FAILURE";

export const CLEAR_CART = "CLEAR_CART";
export const CLEAR_CART_FAILURE = "CLEAR_CART_FAILURE";

export const PLACE_ORDER_REQUEST = "PLACE_ORDER_REQUEST";
export const PLACE_ORDER_SUCCESS = "PLACE_ORDER_SUCCESS";
export const PLACE_ORDER_FAILURE = "PLACE_ORDER_FAILURE";

export const ORDER_LIST_REQUEST = "ORDER_LIST_REQUEST";
export const ORDER_LIST_SUCCESS = "ORDER_LIST_SUCCESS";
export const ORDER_LIST_FAILURE = "ORDER_LIST_FAILURE";

export const addToCart = (item, history) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ADD_TO_CART, payload: { item } });
      history.push("/orders/cart");
    } catch (error) {
      dispatch({ type: ADD_TO_CART_FAILURE });
    }
  };
};

export const incrementOrderQty = (productId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: INC_ORDER_QTY, payload: { productId: productId } });
    } catch (error) {
      dispatch({ type: INC_ORDER_QTY_FAILURE });
    }
  };
};

export const decrementOrderQty = (productId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: DEC_ORDER_QTY, payload: { productId: productId } });
    } catch (error) {
      dispatch({ type: DEC_ORDER_QTY_FAILURE });
    }
  };
};

export const deleteCartItem = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: HANDLE_DELETE, payload: { productId: id } });
    } catch (error) {
      dispatch({ type: HANDLE_DELETE_FAILURE });
    }
  };
};

export const makeStripePayment = (body, history, order) => {
  return async (dispatch) => {
    try {
      // setting the token to request header to send to server
      if (userUtil.isUserLoggedIn()) {
        tokenUtil.setToken(userUtil.getToken());
      } else {
        tokenUtil.removeToken();
      }
      dispatch({ type: STRIPE_PAYMENT_REQUEST });
      let dataURL = `${process.env.REACT_APP_BASE_URL}/api/payment/pay`;
      let response = await axios.post(dataURL, body);
      console.log("stripe=>" + response);
      dispatch({ type: STRIPE_PAYMENT_SUCCESS, payload: response.data });
      // dispatch an action to place an order
      dispatch(placeOrder(order, history));
    } catch (error) {
      dispatch({ type: STRIPE_PAYMENT_FAILURE, payload: error });
    }
  };
};

export const clearCartItems = () => {
  return (dispatch) => {
    try {
      dispatch({ type: CLEAR_CART });
    } catch (error) {
      dispatch({ type: CLEAR_CART_FAILURE, payload: error });
    }
  };
};

export const placeOrder = (order, history) => {
  return async (dispatch) => {
    try {
      // setting the token to request header to send to server
      if (userUtil.isUserLoggedIn()) {
        tokenUtil.setToken(userUtil.getToken());
      } else {
        tokenUtil.removeToken();
      }
      let dataURL = `${process.env.REACT_APP_BASE_URL}/api/orders`;
      dispatch({ type: PLACE_ORDER_REQUEST });
      let response = await axios.post(dataURL, order);
      dispatch({ type: PLACE_ORDER_SUCCESS, payload: response.data });
      dispatch(clearCartItems());
      history.push("/orders/order-success");
    } catch (error) {
      dispatch({ type: PLACE_ORDER_FAILURE, payload: error.response.data });
    }
  };
};

export const getAllOrders = () => {
  return async (dispatch) => {
    try {
      // setting the token to request header to send to server
      if (userUtil.isUserLoggedIn()) {
        tokenUtil.setToken(userUtil.getToken());
      } else {
        tokenUtil.removeToken();
      }
      dispatch({ type: ORDER_LIST_REQUEST });
      let dataURL = `${process.env.REACT_APP_BASE_URL}/api/orders/allOrders`;
      let response = await axios.get(dataURL);

      dispatch({ type: ORDER_LIST_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: ORDER_LIST_FAILURE, payload: error.response.data });

      if (error.response !== undefined) {
        let { data } = error.response;
        toast.error(data.msg);
      }
    }
  };
};
