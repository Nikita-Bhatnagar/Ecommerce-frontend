import groceryImg from "../../assets/grocery.webp";
import fashionImg from "../../assets/fashion.webp";
import electronicsImg from "../../assets/electronics.webp";
import appliancesImg from "../../assets/appliances.webp";
import mobilesImg from "../../assets/mobiles.webp";
import homeImg from "../../assets/home.webp";
import { Container } from "react-bootstrap";
import classes from "./Header.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const Header = (props) => {
  const data = [
    [groceryImg, "Grocery"],
    [mobilesImg, "Mobiles"],
    [fashionImg, "Fashion"],
    [electronicsImg, "Electronics"],
    [homeImg, "Home"],
    [appliancesImg, "Appliances"],
  ];

  return (
    <div className={classes.container} style={{ marginTop: "54.4px" }}>
      <Row className={classes.row}>
        {data.map((elem) => {
          return (
            <Col md={2} className={classes.item} key={elem[1]}>
              <img src={elem[0]} className={classes.img} alt={elem[1]} />
              <p className={classes.name}>{elem[1]}</p>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};
export default Header;
