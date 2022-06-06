export const logInUserData = data => {
  return {
    type: "LOGIN",
    payload: data,
  };
};

export const logOut = () => {
  return {
    type: "LOGOUT",
  };
};

export const actionMode = data => {
  return {
    type: "ACTIONMODE",
    payload: data,
  };
};
