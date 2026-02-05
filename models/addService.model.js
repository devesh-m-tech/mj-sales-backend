import mongoose from "mongoose";

const addServiceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("AddService", addServiceSchema, "add-service");
