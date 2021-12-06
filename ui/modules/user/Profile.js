import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import * as userReducer from "../../redux/user/user.reducer";
import * as userActions from "../../redux/user/user.actions";
import { toast } from "react-toastify";
import Spinner from "../../layouts/utils/spinner/Spinner";
const Profile = () => {
  const [enableAddress, setEnableAddress] = useState(false);
  const dispatch = useDispatch();
  const user_info = useSelector((state) => {
    return state[userReducer.userFeatureKey];
  });
  const { loading, user } = user_info;
  const { address } = user;
  const [updatedAddress, setUpdatedAddress] = useState({
    flat: "",
    street: "",
    landmark: "",
    city: "",
    state: "",
    country: "",
    pin: "",
    mobile: "",
  });
  useEffect(() => {
    setUpdatedAddress({
      flat: address && address[0] ? address[0].flat : "",
      street: address && address[0] ? address[0].street : "",
      landmark: address && address[0] ? address[0].landmark : "",
      city: address && address[0] ? address[0].city : "",
      state: address && address[0] ? address[0].state : "",
      country: address && address[0] ? address[0].country : "",
      pin: address && address[0] ? address[0].pin : "",
      mobile: address && address[0] ? address[0].mobile : "",
    });
  }, [address]);

  let updateAddressInput = (event) => {
    setUpdatedAddress({
      ...updatedAddress,
      [event.target.name]: event.target.value,
    });
  };

  let handleUpdateAddressClick = (e) => {
    e.preventDefault();

    let updateAddress = {
      address: [{ ...updatedAddress }],
    };

    dispatch(userActions.updateAddress(updateAddress));
    setEnableAddress(false);
    toast.success("Address updated successfully ");
  };

  return (
    <React.Fragment>
      <section className="paddingTop">
        <div className="container-fluid">
          <div className="row p-3 bg-default text-white">
            <div className="container">
              <div className="col">
                <p className="h4">Your Profile</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <section className="mt-2">
            <div className="container">
              <div className="row">
                <div className="col-md-3">
                  <div className="">
                    <img
                      src={user.avatar}
                      alt=""
                      className="img-fluid img-thumbnail  mt-3"
                      width="90%"
                    />
                  </div>
                </div>

                <div className="col-md-9 mt-2">
                  <div className="card">
                    <div className="card-header bg-info">
                      <p className="h4 text-white font-weight-bold">
                        Your Information
                      </p>
                    </div>

                    <div className="card-body bg-light">
                      <table className="userTable table table-borderless table-hover table-light table-sm">
                        <tbody>
                          <tr>
                            <td className="tdleft">Name :</td>
                            <td>{user.name}</td>
                          </tr>
                          <tr>
                            <td className="tdleft">Email :</td>
                            <td>{user.email}</td>
                          </tr>
                          <tr>
                            <td className="tdleft">Mobile:</td>

                            {/* <td>
                          {address.map((add) => {
                            return add?.mobile;
                          })}
                        </td> */}
                            <td>{updatedAddress.mobile}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="card mt-4">
                    <div className="card-header bg-default">
                      <span className="h4 text-white font-weight-bold">
                        Your Address
                      </span>
                      <div className="custom-control custom-switch float-right">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="customSwitch1"
                          value={enableAddress}
                          onChange={(e) => {
                            setEnableAddress(e.target.checked);
                          }}
                        />
                        <label
                          className="custom-control-label text-white font-weigh-bolder"
                          htmlFor="customSwitch1"
                        >
                          <b>Enable</b>
                        </label>
                      </div>
                    </div>
                    {!enableAddress ? (
                      <React.Fragment>
                        <div className="card-body bg-light">
                          <table className="userTable table table-borderless table-hover table-light table-sm">
                            <tbody>
                              <tr>
                                <td className="tdleft">Flat :</td>
                                <td>{updatedAddress.flat}</td>
                              </tr>
                              <tr>
                                <td className="tdleft">Street :</td>
                                <td>{updatedAddress.street}</td>
                              </tr>
                              <tr>
                                <td className="tdleft">Landmark:</td>
                                <td>{updatedAddress.landmark}</td>
                              </tr>
                              <tr>
                                <td className="tdleft">Pin:</td>
                                <td>{updatedAddress.pin}</td>
                              </tr>
                              <tr>
                                <td className="tdleft">City:</td>
                                <td>{updatedAddress.city}</td>
                              </tr>
                              <tr>
                                <td className="tdleft">State:</td>
                                <td>{updatedAddress.state}</td>
                              </tr>

                              <tr>
                                <td className="tdleft">Country:</td>
                                <td>{updatedAddress.country}</td>
                              </tr>
                              <tr>
                                <td className="tdleft">Mobile:</td>
                                <td>{updatedAddress.mobile}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <div className="card-body bg-light">
                          <form action="" onSubmit={handleUpdateAddressClick}>
                            <div className="input-group input-group-sm mb-3">
                              <div className="input-group-prepend">
                                <span className="input-group-text">Flat</span>
                              </div>
                              <input
                                name="flat"
                                type="text"
                                className="form-control"
                                value={updatedAddress.flat}
                                onChange={updateAddressInput}
                              />
                            </div>

                            <div className="input-group input-group-sm mb-3">
                              <div className="input-group-prepend">
                                <span className="input-group-text">Street</span>
                              </div>
                              <input
                                name="street"
                                type="text"
                                className="form-control"
                                value={updatedAddress.street}
                                onChange={updateAddressInput}
                              />
                            </div>

                            <div className="input-group input-group-sm mb-3">
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  Landmark
                                </span>
                              </div>
                              <input
                                name="landmark"
                                type="text"
                                className="form-control"
                                value={updatedAddress.landmark}
                                onChange={updateAddressInput}
                              />
                            </div>

                            <div className="input-group input-group-sm mb-3">
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  Pincode
                                </span>
                              </div>
                              <input
                                name="pin"
                                type="text"
                                className="form-control"
                                value={updatedAddress.pin}
                                onChange={updateAddressInput}
                              />
                            </div>
                            <div className="input-group input-group-sm mb-3">
                              <div className="input-group-prepend">
                                <span className="input-group-text">City</span>
                              </div>
                              <input
                                name="city"
                                type="text"
                                className="form-control"
                                value={updatedAddress.city}
                                onChange={updateAddressInput}
                              />
                            </div>
                            <div className="input-group input-group-sm mb-3">
                              <div className="input-group-prepend">
                                <span className="input-group-text">State</span>
                              </div>
                              <input
                                name="state"
                                type="text"
                                className="form-control"
                                value={updatedAddress.state}
                                onChange={updateAddressInput}
                              />
                            </div>

                            <div className="input-group input-group-sm mb-3">
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  Country
                                </span>
                              </div>
                              <input
                                name="country"
                                type="text"
                                className="form-control"
                                value={updatedAddress.country}
                                onChange={updateAddressInput}
                              />
                            </div>

                            <div className="input-group input-group-sm mb-3">
                              <div className="input-group-prepend">
                                <span className="input-group-text">Mobile</span>
                              </div>
                              <input
                                name="mobile"
                                type="text"
                                className="form-control"
                                value={updatedAddress.mobile}
                                onChange={updateAddressInput}
                              />
                            </div>
                            <div>
                              <input
                                className="btn btn-dark-green btn-sm"
                                type="submit"
                                value="Update"
                              />
                            </div>
                          </form>
                        </div>
                      </React.Fragment>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Profile;
