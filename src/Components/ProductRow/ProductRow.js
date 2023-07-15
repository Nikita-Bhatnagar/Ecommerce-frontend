import { useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import classes from "./ProductRow.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getSpecialProducts } from "./../../Reducers/productReducers";
import Card from "./../Card/Card";

const ProductRow = (props) => {
  const products = useSelector(
    (state) => state.products[`${props.type}Products`]
  );
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSpecialProducts(props.type));
  }, [props.type]);
  // console.log(products);
  return (
    <>
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
                  <Card
                    key={product._id}
                    id={product._id}
                    name={product.name}
                    price={product.price}
                    brand={product.brand}
                    image={product.image}
                    color={props.color}
                    discount={product.discount}
                  />
                );
              })}
            </Row>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductRow;
