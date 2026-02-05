import express from "express";
import { getFeaturedAds } from "../controllers/featured.controller.js";

const router = express.Router();

router.get("/all", getFeaturedAds);

export default router;
