import express from "express";
const router = express.Router();

import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import {
  createLayout,
  editLayout,
  getLayoutByType,
} from "../controllers/layout.controller";

router.post(
  "/create-layout",
  isAuthenticated,
  authorizeRoles("admin"),
  createLayout
);

router.put(
  "/update-layout",
  isAuthenticated,
  authorizeRoles("admin"),
  editLayout
);

router.get("/get-layout/:type", getLayoutByType);

// router.get(
//   "/get-all-orders",
//   isAuthenticated,
//   authorizeRoles("admin"),
//   getAllOrders
// );

export default router;
