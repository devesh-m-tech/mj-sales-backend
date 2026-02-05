import express from "express";
import {
  getAllServiceInquiries,
  approveServiceInquiry,
  rejectServiceInquiry,
} from "../controllers/admin.service.controller.js";

const router = express.Router();

// 🔍 GET ALL SERVICE INQUIRIES
router.get("/service-inquiry", getAllServiceInquiries);

// ✅ APPROVE
router.put("/service-inquiry/:id/approve", approveServiceInquiry);

// ❌ REJECT
router.put("/service-inquiry/:id/reject", rejectServiceInquiry);

export default router;