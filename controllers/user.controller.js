import AdminUser from "../models/AdminUser.js";

/* ===============================
   GET ALL ADMINS
   =============================== */
export const getAdmins = async (req, res) => {
  try {
    const users = await AdminUser.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ===============================
   APPROVE ADMIN
   =============================== */
export const approveAdmin = async (req, res) => {
  try {
    await AdminUser.findByIdAndUpdate(req.params.id, {
      approved: true,
    });

    res.status(200).json({
      success: true,
      message: "User approved as Admin",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ===============================
   DISABLE ADMIN
   =============================== */
export const disableAdmin = async (req, res) => {
  try {
    await AdminUser.findByIdAndUpdate(req.params.id, {
      approved: false,
    });

    res.status(200).json({
      success: true,
      message: "Admin disabled",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ===============================
   DELETE ADMIN
   =============================== */
export const deleteAdmin = async (req, res) => {
  try {
    await AdminUser.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Admin deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
