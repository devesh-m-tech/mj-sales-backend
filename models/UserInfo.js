import mongoose from "mongoose";

const userInfoSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phoneNumber: String,
    blocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("UserInfo", userInfoSchema, "usersInfo");
