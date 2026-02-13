import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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

    // 🔐 PASSWORD (HASHED)
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

/* ================= AUTO HASH PASSWORD (SAFE ADD) ================= */
adminUserSchema.pre("save", async function (next) {
  // password change இல்லனா re-hash வேண்டாம்
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

export default mongoose.model(
  "AdminUser",
  adminUserSchema,
  "AdminUsers"
);
