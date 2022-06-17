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

export const userSelectedLocations = data => {
  return {
    type: "SELECTEDLOCATION",
    payload: data,
  };
};
export const initCometChatFun = data => {
  return {
    type: "INITIALIZECOMET",
    payload: data,
  };
};
