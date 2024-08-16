import express from "express";
import { product } from "../model/index.js";
import path from "path";

// routes
const shopRouter = express.Router();

// middleware
shopRouter.use(express.json());


shopRouter.get("/", (req, res) => {
  res.sendFile(path.resolve("./static/html/index.html"));
});

shopRouter.get("/products", (req, res) => {
    product.fetchProducts(req, res);
})

shopRouter.get("/products/:productID", (req, res) => {
  product.fetchProductByID(req, res);
});

shopRouter.get("/products/recent", (req, res) => {
  product.recentProducts(req, res);
});

shopRouter.post("/products/add", (req, res) => {
  product.addProduct(req, res);
});

shopRouter.patch("/products/update/:productID", (req, res) => {
  product.updateProduct(req, res);
});

shopRouter.delete("/products/delete/:productID", (req, res) => {
  product.deleteProduct(req, res);
});

shopRouter.get("*", (req, res) => {
    res.sendFile(path.resolve("./static/html/error.html"));
  })

export {shopRouter}