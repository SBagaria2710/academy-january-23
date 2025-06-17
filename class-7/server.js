const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Connect to DB
require("./dbConfig");

app.use(express.json()); // Middleware to parse JSON

const myCustomMiddlewareFunc = (req, res, next) => {
  console.log("Requst Body =>", req.body);
  if (req.body.foo === "bar") {
    return res.send("Early return from middleware");
  }
  next();
};

// Defined root route
app.get("/search/:userId", (req, res) => {
  console.log(req.params, req.query);
  res.send("Hello, Express");
});

app.post("/data", myCustomMiddlewareFunc, (req, res) => {
  res.send("Received a POST request");
});

// -------------------------------------------------------------------------------------
const productSchema = new mongoose.Schema({
  product_name: { type: String, required: true },
  product_price: { type: String, required: true },
  isInStock: { type: Boolean, required: true },
  category: { type: String, required: true },
}, { timestamps: true });

const ProductModel = mongoose.model("product", productSchema);

app.post("/api/products", async (req, res) => {
  const body = req.body;
  const product = await ProductModel.create({
    product_name: body.product_name,
    product_price: body.product_price,
    isInStock: body.isInStock,
    category: body.category,
  });

  console.log(product);
  return res.status(201).json({ message: "Product Created" });
});

// app.get("/api/products", async (req, res) => {
//   const allProducts = await ProductModel.find({});
//   console.log(allProducts);
//   return res.status(200).json(allProducts);
// });

app.get("/api/products", async (req, res) => {
  const allProducts = await ProductModel.find({ category: "electronics" });
  return res.status(200).json(allProducts);
});

app.get("/api/products/:id", async (req, res) => {
  const product = await ProductModel.findById(req.params.id);
  res.status(200).json(product);
});

app.put("/api/products/:id", async (req, res) => {
  await ProductModel.findByIdAndUpdate(req.params.id, req.body);
  return res.status(201).json({ message: "Resources Updated" });
});

app.delete("/api/products/:id", async (req, res) => {
  await ProductModel.findByIdAndDelete(req.params.id);
  return res.status(201).json({ message: "Resource Deleted" });
});



// Start Server
const port = 8082;
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
