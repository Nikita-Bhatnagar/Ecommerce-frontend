import { useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import classes from "./Products.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "./../Reducers/productReducers";
import { useParams } from "react-router";
import ProductCard from "./../Components/ProductCard/ProductCard";

const ProductRow = (props) => {
  const params = useParams();
  const products = useSelector(
    (state) => state.products[`${params.category}Products`]
  );
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  console.log(loading);
  console.log(error);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts(params.category));
  }, [params.category]);
  // console.log(products);
  return (
    <Row style={{ minHeight: "calc(100vh - 340px)" }} className="mt-5">
      {loading && (
        <div className={classes.spinner}>
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
        <div style={{ backgroundColor: props.color }}>
          <div
            className={classes.slider}
            style={{ backgroundColor: props.color }}
          >
            <h2 className={classes.title}>{props.title}</h2>
            {/* <hr style={{ margin: "0" }} /> */}
            <Row className={classes.row}>
              {products?.map((product) => {
                return (
                  <ProductCard
                    key={product._id}
                    id={product._id}
                    name={product.name}
                    price={product.price}
                    brand={product.brand}
                    image={product.image}
                    //color={props.color}
                    discount={product.discount}
                    rating={product.rating}
                    countInStock={product.countInStock}
                    seller={product.seller}
                    freeDelivery={product.freeDelivery}
                  />
                );
              })}
            </Row>
          </div>
        </div>
      )}
    </Row>
  );
};

export default ProductRow;
