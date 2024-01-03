import Razorpay from "razorpay";
import crypto from "crypto";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const razorpay = new Razorpay({
  key_id: process.env.RAZOR_PAY_KEY_ID,
  key_secret: process.env.RAZOR_PAY_SECRET_ID
});
import asyncHandler from "../middleware/asyncHandler.js";

// @desc    Get razor pay key
// @route   GET /api/config/razorpay/key
// @access  Public
const getRazorPayKey = asyncHandler(async (req, res) => {
  res.status(200).json({ razorpay_key: process.env.RAZOR_PAY_KEY_ID });
});

// @desc    Get razor pay key
// @route   GET /api/config/razorpay/key
// @access  Public
const createRazorPayOrder = asyncHandler(async (req, res) => {
  const { amount } = req.body;
  const options = {
    amount: Number(amount) * 100, // amount in the smallest currency unit
    currency: "USD"
  };
  const resp = await razorpay.orders.create(options);
  res.status(200).json(resp);
});

// @desc    Get payment verification
// @route   GET /api/config/payment-verifiction
// @access  Public
const paymetnVerification = asyncHandler(async (req, res) => {
  const { reference: orderId } = req.query;
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expected = crypto
    .createHmac("sha256", process.env.RAZOR_PAY_SECRET_ID)
    .update(body.toString())
    .digest("hex");

  // console.log("signiture recived", razorpay_signature);
  // console.log("signiture generated", expected);
  if (razorpay_signature === expected) {
    try {
      await axios.put(
        `http://localhost:8000/api/orders/${orderId}/pay`,
        {},
        {
          withCredentials: true,
          headers: {
            Cookie: `jwt=${req.cookies.jwt}`
          }
        }
      );

      return res.redirect(
        `http://localhost:3000/${orderId}/paymentsuccess?reference=${razorpay_payment_id}`
      );
    } catch (err) {
      console.error("Axios Error:", err);
    }
  } else {
    return res.json({ success: false });
  }
});

export { getRazorPayKey, createRazorPayOrder, paymetnVerification };
