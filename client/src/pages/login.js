import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { adminLogin, login } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const initialState = { email: "", password: "" };
  const [userData, setUserData] = useState(initialState);
  const [userType, setUserType] = useState(false);
  const { email, password } = userData;

  const [typePass, setTypePass] = useState(false);

  const { auth } = useSelector((state) => state);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (auth.token) history.push("/");
  }, [auth.token, history]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userType) {
      dispatch(login(userData));
    } else {
      dispatch(adminLogin(userData));
    }
  };

  return (
    <div className="auth_page">
      <form onSubmit={handleSubmit} className="">
        <img
          src="https://res.cloudinary.com/djsdo6rks/image/upload/v1627490611/fuxvo4ldslsm4og1ouda.png"
          className="mainlogo"
        ></img>
        <a className="title">ASTY</a>
        <div className="emailbox">
          <input
            placeholder="Email"
            type="email"
            className=""
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={handleChangeInput}
            value={email}
            name="email"
          />
        </div>
        {/* <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div> */}
        <div className="">
          <div className="passwordbox">
            <input
              placeholder="Password"
              type={typePass ? "text" : "password"}
              className=""
              id="exampleInputPassword1"
              onChange={handleChangeInput}
              value={password}
              name="password"
            />
            <div className="showhide">
              <a onClick={() => setTypePass(!typePass)}>
                {typePass ? "Hide" : "Show"}
              </a>
            </div>
          </div>
        </div>

        {/* <div className="d-flex justify-content-evenly  mx-0 mb-4">
          <label htmlFor="User">
            User:
            <input
              type="radio"
              id="User"
              name="gender"
              value={userType}
              defaultChecked
              onClick={() => setUserType(false)}
            />
          </label>

          <label htmlFor="Admin">
            Admin:
            <input
              type="radio"
              id="Admin"
              name="gender"
              value={userType}
              onClick={() => setUserType(true)}
            />
          </label>
        </div> */}

        <button
          type="submit"
          className="auth-btn"
          disabled={email && password ? false : true}
        >
          Login
        </button>
        <div className="signup-btn">
          <a>Don't have an account? </a>
          <Link to="/register" style={{ color: "" }}>
            Sign up
          </Link>
        </div>
        <div className="madein">
          <a>Made in Seoul</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
