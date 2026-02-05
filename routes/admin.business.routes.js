import express from "express";
import {
  getAllBusinesses,
  addBusiness,
  approveBusiness,
  rejectBusiness,
} from "../controllers/admin.business.controller.js";

const router = express.Router();

// ADD BUSINESS
router.post("/add-business", addBusiness);

// GET ALL BUSINESSES
router.get("/all", getAllBusinesses);

// APPROVE (must match frontend)
router.put("/:businessId/approved", approveBusiness);

// REJECT
router.put("/:businessId/rejected", rejectBusiness);

// ✅ THIS LINE IS MANDATORY
export default router;
