import * as authUtil from "../utils/authUtil";
import axios from "axios";

export const setToken = (token) => {
  if (token) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${authUtil.getToken()}`;
  } else {
    removeToken();
  }
};

export const removeToken = () => {
  axios.defaults.headers.common["Authorization"] = "";
  delete axios.defaults.headers.common["Authorization"];
};
