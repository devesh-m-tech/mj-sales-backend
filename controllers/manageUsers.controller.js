import UserInfo from "../models/UserInfo.js"; // DEFAULT import only

export const getAllAppUsers = async (req, res) => {
  try {
    const users = await UserInfo.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: users,
      count: users.length,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const blockUser = async (req, res) => {
  try {
    await UserInfo.findByIdAndUpdate(req.params.id, { blocked: true });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

export const unblockUser = async (req, res) => {
  try {
    await UserInfo.findByIdAndUpdate(req.params.id, { blocked: false });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await UserInfo.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};
