import { toast } from "react-toastify";
import * as orderActions from "../order/order.action";

const initalState = {
  loading: false,
  cartItems: [],
  errorMessage: "",
  order: {},
  orders: [],
};
export const orderFeatureKey = "order-info";
export const reducer = (state = initalState, action) => {
  let { type, payload } = action;

  switch (type) {
    case orderActions.ADD_TO_CART:
      let existingItem = state.cartItems.find(
        (item) => item._id === payload.item._id
      );
      if (existingItem) {
        let newCartItems = state.cartItems.map((item) => {
          if (item._id === existingItem._id) {
            item.qty += 1;
          }
          return item;
        });
        toast.warn("This item is already added to the Cart!");
        return {
          ...state,
          cartItems: [...newCartItems],
        };
      }
      return {
        ...state,
        cartItems: [...state.cartItems, payload.item],
      };

    case orderActions.ADD_TO_CART_FAILURE:
      return {
        ...state,
        errorMessage: payload,
      };

    //INC ORDER QTY
    case orderActions.INC_ORDER_QTY:
      let incOrders = state.cartItems.map((item) => {
        if (item._id === payload.productId) {
          return {
            ...item,
            qty: item.qty + 1,
          };
        }
        return item;
      });
      return {
        ...state,
        cartItems: [...incOrders],
      };
    case orderActions.INC_ORDER_QTY_FAILURE:
      return {
        ...state,
        errorMessage: payload,
      };

    //Dec Orders
    case orderActions.DEC_ORDER_QTY:
      let decOrders = state.cartItems.map((item) => {
        if (item._id === payload.productId) {
          return {
            ...item,
            qty: item.qty > 1 ? item.qty - 1 : 1,
          };
        }
        return item;
      });
      return {
        ...state,
        cartItems: [...decOrders],
      };
    case orderActions.DEC_ORDER_QTY_FAILURE:
      return {
        ...state,
        errorMessage: payload,
      };

    //delete an item in the cart
    case orderActions.HANDLE_DELETE:
      let updatedCartItems = state.cartItems.filter(
        (item) => item._id !== payload.productId
      );
      toast.warn("Item deleted from the Cart");
      return {
        ...state,
        cartItems: [...updatedCartItems],
      };
    case orderActions.HANDLE_DELETE_FAILURE:
      return {
        ...state,
        errorMessage: payload,
      };

    //MAKE STRIPE PAYMENT
    // Make Stripe Payments
    case orderActions.STRIPE_PAYMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderActions.STRIPE_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case orderActions.STRIPE_PAYMENT_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: payload,
      };

    //PLACE order
    case orderActions.PLACE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderActions.PLACE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        order: payload.order,
      };
    case orderActions.PLACE_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: payload,
      };
    //CLEAR CART ITEMS
    case orderActions.CLEAR_CART:
      return {
        ...state,
        cartItems: [],
      };
    case orderActions.CLEAR_CART_FAILURE:
      return {
        ...state,
        errorMessage: payload,
      };

    //GET ALL ORDERS
    case orderActions.ORDER_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderActions.ORDER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: payload.orders,
      };
    case orderActions.ORDER_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: payload,
      };
    default:
      return state;
  }
};
