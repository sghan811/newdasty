import { GLOBALTYPES } from "../actions/globalTypes";
import { getDataAPI } from "../../utils/fetchData";

export const BUGGEST_TYPES = {
  LOADING: "LOADING_BUGGESTIONS",
  GET_USERS: "GET_USERS_BUGGESTIONS",
};

export const getBuggestions = (token) => async (dispatch) => {
  try {
    dispatch({ type: BUGGEST_TYPES.LOADING, payload: true });

    const res = await getDataAPI(`buggestionsUser`, token);

    dispatch({ type: BUGGEST_TYPES.GET_USERS, payload: res.data });

    dispatch({ type: BUGGEST_TYPES.LOADING, payload: false });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};
