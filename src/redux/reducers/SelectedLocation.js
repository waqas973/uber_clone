const initState = {
  pickupLocation: null,
  destinationLocaiton: null,
};

const SelectedLocation = (state = initState, action) => {
  switch (action.type) {
    case "SELECTEDLOCATION": {
      return {
        ...state,
        pickupLocation: action.payload.pickupLocationData,
        destinationLocaiton: action.payload.destinationLocationData,
      };
    }

    default:
      return { ...state };
  }
};
export default SelectedLocation;
