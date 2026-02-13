// ⚠️ OLD MODELS USE PANROM – change panna vendam
import Service from "../models/service.model.js";
import Category from "../models/addCategory.model.js";

/**
 * GET ALL SERVICES
 */
export const getServices = async (req, res) => {
  try {
    const data = await Service.find().sort({ name: 1 });

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("GET SERVICES ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * GET ALL CATEGORIES
 */
export const getCategories = async (req, res) => {
  try {
    const data = await Category.find().sort({ name: 1 });

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("GET CATEGORIES ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * ADD CATEGORY (STORE IMAGE AS BASE64 IN DB)
 */
export const addCategory = async (req, res) => {
  try {
    const { name, image } = req.body; // image = base64 string

    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Name required" });
    }

    const exists = await Category.findOne({ name });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "Category already exists" });
    }

    const data = await Category.create({
      name,
      image: image || "", // 🆕 store base64 string in DB
    });

    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("ADD CATEGORY ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * ADD SERVICE (STORE IMAGE AS BASE64 IN DB)
 */
export const addService = async (req, res) => {
  try {
    const { name, image } = req.body; // image = base64 string

    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Name required" });
    }

    const exists = await Service.findOne({ name });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "Service already exists" });
    }

    const data = await Service.create({
      name,
      image: image || "", // 🆕 store base64 string in DB
    });

    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("ADD SERVICE ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
