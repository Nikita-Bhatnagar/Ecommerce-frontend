import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import classes from "./Footer.module.css";
import { Container } from "react-bootstrap";
import { BiColorFill, BiHelpCircle } from "react-icons/bi";
import { HiGift } from "react-icons/hi";
import { MdStars } from "react-icons/md";
import { IoMdBriefcase } from "react-icons/io";
import image from "./../../creditcards.svg";
const Footer = (props) => {
  return (
    <footer className={classes.footer}>
      <Row className={classes.row}>
        <Col md={7}>
          <Row>
            <Col md={3}>
              <h6 className={classes.colHeading}>ABOUT</h6>
              <ul className={classes.list}>
                {[
                  "Contact Us",
                  "About Us",
                  "Careers",
                  "Shopkart Stories",
                  "Press",
                  "Shopkart Wholesale",
                  "Corporate Information",
                ].map((elem) => (
                  <li className={classes.listItem} key={elem}>
                    {elem}
                  </li>
                ))}
              </ul>
            </Col>
            <Col md={3}>
              <h6 className={classes.colHeading}>HELP</h6>
              <ul className={classes.list}>
                {[
                  "Payment",
                  "Shipping",
                  "Cancellation & Returns",
                  "FAQ",
                  "Report Infringement",
                ].map((elem) => (
                  <li className={classes.listItem} key={elem}>
                    {elem}
                  </li>
                ))}
              </ul>
            </Col>
            <Col md={3}>
              <h6 className={classes.colHeading}>POLICY</h6>
              <ul className={classes.list}>
                {[
                  "Return Policy",
                  "Terms Of Use",
                  "Security",
                  "Privacy",
                  "Site Map",
                  "EPR Compliance",
                ].map((elem) => (
                  <li className={classes.listItem} key={elem}>
                    {elem}
                  </li>
                ))}
              </ul>
            </Col>
            <Col md={3}>
              <h6 className={classes.colHeading}>SOCIAL</h6>
              <ul className={classes.list}>
                {["Facebook", "Twitter", "Youtube"].map((elem) => (
                  <li className={classes.listItem} key={elem}>
                    {elem}
                  </li>
                ))}
              </ul>
            </Col>
          </Row>
        </Col>
        <Col md={5}>
          <Row>
            <Col md={6} className={classes.address}>
              <h6 className={classes.colHeading}>Mail Us:</h6>
              <address className={classes.colContent}>
                Shopkart Internet Private Limited,
                <br /> Sahajeevan 4, Shraddhanand Rd,
                <br /> Vile Parle East Mumbai Maharashtra,
                <br /> India Zip Code: 400057
              </address>
            </Col>

            <Col md={6} offset={1}>
              <h6 className={classes.colHeading}>
                {" "}
                Registered Office Address:{" "}
              </h6>
              <address className={classes.colContent}>
                Shopkart Internet Private Limited,
                <br /> Sahajeevan 4, Shraddhanand Rd,
                <br /> Vile Parle East Mumbai Maharashtra,
                <br /> India Zip Code: 400057
                <br />
                <span> Phone number : </span>
                <a
                  style={{ textDecoration: "none", color: "#ed213b" }}
                  href="tel: 02226188528"
                >
                  02226188528
                </a>
              </address>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className={classes.rowBottom}>
        <Col md={6}>
          <Row>
            <Col md={3}>
              <IoMdBriefcase className={classes.footerIcons} />
              Become a seller
            </Col>
            <Col md={3}>
              <MdStars className={classes.footerIcons} />
              Advertise
            </Col>
            <Col md={3}>
              <HiGift className={classes.footerIcons} />
              Gift Cards
            </Col>
            <Col md={3}>
              <BiHelpCircle className={classes.footerIcons} />
              Help Center
            </Col>
          </Row>
        </Col>
        <Col md={6}>
          <Row>
            <Col md={4}>
              <span>&copy; 2007-2022 Shopkart.com</span>
            </Col>
            <Col md={8}>
              <img src={image} alt="" className={classes.img} />
            </Col>
          </Row>
        </Col>
      </Row>
    </footer>
  );
};
export default Footer;
