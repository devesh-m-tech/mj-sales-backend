import express from "express";
import {
  getServices,
  getCategories,
  addService,
  addCategory,
} from "../controllers/alter.controller.js";

const router = express.Router();

// ================= GET (ALREADY WORKING) =================
router.get("/services", getServices);
router.get("/categories", getCategories);

// ================= POST (NEW – SAFE ADD) =================
router.post("/services", addService);
router.post("/categories", addCategory);

export default router;
