import Axios from "axios";
import * as alertActions from '../alert/alert.actions';
import * as userUtil from "../../layout/util/userUtil";
import * as tokenUtil from "../../layout/util/tokenUtil";

export const UPLOAD_PRODUCT_REQUEST = 'UPLOAD_PRODUCT_REQUEST';
export const UPLOAD_PRODUCT_SUCCESS = 'UPLOAD_PRODUCT_SUCCESS';
export const UPLOAD_PRODUCT_FAILURE = 'UPLOAD_PRODUCT_FAILURE';

export const GET_MEN_PRODUCT_REQUEST = 'GET_MEN_PRODUCT_REQUEST';
export const GET_MEN_PRODUCT_SUCCESS = 'GET_MEN_PRODUCT_SUCCESS';
export const GET_MEN_PRODUCT_FAILURE = 'GET_MEN_PRODUCT_FAILURE';

export const GET_WOMEN_PRODUCT_REQUEST = 'GET_WOMEN_PRODUCT_REQUEST';
export const GET_WOMEN_PRODUCT_SUCCESS = 'GET_WOMEN_PRODUCT_SUCCESS';
export const GET_WOMEN_PRODUCT_FAILURE = 'GET_WOMEN_PRODUCT_FAILURE';

export const GET_KIDS_PRODUCT_REQUEST = 'GET_KIDS_PRODUCT_REQUEST';
export const GET_KIDS_PRODUCT_SUCCESS = 'GET_KIDS_PRODUCT_SUCCESS';
export const GET_KIDS_PRODUCT_FAILURE = 'GET_KIDS_PRODUCT_FAILURE';

export const GET_PRODUCT_REQUEST = 'GET_PRODUCT_REQUEST';
export const GET_PRODUCT_SUCCESS = 'GET_PRODUCT_SUCCESS';
export const GET_PRODUCT_FAILURE = 'GET_PRODUCT_FAILURE';

export const uploadProduct = (product , history) => {
    return async (dispatch) => {
        try {
            // setting the token to request header to send to server
            if(userUtil.isLoggedIn()){
                tokenUtil.setAuthToken(userUtil.getToken());
            }
            dispatch({type : UPLOAD_PRODUCT_REQUEST});
            let dataURL = `${process.env.REACT_APP_EXPRESS_SERVER}/api/products/upload`;
            let response = await Axios.post(dataURL , product);
            dispatch({type : UPLOAD_PRODUCT_SUCCESS , payload : response.data});
            dispatch(alertActions.setAlert(response.data.msg , 'success'));
            history.push('/');
        }
        catch (error) {
            console.error(error);
            dispatch({type : UPLOAD_PRODUCT_FAILURE , payload : error});
            let errorList = error.response.data.errors;
            for(let error of errorList){
                dispatch(alertActions.setAlert(error.msg , 'danger'))
            }
        }
    };
};

export const getMenProducts = () => {
    return async (dispatch) => {
        try {
            dispatch({type : GET_MEN_PRODUCT_REQUEST});
            let dataURL = `${process.env.REACT_APP_EXPRESS_SERVER}/api/products/men`;
            let response = await Axios.get(dataURL);
            dispatch({type : GET_MEN_PRODUCT_SUCCESS , payload : response.data});
        }
        catch (error) {
            console.error(error);
            dispatch({type : GET_MEN_PRODUCT_FAILURE , payload : error});
            let errorList = error.response.data.errors;
            for(let error of errorList){
                dispatch(alertActions.setAlert(error.msg , 'danger'))
            }
        }
    };
};

export const getWomenProducts = () => {
    return async (dispatch) => {
        try {
            dispatch({type : GET_WOMEN_PRODUCT_REQUEST});
            let dataURL = `${process.env.REACT_APP_EXPRESS_SERVER}/api/products/women`;
            let response = await Axios.get(dataURL);
            dispatch({type : GET_WOMEN_PRODUCT_SUCCESS , payload : response.data});
        }
        catch (error) {
            console.error(error);
            dispatch({type : GET_WOMEN_PRODUCT_FAILURE , payload : error});
            let errorList = error.response.data.errors;
            for(let error of errorList){
                dispatch(alertActions.setAlert(error.msg , 'danger'))
            }
        }
    };
};

export const getKidsProducts = () => {
    return async (dispatch) => {
        try {
            dispatch({type : GET_KIDS_PRODUCT_REQUEST});
            let dataURL = `${process.env.REACT_APP_EXPRESS_SERVER}/api/products/kids`;
            let response = await Axios.get(dataURL);
            dispatch({type : GET_KIDS_PRODUCT_SUCCESS , payload : response.data});
        }
        catch (error) {
            console.error(error);
            dispatch({type : GET_KIDS_PRODUCT_FAILURE , payload : error});
            let errorList = error.response.data.errors;
            for(let error of errorList){
                dispatch(alertActions.setAlert(error.msg , 'danger'))
            }
        }
    };
};

export const getProduct = (productId) => {
    return async (dispatch) => {
        try {
            dispatch({type : GET_PRODUCT_REQUEST});
            let dataURL = `${process.env.REACT_APP_EXPRESS_SERVER}/api/products/${productId}`;
            let response = await Axios.get(dataURL);
            dispatch({type : GET_PRODUCT_SUCCESS , payload : response.data});
        }
        catch (error) {
            console.error(error);
            dispatch({type : GET_PRODUCT_FAILURE , payload : error});
            let errorList = error.response.data.errors;
            for(let error of errorList){
                dispatch(alertActions.setAlert(error.msg , 'danger'))
            }
        }
    };
};