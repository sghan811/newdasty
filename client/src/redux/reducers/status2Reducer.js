import { GLOBALTYPES } from "../actions/globalTypes";

const status2Reducer = (state = false, action) => {
  switch (action.type) {
    case GLOBALTYPES.STATUS2:
      return action.payload;

    default:
      return state;
  }
};

export default status2Reducer;
