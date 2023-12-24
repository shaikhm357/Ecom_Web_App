import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    if (products) {
      return res.status(200).json({ success: true, data: products });
    }
    res.status(404).json({ success: true, data: products });
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      return res.status(200).json({ success: true, data: product });
    } else {
      res.status(404);
      throw new Error("Resource not found");
    }
  })
);

export default router;
