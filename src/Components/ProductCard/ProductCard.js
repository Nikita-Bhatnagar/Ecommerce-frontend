import Card from "react-bootstrap/Card";
import classes from "./ProductCard.module.css";
import { Link, useNavigate } from "react-router-dom";
import { BsStarHalf, BsStarFill, BsStar } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import cartActions from "./../../Reducers/cartReducer";
import { useState, useEffect } from "react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";

const ProductCard = (props) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const wishlistItems = useSelector((state) => state.cart.wishlist);

  const rating = Number(props.rating).toFixed(1);
  let counter = Number(rating).toFixed(0);
  let halfcounter = Number(Number(rating.slice(1)));
  if (halfcounter === 0.5) {
    halfcounter = 1;
    counter--;
  } else {
    halfcounter = 0;
  }
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isInCart, setIsInCart] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    const itemInCart = cartItems.find((elem) => elem.id === props.id);
    if (itemInCart) setIsInCart(true);
  }, [cartItems]);
  useEffect(() => {
    const itemInWishlist = wishlistItems.find((elem) => elem.id === props.id);
    if (itemInWishlist) setIsInWishlist(true);
    else setIsInWishlist(false);
  }, [wishlistItems]);
  const toggleFromWishlist = (e) => {
    console.log(e.target);
    if (isInWishlist)
      dispatch(cartActions.removeFromWishlist({ id: props.id }));
    else
      dispatch(
        cartActions.addToWishlist({
          img: props.image,
          name: props.name,
          seller: props.seller,
          price: props.price,
          discount: props.discount,
          freeDelivery: props.freeDelivery,
          id: props.id,
          countInStock: props.countInStock,
          rating: props.rating,
        })
      );
  };
  const cartHandler = (e) => {
    if (isInCart) navigate("/cart");
    else {
      dispatch(
        cartActions.addItemsToCart({
          img: props.image,
          name: props.name,
          seller: props.seller,
          price: props.price,
          discount: props.discount,
          freeDelivery: props.freeDelivery,
          id: props.id,
          countInStock: props.countInStock,
        })
      );
      navigate("/cart");
    }
  };

  return (
    <Card
      className={`text-center ${classes.card}`}
      style={{ backgroundColor: props.color }}
    >
      {" "}
      <Link
        to={`/product/${props.id}`}
        style={{ textDecoration: "none", maxWidth: "350px" }}
      >
        <div className={classes.imgWrapper}>
          <Card.Img variant="top" src={props.image} className={classes.img} />
        </div>
      </Link>
      {isInWishlist ? (
        <IoMdHeart className={classes.heartIcon} onClick={toggleFromWishlist} />
      ) : (
        <IoMdHeartEmpty
          className={classes.heartIcon}
          onClick={toggleFromWishlist}
        />
      )}
      <Card.Body className="pt-0 pb-0">
        <Link to={`/product/${props.id}`} style={{ textDecoration: "none" }}>
          <Card.Title className={classes.title}>{props.name}</Card.Title>
        </Link>
        <Card.Text>
          {/* <p className={classes.price}>
              &#8377; {props.price.toLocaleString("en-IN")}
            </p> */}
          <p className="mb-0">
            <span className={classes.title}>
              &#8377; {props.price.toLocaleString("en-IN")}
            </span>
            <span className={classes.discount} style={{ color: "#ed213b" }}>
              {` (${props.discount}% off)`}
            </span>{" "}
          </p>
          <p className={classes.rating}>
            {(counter-- > 0 && <BsStarFill />) ||
              (halfcounter-- > 0 && <BsStarHalf />) || <BsStar />}
            {(counter-- > 0 && <BsStarFill />) ||
              (halfcounter-- > 0 && <BsStarHalf />) || <BsStar />}
            {(counter-- > 0 && <BsStarFill />) ||
              (halfcounter-- > 0 && <BsStarHalf />) || <BsStar />}
            {(counter-- > 0 && <BsStarFill />) ||
              (halfcounter-- > 0 && <BsStarHalf />) || <BsStar />}
            {(counter-- > 0 && <BsStarFill />) ||
              (halfcounter-- > 0 && <BsStarHalf />) || <BsStar />}

            <span className="ms-2">{rating}</span>
          </p>

          <button className={classes.btn} onClick={cartHandler} type="button">
            {isInCart ? "GO TO CART" : "ADD TO CART"}
          </button>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
