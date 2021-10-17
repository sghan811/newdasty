import { BOST_TYPES } from "../actions/bostAction";
import { EditDatabost } from "../actions/globalTypes";

const detailBostReducer = (state = [], action) => {
  switch (action.type) {
    case BOST_TYPES.GET_BOST:
      return [...state, action.payload];

    case BOST_TYPES.UPDATE_BOST:
      return EditDatabost(state, action.payload._id, action.payload);

    default:
      return state;
  }
};

export default detailBostReducer;
