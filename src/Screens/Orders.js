import { useSelector, useDispatch } from "react-redux";
import OrderItem from "./../Components/OrderItem/OrderItem";
import ShippingInfo from "./../Components/ShippingInfo/ShippingInfo";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import emptyCart from "./../assets/emptyCart.svg";
import { getOrderById, orderPayReset } from "../Reducers/orderReducer";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
const Order = (props) => {
  const order = useSelector((state) => state.order);
  const { orderItems: orders, loading, error, shippingAddress } = order;

  const { payLoading, payError, paySuccess } = order;

  const [sdkReady, setSdkReady] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get(
        "http://127.0.0.1:5000/api/config/paypal"
      );
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
      console.log(clientId);
    };
    if (!order.orders || paySuccess) {
      dispatch(orderPayReset());
      dispatch(getOrderById(params.id));
    } else if (!orders.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [params.id, order.orders, paySuccess]);

  return (
    <Row
      style={{
        maxWidth: "1248px",
        margin: "54.4px auto 20px auto",
        paddingTop: "20px",
        backgroundColor: "#f1f3f6 !important",
        minHeight: "calc(100vh - 420px)",
      }}
    >
      {!orders && (
        <div className="d-flex flex-column align-items-center justify-content-center">
          <img
            src={emptyCart}
            alt=""
            style={{ width: "150px", height: "150px" }}
          />
          <p
            style={{ textAlign: "center", margin: "40px 0", fontSize: "20px" }}
          >
            You don't have any items in your order.
          </p>
        </div>
      )}
      {orders.orderItems && (
        <>
          <Col md={8}>
            {orders?.orderItems.map((prod) => {
              return <OrderItem key={prod.id} data={prod} />;
            })}
          </Col>
          <Col md={4}>
            <ShippingInfo screen="order" />
          </Col>
        </>
      )}
    </Row>
  );
};
export default Order;
