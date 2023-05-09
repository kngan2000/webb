import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import Header from "./../components/Header";
import {login, register} from "./../Redux/Actions/userActions";
import {kGmailReg} from "./Register";

const Login = ({location, history}) => {
  window.scrollTo(0, 0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});


  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userLogin = useSelector((state) => state.userLogin);
  const {error, loading, userInfo} = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  //validate email, username, password
  const validate = () => {
    const errors = {};

    //Kiểm tra email có hay không
    if (!email) {
      errors.email = 'Email is required';
    } else
      //Kiểm tra email theo regex
    if (!kGmailReg.test(email)) {
      errors.email = 'Email must be ***@gmail.com';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    console.log(errors);
    return errors;
  };


  const submitHandler = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      // submit form
      setErrors({});
      dispatch(login(email, password));
    } else {
      setErrors(errors);
    }
  };

  //sử lý khi người dùng nhập vào field
  const handleChange = (e) => {
    const {name, value} = e.target;
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }

    //validate mỗi khi nhập
    // const errors = validate();
    // if (Object.keys(errors).length !== 0) {
    //   setErrors(errors);
    // }
  };

  const handleBackToHome = ()=>{
    history.push("");
  }

  return (
    <>
      <Header/>
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {error && <Message variant="alert-danger">{error}</Message>}
        {loading && <Loading/>}
        <form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <input
            // type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
          />
          {errors.email && <span style={
            {color: "red"}
          }>{errors.email}</span>}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
          />
          {errors.password && <span style={
            {color: "red"}
          }>{errors.password}</span>}
          <button type="submit">LOGIN NOW</button>
          <button type="button"  onClick={ handleBackToHome}>HOME</button>
          <p>
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
            >
              Create a new account
            </Link>
          </p>
          <p>
            <Link
              to={"/change-pass"}
            >
              Forgot Password
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
