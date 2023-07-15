import classes from "../Components/Modal/Modal.module.css";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Spinner from "react-bootstrap/Spinner";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useDispatch, useSelector } from "react-redux";
//import {  } from "../Reducers/productReducer";
//import userActions from "./../Reducers/userReducer";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import {
  getProductDetails,
  productUpdateReset,
  updateProduct,
} from "../Reducers/productReducers";

const ProductEdit = (props) => {
  const params = useParams();
  const productId = params.id;
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [seller, setSeller] = useState("");
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [freeDelivery, setFreeDelivery] = useState(false);
  const [color, setColor] = useState();
  const [highlights, setHighlights] = useState();
  const [discount, setDiscount] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    productDetails: product,
    loading,
    error,
    updateSuccess,
    updateError,
    updateLoading,
  } = useSelector((state) => state.products);

  useEffect(() => {
    if (updateSuccess) {
      dispatch(productUpdateReset());
      navigate("/admin/products");
    } else {
      if (!product.name || productId !== product._id) {
        dispatch(getProductDetails(productId));
      } else {
        setName(product.name);
        setBrand(product.brand);
        setCategory(product.category);
        setPrice(product.price);
        setCountInStock(product.countInStock);
        setDescription(product.description);
        setColor(product.color.map((i) => i).join(", "));
        setImage(product.image);
        setDiscount(product.discount);
        setHighlights(product.highlights.map((i) => i.split(";").join(", ")));
        setFreeDelivery(product.freeDelivery);
        setSeller(product.seller);
      }
    }
  }, [product, productId, dispatch, navigate, updateSuccess]);

  //   const colorHandler=(e)=>{

  //   }

  const submitHandler = (e) => {
    e.preventDefault();
    let colors = [];
    let highlight = [];
    if (color) colors = color.split(", ");
    console.log(highlights);
    if (highlights.length > 0) highlight = [highlights.split(", ").join(";\n")];
    const obj = {
      name,
      price,
      brand,
      category,
      countInStock,
      description,
      seller,
      image,
      freeDelivery,
      discount,
      color: colors,
      highlights: highlight,
      _id: productId,
    };
    dispatch(updateProduct(obj));
  };
  return (
    <div style={{ maxWidth: "700px", margin: "80px auto" }}>
      <h1
        style={{
          textAlign: "center",
          fontSize: "24px",
          fontWeight: "600",
          color: "#333",
          marginBottom: "20px",
        }}
      >
        EDIT PRODUCT
      </h1>
      {updateLoading && (
        <Spinner
          as="div"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
          variant="secondary"
        />
      )}
      {updateError && <p variant="danger">{updateError}</p>}
      <Form className={`ps-2 pe-4 ${classes.form}`} onSubmit={submitHandler}>
        <Form.Group controlId="Name">
          <Form.Label style={{ fontSize: "15px", margin: "4px 0 0 4px" }}>
            Name
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-3"
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="price">
          <Form.Label style={{ fontSize: "15px", margin: "4px 0 0 4px" }}>
            Price
          </Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mb-3"
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="Brand">
          <Form.Label style={{ fontSize: "15px", margin: "4px 0 0 4px" }}>
            Brand
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="mb-3"
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="Seller">
          <Form.Label style={{ fontSize: "15px", margin: "4px 0 0 4px" }}>
            Seller
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Seller"
            value={seller}
            onChange={(e) => setSeller(e.target.value)}
            className="mb-3"
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="Image">
          <Form.Label style={{ fontSize: "15px", margin: "4px 0 0 4px" }}>
            Image
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Image url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="mb-3"
          ></Form.Control>
        </Form.Group>

        {/* <Form.Group controlId="category">
          <Form.Label style={{ fontSize: "15px", margin: "4px 0 0 4px" }}>
            Category
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mb-3"
          ></Form.Control>
        </Form.Group> */}

        <Form.Group controlId="category">
          <Form.Label style={{ fontSize: "15px", margin: "4px 0 0 4px" }}>
            Category
          </Form.Label>
          <Form.Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Categoty"
            className="mb-3"
          >
            <option value="Electronics">Electronics</option>
            <option value="Home">Home</option>
            <option value="Fashion">Fashion</option>
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="countInStock">
          <Form.Label style={{ fontSize: "15px", margin: "4px 0 0 4px" }}>
            Count In Stock
          </Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter count in stock"
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
            className="mb-3"
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="highlights">
          <Form.Label style={{ fontSize: "15px", margin: "4px 0 0 4px" }}>
            Highlights
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter highlights"
            value={highlights}
            onChange={(e) => setHighlights(e.target.value)}
            className="mb-3"
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label style={{ fontSize: "15px", margin: "4px 0 0 4px" }}>
            Description
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mb-3"
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="discount">
          <Form.Label style={{ fontSize: "15px", margin: "4px 0 0 4px" }}>
            Discount
          </Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="mb-3"
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="color">
          <Form.Label style={{ fontSize: "15px", margin: "4px 0 0 4px" }}>
            Colors
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter available colors"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="mb-3"
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="freeDelivery" className="mb-5 ms-2">
          <Form.Check
            type="checkbox"
            label="Is free delivery available?"
            onChange={(e) => setFreeDelivery((freeDelivery) => !freeDelivery)}
            value={freeDelivery}
            checked={freeDelivery}
          />
        </Form.Group>

        <Button type="submit" className={classes.btn}>
          {loading && (
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
          Update
        </Button>
      </Form>
    </div>
  );
};

export default ProductEdit;
