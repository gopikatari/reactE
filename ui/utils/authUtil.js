export const getToken = () => {
  return localStorage.getItem(process.env.REACT_APP_TOKEN_VARIABLE);
};
export const isUserLoggedIn = () => {
  return !!localStorage.getItem(process.env.REACT_APP_TOKEN_VARIABLE);
};
