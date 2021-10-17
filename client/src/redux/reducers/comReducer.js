import { COM_TYPES } from "../actions/postAction";
import { EditData, DeleteData } from "../actions/globalTypes";

const initialState = {
  loading: false,
  posts: [],
  result: 0,
  page: 2,
};

const allReducer = (state = initialState, action) => {
  switch (action.type) {
    case COM_TYPES.CREATE_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };

    case COM_TYPES.LOADING_POST:
      return {
        ...state,
        loading: action.payload,
      };

    case COM_TYPES.GET_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
        result: action.payload.result,
        page: action.payload.page,
      };
    case COM_TYPES.UPDATE_POSTS:
      return {
        ...state,
        posts: [...action.payload.posts],
        result: action.payload.result,
        page: state.page + 1,
      };

    case COM_TYPES.UPDATE_POST:
      return {
        ...state,
        posts: EditData(state.posts, action.payload._id, action.payload),
      };

    case COM_TYPES.DELETE_POST:
      return {
        ...state,
        posts: DeleteData(state.posts, action.payload._id),
      };

    case COM_TYPES.REPORT_POST:
      return {
        ...state,
        posts: EditData(state.posts, action.payload._id, action.payload),
      };

    default:
      return state;
  }
};

export default allReducer;
