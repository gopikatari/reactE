import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import * as userActions from "../../redux/user/user.actions";
const RegisterUser = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  //state info

  const [registerUser, setRegisterUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  //state info end

  //========================================
  //validation start
  const [errors, setErrors] = useState({
    name: [],
    email: [],
    password: [],
    confirmpassword: [],
  });
  const [dirty, setDirty] = useState({
    name: false,
    email: false,
    password: false,
    confirmpassword: false,
  });

  let validate = () => {
    let errorData = {};

    //validate name
    errorData.name = [];
    if (!registerUser.name) {
      errorData.name.push("Name is required");
    }
    if (registerUser.name && registerUser.name.length < 4)
      errorData.name.push("Not a valid username");

    //validate email
    errorData.email = [];
    if (!registerUser.email) {
      errorData.email.push("Email is required");
    }
    if (registerUser.email) {
      let emailRegx =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;
      if (!emailRegx.test(registerUser.email))
        errorData.email.push("Invalid email format");
    }

    //validate password
    errorData.password = [];
    if (!registerUser.password) {
      errorData.password.push("Password is required");
    }
    if (registerUser.password) {
      let passwordRegx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
      if (!passwordRegx.test(registerUser.password)) {
        errorData.password.push("Invalid password");
      }
    }

    ////validate password
    errorData.confirmpassword = [];
    if (!registerUser.confirmpassword) {
      errorData.confirmpassword.push("confirm password is required");
    }
    if (registerUser.confirmpassword) {
      if (registerUser.password !== registerUser.confirmpassword) {
        errorData.confirmpassword.push(
          "Passwordn and confirm password did not match"
        );
      }
    }

    setErrors(errorData);
  };

  //set all controls as dirty

  let setControlsDirty = () => {
    let dirtyData = dirty;
    Object.keys(dirty).map((control) => {
      dirtyData[control] = true;
      return dirtyData;
    });
    setDirty(dirtyData);
  };

  //check isformvalid or not

  let isvalid = () => {
    let valid = true;
    Object.keys(errors).map((control) => {
      if (errors[control].length > 0) {
        valid = false;
      }
      return valid;
      //console.log(errors[control].length);
    });
    return valid;
  };
  //validation end
  useEffect(validate, [registerUser]);
  //handleRegister
  let handleRegister = (event) => {
    event.preventDefault();
    setControlsDirty();
    validate();
    if (isvalid()) {
      dispatch(userActions.registerUser(registerUser, history));
      //toast.success("Registeratino success");
    } else {
      toast.error("Failed");
    }
  };
  //handleRegisterEnd
  return (
    <React.Fragment>
      <section className="paddingTop">
        <div className="container">
          <div className="row animated slideInUp">
            <div className="col-md-4 m-auto">
              <div className="card mt-4">
                <div className="card-header bg-card-header-register">
                  <p className="h5 font-weight-bold text-center text-white">
                    Register
                  </p>
                </div>
                <div className="card-body bg-card-body">
                  <form action="">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="Enter your name"
                        value={registerUser.name}
                        onChange={(event) => {
                          setRegisterUser({
                            ...registerUser,
                            name: event.target.value,
                          });
                        }}
                        onBlur={() => {
                          setDirty({
                            ...dirty,
                            name: true,
                          });
                          validate();
                        }}
                      />
                      <small className="text-danger">
                        {dirty["name"] && errors["name"][0]
                          ? errors["name"]
                          : ""}
                      </small>
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        placeholder="Enter your email"
                        value={registerUser.email}
                        onChange={(event) => {
                          setRegisterUser({
                            ...registerUser,
                            email: event.target.value,
                          });
                        }}
                        onBlur={() => {
                          setDirty({
                            ...dirty,
                            email: true,
                          });
                          validate();
                        }}
                      />
                      <small className="text-danger">
                        {dirty["email"] && errors["email"][0]
                          ? errors["email"]
                          : ""}
                      </small>
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="password"
                        value={registerUser.password}
                        onChange={(event) => {
                          setRegisterUser({
                            ...registerUser,
                            password: event.target.value,
                          });
                        }}
                        onBlur={() => {
                          setDirty({
                            ...dirty,
                            password: true,
                          });
                          validate();
                        }}
                      />
                      <small className=" text-danger">
                        {dirty["password"] && errors["password"][0]
                          ? errors["password"]
                          : ""}
                      </small>
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        name="confirmpassword"
                        placeholder="Confirm password"
                        value={registerUser.confirmpassword}
                        onChange={(event) => {
                          setRegisterUser({
                            ...registerUser,
                            confirmpassword: event.target.value,
                          });
                        }}
                        onBlur={() => {
                          setDirty({
                            ...dirty,
                            confirmpassword: true,
                          });
                          validate();
                        }}
                      />
                      <small className=" text-danger">
                        {dirty["confirmpassword"] &&
                          errors["confirmpassword"][0]
                          ? errors["confirmpassword"]
                          : ""}
                      </small>
                    </div>
                    <div className="form-group ">
                      <input
                        type="submit"
                        className="form-control bg-info text-white"
                        value="Register"
                        onClick={handleRegister}
                      />
                    </div>
                  </form>
                  <div>
                    <small className="">
                      Already have an account ?
                      <Link className="font-weight-bold" to="/users/login">
                        {" "}
                        Login
                      </Link>{" "}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default RegisterUser;
