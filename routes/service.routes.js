import express from "express";
import {
  getAll,
  addOne,
  updateOne,
  deleteOne,
} from "../controllers/service.ctrl.js";

const router = express.Router();

// 🔥 matches frontend URLs
router.get("/manage/all", getAll);
router.post("/manage/add", addOne);
router.put("/manage/:id", updateOne);
router.delete("/manage/:id", deleteOne);

export default router;
