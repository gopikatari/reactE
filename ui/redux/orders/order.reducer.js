import * as orderActions from './order.actions';

export const orderFeatureKey = 'order-info';

let initialState = {
    loading : false,
    cartItems : [],
    order : {},
    orders : [],
    errorMessage : ''
};

export const reducer = (state = initialState , action) => {
    let {type , payload} = action;
    switch(type) {
        case orderActions.ADD_TO_CART :
            let existingItem = state.cartItems.find(item => item._id === payload.item._id);
            if(existingItem) return state;
            return {
                ...state,
                cartItems: [...state.cartItems , payload.item]
            };
        case orderActions.ADD_TO_CART_FAILURE :
            return {
                ...state,
                errorMessage: payload
            };
        // Incr Cart Item Qty
        case orderActions.INCR_CART_ITEM_QTY:
            let incrCartItems = state.cartItems.map(cartItem => {
                if(cartItem._id === payload.productId){
                    return {
                        ...cartItem,
                        qty : cartItem.qty + 1
                    }
                }
                return cartItem;
            });
            return {
                ...state,
                cartItems: [...incrCartItems]
            };
        case orderActions.INCR_CART_ITEM_QTY_FAILURE :
            return {
                ...state,
                errorMessage: payload
            };
        // Decr Cart Item Qty
        case orderActions.DECR_CART_ITEM_QTY:
            let decrCartItems = state.cartItems.map(cartItem => {
                if(cartItem._id === payload.productId){
                    return {
                        ...cartItem,
                        qty : (cartItem.qty - 1 > 0) ? cartItem.qty - 1 : 1
                    }
                }
                return cartItem;
            });
            return {
                ...state,
                cartItems: [...decrCartItems]
            };
        case orderActions.DECR_CART_ITEM_QTY_FAILURE :
            return {
                ...state,
                errorMessage: payload
            };
        // delete Cart Item
        case orderActions.DELETE_CART_ITEM :
            let updatedCartItems = state.cartItems.filter(cartItem => {
                return cartItem._id !== payload.productId;
            });
            return {
                ...state,
                cartItems: [...updatedCartItems]
            };
        case orderActions.DELETE_CART_ITEM_FAILURE :
            return {
                ...state,
                errorMessage: payload
            };
        // Make Stripe Payments
        case orderActions.STRIPE_PAYMENT_REQUEST :
            return  {
                ...state,
                loading: true
            };
        case orderActions.STRIPE_PAYMENT_SUCCESS :
            return  {
                ...state,
                loading: false
            };
        case orderActions.STRIPE_PAYMENT_FAILURE :
            return  {
                ...state,
                loading: false,
                errorMessage: payload
            };
        // place an order
        case orderActions.PLACE_ORDER_REQUEST :
            return  {
                ...state,
                loading: true
            };
        case orderActions.PLACE_ORDER_SUCCESS :
            return  {
                ...state,
                loading: false,
                order: payload.order
            };
        case orderActions.PLACE_ORDER_FAILURE :
            return  {
                ...state,
                loading: false,
                order: {},
                errorMessage: payload
            };
        // Clear Cart Items
        case orderActions.CLEAR_CART_ITEMS :
            return  {
                ...state,
                cartItems: []
            }
        case orderActions.CLEAR_CART_ITEMS_FAILURE :
            return  {
                ...state,
                errorMessage: payload
            };
        // Get all Orders
        case orderActions.GET_ALL_ORDERS_REQUEST :
            return  {
                ...state,
                loading: true
            };
        case orderActions.GET_ALL_ORDERS_SUCCESS :
            return  {
                ...state,
                loading: false,
                orders: payload.orders
            };
        case orderActions.GET_ALL_ORDERS_FAILURE :
            return  {
                ...state,
                loading: false,
                errorMessage: payload
            };
        default : return state;
    }
};