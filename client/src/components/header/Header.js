import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Menu from "./Menu";
import Search from "./Search";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../redux/actions/postAction";
import { getAllPosts } from "../../redux/actions/postAction";
import { getSuggestions } from "../../redux/actions/suggestionsAction";

import { logout } from "../../redux/actions/authAction";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import Avatar from "../Avatar";
import NotifyModal from "../NotifyModal";
import "./globaly.scss";
import "./mobile-navy.scss";
import { BiHomeAlt } from "react-icons/bi";
import { BiPlanet } from "react-icons/bi";
import { BiRocket, BiSearchAlt, BiBell } from "react-icons/bi";

const Header = () => {
  const { auth, theme, notify } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleRefreshHome = () => {
    window.scrollTo({ top: 0 });
    dispatch(getPosts(auth.token));
    dispatch(getAllPosts(auth.token));
    dispatch(getPosts(auth.token));
    dispatch(getSuggestions(auth.token));
  };
  const navLinks = [];

  const { pathname } = useLocation();

  const isActive = (pn) => {
    if (pn === pathname) return "active";
  };

  return (
    <div className="header">
      <div className="header-gird">
        <nav className="navbar navbar-expand-lg navbar-light justify-content-between">
          <div className="container-fluid">
            <a className="logo" onClick={handleRefreshHome}>
              <a className="navbar-brand text-uppercase p-0 m-0">
                <div className="d-flex">
                  <div>
                    <Link to="/" onClick={handleRefreshHome}>
                      <img
                        src="https://res.cloudinary.com/djsdo6rks/image/upload/v1627490611/fuxvo4ldslsm4og1ouda.png"
                        className="logo"
                      ></img>
                    </Link>
                  </div>
                  <div className="headerpc">
                    <Link
                      to="/"
                      className="default"
                      onClick={handleRefreshHome}
                    >
                      asty
                    </Link>
                  </div>
                  <div className="d-flex menuboxy">
                    {/* <div className="onlymb-icon belly">
                      <BiBell />
                    </div> */}
                    <div className="onlymb-icon avatary">
                      <Link to={`/profile/${auth.user._id}`}>
                        <Avatar src={auth.user.avatar} size="medium-avatar" />
                      </Link>
                    </div>
                  </div>
                </div>
              </a>
            </a>

            {/* <Search /> */}

            <Menu />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
