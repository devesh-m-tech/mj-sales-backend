import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Otp from "../models/Otp.js";
import { generateOtp } from "../utils/generateOtp.js";
import { sendOtpSms } from "../utils/sendOtpSms.js";

/* ===============================
   SEND OTP
   =============================== */
export const sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number",
      });
    }

    const otp = generateOtp();

    await Otp.deleteMany({ phone });

    await Otp.create({
      phone,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    await sendOtpSms(phone, otp);

    console.log("✅ OTP GENERATED:", otp);

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error("❌ SEND OTP ERROR:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to send OTP",
    });
  }
};

/* ===============================
   VERIFY OTP
   =============================== */
export const verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({
        success: false,
        message: "Phone & OTP required",
      });
    }

    const record = await Otp.findOne({ phone, otp });

    if (!record) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (record.expiresAt < new Date()) {
      await Otp.deleteMany({ phone });
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    await Otp.deleteMany({ phone });

    let user = await User.findOne({ phone });
    let isRegistered = true;

    if (!user) {
      // 🔹 New user default role = user
      user = await User.create({ phone, role: "user" });
      isRegistered = false;
    }

    // 🔥 NEW CHECK: SALES PERSON NEEDS ADMIN APPROVAL
    if (user.role === "sales" && user.approved === false) {
      return res.status(403).json({
        success: false,
        message: "Waiting for admin approval",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        phone: user.phone,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      token,
      user,
      isRegistered,
    });
  } catch (error) {
    console.error("❌ VERIFY OTP ERROR:", error.message);
    return res.status(500).json({
      success: false,
      message: "OTP verification failed",
    });
  }
};

/* ===============================
   REGISTER USER  ✅ NEW
   =============================== */
export const registerUser = async (req, res) => {
  try {
    const { phone, name, email } = req.body;

    if (!phone || !name || !email) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please login again",
      });
    }

    user.name = name;
    user.email = email;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Registration completed",
      user,
    });
  } catch (error) {
    console.error("❌ REGISTER ERROR:", error.message);
    return res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
};
