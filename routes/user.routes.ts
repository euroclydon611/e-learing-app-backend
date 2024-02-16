import express from "express";
const router = express.Router();

import {
  UserRegistration,
  UserActivation,
  UserLogin,
  updateAccessToken,
  getUserInfo,
  UserLogout,
  socialAuth,
  updateUserInfo,
  updatePassword,
  updateProfilePicture,
  getAllUsers,
  updateUserRole,
  deleteUser,
} from "../controllers/user.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";

router.post("/registration", UserRegistration);
router.post("/activate-user", UserActivation);
router.post("/login", UserLogin);
router.get("/refresh", updateAccessToken);
router.get("/user", isAuthenticated, getUserInfo);
router.get("/logout", isAuthenticated, UserLogout);
router.post("/social-auth", socialAuth);
router.put("/update-user-info", isAuthenticated, updateUserInfo);
router.put("/update-user-password", isAuthenticated, updatePassword);
router.put("/update-user-avatar", isAuthenticated, updateProfilePicture);

router.get(
  "/get-all-users",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllUsers
);

router.put(
  "/update-user-role",
  isAuthenticated,
  authorizeRoles("admin"),
  updateUserRole
);

router.delete(
  "/delete-user/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteUser
);

export default router;
