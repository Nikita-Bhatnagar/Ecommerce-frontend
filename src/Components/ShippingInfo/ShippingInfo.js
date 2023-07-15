import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import classes from "./ShippingInfo.module.css";
import AddressModal from "../AddressModal/AddressModal";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { placeOrder, payOrder } from "../../Reducers/orderReducer";
import { useNavigate } from "react-router-dom";
import { PayPalButton } from "react-paypal-button-v2";
const ShippingInfo = (props) => {
  const address = useSelector((state) => state.cart.shippingAddress);
  const cartItems = useSelector((state) => state.cart.cartItems);
  // const paymentMethod = useSelector((state) => state.cart.paymentMethod);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const order = useSelector((state) => state.order);
  const {
    createdOrder,
    error,
    loading,
    orderItems: orders,
    paySuccess,
    payLoading,
  } = order;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const subTotal = cartItems.reduce((acc, cur) => {
    const actualPrice = ((cur.price * 100) / (100 - cur.discount)).toFixed(0);
    return acc + actualPrice * cur.qty;
  }, 0);

  const netPrice = cartItems.reduce((acc, cur) => {
    return acc + cur.price * cur.qty;
  }, 0);
  const discount = subTotal - netPrice;
  const shippingPrice = cartItems.includes(
    (elem) => elem.freeDelivery === false
  )
    ? 60
    : 0;

  const total = netPrice + shippingPrice;

  const [show, setShow] = useState(false);

  const placeOrderHandler = (e) => {
    const orderItems = cartItems.map((elem) => {
      return {
        name: elem.name,
        price: elem.price,
        qty: elem.qty,
        image: elem.img,
        product: elem.id,
      };
    });
    const orderObj = {
      shippingAddress: address,
      paymentMethod: "Paypal",
      shippingPrice,
      itemsPrice: subTotal,
      totalPrice: total,
      taxPrice: 0,
      orderItems,
    };
    dispatch(placeOrder(orderObj));
  };
  useEffect(() => {
    if (!error && !loading && createdOrder._id) {
      navigate(`/order/${createdOrder._id}`);
    }
  }, [error, loading, createdOrder]);
  const handleClose = () => {
    return setShow(false);
  };

  const paymentSuccessHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orders._id, paymentResult));
  };

  return (
    <div className={classes.container}>
      <Row className="mb-4">
        {props.screen === "order" && (
          <h3
            style={{
              color: "#333",
              marginBottom: "25px",
              lineHeight: "28px",
              fontSize: "20px",
            }}
          >
            ORDER ID: {orders._id}
          </h3>
        )}
        <Col xs={7}>
          <p className={classes.heading}>Address:</p>
          <p className={classes.value}>
            {address.address
              ? Object.values(address).join(", ")
              : "You have no saved address"}
          </p>
        </Col>
        {props.screen === "cart" && (
          <Col xs={5}>
            <button
              className={classes.btn}
              type="button"
              onClick={(e) => setShow((prevState) => !prevState)}
            >
              {address?.address ? "Edit" : "Add"}
            </button>
          </Col>
        )}
        {props.screen === "order" && (
          <Col xs={5}>
            <p className={classes.status}>
              {orders.isDelivered ? "Delivered: " : "Not Delivered"}
            </p>
            {orders.isDelivered && (
              <span>Deliverd at: {orders.deliverdAt}</span>
            )}
          </Col>
        )}
      </Row>
      <Row className="mb-4">
        <Col xs={7}>
          <p className={classes.heading}>Payment Method:</p>
          <p className={classes.value}>
            {/* {paymentMethod ? paymentMethod : "You have no saved payment method"} */}
            PayPal
          </p>
        </Col>
        {props.screen === "order" && (
          <Col xs={5}>
            <p className={classes.status}>
              {orders.isPaid ? "Paid: " : "Not Paid"}
            </p>
            {orders.isPaid && <span>Paid at: {orders.paidAt}</span>}
          </Col>
        )}
      </Row>
      <div className={classes.priceCard}>
        <p className="d-flex justify-content-between mb-1">
          <span className={classes.field}>
            Sub Total {`(${cartItems.length} items)`}
          </span>
          <span className={classes.values}>
            &#8377;{subTotal.toLocaleString("en-IN")}
          </span>
        </p>
        <p className="d-flex justify-content-between mb-1">
          <span className={classes.field}>Discount</span>
          <span className={classes.values}>
            &#8377;{discount.toLocaleString("en-IN")}
          </span>
        </p>
        <p className="d-flex justify-content-between mb-1">
          <span className={classes.field}>Shipping Price</span>
          <span className={classes.values}>
            {shippingPrice === 0 ? "FREE!" : shippingPrice}
          </span>
        </p>
        <p className="d-flex justify-content-between mb-4">
          <span style={{ fontWeight: "600" }} classname={classes.field}>
            Total
          </span>
          <span
            style={{ fontWeight: "800", color: "#000" }}
            className={classes.values}
          >
            &#8377;{total.toLocaleString("en-IN")}
          </span>
        </p>
      </div>
      {!isLoggedIn && (
        <Button
          type="button"
          className={classes.button}
          disabled
          style={{ pointerEvents: "none" }}
        >
          LOG IN TO PLACE ORDER
        </Button>
      )}
      {isLoggedIn && props.screen === "cart" && (
        <Button
          type="button"
          className={classes.button}
          onClick={placeOrderHandler}
        >
          PLACE ORDER
        </Button>
      )}
      {props.screen === "order" && !orders.isPaid && (
        <PayPalButton
          amount={orders.totalPrice}
          onSuccess={paymentSuccessHandler}
        />
      )}
      {show && <AddressModal show={show} handleClose={handleClose} />}
    </div>
  );
};
export default ShippingInfo;
