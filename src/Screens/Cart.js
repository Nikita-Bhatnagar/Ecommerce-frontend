import { useSelector } from "react-redux";
import CartItem from "./../Components/CartItem/CartItem";
import ShippingInfo from "./../Components/ShippingInfo/ShippingInfo";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import emptyCart from "./../assets/emptyCart.svg";
const Cart = (props) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
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
      {(!cartItems || cartItems.length <= 0) && (
        <div className="d-flex flex-column align-items-center justify-content-center">
          <img
            src={emptyCart}
            alt=""
            style={{ width: "150px", height: "150px" }}
          />
          <p
            style={{ textAlign: "center", margin: "40px 0", fontSize: "20px" }}
          >
            You don't have any items in your cart.
          </p>
        </div>
      )}
      {cartItems.length > 0 && (
        <>
          <Col md={8}>
            {cartItems.map((prod) => {
              return <CartItem key={prod.id} data={prod} />;
            })}
          </Col>
          <Col md={4}>
            <ShippingInfo screen="cart" />
          </Col>
        </>
      )}
    </Row>
  );
};
export default Cart;
