import { Container, Col, Row } from "react-bootstrap";
function Footer() {
  const currentFullYear = new Date().getFullYear();
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            <p>Pro Shop &copy; {currentFullYear}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
