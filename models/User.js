import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      unique: true,
      required: true,
    },

    name: {
      type: String,
      trim: true,
      default: "",
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },

    // 🔹 ROLE: user | admin | sales
    role: {
      type: String,
      enum: ["user", "admin", "sales"],
      default: "user",
    },

    // 🔹 APPROVAL STATUS (for sales persons)
    approved: {
      type: Boolean,
      default: false, // new sales person = pending
    },
  },
  { timestamps: true }
);

// ✅ DEFAULT EXPORT (NO CHANGE)
export default mongoose.model("User", userSchema);
