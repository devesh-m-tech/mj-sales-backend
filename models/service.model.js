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
const Service = mongoose.model(
  "Service",
  serviceSchema,
  "add-services"
);

// ✅ Default export (so `import Service from ...` works)
export default Service;
