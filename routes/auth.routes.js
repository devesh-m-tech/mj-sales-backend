import express from "express";
import bcrypt from "bcryptjs";
import {
  sendOtp,
  verifyOtp,
  registerUser,
  checkApproval,   // ✅ MUST BE HERE
} from "../controllers/auth.controller.js";
import AdminUser from "../models/AdminUser.js";

const router = express.Router();

/* ================= OTP ROUTES ================= */

// Send OTP
router.post("/send-otp", sendOtp);

// Verify OTP
router.post("/verify-otp", verifyOtp);

// 🔁 Check approval status (NO OTP) ✅ ADD THIS
router.post("/check-approval", checkApproval);

/* ================= REGISTER ROUTE ================= */

router.post("/register", registerUser);

/* ================= ADMIN LOGIN ROUTE ================= */

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const admin = await AdminUser.findOne({ email });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (!admin.approved) {
      return res.status(403).json({
        success: false,
        message: "Your account is not approved yet",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

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
