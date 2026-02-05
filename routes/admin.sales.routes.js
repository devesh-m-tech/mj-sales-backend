import express from "express";
import {
  getAllSalesPersons,
  approveSalesPerson,
  rejectSalesPerson,
  requestSalesPerson,   // 🆕 NEW
} from "../controllers/admin.sales.controller.js";

const router = express.Router();

// ===============================
// GET ALL SALES PERSONS
// ===============================
router.get("/all", getAllSalesPersons);

// ===============================
// REQUEST SALES PERSON (FROM SALES APP)
// ===============================
router.post("/request", requestSalesPerson);

// ===============================
// APPROVE SALES PERSON
// ===============================
router.put("/:id/approve", approveSalesPerson);

// ===============================
// REJECT SALES PERSON
// ===============================
router.put("/:id/reject", rejectSalesPerson);

export default router;
