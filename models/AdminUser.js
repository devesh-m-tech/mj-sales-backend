import mongoose from "mongoose";

const adminUserSchema = new mongoose.Schema(
  {
    userId: String,

    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    mobile: String,

    approved: {
      type: Boolean,
      default: false,
    },

    // 🔐 ADD THIS (IMPORTANT)
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  "AdminUser",
  adminUserSchema,
  "AdminUsers"
);
