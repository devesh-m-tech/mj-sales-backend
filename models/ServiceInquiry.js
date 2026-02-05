import mongoose from "mongoose";

const serviceInquirySchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    email: String,
    service: String,
    message: String,
  },
  { timestamps: true }
);

const ServiceInquiry = mongoose.model(
  "ServiceInquiry",
  serviceInquirySchema,
  "service-inquiry" // 🔥 EXACT MongoDB collection name
);

export default ServiceInquiry;
