import React from "react";
import { Link } from "react-router-dom";

const OrderDetailProducts = (props) => {
  const { order, loading } = props;

  if (!loading) {
    // Calculate Price
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    if (order.typePay === "loan") {
      order.itemsPrice = addDecimals(
        order.orderItems.reduce(
          (acc, item) => acc + item.loanPrice * item.qty,
          0
        )
      );
    } else {
      order.itemsPrice = addDecimals(
        order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );
    }
  }

  const renderPrice = (qty, price, loanPrice, typePay) => {
    let prices = "";
    if (typePay === "buy") {
      prices = price * qty;
    } else {
      prices = loanPrice * qty;
    }
    return prices.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
  };

  const renderOnePrice = (price, loanPrice, typePay) => {
    let prices = "";
    if (typePay === "buy") {
      prices = price;
    } else {
      prices = loanPrice;
    }
    return prices.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
  };

  return (
    <table className="table border table-lg">
      <thead>
        <tr>
          <th style={{ width: "40%" }}>PRODUCT NAME</th>
          <th style={{ width: "20%" }}>PRICE</th>
          <th style={{ width: "20%" }}>QUANTITY</th>
          <th style={{ width: "20%" }} className="text-end">
            TOTAL PRICE
          </th>
        </tr>
      </thead>
      <tbody>
        {order.orderItems.map((item, index) => (
          <tr key={index}>
            <td>
              <Link className="itemside" to="#">
                <div className="left">
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "40px", height: "40px" }}
                    className="img-xs"
                  />
                </div>
                <div className="info">{item.name}</div>
              </Link>
            </td>
            <td>{renderOnePrice(item.price, item.loanPrice, item.typePay)}</td>
            <td>{item.qty} </td>
            <td className="text-end">
              {" "}
              {renderPrice(item.qty, item.price, item.loanPrice, item.typePay)}
            </td>
          </tr>
        ))}

        <tr>
          <td colSpan="4">
            <article className="float-end">
              <dl className="dlist">
                <dt>Subtotal:</dt> <dd>{order.itemsPrice}</dd>
              </dl>
              <dl className="dlist">
                <dt>Shipping Fees:</dt> <dd>{order.shippingPrice}</dd>
              </dl>
              <dl className="dlist">
                <dt>Tax:</dt> <dd>{order.taxPrice}</dd>
              </dl>
              <dl className="dlist">
                <dt>Total Payment:</dt>
                <dd>
                  <b className="h5">{order.totalPrice}</b>
                </dd>
              </dl>
              <dl className="dlist">
                <dt className="text-muted">Status:</dt>
                <dd>
                  {order.isPaid || order.paymentMethod == "Credit" ? (
                    <span className="badge rounded-pill alert alert-success text-success">
                      {order.paymentMethod === "Credit"
                        ? "Payment on Delivery"
                        : "Payment success"}
                    </span>
                  ) : (
                    <span className="badge rounded-pill alert alert-danger text-danger">
                      UNPAID
                    </span>
                  )}
                </dd>
              </dl>
            </article>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default OrderDetailProducts;
