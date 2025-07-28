import express from "express";
import { login, logout, onboard, signup } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// Signup a new user
router.post("/signup", signup);

// Login an existing user
router.post("/login", login);

// Logout a user (clears cookie)
router.post("/logout", logout);

// Onboarding step for authenticated users
router.post("/onboarding", protectRoute, onboard);

// Get current authenticated user info
router.get("/me", protectRoute, (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});

export default router;
