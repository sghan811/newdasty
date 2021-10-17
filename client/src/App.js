import { BrowserRouter as Router, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import io from "socket.io-client";

import PageRender from "./customRouter/PageRender";
import PrivateRouter from "./customRouter/PrivateRouter";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import Bost from "./pages/bost";
import HashHome from "./pages/HashHome";
import Community from "./pages/Community";
import Alert from "./components/alert/Alert";
import Header from "./components/header/Header";
import StatusModal from "./components/StatusModal";
import BostStatusModal from "./components/BostStatusModal";
import CommuStatusModal from "./components/CommuStatusModal";
import { refreshToken } from "./redux/actions/authAction";
import { getPosts } from "./redux/actions/postAction";
// import { getAlls } from "./redux/actions/allAction";
import { getBosts } from "./redux/actions/bostAction";
import { getSuggestions } from "./redux/actions/suggestionsAction";
import { getBuggestions } from "./redux/actions/buggestionsAction";
import { getNotifies } from "./redux/actions/notifyAction";

import AdminDashboard from "./pages/adminDashboard";
import { GLOBALTYPES } from "./redux/actions/globalTypes";
import SocketClient from "./SocketClient";

import Test from "./pages/test";
import Searchpage from "./pages/Searchpage";

function App() {
  const { auth, status, status1, status2, modal, userType } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());

    const socket = io();
    dispatch({ type: GLOBALTYPES.SOCKET, payload: socket });
    return () => socket.close();
  }, [dispatch]);

  useEffect(() => {
    if (auth.token) {
      dispatch(getPosts(auth.token));
      // dispatch(getAlls(auth.token));
      dispatch(getBosts(auth.token));
      dispatch(getSuggestions(auth.token));
      dispatch(getBuggestions(auth.token));
      dispatch(getNotifies(auth.token));
    }
  }, [dispatch, auth.token]);

  useEffect(() => {
    if (!("Notification" in window)) {
      // alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
        }
      });
    }
  }, []);

  return (
    <Router>
      <Alert />
      <input type="checkbox" id="theme" />
      <div
        className={`App ${(status || status1 || status2 || modal) && "mode"}`}
      >
        <div className="main">
          {userType === "user" && auth.token && <Header />}
          {status && <StatusModal />}
          {status1 && <BostStatusModal />}
          {status2 && <CommuStatusModal />}

          {/* {auth.token && <SocketClient />} */}
          <Route
            exact
            path="/"
            component={
              userType === "user"
                ? auth.token
                  ? Home
                  : Login
                : auth.token
                ? AdminDashboard
                : Login
            }
          />

          <Route
            exact
            path="/community"
            component={
              userType === "user"
                ? auth.token
                  ? Community
                  : Login
                : auth.token
                ? AdminDashboard
                : Login
            }
          />
          <Route
            exact
            path="/hashtag/:id"
            component={
              userType === "user"
                ? auth.token
                  ? HashHome
                  : Login
                : auth.token
                ? AdminDashboard
                : Login
            }
          />

          <Route
            exact
            path="/search"
            component={
              userType === "user"
                ? auth.token
                  ? Searchpage
                  : Login
                : auth.token
                ? AdminDashboard
                : Login
            }
          />
          <Route
            exact
            path="/bost/:id"
            component={
              userType === "user"
                ? auth.token
                  ? Bost
                  : Login
                : auth.token
                ? AdminDashboard
                : Login
            }
          />

          {userType === "user" && (
            <>
              <Route exact path="/register" component={Register} />
              <div className="wrap_page">
                <PrivateRouter exact path="/:page" component={PageRender} />
                <PrivateRouter exact path="/:page/:id" component={PageRender} />
                <PrivateRouter exact path="/test" component={Test} />
                <PrivateRouter exact path="/test" component={Test} />
              </div>
            </>
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;
