import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import * as authUtils from "../../utils/authUtil";
import * as userActions from "../../redux/user/user.actions";
import * as userReducer from "../../redux/user/user.reducer";

import * as orderReducer from "../../redux/order/order.reducer";
const Navbar = () => {
  const userinfo = useSelector((state) => {
    return state[userReducer.userFeatureKey];
  });

  const orderInfo = useSelector((state) => {
    return state[orderReducer.orderFeatureKey];
  });

  let { cartItems } = orderInfo;
  let { user } = userinfo;

  const dispatch = useDispatch();
  const history = useHistory();
  let logoutClick = () => {
    dispatch(userActions.logoutUser(history));
  };

  let afterLoginLinks = (
    <React.Fragment>
      <li className="nav-item">
        <NavLink to="/users/profile" className="nav-link">
          <img
            src={user?.avatar}
            alt=""
            width="26"
            height="26"
            className="rounded-circle"
          />
          Profile
        </NavLink>
      </li>
      <li className="nav-item">
        <Link to="/users/login" onClick={logoutClick} className="nav-link">
          Logout
        </Link>
      </li>
    </React.Fragment>
  );
  let beforeLoginLinks = (
    <React.Fragment>
      <li className="nav-item">
        <NavLink to="/register" className="nav-link" activeClassName="active">
          Register
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/users/login" className="nav-link">
          Login
        </NavLink>
      </li>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <Link to="/" className="navbar-brand">
            Prithvimaya
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbar1"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="navbar-collapse collapse" id="navbar1">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  exact={true}
                  to="/products"
                  className="nav-link"
                  activeClassName="active animated jello"
                >
                  Products
                </NavLink>
              </li>

              {/* <li className="nav-item">
                <NavLink
                  to="/products/mens"
                  className="nav-link"
                  activeClassName="active animated jello"
                >
                  Mens
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/products/womens"
                  className="nav-link"
                  activeClassName="active"
                >
                  Womens
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/products/kids"
                  className="nav-link"
                  activeClassName="active"
                >
                  Kids
                </NavLink>
              </li> */}

              <li className="nav-item">
                <NavLink
                  to="/products/upload"
                  className="nav-link"
                  activeClassName="active"
                >
                  Upload
                </NavLink>
              </li>
              {user.isAdmin && (
                <li className="nav-item">
                  <Link to="/products/addCategory" className="nav-link">
                    Category
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <Link to="/orders/orderlist" className="nav-link">
                  Orders
                </Link>
              </li>
            </ul>

            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink to="/orders/cart" className="nav-link">
                  <i className="fa fa-shopping-cart" />
                  <span className="badge badge-danger">{cartItems.length}</span>
                </NavLink>
              </li>
              {authUtils.isUserLoggedIn() ? afterLoginLinks : beforeLoginLinks}
            </ul>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
