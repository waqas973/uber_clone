const initState = {
  cometChat: "",
};

const CometChat = (state = initState, action) => {
  switch (action.type) {
    case "INITIALIZECOMET": {
      return {
        ...state,
        cometChat: action.payload,
      };
    }
    default:
      return { ...state };
  }
};
export default CometChat;
