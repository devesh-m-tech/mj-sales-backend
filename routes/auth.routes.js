import express from "express";
import bcrypt from "bcryptjs";
import {
  sendOtp,
  verifyOtp,
  registerUser,
} from "../controllers/auth.controller.js";
import AdminUser from "../models/AdminUser.js";

const router = express.Router();

/* ================= EXISTING ROUTES (UNCHANGED) ================= */

// OTP routes
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

// Register route
router.post("/register", registerUser);

/* ================= NEW LOGIN ROUTE (ADDED) ================= */

/*
  🔐 ADMIN LOGIN
  - Uses existing AdminUsers collection
  - Checks email + password
  - Checks approved status
  - Returns name, email, role
*/
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find admin by email
    const admin = await AdminUser.findOne({ email });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check approved
    if (!admin.approved) {
      return res.status(403).json({
        success: false,
        message: "Your account is not approved yet",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Success response (NO TOKEN now – simple login)
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: "admin",
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

export default router;
