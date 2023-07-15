import Header from "../Components/Header/Header.js";
import Carousel from "../Components/Carousel/Carousel.js";
import Card2 from "../Components/Card2/Card2";
import Slider from "../Components/Slider/Slider";
import ProductRow from "../Components/ProductRow/ProductRow.js";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const Home = (props) => {
  return (
    <div>
      {/* <Header /> */}
      <Carousel />
      <Row style={{ maxWidth: "1100px", margin: "30px auto" }}>
        <Col sm={6}>
          <Card2
            text="Elegant Women's Handbags"
            keyword="handbag"
            id="63427236cc2938a84b7f1afc"
            imgUrl="https://5.imimg.com/data5/RF/LU/MY-8530435/beige-tussle-women-handbag-500x500.jpg"
          />
        </Col>
        <Col sm={6}>
          <Card2
            text="Casual Shirts for your Wardrobe"
            keyword="chandelier"
            id="63427236cc2938a84b7f1ad2"
            imgUrl="https://cdn.mos.cms.futurecdn.net/nLsnRuDXt7VTGVpiRa2D48-415-80.jpg"
          />
        </Col>
      </Row>
      {/* <Slider title="Best of Electronics" category="electronics" />
      <Slider title="Fashion Top Deals" category="fashion" />
      <Slider title="Home &amp; Kitchen Essentials" category="home" /> */}
      <ProductRow title="New Arrivals" type="latest" color="#f1f3f6" />
      <ProductRow title="Best discounts for you" type="discount" color="#fff" />
      <ProductRow title="Top Rated Products" type="top" color="#f1f3f6" />
    </div>
  );
};
export default Home;
