import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import classes from "./ImageCard.module.css";
import { IoMdHeart } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { BsFillLightningFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const ImageCard = (props) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const wishlistItems = useSelector((state) => state.cart.wishlist);
  const [isInCart, setIsInCart] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const itemInCart = cartItems.find((elem) => elem.id === props.id);
    if (itemInCart) setIsInCart(true);
  }, [cartItems]);
  useEffect(() => {
    const itemInWishlist = wishlistItems.find((elem) => elem.id === props.id);
    if (itemInWishlist) setIsInWishlist(true);
  }, [wishlistItems]);
  const toggleFromWishlist = (e) => {
    if (isInWishlist) navigate("/wishlist");
    else {
      props.addToCartHandler(
        {
          id: props.id,
          countInStock: props.countInStock,
        },
        "wishlist"
      );
      navigate("/wishlist");
    }
  };
  const cartHandler = (e) => {
    if (isInCart) navigate("/cart");
    else {
      props.addToCartHandler(
        {
          id: props.id,
          countInStock: props.countInStock,
        },
        "cart"
      );
      navigate("/cart");
    }
  };
  return (
    <div className={classes.wrapper}>
      <Card className={classes.card}>
        <Card.Img src={props.imgUrl} className={classes.img}></Card.Img>
      </Card>
      <Row className={`pb-5 ps-3 pe-3 ${classes.row}`}>
        <div className={classes.btn}>
          <Button
            size="lg"
            variant="warning"
            className={classes.cartBtn}
            onClick={cartHandler}
          >
            <FaShoppingCart />
            <span className="ps-2">
              {isInCart ? "GO TO CART" : "ADD TO CART"}
            </span>
          </Button>
        </div>
        <div className={classes.btn}>
          <Button
            size="lg"
            className={classes.buyBtn}
            onClick={toggleFromWishlist}
          >
            <IoMdHeart />
            <span className="ps-2">
              {" "}
              {isInWishlist ? "GO TO WISHLIST" : "ADD TO WISHLIST"}
            </span>
          </Button>
        </div>
      </Row>
    </div>
  );
};
export default ImageCard;
