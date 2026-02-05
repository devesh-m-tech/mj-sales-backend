import AddService from "../models/addService.model.js";

export const getAllServices = async (req, res) => {
  try {
    const services = await AddService.find().sort({ date: -1 });

    res.status(200).json({
      success: true,
      data: services,
    });
  } catch (error) {
    console.error("Get Services Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch services",
    });
  }
};
