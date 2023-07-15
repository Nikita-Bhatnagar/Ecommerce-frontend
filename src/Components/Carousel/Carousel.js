import Carousel from "react-bootstrap/Carousel";
import img1 from "../../assets/clothes2.jpg";
import img2 from "../../assets/carousel2.webp";
import img3 from "../../assets/carousel3.png";
import { AiOutlineArrowRight } from "react-icons/ai";
import classes from "./Carousel.module.css";
import { Link } from "react-router-dom";

const CarouselComponent = (props) => {
  return (
    <Carousel className={classes.carousel}>
      <Carousel.Item>
        <img
          className={`d-block w-100 ${classes.img}`}
          src="https://www.realsimple.com/thmb/M6htmG9lcTmCbTNNotqkb0F4MBI=/1024x256/filters:no_upscale():max_bytes(150000):strip_icc():gifv()/clothing-2000-b5ef8d353ed54800b1a29e3e7c5b2709.jpg"
          alt="First slide"
        />
        <div className={classes.overlay}>
          <Carousel.Caption className={classes.cap1}>
            <p className={classes.p}>Up to 60% off</p>
            <h2 className={classes.head1}>End of Season Sale</h2>
            <Link to="products/fashion">
              <button type="button" className={classes.btn}>
                Start Shopping <AiOutlineArrowRight />
              </button>
            </Link>
          </Carousel.Caption>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className={`d-block w-100 ${classes.img}`}
          //src={img3}
          src="https://okdeals.in/wp-content/uploads/2020/06/Featured-Image-01.jpg"
          alt="Third slide"
        />
        <div className={classes.overlay}>
          <Carousel.Caption className={classes.cap2}>
            <h2 className={classes.head2}>Exclusive Offers</h2>
            <p className={classes.p}>Up to 20% off</p>

            <Link to="products/electronics">
              <button type="button" className={classes.btn}>
                Start Shopping <AiOutlineArrowRight />
              </button>
            </Link>
          </Carousel.Caption>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className={`d-block w-100 ${classes.img}`}
          src="https://www.orientelectric.com/theme/Orient/img/aircirculating/bg-banner-3.jpg"
          alt="Second slide"
        />
        <div className={classes.overlay}>
          <Carousel.Caption className={classes.cap3}>
            <p className={classes.p}>Up to 40% off</p>
            <h2 className={classes.head3}>
              Adorn your inner world with the best home decor products
            </h2>
            <Link to="products/home">
              <button type="button" className={classes.btn}>
                Start Shopping <AiOutlineArrowRight />
              </button>
            </Link>
          </Carousel.Caption>
        </div>
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselComponent;
