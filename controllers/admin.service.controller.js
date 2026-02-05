import ServiceInquiry from "../models/ServiceInquiry.js";

/**
 * ✅ GET ALL SERVICE INQUIRIES
 */
export const getAllServiceInquiries = async (req, res) => {
  try {
    const data = await ServiceInquiry.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * ✅ APPROVE SERVICE INQUIRY
 */
export const approveServiceInquiry = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await ServiceInquiry.findByIdAndUpdate(
      id,
      { status: "approved" },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Service inquiry approved",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * ❌ REJECT SERVICE INQUIRY
 */
export const rejectServiceInquiry = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await ServiceInquiry.findByIdAndUpdate(
      id,
      { status: "rejected" },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Service inquiry rejected",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
