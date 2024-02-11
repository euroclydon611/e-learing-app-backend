import express from "express";
const router = express.Router();

import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { createOrder } from "../controllers/order.controller";

router.post("/create-order", isAuthenticated, createOrder);

export default router;
