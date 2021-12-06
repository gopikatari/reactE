import React from 'react';
import {Link} from 'react-router-dom';
import brand from '../../../assets/img/brand.PNG';
import {useDispatch, useSelector} from "react-redux";
import * as userActions from '../../../redux/users/user.actions';
import * as userReducer from '../../../redux/users/user.reducers';
import * as userUtil from '../../util/userUtil';
import * as orderReducer from '../../../redux/orders/order.reducer';

let Navbar = () => {
    let dispatch = useDispatch();

    let orderInfo = useSelector((state) => {
        return state[orderReducer.orderFeatureKey];
    });

    let {cartItems} = orderInfo;

    let userInfo = useSelector((state) => {
        return state[userReducer.userFeatureKey];
    });

    let {isAuthenticated , user} = userInfo;

    let clickLogOut = () => {
        dispatch(userActions.logOutUser());
    };

    let isLoggedIn = () => {
        return userUtil.isLoggedIn();
    };

    let afterLogin = (
       <React.Fragment>
           <li className="nav-item">
               <Link to="/users/profile" className="nav-link">
                  <img src={user.avatar} alt="" width="25" height="25" className="rounded-circle"/> {user.name}</Link>
           </li>
           <li className="nav-item">
               <Link to="/" className="nav-link" onClick={clickLogOut}>
                  <i className="fa fa-sign-out-alt"/> LogOut</Link>
           </li>
       </React.Fragment>
    );

    let beforeLogin = (
        <React.Fragment>
            <li className="nav-item">
                <Link to="/users/register" className="nav-link">Register</Link>
            </li>
            <li className="nav-item">
                <Link to="/users/login" className="nav-link">Login</Link>
            </li>
        </React.Fragment>
    );

    return (
        <React.Fragment>
            <nav className="navbar navbar-dark bg-dark navbar-expand-sm">
                <div className="container">
                   <Link to="/" className="navbar-brand">
                       <img src={brand} alt="" width="150" height="35"/>
                   </Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/products/men" className="nav-link">Men's Wear</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/products/kids" className="nav-link">Kids's Wear</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/products/women" className="nav-link">Women's Wear</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/products/upload" className="nav-link">Upload</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/orders/cart" className="nav-link">
                                    <i className="fa fa-shopping-cart"/>
                                    <span className="badge badge-danger">{cartItems.length}</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/orders/list" className="nav-link">Orders</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            {
                                isLoggedIn() ? afterLogin : beforeLogin
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </React.Fragment>
    )
};
export default Navbar;