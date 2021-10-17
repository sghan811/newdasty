import { GLOBALTYPES } from "./globalTypes";
import { getDataAPI } from "../../utils/fetchData";

export const ALLBOST_TYPES = {
  LOADING: "LOADING_ALLBOST",
  GET_BOSTS: "GET_ALLBOST_BOSTS",
  UPDATE_BOSTS: "UPDATE_ALLBOST_BOSTS",
};

export const getAllBosts = (token) => async (dispatch) => {
  try {
    dispatch({ type: ALLBOST_TYPES.LOADING, payload: true });

    const res = await getDataAPI(`bost_allbost`, token);

    dispatch({ type: ALLBOST_TYPES.GET_BOSTS, payload: res.data });

    dispatch({ type: ALLBOST_TYPES.LOADING, payload: false });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};
