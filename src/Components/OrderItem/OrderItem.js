import classes from "./OrderItem.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
//import cartActions from "./../../Reducers/cartReducer";
import { useDispatch, useSelector } from "react-redux";

const OrderItem = (props) => {
  //   const actualPrice = (
  //     (props.data.price * 100) /
  //     (100 - props.data.discount)
  //   ).toFixed(0);
  //   const dispatch = useDispatch();
  //   const [qty, setQty] = useState(props.data.qty);
  //   const qtyHandler = (e) => {
  //     console.log(e.target);
  //     setQty((prevState) => prevState + Number(e.target.value));
  //     dispatch(
  //       cartActions.addItemsToCart({ ...props.data, qty: e.target.value })
  //     );
  //   };
  //   const removeItemHandler = (e) => {
  //     console.log(props.data.id);
  //     dispatch(cartActions.removeItemsFromCart(props.data.id));
  //   };

  return (
    <div className={classes.card}>
      <Row className={classes.row}>
        <Col sm={3} style={{ maxHeight: "fit-content" }}>
          {/* <Link to={`/product/${props.data.id}`}> */}
          <img src={props.data.image} className={classes.img} />
          {/* </Link> */}
        </Col>
        <Col sm={9}>
          <Row>
            <Col sm={8}>
              <Link
                to={`/product/${props.data.product}`}
                style={{ textDecoration: "none", color: "#212121" }}
              >
                <p className={classes.name}>{props.data.name}</p>
              </Link>
            </Col>
            <Col sm={2}>
              <span className={classes.span1}>
                &#8377;{props.data.price.toLocaleString("en-IN")}
              </span>
            </Col>
            {/* <Col sm={2}>
              <button
                className={classes.btn}
                type="button"
                onClick={removeItemHandler}
              >
                X
              </button>
            </Col> */}
          </Row>
          {/* <p className={classes.seller}>Seller: {props.data.seller}</p> */}
          {/* <div className={classes.btnsRow}>
            <button
              type="button"
              value={-1}
              className={classes.btn}
              onClick={qtyHandler}
            >
              -
            </button> */}
          <span>Qty: {props.data.qty}</span>
          {/* <button
              type="button"
              value={1}
              className={classes.btn}
              onClick={qtyHandler}
            >
              +
            </button>
          </div> */}
        </Col>
      </Row>
    </div>
  );
};
export default OrderItem;
