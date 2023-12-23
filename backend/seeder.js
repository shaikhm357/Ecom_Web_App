import dotenv from "dotenv";
import color from "colors";

import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import User from "./models/userModel.js";

import products from "./data/products.js";
import users from "./data/users.js";
import connectDb from "./config/db.js";

dotenv.config();

// connect db
connectDb();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createUser = await User.insertMany(users);
    const adminUser = createUser[0]._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);
    console.log(`Data Imported!`.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany({});
    await Product.deleteMany({});
    await User.deleteMany({});

    console.log(`Data Destroyed!`.red.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
