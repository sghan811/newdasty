import { combineReducers } from "redux";

import auth from "./authReducer";
import userType from "./userTypeReducer";
import alert from "./alertReducer";
import theme from "./themeReducer";
import profile from "./profileReducer";
import status from "./statusReducer";
import status1 from "./status1Reducer";
import status2 from "./status2Reducer";
import homePosts from "./postReducer";
import all from "./allReducer";
import com from "./comReducer";
import allbost from "./allbostReducer";
import homeBosts from "./bostReducer";
import modal from "./modalReducer";
import detailPost from "./detailPostReducer";
import detailBost from "./detailBostReducer";
import detailAll from "./detailAllReducer";
import admin from "./adminReducer";
import discover from "./discoverReducer";

// import all from "./allReducer";
import suggestions from "./suggestionsReducer";
import buggestions from "./buggestionsReducer";
import socket from "./socketReducer";
import notify from "./notifyReducer";
import message from "./messageReducer";

export default combineReducers({
  auth,
  alert,
  theme,
  profile,
  status,
  status1,
  status2,
  homePosts,
  homeBosts,
  modal,
  detailPost,
  detailBost,
  detailAll,
  userType,
  admin,
  discover,
  all,
  com,
  allbost,
  suggestions,
  buggestions,
  socket,
  notify,
  message,
});
