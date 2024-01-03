import express from "express";
import {
  createRazorPayOrder,
  getRazorPayKey,
  paymetnVerification
} from "../controllers/razorPayController.js";
const router = express.Router();

router.route("/key").get(getRazorPayKey);
router.route("/order").post(createRazorPayOrder);
router.route("/payment-verifiction").post(paymetnVerification);

export default router;
