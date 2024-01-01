import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoute.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// connect db
connectDB();

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// to use cookies
app.use(cookieParser());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Api is running...");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.post("/api/create-checkout-session", async (req, res) => {
  const { totalPrice, orderId } = req.body;
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Total In Cart"
          },
          unit_amount: Number(totalPrice) * 100
        },
        quantity: 1
      }
    ],
    mode: "payment",
    success_url: `${process.env.success}/${orderId}/success`,
    cancel_url: `${process.env.cancel}/${orderId}/cancel`
  });
  res.status(200).json({ url: session.url });
});

app.get("/api/config/paypal", (req, res) => {
  res.status(200).send({ clientId: process.env.PAYPAL_CLIEN_ID });
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
