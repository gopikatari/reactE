import React from "react";

import { Redirect, Route } from "react-router-dom";

import * as authUtils from "./authUtil";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return !authUtils.isUserLoggedIn() ? (
          // <Redirect to="/users/login" />

          <Redirect
            to={{ pathname: "/users/login", state: { from: props.location } }}
          />
        ) : (
          <Component {...props} />
        );
      }}
    />
  );
};

export default PrivateRoute;
