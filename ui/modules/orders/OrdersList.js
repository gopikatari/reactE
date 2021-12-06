import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as orderReducer from "../../redux/order/order.reducer";
import * as orderActions from "../../redux/order/order.action";
import Spinner from "../../layouts/utils/spinner/Spinner";
const OrdersList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(orderActions.getAllOrders());
  }, [dispatch]);
  const order_info = useSelector((state) => {
    return state[orderReducer.orderFeatureKey];
  });

  const { loading, orders } = order_info;

  console.log(orders);
  return (
    <React.Fragment>
      <section className="paddingTop">
        <div className="container-fluid">
          <div className="row bg-default p-3">
            <div className="container">
              <div className="col">
                <p className="h4 text-white">
                  <i className="fa fa-list fa-1x px-2" />
                  Order List
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        {loading ? (
          <Spinner />
        ) : (
          <React.Fragment>
            {orders.map((order) => (
              <React.Fragment key={order._id}>
                <div className="container mt-3">
                  <div className="card border border-default">
                    <div className="card-header bg-info">
                      <p className="h6 text-white">
                        Order # :{order._id}
                        <span className="float-right bg-success badge p-2 badge-pill text-white">
                          &#8377; {order.total}
                        </span>
                      </p>
                    </div>
                    <div className="card-body">
                      {order.items.map((item, index) => (
                        <div className="row" key={index}>
                          <div className="col-md-6">
                            <label>
                              <span className="h3">{item.name}</span>
                            </label>
                            <label>
                              <span className="badge badge-default">
                                {item.brand}
                              </span>
                            </label>
                            <br />
                          </div>
                          <div className="col-md-2">
                            <label>
                              <span className="badge badge-light">
                                qty: {item.qty}
                              </span>
                            </label>
                          </div>
                          <div className="col-md-2">
                            <label>
                              <span className="badge p-2 badge-danger text-white">
                                Price &#8377; {item.price}
                              </span>
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </React.Fragment>
        )}
      </section>
      {Object.keys(orders).length === 0 && (
        <React.Fragment>
          <div className="container">
            <div className="lead p3 text-center">
              <h3>No Items present in the cart</h3>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default OrdersList;
