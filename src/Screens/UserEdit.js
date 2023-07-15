import classes from "../Components/Modal/Modal.module.css";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Spinner from "react-bootstrap/Spinner";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useDispatch, useSelector } from "react-redux";
import { getUserById, updateUser } from "../Reducers/userReducer";
import userActions from "./../Reducers/userReducer";
import { useParams } from "react-router";
import { useNavigate } from "react-router";

const UserEdit = (props) => {
  const params = useParams();
  const userId = params.id;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error, editSuccess, editLoading, editError } =
    useSelector((state) => state.user);

  useEffect(() => {
    if (editSuccess) {
      dispatch(userActions.editReset());
      navigate("/admin/users");
    } else {
      if (!user.name || userId !== user._id) {
        dispatch(getUserById(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [user, userId, dispatch, editSuccess, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(isAdmin);
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };
  return (
    <div style={{ maxWidth: "700px", margin: "80px auto" }}>
      <h1
        style={{
          textAlign: "center",
          fontSize: "24px",
          fontWeight: "600",
          color: "#333",
          marginBottom: "20px",
        }}
      >
        EDIT USER
      </h1>
      {editLoading && (
        <Spinner
          as="div"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
          variant="secondary"
        />
      )}
      {editError && <p variant="danger">{editError}</p>}
      <Form className={`ps-2 pe-4 ${classes.form}`} onSubmit={submitHandler}>
        <Form.Group className={`mb-4 ${classes.formGroup}`}>
          <FloatingLabel
            label="Name"
            className={`mb-1 ${classes.floatingLabel}`}
          >
            <Form.Control
              type="text"
              placeholder="Name"
              className={classes.input}
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className={`mb-4 ${classes.formGroup}`}>
          <FloatingLabel
            label="Email"
            className={`mb-1 ${classes.floatingLabel}`}
          >
            <Form.Control
              type="email"
              placeholder="Email"
              className={classes.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={true}
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Group controlId="isAdmin" className="mb-5 ms-2">
          {/* <FloatingLabel
            label="Enter admin status"
            className={`mb-1 ${classes.floatingLabel}`}
          > */}
          <Form.Check
            type="checkbox"
            label="Is admin?"
            onChange={(e) => setIsAdmin((isAdmin) => !isAdmin)}
            value={isAdmin}
            checked={isAdmin}
          />
          {/* </FloatingLabel> */}
        </Form.Group>

        <Button type="submit" className={classes.btn}>
          {loading && (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              variant="secondary"
              style={{ marginRight: "10px" }}
            />
          )}
          Update
        </Button>
      </Form>
    </div>
  );
};

export default UserEdit;
