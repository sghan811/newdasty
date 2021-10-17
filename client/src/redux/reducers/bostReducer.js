import { BOST_TYPES } from "../actions/bostAction";
import { EditData, DeleteData } from "../actions/globalTypes";

const initialState = {
  loading: false,
  bosts: [],
  result: 0,
  page: 2,
};

const bostReducer = (state = initialState, action) => {
  switch (action.type) {
    case BOST_TYPES.CREATE_BOST:
      return {
        ...state,
        bosts: [action.payload, ...state.bosts],
      };

    case BOST_TYPES.LOADING_BOST:
      return {
        ...state,
        loading: action.payload,
      };

    case BOST_TYPES.GET_BOSTS:
      return {
        ...state,
        bosts: action.payload.bosts,
        result: action.payload.result,
        page: action.payload.page,
      };

    case BOST_TYPES.UPDATE_BOST:
      return {
        ...state,
        bosts: EditData(state.bosts, action.payload._id, action.payload),
      };

    case BOST_TYPES.DELETE_BOST:
      return {
        ...state,
        bosts: DeleteData(state.bosts, action.payload._id),
      };

    case BOST_TYPES.REPORT_BOST:
      return {
        ...state,
        bosts: EditData(state.bosts, action.payload._id, action.payload),
      };

    default:
      return state;
  }
};

export default bostReducer;
