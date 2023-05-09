import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import {register} from "../Redux/Actions/userActions";
import Header from "./../components/Header";

const Register = ({location, history}) => {
  window.scrollTo(0, 0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});


  //sử lý khi người dùng nhập vào field
  const handleChange = (e) => {
    const {name, value} = e.target;
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'name':
        setName(value);
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

  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/";

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
    if (!name) {
      errors.name = 'Name is required';
    }
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    return errors;
  };


  const submitHandler = (e) => {
    e.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length === 0) {
      // submit form
      setErrors({});

      dispatch(register(name, email, password));
    } else {
      setErrors(errors);
    }
  };

  const handleBackToHome = ()=>{
    history.push("");
  }

  const userRegister = useSelector((state) => state.userRegister);
  const {error, loading, userInfo} = userRegister;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);


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
            name="name"
            type="text"
            placeholder="Username"
            value={name}
            onChange={handleChange}
          />
          {errors.name && <span style={
            {color: "red"}
          }>{errors.name}</span>}
          <input
            name="email"
            // type="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
          />
          {errors.email && <span style={
            {color: "red"}
          }>{errors.email}</span>}
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
          />
          {errors.password && <span style={
            {color: "red"}
          }>{errors.password}</span>}
          <button type="submit">REGISTER</button>
          <button type="button" className="btn btn-secondary w-100" onClick={ handleBackToHome}>HOME</button>
          <p>
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              I already have an account! <strong>LOGIN</strong>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;


export const kGmailReg = /[\w]*@*[a-z]*\.*[\w]{5,}(\.)*(com)*(@gmail\.com)/g
