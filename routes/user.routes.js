import express from "express";
import {
  getAdmins,
  approveAdmin,
  disableAdmin,
  deleteAdmin,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/all", getAdmins);
router.put("/approve/:id", approveAdmin);
router.put("/disable/:id", disableAdmin);
router.delete("/delete/:id", deleteAdmin);

export default router;