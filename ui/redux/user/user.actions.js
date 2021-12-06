import axios from "axios";
import * as authUtil from "../../utils/authUtil";
import * as tokenUtil from "../../utils/tokenUtil";
import { toast } from "react-toastify";
export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE";

export const USER_REGISTER_REQUEST = "USER_REGISTER_REQUEST";
export const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS";
export const USER_REGISTER_FAILURE = "USER_REGISTER_FAILURE";

export const USER_INFO_REQUEST = "USER_INFO_REQUEST";
export const USER_INFO_SUCCESS = "USER_INFO_SUCCESS";
export const USER_INFO_FAILURE = "USER_INFO_FAILURE";

export const UPDATE_ADDRESS_REQUEST = "UPDATE_ADDRESS_REQUEST";
export const UPDATE_ADDRESS_SUCCESS = "UPDATE_ADDRESS_SUCCESS";
export const UPDATE_ADDRESS_FAILURE = "UPDATE_ADDRESS_FAILURE";

export const USER_LOGOUT_REQUEST = "USER_LOGOUT_REQUEST";

// REGISTER START
export const registerUser = (user, history) => {
  return async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });

      let response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/users/register`,
        user
      );

      dispatch({ type: USER_REGISTER_SUCCESS, payload: response.data });
      history.push("/users/login");
      toast.success(response.data.msg);
    } catch (error) {
      //console.log(error.response.data.errors);
      let { errors } = error.response.data;

      errors.map((err) => {
        return toast.error(err.msg);
      });
      dispatch({ type: USER_REGISTER_FAILURE, payload: error.response.data });
    }
  };
};
//REGISTER END

// LOGINUSER
export const loginUser = (user, history) => {
  return async (dispatch) => {
    try {
      dispatch({ type: USER_LOGIN_REQUEST });
      let response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/users/login`,
        user
      );
      dispatch({ type: USER_LOGIN_SUCCESS, payload: response.data });
      toast.success(response.data.msg);
      history.push("/products");
    } catch (error) {
      if (error.response === undefined) {
        return toast.error("Network Error");
      } else {
        let { errors } = error?.response.data;
        if (errors !== undefined) {
          errors.map((err) => {
            return toast.error(err.msg);
          });
        } else {
          alert(error.msg);
          return toast.error("Network Error");
        }
      }
      dispatch({ type: USER_LOGIN_FAILURE, payload: error.response.data });
    }
  };
};
// LOGIN END

export const logoutUser = (history) => {
  return async (dispatch) => {
    try {
      dispatch({ type: USER_LOGOUT_REQUEST });
      toast.warn("you are successfully logged out.");
      history.push("/users/login");
    } catch (error) {
      history.push("/users/login");
      return toast.error("Something went wrong!");
    }
  };
};
//getUSER information

export const getUserInfo = () => {
  return async (dispatch) => {
    try {
      if (authUtil.getToken()) {
        tokenUtil.setToken(authUtil.getToken());
      } else {
        tokenUtil.removeToken();
        dispatch({ type: USER_LOGOUT_REQUEST });
      }
      dispatch({ type: USER_INFO_REQUEST });
      let response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/users`
      );
      dispatch({ type: USER_INFO_SUCCESS, payload: response.data });
    } catch (error) {
      let { data } = error.response;
      console.log("errors => :" + JSON.stringify(error.response.data));
      toast.error(data.msg);
      dispatch({ type: USER_INFO_FAILURE, payload: error.response.data });
      dispatch({ type: USER_LOGOUT_REQUEST });
    }
  };
};
//update address

export const updateAddress = (address) => {
  return async (dispatch) => {
    try {
      if (authUtil.getToken()) {
        tokenUtil.setToken(authUtil.getToken());
      } else {
        tokenUtil.removeToken();
      }
      dispatch({ type: UPDATE_ADDRESS_REQUEST });
      let response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/users/address`,
        address
      );
      dispatch({ type: UPDATE_ADDRESS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: UPDATE_ADDRESS_FAILURE, payload: error.response.data });
      let { data } = error.response;

      toast.error(data.msg);
    }
  };
};
