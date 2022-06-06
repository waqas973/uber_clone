const initState = {
  action_Mode: "",
};

const ActionMode = (state = initState, action) => {
  switch (action.type) {
    case "ACTIONMODE": {
      return {
        ...state,
        action_Mode: action.payload,
      };
    }

    default:
      return { ...state };
  }
};
export default ActionMode;
