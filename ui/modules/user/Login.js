import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as userActions from "../../redux/user/user.actions";

const Login = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const { state } = props.location;
    if (state) {
      state.from.pathname.length > 0 && toast.warn("Please login !!");
    }
  }, [props.location]);
  //errors start

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: [],
    password: [],
  });
  const [dirty, setDirty] = useState({
    email: false,
    password: false,
  });
  let validate = () => {
    let errorsData = {};
    //emailvalidation
    errorsData.email = [];

    if (!login.email) {
      errorsData.email.push("Email is required");
    }
    if (login.email) {
      let emailRegx =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;
      if (!emailRegx.test(login.email)) {
        errorsData.email.push("Input value is not valid");
      }
    } //email validationend

    //password
    errorsData.password = [];
    if (!login.password) {
      errorsData.password.push("Password is required");
    }
    let passwordRegx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    //passwordEdn

    if (login.password) {
      if (!passwordRegx.test(login.password)) {
        errorsData.password.push(
          "Password is not matching to the requirements"
        );
      }
    }
    setErrors(errorsData);
  };

  //make fields dirty
  let setFieldsDirty = () => {
    let dirtyData = dirty;
    Object.keys(dirty).map((control) => {
      dirtyData[control] = true;
      return dirtyData;
    });
    setDirty(dirtyData);
  };

  //is valid
  let isValid = () => {
    let valid = true;
    Object.keys(errors).map((control) => {
      if (errors[control].length > 0) valid = false;
      return valid;
    });
    return valid;
  };
  useEffect(validate, [login]);
  //errors end

  let handlLoginSubmit = (event) => {
    event.preventDefault();

    setFieldsDirty();
    validate();
    if (isValid()) {
      dispatch(userActions.loginUser(login, history));
    } else {
      toast.error("Failed in validating the form...");
    }
  };

  return (
    <React.Fragment>
      <section className="paddingTop">
        <div className="container">
          <div className="row animated slideInDown">
            <div className="col-md-4 m-auto">
              <div className="card mt-4">
                <div className="card-header bg-card-header-login">
                  <p className="h5 font-weight-bold text-center text-white">
                    Login
                  </p>
                </div>
                <div className="card-body bg-card-body">
                  <form action="" onSubmit={handlLoginSubmit}>
                    <div className="form-group">
                      <input
                        type="text"
                        className={`form-control ${
                          dirty["email"] && errors["email"][0]
                            ? "is-invalid"
                            : ""
                        }`}
                        name="email"
                        placeholder="Enter your email"
                        value={login.email}
                        onChange={(event) => {
                          setLogin({ ...login, email: event.target.value });
                        }}
                        onBlur={() => {
                          setDirty({ ...dirty, email: true });
                          validate();
                        }}
                      />
                      <div className="text-danger">
                        {dirty["email"] && errors["email"][0] ? (
                          <small className="font-weight-bold">
                            {errors["email"]}
                          </small>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={login.password}
                        placeholder="Enter your password"
                        onChange={(event) => {
                          setLogin({ ...login, password: event.target.value });
                        }}
                        onBlur={() => {
                          setDirty({ ...dirty, password: true });
                          validate();
                        }}
                      />
                      <div className="text-danger">
                        {dirty["password"] && errors["password"][0]
                          ? errors["password"]
                          : ""}
                      </div>
                    </div>
                    <div className="form-group ">
                      <input
                        type="submit"
                        className="form-control bg-success text-white"
                        value="Login"
                      />
                    </div>
                  </form>
                  <div>
                    <small>
                      Don't have an account ?
                      <Link className="font-weight-bold" to="/register">
                        {" "}
                        Register
                      </Link>{" "}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            {Object.keys(errors).map((control) => {
              if (dirty[control]) {
                return errors[control].map((err) => {
                  return (
                    <li className="text-danger" key={err}>
                      {err}
                    </li>
                  );
                });
              } else {
                return "";
              }
            })}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Login;
