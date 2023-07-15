import { useSelector } from "react-redux";
import classes from "./ProductInfo.module.css";
import { AiFillStar } from "react-icons/ai";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { ProgressBar } from "react-bootstrap";
const ProductInfo = (props) => {
  const details = useSelector((state) => state.products.productDetails);
  const totalRatings = details.numRating?.reduce(
    (acc, cur) => acc + cur.count,
    0
  );
  const actualPrice = (
    (details.price * 100) /
    (100 - details.discount)
  ).toFixed(0);
  let numRatings = details.numRating?.map((elem) => elem.count);
  numRatings = numRatings?.reverse();
  //const variants = ["success", "success", "success", "warning", "danger"];
  return (
    <div className={classes.details}>
      <h1 className={classes.name}>{details.name}</h1>
      <div className={classes.ratingRow}>
        <span className={classes.rating}>
          {details.rating}
          <AiFillStar style={{ marginLeft: "2px", marginBottom: "0.5px" }} />
        </span>
        <span className={classes.ratingText}>{`${totalRatings?.toLocaleString(
          "en-IN"
        )} Ratings & ${details.numReviews?.toLocaleString(
          "en-IN"
        )} Reviews`}</span>
      </div>
      <div className={classes.price}>
        <p
          style={{
            color: "#ed213b",
            fontSize: "14px",
            fontWeight: "500",
            marginBottom: "0px",
            lineHeight: "15px",
          }}
        >
          Special Price
        </p>
        <span className={classes.span1}>
          &#8377;{details.price?.toLocaleString("en-IN")}
        </span>
        <span className={classes.span2}>
          &#8377;{Number(actualPrice)?.toLocaleString("en-IN")}
        </span>
        <span className={classes.span3}>{details.discount}% off</span>
      </div>

      <div className="pt-4">
        {details.highlights?.length > 0 && (
          <Row>
            <Col sm={2} className={classes.featureHeading}>
              Highlights
            </Col>
            <Col sm={10} className={classes.featureValues}>
              <ul className={classes.list}>
                {details.highlights[0]?.split(";\n").map((elem, i) => (
                  <li key={i} className={classes.listItem}>
                    {elem}
                  </li>
                ))}
              </ul>
            </Col>
          </Row>
        )}
        <Row>
          <Col sm={2} className={classes.featureHeading}>
            Seller
          </Col>
          <Col sm={10} className={classes.featureValues}>
            <span className={classes.seller}>{details.seller}</span>
            <ul className={classes.list}>
              <li className={classes.listItem}>
                7 day seller replacement policy/brand assistance for product
                issues
              </li>
              <li className={classes.listItem}>GST invoice available</li>
            </ul>
          </Col>
        </Row>
        <Row className="pt-3">
          <Col sm={2} className={`pe-0 ${classes.featureHeading}`}>
            Color
          </Col>
          <Col sm={10} className={`ps-0 ${classes.featureValues}`}>
            {details.color?.map((elem) => {
              return (
                <span
                  style={{ color: "#fff", backgroundColor: elem }}
                  className={classes.color}
                ></span>
              );
            })}
          </Col>
        </Row>
      </div>

      <Tabs
        defaultActiveKey={
          details.description ? "Description" : "Specifications"
        }
        id="justify-tab"
        className="mb-3 mt-5"
        justify
      >
        {details.description && (
          <Tab eventKey="Description" title="Description">
            <div className="pt-3">
              <p className={classes.featureValues}>{details.description}</p>
            </div>
          </Tab>
        )}
        <Tab eventKey="Specifications" title="Specifications">
          <div className={classes.box}>
            <div className={classes.heading}>Specifications</div>
            {details.specifications?.map((elem) => {
              return (
                <table
                  className="p-4 pb-5"
                  style={{
                    borderBottom: "1px solid rgba(170,170,170,0.3)",
                    width: "100%",
                  }}
                >
                  <thead className={classes.thead}>
                    <tr>
                      <th colSpan={2} className="pb-4">
                        {elem.specification_type}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {elem.specifics?.map((data) => {
                      return (
                        <tr className={classes.tableRow}>
                          <td
                            className={classes.tabledata}
                            style={{ color: "#878787" }}
                          >
                            {data.split(":")[0]}
                          </td>
                          <td className={classes.tabledata}>
                            {data.split(":")[1]}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              );
            })}
          </div>
        </Tab>
        <Tab eventKey="Ratings" title="Ratings">
          <div className={classes.box}>
            <div className={classes.heading}>Ratings</div>
            <Row className="p-4">
              <Col sm={2} className={classes.ratingStats}>
                <span className={classes.box_rating}>
                  {`${details.rating?.toLocaleString("en-IN")}  `}
                  <AiFillStar />
                </span>
                <p className={classes.box_rating_value}>
                  {`${totalRatings} Ratings &`}
                  <br />
                  {`${details.numReviews?.toLocaleString("en-IN")} Reviews`}
                </p>
              </Col>
              <Col sm={9}>
                {numRatings?.map((elem, i) => {
                  return (
                    <Row className="align-items-center">
                      <Col xs={1} className="pe-0 align-items-center">
                        <span style={{ fontSize: "12px" }}>
                          {5 - i} <AiFillStar />
                        </span>
                      </Col>
                      <Col xs={6} className="ps-0 pe-0">
                        <ProgressBar
                          now={(elem / totalRatings) * 100}
                          label={`${(elem / totalRatings) * 100}%`}
                          variant="danger"
                          visuallyHidden
                        />
                      </Col>
                      <Col
                        style={{ fontSize: "12px", color: "#878787" }}
                        xs={2}
                      >
                        {elem?.toLocaleString("en-IN")}
                      </Col>
                    </Row>
                  );
                })}
              </Col>
            </Row>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};
export default ProductInfo;
