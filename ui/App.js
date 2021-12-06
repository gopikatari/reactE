import React, {useEffect} from 'react';
import './App.css';
import Navbar from "./layout/components/navbar/Navbar";
import {BrowserRouter as Router , Route , Switch} from 'react-router-dom';
import Home from "./layout/components/home/Home";
import MensWear from "./modules/products/MensWear";
import WomensWear from "./modules/products/WomensWear";
import KidsWear from "./modules/products/KidsWear";
import UploadProduct from "./modules/products/UploadProduct";
import Cart from "./modules/orders/Cart";
import UserProfile from "./modules/users/UserProfile";
import UserRegister from "./modules/users/UserRegister";
import UserLogin from "./modules/users/UserLogin";
import Alert from "./layout/util/alert/Alert";
import * as userActions from './redux/users/user.actions';
import {useDispatch} from "react-redux";
import ProductDetails from "./modules/products/ProductDetails";
import CheckOut from "./modules/orders/CheckOut";
import OrderSuccess from "./modules/orders/OrderSuccess";
import OrderList from "./modules/orders/OrderList";
import PrivateRoute from "./layout/util/PrivateRoute";


let App = () => {
    let dispatch = useDispatch();

    useEffect(() => {
        if(localStorage.getItem(process.env.REACT_APP_LOGIN_TOKEN)){
            dispatch(userActions.getUserInfo());
        }
    }, []);

  return (
    <React.Fragment>
      <Router>
          <Alert/>
          <Navbar/>
          <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/products/men" component={MensWear}/>
              <Route exact path="/products/women" component={WomensWear}/>
              <Route exact path="/products/kids" component={KidsWear}/>
              <PrivateRoute exact path="/products/upload" component={UploadProduct}/>
              <Route exact path="/products/:productId" component={ProductDetails}/>
              <Route exact path="/orders/cart" component={Cart}/>
              <PrivateRoute exact path="/orders/checkout" component={CheckOut}/>
              <PrivateRoute exact path="/orders/order-success" component={OrderSuccess}/>
              <PrivateRoute exact path="/orders/list" component={OrderList}/>
              <PrivateRoute exact path="/users/profile" component={UserProfile}/>
              <Route exact path="/users/register" component={UserRegister}/>
              <Route exact path="/users/login" component={UserLogin}/>
          </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
