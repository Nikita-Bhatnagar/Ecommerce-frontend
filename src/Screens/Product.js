import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import ImageCard from "./../Components/ImageCard/ImageCard";
import ProductInfo from "./../Components/ProductInfo/ProductInfo";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../Reducers/productReducers";
import cartActions from "./../Reducers/cartReducer";
import { useParams } from "react-router";

const Product = (props) => {
  const dispatch = useDispatch();
  const details = useSelector((state) => state.products.productDetails);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  const params = useParams();
  const id = params.id;
  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [id]);
  const addToCartHandler = (data, addTo) => {
    const obj = {
      img: details.image,
      name: details.name,
      seller: details.seller,
      price: details.price,
      discount: details.discount,
      freeDelivery: details.freeDelivery,
      rating: details.rating,
      id: data.id,
      countInStock: data.countInStock,
    };
    if (addTo === "cart") dispatch(cartActions.addItemsToCart(obj));
    else if (addTo === "wishlist") dispatch(cartActions.addToWishlist(obj));
  };
  return (
    <div style={{ marginTop: "74.4px" }}>
      <Row
        style={{
          backgroundColor: "#fff",
          maxWidth: "1310px",
          margin: "0 auto",
        }}
      >
        {loading && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "55vh",
            }}
          >
            <Spinner
              animation="border"
              variant="secondary"
              as="div"
              role="status"
              size="md"
            />
          </div>
        )}
        {error && <p>{error}</p>}
        {!loading && !error && (
          <>
            <Col md={5}>
              <ImageCard
                imgUrl={details.image}
                id={id}
                countInStock={details.countInStock}
                addToCartHandler={addToCartHandler}
              />
            </Col>
            <Col md={7}>
              <ProductInfo />
            </Col>
          </>
        )}
      </Row>
    </div>
  );
};

export default Product;
