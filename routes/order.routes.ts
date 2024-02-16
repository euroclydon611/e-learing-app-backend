import express from "express";
const router = express.Router();

import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { createOrder, getAllOrders } from "../controllers/order.controller";

router.post("/create-order", isAuthenticated, createOrder);

router.get(
  "/get-all-orders",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllOrders
);

export default router;
