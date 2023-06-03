const express = require("express");
const { ProductModel } = require("../models/product.model");
const productRouter = express.Router();

productRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const product = new ProductModel(payload);
    await product.save();
    res.send({ message: "Product Added" });
  } catch (error) {
    res.send({ message: "Error while adding Product" });
  }
});
productRouter.patch("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  try {
    await ProductModel.findByIdAndUpdate({ _id: id }, payload);
    res.send({ message: "Flight updated" });
  } catch (error) {
    res.send({ message: "Error while updating Product" });
  }
});
productRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await ProductModel.findByIdAndRemove({ _id: id });
    res.send({ message: "Flight Deleted" });
  } catch (error) {
    res.send({ message: "Error while deleting" });
  }
});

module.exports = { productRouter };
