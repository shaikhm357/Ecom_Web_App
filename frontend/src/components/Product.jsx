import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

function Product({ product }) {
  const renderTooltip = (props) => (
    <Tooltip id='button-tooltip' {...props}>
      {product.name}
    </Tooltip>
  );
  return (
    <Card className='my-3 p-3 rounded'>
      {/* image  */}
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} />
      </Link>

      {/* body title pricing*/}
      <Card.Body>
        <OverlayTrigger
          placement='bottom'
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip}
        >
          <Link to={`/product/${product._id}`}>
            <Card.Title as='div' className='product-title'>
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>
        </OverlayTrigger>
        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text as='h3'>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;
