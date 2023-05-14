import React, {useCallback, useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../Redux/Actions/userActions";
import {listSearch} from "../Redux/Actions/ProductActions";

const Header = () => {
  const [keyword, setKeyword] = useState();
  const dispatch = useDispatch();
  let history = useHistory();

  const cart = useSelector((state) => state.cart);
  const {cartItems} = cart;
  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo} = userLogin;
  const [listStore, setListStore] = useState(JSON.parse(localStorage.getItem('favorite')) || []);
  const logoutHandler = () => {
    dispatch(logout());
  };

  // useEffect(() => {
  //   listStore = JSON.parse(localStorage.getItem('favorite'))|| 0;
  // },[JSON.parse(JSON.stringify(listStore))])


  useEffect(()=>{
   const search = setTimeout(()=>{
     if (keyword === undefined) return;

     keyword.trim();

     //check rong
     if(!keyword) {
       history.push('/');
     }else {
       dispatch(listSearch(keyword));
       history.push(`/search/${keyword}`);
     }

    },500);
    return () => clearTimeout(search);
  },[keyword]);

  const submitHandler = (e) => {
    e.preventDefault();
    //Neu keyword khong duoc nhap
    if (!keyword) return;

    //Neu keyword duoc nhap
    keyword.trim();
    dispatch(listSearch(keyword));
    history.push(`/search/${keyword}`);
  };
  return (
    <div>
      {/* Top Header */}
      <div className="Announcement ">
        <div className="container">
          <div className="row">
            <div className="col-md-6 d-flex align-items-center display-none">
              <p>+84 822 208 604</p>
              <p>kieungann0711@gmail.com</p>
            </div>
            <div className=" col-12 col-lg-6 justify-content-center justify-content-lg-end d-flex align-items-center">
              <Link to="https://www.facebook.com/profile.php?id=100022375866759&mibextid=LQQJ4d">
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link to="https://www.instagram.com">
                <i className="fab fa-instagram"></i>
              </Link>
              <Link to="">
                <i className="fab fa-linkedin-in"></i>
              </Link>
              <Link to="">
                <i className="fab fa-youtube"></i>
              </Link>
              <Link to="">
                <i className="fab fa-pinterest-p"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Header */}
      <div className="header">
        <div className="container">
          {/* MOBILE HEADER */}
          <div className="mobile-header">
            <div className="container ">
              <div className="row ">
                <div className="col-6 d-flex align-items-center">
                  <Link className="navbar-brand" to="/">
                    <img alt="logo" src="/imgaes/logo-mb.png"/>
                  </Link>
                </div>
                <div className="col-6 d-flex align-items-center justify-content-end Login-Register">
                  {userInfo ? (
                    <div className="btn-group">
                      <button
                        type="button"
                        className="name-button dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i className="fas fa-user"></i>
                      </button>
                      <div className="dropdown-menu">
                        <Link className="dropdown-item" to="/profile">
                          Profile
                        </Link>

                        <Link
                          className="dropdown-item"
                          to="#"
                          onClick={logoutHandler}
                        >
                          Logout
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="btn-group">
                      <button
                        type="button"
                        className="name-button dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i className="fas fa-user"></i>
                      </button>
                      <div className="dropdown-menu">
                        <Link className="dropdown-item" to="/login">
                          Lgin
                        </Link>

                        <Link className="dropdown-item" to="/register">
                          Register
                        </Link>
                      </div>
                    </div>
                  )}

                  <Link to="/cart" className="cart-mobile-icon">
                    <i className="fas fa-shopping-bag"></i>
                    <span className="badge">{cartItems.length}</span>
                  </Link>
                </div>
                <div className="col-12 d-flex align-items-center">
                  <form onSubmit={submitHandler}  className="input-group">
                    <input
                      type="search"
                      className="form-control rounded search"
                      placeholder="Search"
                      onChange={(e) => setKeyword(e.target.value)}
                    />
                    <button type="submit" className="search-button">
                      Search
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* PC HEADER */}
          <div className="pc-header">
            <div className="row">
              <div className="col-md-3 col-4 d-flex align-items-center mb-4">
                <Link className="navbar-brand" to="/">
                  <img alt="logo" src="/images/Kieungann.png"/>
                </Link>
              </div>

              <div className="col-md-6 col-8 d-flex align-items-center">
                <form onSubmit={submitHandler} className="input-group">
                  <input
                    type="search"
                    className="form-control rounded search"
                    placeholder="Search products....."
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                  <button type="submit" className="btn btn-success">
                    <i className="fas fa-search"></i>
                  </button>
                </form>
              </div>

              <div className="col-md-3 d-flex align-items-center justify-content-end Login-Register">
                {userInfo ? (
                  <div className="btn-group">
                    <button
                      type="button"
                      className="name-button dropdown-toggle"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Hi, {userInfo.name}
                    </button>
                    <div className="dropdown-menu">
                      <Link className="dropdown-item" to="/profile">
                        Update Profile
                      </Link>

                      <Link
                        className="dropdown-item"
                        to="#"
                        onClick={logoutHandler}
                      >
                        Logout
                      </Link>
                    </div>
                  </div>
                ) : (
                  <>
                    <Link to="/register">Register</Link>
                    <Link to="/login">Login</Link>
                  </>
                )}
                <Link to="/cart">
                  <i className="fas fa-shopping-bag"></i>
                  <span className="badge">{cartItems.length}</span>
                </Link>
                <Link to="/favorite">
                  <i className="fas fa-heart"></i>
                  <span className="badge">{listStore.length ? listStore.length : 0}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
