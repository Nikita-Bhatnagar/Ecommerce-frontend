import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getMyOrders } from "../Reducers/orderReducer";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import classes from "./MyOrders.module.css";
const MyOrders = (props) => {
  const orders = useSelector((state) => state.order);
  const { myOrders, myOrdersLoading, myOrdersError } = orders;
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log(myOrdersLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyOrders());
  }, [isLoggedIn]);
  return (
    <div className={classes.container}>
      {!isLoggedIn && (
        <p
          className="text-center"
          style={{ paddingTop: "100px", fontSize: "24px" }}
        >
          You need to login to see the orders you have placed.
        </p>
      )}
      {isLoggedIn && (
        <>
          <h1 className={classes.heading}>My Orders</h1>
          {myOrdersLoading ? (
            <Spinner
              animation="border"
              variant="secondary"
              as="div"
              role="status"
              size="md"
            />
          ) : myOrders.length > 0 ? (
            <Row className={classes.row}>
              {myOrders.map((order) => {
                return (
                  <Col xs={12} sm={6} md={4} lg={3}>
                    <Card className={classes.card}>
                      <Card.Body className="p-4">
                        <Card.Title className={classes.title}>
                          Order ID: <br />
                          <span>{order._id}</span>
                        </Card.Title>
                        <Card.Text>
                          <div>
                            <h6 className={classes.field}>Payment Status:</h6>
                            <span
                              className={classes.value}
                              style={{
                                color: order.isPaid ? "green" : "#ed213b",
                              }}
                            >
                              {!order.isPaid
                                ? "Not Paid"
                                : `Paid on ${new Date(
                                    order.paidAt
                                  ).toLocaleDateString()} at ${new Date(
                                    order.paidAt
                                  ).toLocaleTimeString()}`}
                            </span>
                          </div>
                          <div>
                            <h6 className={classes.field}>Delivery Status:</h6>
                            <span
                              className={classes.value}
                              style={{
                                color: order.isDelivered ? "green" : "#ed213b",
                              }}
                            >
                              {!order.isDelivered
                                ? "Not Delivered"
                                : `Delivered on ${new Date(
                                    order.deliveredAt
                                  ).toLocaleDateString()} at ${new Date(
                                    order.deliveredAt
                                  ).toLocaleTimeString()}`}
                            </span>
                          </div>
                          <Row className="align-items-end">
                            <Col xs={7}>
                              <Link
                                to={`/order/${order._id}`}
                                className={classes.link}
                              >
                                View Details &gt;
                              </Link>
                            </Col>
                            <Col xs={5}>
                              <div className={classes.price}>
                                <h6
                                  className={classes.field}
                                  style={{ fontSize: "13px" }}
                                >
                                  Total Amount:
                                </h6>
                                <span>
                                  &#8377;
                                  {order.totalPrice.toLocaleString("en-In")}
                                </span>
                              </div>
                            </Col>
                          </Row>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          ) : myOrdersError.length > 0 ? (
            <p>{myOrdersError}</p>
          ) : (
            <p>You haven't placed any orders yet.</p>
          )}
        </>
      )}
    </div>
  );
};
export default MyOrders;
