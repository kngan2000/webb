import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {savePaymentMethod} from "../Redux/Actions/cartActions";
import Header from "./../components/Header";

export const PaymentMethod = Object.freeze({
  PayPal: "PayPal",
  Credit: "Credit"
})

const PaymentScreen = ({history}) => {
  window.scrollTo(0, 0);

  const cart = useSelector((state) => state.cart);
  const {shippingAddress} = cart;

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState(PaymentMethod.PayPal);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };
  return (
    <>
      <Header/>
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form
          className="Login2 col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <h6>Please choose a form of payment!</h6>
          <div className="payment-container">
            <div className="radio-container">
              <input
                className="form-check-input"
                type="checkbox"
                checked={paymentMethod === PaymentMethod.PayPal ? true : false}
                onChange={(e) => setPaymentMethod(PaymentMethod.PayPal)}
              />
              <label className="form-check-label">
                Pay by Paypal or Credit Card/Debit Card
              </label>
            </div>
            <div className="radio-container">
              <input
                className="form-check-input"
                type="checkbox"
                checked={paymentMethod === PaymentMethod.Credit ? true : false}
                onChange={(e) => setPaymentMethod(PaymentMethod.Credit)}
              />
              <label className="form-check-label">
                Payment on delivery
              </label>
            </div>
          </div>

          <button type="submit">Continue</button>
        </form>
      </div>
    </>
  );
};

export default PaymentScreen;
