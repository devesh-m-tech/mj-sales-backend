import express from "express";
import bcrypt from "bcryptjs";
import {
  sendOtp,
  verifyOtp,
  checkApproval,
  registerFullUser,   // 🆕 ONLY THIS REGISTER
} from "../controllers/auth.controller.js";
import AdminUser from "../models/AdminUser.js";

const router = express.Router();

/* ================= OTP ROUTES ================= */

// Send OTP
router.post("/send-otp", sendOtp);

// Verify OTP
router.post("/verify-otp", verifyOtp);

// 🔁 Check approval status (NO OTP)
router.post("/check-approval", checkApproval);

/* ================= REGISTER ROUTE ================= */

// 🆕 ONLY FULL REGISTER (Step1 + Step2 form)
router.post("/register-full", registerFullUser);

/* ================= EXISTING LOGIN ROUTE (UNCHANGED) ================= */

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

/* ================= NEW ADMIN LOGIN ROUTE ================= */

router.post("/admin/login", async (req, res) => {
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

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Admin login successful",
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: "admin",
      },
    });
  } catch (error) {
    console.error("ADMIN LOGIN ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

export default router;
