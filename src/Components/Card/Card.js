import Card from "react-bootstrap/Card";
import classes from "./Card.module.css";
import { Link } from "react-router-dom";

const CardComponent = (props) => {
  return (
    <Link
      to={`/product/${props.id}`}
      style={{ textDecoration: "none", maxWidth: "210px" }}
    >
      <Card
        className={`text-center ${classes.card}`}
        style={{ backgroundColor: props.color }}
      >
        <div className={classes.imgWrapper}>
          <Card.Img variant="top" src={props.image} className={classes.img} />
        </div>
        <Card.Body className="pt-0 pb-0">
          <Card.Title className={classes.title}>{props.name}</Card.Title>
          <Card.Text>
            {/* <p className={classes.price}>
              &#8377; {props.price.toLocaleString("en-IN")}
            </p> */}
            <p className={classes.discount}>
              Up to <span style={{ color: "#ed213b" }}>{props.discount}%</span>{" "}
              off
            </p>
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default CardComponent;
