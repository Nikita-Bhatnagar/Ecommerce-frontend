import { useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import classes from "./Slider.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "./../../Reducers/productReducers";
import Card from "./../Card/Card";

const Slider = (props) => {
  const products = useSelector(
    (state) => state.products[`${props.category}Products`]
  );
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts(props.category));
  }, [props.category]);
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
        <div className={classes.slider}>
          <h2 className={classes.title}>{props.title}</h2>
          <hr style={{ margin: "0" }} />
          <Row className={classes.row}>
            {products.map((product) => {
              return (
                <Card
                  key={product._id}
                  id={product._id}
                  name={product.name}
                  price={product.price}
                  brand={product.brand}
                  image={product.image}
                />
              );
            })}
          </Row>
        </div>
      )}
    </>
  );
};

export default Slider;
