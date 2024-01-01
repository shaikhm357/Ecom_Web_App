import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function StripeCancel() {
  const { id: orderId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    navigate(`/order/${orderId}`);
  });
  return (
    <div>
      <h1>Canceled</h1>
    </div>
  );
}

export default StripeCancel;
