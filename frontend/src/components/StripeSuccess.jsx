import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function StripeSuccess() {
  const { id: orderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/order/${orderId}`);
  }, [orderId,navigate]);
  return (
    <div>
      <h1>Payment Successful</h1>
    </div>
  );
}

export default StripeSuccess;
