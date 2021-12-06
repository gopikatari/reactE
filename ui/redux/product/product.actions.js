import axios from "axios";
import { toast } from "react-toastify";
import * as tokenUtils from "../../utils/tokenUtil";
import * as authUtils from "../../utils/authUtil";

export const CREATE_PRODUCT_REQUEST = "CREATE_PRODUCT_REQUEST";
export const CREATE_PRODUCT_SUCCESS = "CREATE_PRODUCT_SUCCESS";
export const CREATE_PRODUCT_FAILURE = "CREATE_PRODUCT_FAILURE";

export const GET_MENS_REQUEST = "GET_MENS_REQUEST";
export const GET_MENS_SUCCESS = "GET_MENS_SUCCESS";
export const GET_MENS_FAILURE = "GET_MENS_FAILURE";

export const GET_WOMENS_REQUEST = "GET_WOMENS_REQUEST";
export const GET_WOMENS_SUCCESS = "GET_WOMENS_SUCCESS";
export const GET_WOMENS_FAILURE = "GET_WOMENS_FAILURE";

export const GET_KIDS_REQUEST = "GET_KIDS_REQUEST";
export const GET_KIDS_SUCCESS = "GET_KIDS_SUCCESS";
export const GET_KIDS_FAILURE = "GET_KIDS_FAILURE";

export const GET_SINGLE_PRODUCT_REQUEST = "GET_SINGLE_PRODUCT_REQUEST";
export const GET_SINGLE_PRODUCT_SUCCESS = "GET_SINGLE_PRODUCT_SUCCESS";
export const GET_SINGLE_PRODUCT_FAILURE = "GET_SINGLE_PRODUCT_FAILURE";

export const CREATE_CATEGORY_REQUEST = "CREATE_CATEGORY_REQUEST";
export const CREATE_CATEGORY_SUCCESS = "CREATE_CATEGORY_SUCCESS";
export const CREATE_CATEGORY_FAILURE = "CREATE_CATEGORY_FAILURE";

export const GET_CATEGORY_REQUEST = "GET_CATEGORY_REQUEST";
export const GET_CATEGORY_SUCCESS = "GET_CATEGORY_SUCCESS";
export const GET_CATEGORY_FAILURE = "GET_CATEGORY_FAILURE";

export const GET_PRODUCTS_BY_CAT_REQUEST = "GET_PRODUCTS_BY_CAT_REQUEST";
export const GET_PRODUCTS_BY_CAT_SUCCESS = "GET_PRODUCTS_BY_CAT_SUCCESS";
export const GET_PRODUCTS_BY_CAT_FAILURE = "GET_PRODUCTS_BY_CAT_FAILURE";

export const createProduct = (product) => {
  return async (dispatch) => {
    try {
      if (authUtils.getToken()) {
        tokenUtils.setToken(authUtils.getToken());
      } else {
        tokenUtils.removeToken();
      }

      dispatch({ type: CREATE_PRODUCT_REQUEST });

      let response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/products/`,
        product
      );
      dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: response.data });

      toast.success(response.data.msg);
    } catch (error) {
      let { data } = error.response;
      console.log("product errors => :" + JSON.stringify(error.response.data));
      toast.error(data.msg);
      dispatch({ type: CREATE_PRODUCT_FAILURE, payload: error.response.data });
    }
  };
};

export const getMensProducts = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_MENS_REQUEST });
      let response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/products/mens`
      );
      dispatch({ type: GET_MENS_SUCCESS, payload: response.data });
    } catch (error) {
      console.log(error);

      let { data } = error.response;
      console.log("product errors => :" + JSON.stringify(error.response.data));
      toast.error(data.msg);
      dispatch({ type: GET_MENS_FAILURE, payload: error.response.data });
    }
  };
};

export const getWomennsProducts = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_WOMENS_REQUEST });
      let response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/products/womens`
      );
      dispatch({ type: GET_WOMENS_SUCCESS, payload: response.data });
    } catch (error) {
      let { data } = error.response;
      console.log("product errors => :" + JSON.stringify(error.response.data));
      toast.error(data.msg);
      dispatch({ type: GET_WOMENS_FAILURE, payload: error.response.data });
    }
  };
};

//
export const getProductsByCategory = (category) => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_PRODUCTS_BY_CAT_REQUEST });
      let response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/products/productlist/${category}`
      );
      dispatch({ type: GET_PRODUCTS_BY_CAT_SUCCESS, payload: response.data });
    } catch (error) {
      let { data } = error.response;
      console.log("product errors => :" + JSON.stringify(error.response.data));
      toast.error(data.msg);
      dispatch({
        type: GET_PRODUCTS_BY_CAT_FAILURE,
        payload: error.response.data,
      });
    }
  };
};
//

export const getKidsProducts = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_KIDS_REQUEST });
      let response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/products/kids`
      );
      dispatch({ type: GET_KIDS_SUCCESS, payload: response.data });
    } catch (error) {
      console.log(error);
      let { data } = error.response;
      toast.error(data.msg);
      dispatch({ type: GET_WOMENS_FAILURE, payload: error.response.data });
    }
  };
};

export const getProductById = (id) => {

  return async (dispatch) => {
    try {
      dispatch({ type: GET_SINGLE_PRODUCT_REQUEST });
      let response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/products/${id}`
      );
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: response.data });
    } catch (error) {
      let { data } = error.response;
      toast.error(data.msg);
      dispatch({
        type: GET_SINGLE_PRODUCT_FAILURE,
        payload: error.response.data,
      });
    }
  };
};

export const addCategory = (category) => {
  return async (dispatch) => {
    try {
      if (authUtils.getToken()) {
        tokenUtils.setToken(authUtils.getToken());
      } else {
        tokenUtils.removeToken();
      }
      let cat = {
        name: category,
      };
      dispatch({ type: CREATE_CATEGORY_REQUEST });
      let response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/products/addCategory`,
        cat
      );
      dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: response.data });
      toast.success(response.data.msg);
    } catch (error) {
      console.log(error);
      let { data } = error.response;
      toast.error(data.msg);
      dispatch({ type: CREATE_CATEGORY_FAILURE, payload: error.response.data });
    }
  };
};

export const getCategories = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_CATEGORY_REQUEST });
      let response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/products/allcategories`
      );
      dispatch({ type: GET_CATEGORY_SUCCESS, payload: response.data });
    } catch (error) {
      console.log(error);
      let { data } = error.response;
      toast.error(data.msg);
      dispatch({ type: GET_CATEGORY_FAILURE, payload: error.response.data });
    }
  };
};
