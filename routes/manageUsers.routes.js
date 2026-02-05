import express from "express";
import {
  getAllAppUsers,
  blockUser,
  unblockUser,
  deleteUser,
} from "../controllers/manageUsers.controller.js";

const router = express.Router();

// usersInfo collection
router.get("/all", getAllAppUsers);
router.put("/:id/block", blockUser);
router.put("/:id/unblock", unblockUser);
router.delete("/:id", deleteUser);

export default router; // 🔥 MUST BE DEFAULT
