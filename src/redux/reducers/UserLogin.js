const initState = {
  IsUserLogIn: false,
  UserData: "",
};

const UserLogin = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN": {
      return {
        ...state,
        IsUserLogIn: true,
        UserData: action.payload,
      };
    }

    case "LOGOUT": {
      return {
        ...state,
        IsUserLogIn: false,
        UserData: "",
      };
    }
    default:
      return { ...state };
  }
};
export default UserLogin;
