const initState = {
  IsUserLogIn: false,
  userData: "",
};

const UserLogin = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN": {
      return {
        ...state,
        IsUserLogIn: true,
        userData: action.payload,
      };
    }

    case "LOGOUT": {
      return {
        ...state,
        IsUserLogIn: false,
        userData: "",
      };
    }
    default:
      return { ...state };
  }
};
export default UserLogin;
