import classes from "./Card2.module.css";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
const Card2 = (props) => {
  return (
    <div
      style={{ backgroundImage: `url(${props.imgUrl})` }}
      className={classes.card}
    >
      <div className={classes.overlay}>
        <h3 className={classes.text}>{props.text}</h3>
        <Link to={`/product/${props.id}`}>
          <button type="button" className={classes.btn}>
            Shop Now <AiOutlineArrowRight />
          </button>
        </Link>
      </div>
    </div>
  );
};
export default Card2;
