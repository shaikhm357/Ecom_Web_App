import express from "express";
import dotenv from "dotenv";
dotenv.config();
import products from "./data/products.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Api is running...");
});

app.get("/api/products", (req, res) => {
  res.send(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((product) => product._id === req.params.id);
  res.send(product);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
