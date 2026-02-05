import User from "../models/User.js";

// ===============================
// GET ALL SALES PERSONS
// ===============================
export const getAllSalesPersons = async (req, res) => {
  try {
    // Only users with role = "sales"
    const salesPersons = await User.find({ role: "sales" }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: salesPersons,
    });
  } catch (error) {
    console.error("❌ Get sales persons error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch sales persons",
    });
  }
};

// ===============================
// REQUEST SALES PERSON (CREATE / MARK AS PENDING)
// ===============================
export const requestSalesPerson = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: "Phone number is required",
      });
    }

    // Find or create user by phone
    let user = await User.findOne({ phone });

    if (!user) {
      // Create new pending sales user
      user = await User.create({
        phone,
        role: "sales",
        approved: false,
      });
    } else {
      // If already exists, mark as sales + pending
      user.role = "sales";
      user.approved = false;
      await user.save();
    }

    return res.status(200).json({
      success: true,
      message: "Sales approval request sent",
      data: user,
    });
  } catch (error) {
    console.error("❌ Request sales person error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to send sales approval request",
    });
  }
};

// ===============================
// APPROVE SALES PERSON
// ===============================
export const approveSalesPerson = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(
      id,
      { approved: true },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Sales person not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Sales person approved successfully",
      data: user,
    });
  } catch (error) {
    console.error("❌ Approve sales person error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to approve sales person",
    });
  }
};

// ===============================
// REJECT SALES PERSON
// ===============================
export const rejectSalesPerson = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(
      id,
      { approved: false },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Sales person not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Sales person rejected successfully",
      data: user,
    });
  } catch (error) {
    console.error("❌ Reject sales person error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to reject sales person",
    });
  }
};
