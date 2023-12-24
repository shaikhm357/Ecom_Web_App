import Product from "../models/productModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

// @desc    Fetch all products
// @route   Get /products/api
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  if (products) {
    return res.status(200).json({ success: true, data: products });
  }
  res.status(404).json({ success: true, data: products });
});

// @desc    Fetch a products
// @route   Get /products/api/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.status(200).json({ success: true, data: product });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

export { getProducts, getProductById };
