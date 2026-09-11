import express from "express";
import { product } from "../models/Product.js";

const router = express.Router();
router.get("/products", (req, res, next) => {
  try {
    res.status.send(product);
  } catch (err) {
    next(err);
  }
});

export default router;
