import Row from "react-bootstrap/Row";
import { useSelector } from "react-redux";
import wishlistImg from "./../assets/wishlist.svg";
import ProductCard from "../Components/ProductCard/ProductCard";
const Wishlist = (props) => {
  const wishlistItems = useSelector((state) => state.cart.wishlist);
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
      {(!wishlistItems || wishlistItems.length <= 0) && (
        <div className="d-flex flex-column align-items-center justify-content-center">
          <img
            src={wishlistImg}
            alt=""
            style={{ width: "150px", height: "150px" }}
          />
          <p
            style={{
              textAlign: "center",
              margin: "40px 0",
              fontSize: "20px",
            }}
          >
            You have no items in your wishlist. Start adding!
          </p>
        </div>
      )}
      {wishlistItems && wishlistItems.length > 0 && (
        <Row>
          {wishlistItems.map((product) => {
            return (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                // brand={product.brand}
                image={product.img}
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
      )}
    </Row>
  );
};
export default Wishlist;
