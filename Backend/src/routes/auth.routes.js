import express from "express";
import {
  signup,
  login,
  logout,
  changePassword,
  deleteAccount,
  AdminLogin,
  addAdmin,
  getMe,
} from "../controllers/Auth/auth.controllers.js";
import { protectRoute } from "../middlewares/AuthMiddleware.js";

const router = express.Router();

// --- AUTH ROUTES ---
router.post("/signup", signup);          // Normal user signup
router.post("/login", login);            // Normal user login
router.post("/adminlogin", AdminLogin);  // Admin login
router.post("/add-admin",  addAdmin); // Only logged-in admin can add another admin
router.post("/logout", logout);

// --- USER MANAGEMENT ---
router.put("/change-password", protectRoute, changePassword);
router.delete("/delete-account", protectRoute, deleteAccount);
router.get("/me", protectRoute, getMe);  // Get current user info

export default router;
