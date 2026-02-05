import express from "express";
import {
  getAllUsers,
  blockUser,
  unblockUser,
  deleteUser,
} from "../controllers/admin.user.controller.js";

const router = express.Router();

// GET all users (usersInfo)
router.get("/all", getAllUsers);

// BLOCK user
router.put("/:id/block", blockUser);

// UNBLOCK user
router.put("/:id/unblock", unblockUser);

// DELETE user
router.delete("/:id", deleteUser);

export default router;
