import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllOrders } from "../Reducers/orderReducer";
import Spinner from "react-bootstrap/Spinner";
import { Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ImCross } from "react-icons/im";
const OrderList = (props) => {
  const orders = useSelector((state) => state.order);
  const { allOrders, allOrdersLoading, allOrdersError } = orders;

  const userInfo = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getAllOrders());
    } else {
      navigate("/", { replace: true });
    }
  }, [dispatch, navigate, userInfo]);

  //   const deleteHandler = (id) => {
  //     if (window.confirm("Are you sure you want to delete this user?")) {
  //       dispatch(deleteUser(id));
  //       console.log("delete");
  //     }
  //   };

  return (
    <div
      style={{
        maxWidth: "1284px",
        margin: "80px auto",
        fontSize: "15px",
        minHeight: "calc(100vh - 340px)",
      }}
    >
      {allOrdersLoading ? (
        <Spinner
          animation="border"
          variant="secondary"
          size="sm"
          as="div"
          role="status"
          style={{ margin: "0 auto" }}
        />
      ) : allOrders.length > 0 ? (
        <>
          <h1
            style={{
              textAlign: "center",
              fontSize: "24px",
              fontWeight: "600",
              color: "#333",
              marginBottom: "20px",
            }}
          >
            ORDERS
          </h1>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>USERS</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
              </tr>
            </thead>
            <tbody>
              {allOrders.map((order) => {
                return (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.user && order.user.name}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>&#8377; {order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <ImCross style={{ color: "#ed213b" }} />
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <ImCross style={{ color: "#ed213b" }} />
                      )}
                    </td>
                    <td>
                      <Link to={`/order/${order._id}`}>
                        <Button
                          style={{ backgroundColor: "#fff !important" }}
                          variant="light"
                          className="btn-sm"
                        >
                          Details
                        </Button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </>
      ) : allOrdersError.length > 0 ? (
        <p>{allOrdersError}</p>
      ) : (
        <p>No orders found</p>
      )}
    </div>
  );
};

export default OrderList;
