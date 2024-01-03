import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  useCreateRazorPayOrderMutation,
  useGetRazorPayKeyQuery
} from "../slices/razorPayApiSlice.js";
import { useSelector } from "react-redux";

function RazorPayButton() {
  const { id: orderId } = useParams();
  const cart = useSelector((state) => state.cart);
  const { totalPrice } = cart;

  const { data } = useGetRazorPayKeyQuery();

  const [createRazorPayOrder, { isLoading: laodingOrder }] =
    useCreateRazorPayOrderMutation();

  async function createOrder() {
    let options = {
      key: "key", // Enter the Key ID generated from the Dashboard
      amount: "amount", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "USD",
      name: "Ecom Purchase",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: "order_IluGWxBm9U8zJ8", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: `http://localhost:8000/api/config/razorpay/payment-verifiction?reference=${orderId}`,
      notes: {
        address: "Razorpay Corporate Office"
      },
      theme: {
        color: "#3399cc"
      }
    };
    options.key = data.razorpay_key;
    options.amount = Number(totalPrice) * 100;
    if (!laodingOrder) {
      const res = await createRazorPayOrder({ amount: totalPrice }).unwrap();
      options.order_id = res.id;
    }
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  }

  const paymentHandler = async () => {
    createOrder();
  };

  return <Button onClick={paymentHandler}>Pay Now</Button>;
}

export default RazorPayButton;
