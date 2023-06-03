const express = require("express");
const { connection } = require("./configs/db");
const { userRouter } = require("./routes/user.route");
const { productRouter } = require("./routes/product.route");
const { authenticate } = require("./middleware/authentication");
const app = express();
const cors = require("cors");
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use("/", userRouter);
app.use("/product", authenticate, productRouter);
app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (error) {
    console.log("Something went wrong while connecting");
  }
  console.log(`Running at port ${process.env.port}`);
});
