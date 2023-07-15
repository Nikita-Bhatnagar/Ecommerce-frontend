import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllUsers, deleteUser } from "../Reducers/userReducer";
import Spinner from "react-bootstrap/Spinner";
import { Button, Table } from "react-bootstrap";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
const UsersList = (props) => {
  const users = useSelector((state) => state.user);
  const { userList, loading, error, deleteSuccess } = users;

  const userInfo = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getAllUsers());
    } else {
      navigate("/", { replace: true });
    }
  }, [dispatch, navigate, userInfo, deleteSuccess]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
      console.log("delete");
    }
  };

  return (
    <div
      style={{
        maxWidth: "1284px",
        margin: "80px auto",
        fontSize: "15px",
        minHeight: "calc(100vh - 340px)",
      }}
    >
      {loading ? (
        <Spinner
          animation="border"
          variant="secondary"
          size="sm"
          as="div"
          role="status"
          style={{ margin: "0 auto" }}
        />
      ) : userList.length > 0 ? (
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
            USERS
          </h1>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user) => {
                return (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>
                      <a
                        style={{ textDecoration: "none", color: "#000" }}
                        href={`mailto:${user.email}`}
                      >
                        {user.email}
                      </a>
                    </td>
                    <td>
                      {user.isAdmin ? (
                        <TiTick style={{ color: "green" }} />
                      ) : (
                        <ImCross style={{ color: "#ed213b" }} />
                      )}
                    </td>
                    <td>
                      <Link to={`/admin/user/${user._id}/edit`}>
                        <Button
                          style={{ backgroundColor: "#fff !important" }}
                          variant="light"
                          className="btn-sm"
                        >
                          <MdModeEdit />
                        </Button>
                      </Link>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(user._id)}
                      >
                        <MdDelete />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </>
      ) : error.length > 0 ? (
        <p>{error}</p>
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
};

export default UsersList;
