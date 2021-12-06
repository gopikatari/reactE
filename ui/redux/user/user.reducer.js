import * as userActions from "../user/user.actions";

const intialState = {
  loading: false,
  isAuthenticated: false,
  user: {},
  errorMessage: "",
  token: "",
};

export const userFeatureKey = "user-info";
export const reducer = (state = intialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case userActions.USER_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userActions.USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case userActions.USER_REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: payload,
      };

    // USERLOGIN
    case userActions.USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userActions.USER_LOGIN_SUCCESS:
      localStorage.setItem(process.env.REACT_APP_TOKEN_VARIABLE, payload.token);
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        token: payload.token,
        user: payload.user,
      };
    case userActions.USER_LOGIN_FAILURE:
      localStorage.removeItem(process.env.REACT_APP_TOKEN_VARIABLE);
      return {
        ...state,
        loading: false,
        errorMessage: payload,
        isAuthenticated: false,
        user: {},
        token: "",
      };
    //USERLOGIN END

    //logout
    case userActions.USER_LOGOUT_REQUEST:
      localStorage.removeItem(process.env.REACT_APP_TOKEN_VARIABLE);
      return {
        ...state,
        isAuthenticated: false,
        user: {},
        loading: false,
        token: "",
      };
    //logout

    //get user information

    case userActions.USER_INFO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userActions.USER_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        user: payload.user,
      };
    case userActions.USER_INFO_FAILURE:
      return {
        ...state,
        loading: false,
        user: {},
        token: "",
        errorMessage: payload,
      };

    //UPDATE ADDRESS
    case userActions.UPDATE_ADDRESS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userActions.UPDATE_ADDRESS_SUCCESS:
      let modifiedAdd = state.user.address.find(
        (add) => add._id === payload.user.address[0]._id
      );
      if (modifiedAdd) {
        return {
          ...state,
          user: {
            ...state.user,
            address: [...state.user.address, modifiedAdd],
          },
          loading: false,
        };
      }
      return {
        ...state,
        loading: false,
      };
    case userActions.UPDATE_ADDRESS_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: payload,
      };
    default:
      return state;
  }
};
