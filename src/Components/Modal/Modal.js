import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import img from "../../assets/illus.svg";
import classes from "./Modal.module.css";
import { InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, loginUser } from "../../Reducers/authReducer";

const ModalComponent = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const loginLoading = useSelector((state) => state.auth.loginLoading);
  const signupLoading = useSelector((state) => state.auth.signupLoading);
  const signupError = useSelector((state) => state.auth.signupError);
  const loginError = useSelector((state) => state.auth.loginError);
  const submitHandler = (e) => {
    e.preventDefault();
    if (props.modalType === "signup") {
      if (!name || !email || !password) return;
      const userInfo = {
        name,
        email,
        password,
      };
      dispatch(registerUser(userInfo));
    } else if (props.modalType === "login") {
      if (!email || !password) return;
      const userInfo = {
        email,
        password,
      };
      dispatch(loginUser(userInfo));
    }
  };
  return (
    <>
      <Modal
        centered
        show={props.show}
        onHide={props.handleClose}
        className={classes.modal}
        dialogClassName={classes.modal}
      >
        
        <Modal.Body className={classes.modalBody}>
          <Row>
            <Col
              sm={4}
              className={classes.col1}
              style={{ paddingLeft: "0", paddingRight: "0" }}
            >
              <div className={classes.content}>
                <h1 className={classes.heading}>{props.heading}</h1>
                <p className={classes.text}>{props.text}</p>
                <img src={img} alt="" className={classes.modalImg} />
              </div>
            </Col>
            <Col sm={8} style={{ paddingLeft: "0", paddingRight: "0" }}>
              <div className={classes.content}>
                <Form
                  className={`ps-2 pe-4 ${classes.form}`}
                  onSubmit={submitHandler}
                >
                  {props.modalType === "signup" && (
                    <Form.Group className={`mb-4 ${classes.formGroup}`}>
                     
                      <FloatingLabel
                        label="Enter Name"
                        className={`mb-1 ${classes.floatingLabel}`}
                      >
                        <Form.Control
                          type="text"
                          placeholder="Enter Name"
                          className={classes.input}
                          onChange={(e) => setName(e.target.value)}
                          required={props.modalType === "signup"}
                        />
                      </FloatingLabel>
                    </Form.Group>
                  )}
                  <Form.Group className={`mb-4 ${classes.formGroup}`}>
                    
                    <FloatingLabel
                      label="Enter Email"
                      className={`mb-1 ${classes.floatingLabel}`}
                    >
                      <Form.Control
                        type="email"
                        placeholder="Enter Email"
                        className={classes.input}
                        onChange={(e) => setEmail(e.target.value)}
                        required={true}
                      />
                    </FloatingLabel>
                  </Form.Group>

                 
                  <Form.Group className={classes.formGroup}>
                    <InputGroup className="mb-3">
                      <Form.Floating className="mb-1">
                        <Form.Control
                          type="password"
                          id="password"
                          placeholder="Enter Password"
                          className={classes.input}
                          onChange={(e) => setPassword(e.target.value)}
                          required={true}
                        />
                        <label htmlFor="password">Enter Password</label>
                      </Form.Floating>
                      {props.modalType === "login" && (
                        <Link to="/forgot_password" className={classes.forgot}>
                          Forgot?
                        </Link>
                      )}
                    </InputGroup>
                  </Form.Group>
                  <p className={classes.para}>
                    By continuing, you agree to Shopkart's Terms of Use and
                    Privacy Policy.
                  </p>
                  {(loginError || signupError) && (
                    <p className={classes.error}>{loginError || signupError}</p>
                  )}
                  <Button type="submit" className={classes.btn}>
                    {(loginLoading || signupLoading) && (
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
                    {props.btnText}
                  </Button>
                  {props.modalType === "signup" && (
                    <Button
                      type="button"
                      onClick={props.display("login")}
                      className={`${classes.btn} ${classes.btnLight}`}
                    >
                      Existing User? Log in
                    </Button>
                  )}

                  {props.linkText && (
                    <button
                      onClick={props.display("signup")}
                      className={classes.button}
                    >
                      {props.linkText}
                    </button>
                  )}
                </Form>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalComponent;
