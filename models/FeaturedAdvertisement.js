import mongoose from "mongoose";

const FeaturedAdvertisementSchema = new mongoose.Schema(
  {
    // 🔥 ADD THIS (needed for approve → featured insert)
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AddBusiness",
      required: true,
      unique: true, // same business duplicate featured aagama
    },

    // ✅ OLD FIELD – UNCHANGED
    fileUrls: {
      type: [String],
      default: [],
    },

    // 🔧 FIX: lowercase status (backend consistency)
    status: {
      type: String,
      enum: ["approved", "pending", "rejected"],
      default: "approved",
    },

    // ✅ OLD FIELD – UNCHANGED
    selectedApprovedBusiness: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,

    // 🔥 MUST MATCH EXISTING COLLECTION
    collection: "Featured-Advertisements",
  }
);

export default mongoose.model(
  "FeaturedAdvertisement",
  FeaturedAdvertisementSchema
);
