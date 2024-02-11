import express from "express";
const router = express.Router();

import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import {
  getNotifications,
  updateNotification,
} from "../controllers/notification.controller";

router.get(
  "/get-notifications",
  isAuthenticated,
  authorizeRoles("admin"),
  getNotifications
);

router.put(
  "/update-notification/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  updateNotification
);

export default router;
