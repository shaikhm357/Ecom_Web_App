import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Row, Col, Image, ListGroup } from "react-bootstrap";
import CheckoutSteps from "../components/CheckoutSteps";

export default function PlaceOrder() {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [navigate, cart.paymentMethod, cart.shippingAddress.address]);

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>Column</Col>
        <Col md={4}>Column</Col>
      </Row>
    </>
  );
}
