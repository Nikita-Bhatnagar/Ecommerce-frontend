import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  createProduct,
  deleteProductById,
  getAllProducts,
} from "../Reducers/productReducers";
import Spinner from "react-bootstrap/Spinner";
import { Button, Table, Row, Col } from "react-bootstrap";
import { productCreateReset } from "../Reducers/productReducers";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
const ProductList = (props) => {
  const productInfo = useSelector((state) => state.products);
  const {
    allProducts,
    loading,
    error,
    deleteSuccess,
    deleteLoading,
    deleteError,
    createLoading,
    createSuccess,
    createError,
    createdProduct,
  } = productInfo;

  const userInfo = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(productCreateReset());
    if (!userInfo.isAdmin) {
      console.log("1st");
      navigate("/", { replace: true });
    }
    if (createSuccess) {
      console.log("2nd");
      navigate(`/admin/product/${createdProduct._id}/edit`);
    } else {
      console.log("3rd");
      dispatch(getAllProducts());
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    deleteSuccess,
    createSuccess,
    createdProduct,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProductById(id));
      console.log("delete");
    }
  };
  const createProductHandler = () => {
    dispatch(createProduct());
  };
  console.log(allProducts);

  return (
    <div
      style={{
        maxWidth: "1284px",
        margin: "80px auto",
        fontSize: "15px",
        minHeight: "calc(100vh - 340px)",
      }}
    >
      {createError.length > 0 && <p>{createError}</p>}
      {createLoading && (
        <Spinner
          animation="border"
          variant="secondary"
          size="sm"
          as="div"
          role="status"
          style={{ margin: "0 auto" }}
        />
      )}
      {deleteError.length > 0 && <p>{deleteError}</p>}
      {loading || deleteLoading ? (
        <Spinner
          animation="border"
          variant="secondary"
          size="sm"
          as="div"
          role="status"
          style={{ margin: "0 auto" }}
        />
      ) : allProducts?.products?.length > 0 ? (
        <>
          <Row>
            <Col xs={6}>
              <h1
                style={{
                  fontSize: "24px",
                  fontWeight: "600",
                  color: "#333",
                  marginBottom: "20px",
                }}
              >
                PRODUCTS
              </h1>
            </Col>
            <Col xs={6}>
              <Button
                variant="secondary"
                className="btn-sm"
                onClick={createProductHandler}
                style={{ float: "right" }}
              >
                CREATE PRODUCT
              </Button>
            </Col>
          </Row>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {allProducts?.products.map((product) => {
                return (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>&#8377; {product.price.toLocaleString("en-IN")}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>

                    <td>
                      <Link to={`/admin/product/${product._id}/edit`}>
                        <Button
                          style={{ backgroundColor: "#fff !important" }}
                          variant="light"
                          className="btn-sm"
                        >
                          <MdModeEdit />
                        </Button>
                      </Link>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(product._id)}
                      >
                        <MdDelete />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </>
      ) : error.length > 0 ? (
        <p>{error}</p>
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
};

export default ProductList;

//
// createSuccess,
// createdProduct,
