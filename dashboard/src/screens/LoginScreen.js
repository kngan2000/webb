import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Loading from "../components/LoadingError/Loading";
import Toast from "../components/LoadingError/Toast";
import {login} from "../Redux/Actions/userActions";
import Message from "./../components/LoadingError/Error";

const Login = ({history}) => {
  window.scrollTo(0, 0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});


  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const {error, loading, userInfo} = userLogin;

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
  };

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
    // if (!password) {
    //   errors.password = 'Password is required';
    // } else if (password.length < 6) {
    //   errors.password = 'Password must be at least 6 characters';
    // }

    return errors;
  };

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [userInfo, history]);

  const submitHandler = (e) => {
    e.preventDefault();

    const errors = validate();

    if (Object.keys(errors).length === 0) {
      // submit form
      setErrors({});

      dispatch(login( email, password));
    } else {
      setErrors(errors);
    }
  };
  return (
    <>
      <Toast/>
      <div
        className="card shadow mx-auto"
        style={{maxWidth: "380px", marginTop: "100px"}}
      >
        <div className="card-body">
          {error && <Message variant="alert-danger">{error}</Message>}
          {loading && <Loading/>}
          <h4 className="card-title mb-4 text-center">Sign in</h4>
          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <input
                className="form-control"
                name="email"
                placeholder="Email"
                // type="email"
                value={email}
                onChange={handleChange}
              />
              {errors.email && <span style={
                {color: "red"}
              }>{errors.email}</span>}
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                name="password"
                placeholder="Password"
                type="password"
                value={password}
                onChange={handleChange}
              />
              {/*{errors.password && <span style={*/}
              {/*  {color: "red"}*/}
              {/*}>{errors.password}</span>}*/}
            </div>

            <div className="mb-4">
              <button type="submit" className="btn btn-primary w-100">
                LOGIN
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

export const kGmailReg = /[\w]*@*[a-z]*\.*[\w]{5,}(\.)*(com)*(@gmail\.com)/g
