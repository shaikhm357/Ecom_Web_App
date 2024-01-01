import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePayOrderMutation } from "../slices/orderApiSlice";
import Loader from "./Loader";

function StripeSuccess() {
  const { id: orderId } = useParams();
  const navigate = useNavigate();
  const [payOrder, { isLoading }] = usePayOrderMutation();

  useEffect(() => {
    const paid = async (orderId) => {
      await payOrder({ orderId, details: { payer: {} } });
      navigate(`/order/${orderId}`);
    };
    paid(orderId);
  }, [orderId, navigate, payOrder]);
  return (
    <div>
      <h1>Payment Successful</h1>
      {isLoading && <Loader />}
    </div>
  );
}

export default StripeSuccess;
