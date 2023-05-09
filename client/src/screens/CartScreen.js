import React, {useEffect, useState} from "react";
import Header from "./../components/Header";
import {Link, useLocation, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addToCart, removefromcart} from "./../Redux/Actions/cartActions";
import {productSizes} from "./SingleProduct";
import queryString from 'query-string';


const CartScreen = ({match, location, history}) => {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();
  const productId = match.params.id;
  // const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  //Sử dụng queryString để parse search thành object
  //Để lấy các field thay vì split string
  const {search} = useLocation();
  const query = queryString.parse(search);
  const qty = query.qty;
  const size = query.size;


  const cart = useSelector((state) => state.cart);
  const {cartItems} = cart;

  const total = cartItems.reduce((a, i) => a + i.qty * i.price, 0);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty, size, "buy"));
    }
  }, [dispatch, productId, qty, size]);

  const checkOutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  const removeFromCartHandle = (id) => {
    dispatch(removefromcart(id));
  };

  const showPrice = (price) => {
    return price.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
  };

  return (
    <>
      <Header/>
      {/* Cart */}
      <div className="container">
        {cartItems.length === 0 ? (
          <div className=" alert alert-info text-center mt-3">
            There are currently no products in the cart!
            <Link
              className="btn btn-success mx-5 px-5 py-3"
              to="/"
              style={{
                fontSize: "12px",
              }}
            >
              Shopping Now
            </Link>
          </div>
        ) : (
          <>
            <div className=" alert alert-info text-center mt-3">
              List of products in your cart
              <Link className="text-success mx-2" to="/cart">
                ({cartItems.length})
              </Link>
            </div>
            {/* cartiterm */}
            {cartItems.map((item) => (
              <div className="cart-iterm row">
                <div
                  onClick={() => removeFromCartHandle(item.product)}
                  className="remove-button d-flex justify-content-center align-items-center"
                >
                  <i className="fas fa-times"></i>
                </div>
                <div className="cart-image col-md-3">
                  <img src={item.image} alt={item.name}/>
                </div>
                <div className="cart-text col-md-5 d-flex align-items-center">
                  <Link to={`/products/${item.product}`}>
                    <h4>{item.name}</h4>
                  </Link>
                </div>
                <div
                  className="cart-qty col-md-2 col-sm-5 mt-md-5 mt-3 mt-md-0 d-flex flex-column justify-content-center">
                  <h6>Quantity</h6>
                  <select
                    value={item.qty}
                    onChange={(e) =>
                      dispatch(addToCart(item.product, Number(e.target.value), size))
                    }
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div
                  className="cart-qty col-md-2 col-sm-5 mt-md-5 mt-3 mt-md-0 d-flex flex-column justify-content-center">
                  <h6>Size</h6>
                  <select
                    value={item.size}
                    onChange={(e) =>
                      // setSize(e.target.value)
                      dispatch(addToCart(item.product, qty, e.target.value))
                    }
                  >
                    {productSizes.map((x) => (
                      <option key={x} value={x}>
                        {x}
                      </option>
                    ))}
                  </select>
                </div>
                <div
                  className="cart-price mt-3 mt-md-0 col-md-2 align-items-sm-end align-items-start  d-flex flex-column justify-content-center col-sm-7">
                  <h6>Unit Price</h6>
                  <h4 style={{fontSize: "16px"}}>
                    {showPrice(item.price)}
                  </h4>
                </div>
              </div>
            ))}

            {/* End of cart iterms */}
            <div className="total">
              <span className="sub">Total Purchase:</span>
              <span className="total-price">{showPrice(total)}</span>
            </div>
            <hr/>
            <div class="cart-buttons d-flex align-items-center row">
              <Link to="/" className="col-md-6 ">
                <button class="">Continue To Shopping</button>
              </Link>
              {total > 0 && (
                <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">
                  <button onClick={checkOutHandler}>Checkout</button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartScreen;
