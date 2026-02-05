import mongoose from "mongoose";
import AdminUser from "../models/AdminUser.js";

/* ===============================
   GET ALL ADMIN USERS (Settings)
   =============================== */
export const getAllUsers = async (req, res) => {
  try {
    const admins = await AdminUser.find();

    const mappedUsers = admins.map((u) => ({
      _id: u._id,                 // for actions
      name: u.name || "-",
      email: u.email || "-",
      phone: u.mobile || "-",     // AdminUsers field
      joinedAt: u.createdAt || null,
      status: u.approved ? "active" : "inactive",
    }));

    res.status(200).json({
      success: true,
      count: mappedUsers.length,
      data: mappedUsers,
    });
  } catch (err) {
    console.error("❌ getAllUsers error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch admin users",
    });
  }
};

/* ===============================
   UNBLOCK / APPROVE ADMIN
   =============================== */
export const unblockUser = async (req, res) => {
  try {
    await AdminUser.findByIdAndUpdate(req.params.id, {
      approved: true,
    });

    res.status(200).json({
      success: true,
      message: "Admin unblocked",
    });
  } catch (err) {
    console.error("❌ unblockUser error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to unblock admin",
    });
  }
};

/* ===============================
   BLOCK / DISABLE ADMIN
   =============================== */
export const blockUser = async (req, res) => {
  try {
    await AdminUser.findByIdAndUpdate(req.params.id, {
      approved: false,
    });

    res.status(200).json({
      success: true,
      message: "Admin blocked",
    });
  } catch (err) {
    console.error("❌ blockUser error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to block admin",
    });
  }
};

/* ===============================
   DELETE ADMIN
   =============================== */
export const deleteUser = async (req, res) => {
  try {
    await AdminUser.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Admin deleted",
    });
  } catch (err) {
    console.error("❌ deleteUser error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to delete admin",
    });
  }
};
