import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    service_name: { type: String, required: true },
    service_ID: { type: String },
    service_icon: { type: String },
  },
  { timestamps: true }
);

// 🔥 IMPORTANT: exact collection name
export const Service = mongoose.model(
  "Service",
  serviceSchema,
  "add-services"
);
