import { BUGGEST_TYPES } from "../actions/buggestionsAction";

const initialState = {
  loading: false,
  users: [],
  bosts: [],
};

const buggestionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case BUGGEST_TYPES.LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case BUGGEST_TYPES.GET_USERS:
      return {
        ...state,
        users: action.payload.users,
        bosts: action.payload.bosts,
      };

    default:
      return state;
  }
};

export default buggestionsReducer;
