import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { register } from "../redux/actions/authAction";

const Register = () => {
  const { auth, alert } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const initialState = {
    fullname: "",
    username: "",
    email: "",
    password: "",
    cf_password: "",
    gender: "male",
  };
  const [userData, setUserData] = useState(initialState);
  const { fullname, username, email, password, cf_password } = userData;

  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);

  useEffect(() => {
    if (auth.token) history.push("/");
  }, [auth.token, history]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(userData));
  };

  return (
    <div className="auth_page">
      <form onSubmit={handleSubmit} className="">
        <img
          src="https://res.cloudinary.com/djsdo6rks/image/upload/v1627490611/fuxvo4ldslsm4og1ouda.png"
          className="mainlogo"
        ></img>
        <a className="title">ASTY</a>
        <div className="">
          <div className="emailbox">
            <input
              placeholder="Full name"
              type="text"
              className=""
              id="fullname"
              onChange={handleChangeInput}
              value={fullname}
              name="fullname"
              style={{ background: `${alert.fullname ? "#fd2d6a14" : ""} ` }}
            />
          </div>
          <small className="form-text text-danger">
            {alert.fullname ? alert.fullname : ""}
          </small>
        </div>

        <div className="">
          <div className="inputbox">
            <input
              placeholder="User name"
              type="text"
              className=""
              id="username"
              onChange={handleChangeInput}
              value={username.toLowerCase().replace(/ /g, "")}
              name="username"
              style={{ background: `${alert.username ? "#fd2d6a14" : ""} ` }}
            />
          </div>
          <small className="form-text text-danger">
            {alert.username ? alert.username : ""}
          </small>
        </div>

        <div className="">
          <div className="inputbox">
            <input
              placeholder="Email"
              type="email"
              className=""
              id="email"
              aria-describedby="emailHelp"
              onChange={handleChangeInput}
              value={email}
              name="email"
              style={{ background: `${alert.email ? "#fd2d6a14" : ""} ` }}
            />
          </div>
          <small className="form-text text-danger">
            {alert.email ? alert.email : ""}
          </small>
        </div>

        <div className="">
          <div className="">
            <div className="passwordbox">
              <input
                placeholder="Password"
                type={typePass ? "text" : "password"}
                className=""
                id="password"
                onChange={handleChangeInput}
                value={password}
                name="password"
                style={{
                  background: `${alert.password ? "#fd2d6a14" : ""} `,
                }}
              />
              <div className="showhide">
                <a onClick={() => setTypePass(!typePass)}>
                  {typePass ? "Hide" : "Show"}
                </a>
              </div>
            </div>
          </div>
          <small className="form-text text-danger">
            {alert.password ? alert.password : ""}
          </small>
        </div>

        <div className="">
          <div className="">
            <div className="passwordbox">
              <input
                placeholder="Confirm password"
                type={typeCfPass ? "text" : "password"}
                className=""
                id="cf_password"
                onChange={handleChangeInput}
                value={cf_password}
                name="cf_password"
                style={{
                  background: `${alert.cf_password ? "#fd2d6a14" : ""} `,
                }}
              />
              <div className="showhide">
                <a onClick={() => setTypeCfPass(!typeCfPass)}>
                  {typeCfPass ? "Hide" : "Show"}
                </a>
              </div>
            </div>
          </div>
          <small className="form-text text-danger">
            {alert.cf_password ? alert.cf_password : ""}
          </small>
        </div>

        {/* <div className="">
          <label htmlFor="male">
            Male:
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              defaultChecked
              onChange={handleChangeInput}
            />
          </label>

          <label htmlFor="female">
            Female:
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              onChange={handleChangeInput}
            />
          </label>
        </div> */}

        <button type="submit" className="auth-btn">
          Register
        </button>
        <div className="signup-btn">
          <a>Already have an account? </a>
          <Link to="/" style={{ color: "" }}>
            Login Now.
          </Link>
        </div>
        <div className="madein">
          <a>Made in Seoul</a>
        </div>
      </form>
    </div>
  );
};

export default Register;
