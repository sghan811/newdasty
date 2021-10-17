import { ALLBOST_TYPES } from "../actions/allbostAction";

const initialState = {
  loading: false,
  bosts: [],
  result: 9,
  page: 2,
  firstLoad: false,
};

const allbostReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALLBOST_TYPES.LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case ALLBOST_TYPES.GET_BOSTS:
      return {
        ...state,
        bosts: action.payload.bosts,
        result: action.payload.result,
        firstLoad: true,
      };

    case ALLBOST_TYPES.UPDATE_BOSTSGET_BOSTS:
      return {
        ...state,
        bosts: [...action.payload.bosts],
        result: action.payload.result,
        page: state.page + 1,
      };

    default:
      return state;
  }
};

export default allbostReducer;
