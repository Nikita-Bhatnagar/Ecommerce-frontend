import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import classes from "./AddressModal.module.css";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { FloatingLabel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import cartActions from "./../../Reducers/cartReducer";

const AddressModal = (props) => {
  const shippingAddress = useSelector((state) => state.cart.shippingAddress);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      cartActions.saveAddress({
        address,
        city,
        postalCode,
        country,
      })
    );
    props.handleClose();
  };
  return (
    <Modal
      centered
      show={props.show}
      onHide={props.handleClose}
      className={classes.modal}
      dialogClassName={classes.modal}
    >
      <Modal.Body className={classes.modalBody}>
        <div className={classes.content}>
          <Form
            className={`ps-2 pe-4 ${classes.form}`}
            onSubmit={submitHandler}
          >
            <Form.Group className={`mb-4 ${classes.formGroup}`}>
              <FloatingLabel
                label="Enter Address"
                className={`mb-1 ${classes.floatingLabel}`}
              >
                <Form.Control
                  type="text"
                  placeholder="Enter Address"
                  className={classes.input}
                  onChange={(e) => setAddress(e.target.value)}
                  required={props.modalType === "signup"}
                  value={address}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className={`mb-4 ${classes.formGroup}`}>
              <FloatingLabel
                label="Enter City"
                className={`mb-1 ${classes.floatingLabel}`}
              >
                <Form.Control
                  type="text"
                  placeholder="Enter City"
                  className={classes.input}
                  onChange={(e) => setCity(e.target.value)}
                  required={true}
                  value={city}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className={classes.formGroup}>
              <InputGroup className="mb-3">
                <Form.Floating className="mb-1">
                  <Form.Control
                    type="text"
                    id="postalcode"
                    placeholder="Enter Postal Code"
                    className={classes.input}
                    onChange={(e) => setPostalCode(e.target.value)}
                    required={true}
                    value={postalCode}
                  />
                  <label htmlFor="postalcode">Enter Postal Code</label>
                </Form.Floating>
              </InputGroup>
            </Form.Group>
            <Form.Group className={classes.formGroup}>
              <InputGroup className="mb-3">
                <Form.Floating className="mb-1">
                  <Form.Control
                    type="text"
                    id="country"
                    placeholder="Enter Country"
                    className={classes.input}
                    onChange={(e) => setCountry(e.target.value)}
                    required={true}
                    value={country}
                  />
                  <label htmlFor="country">Enter Country</label>
                </Form.Floating>
              </InputGroup>
            </Form.Group>

            <Button type="submit" className={classes.btn}>
              SAVE
            </Button>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddressModal;
