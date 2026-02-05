import mongoose from "mongoose";

const AddBusinessSchema = new mongoose.Schema(
  {
    ownerName: String,
    businessName: String,
    address: String,
    pincode: String,
    city: String,
    state: String,
    whatsapp: String,

    instagram: String,
    instagramLink: String,
    twitter: String,
    twitterLink: String,
    facebook: String,
    facebookLink: String,
    website: String,
    websiteLink: String,

    media: {
      banner: Object,
      logo: Object,
      images: [Object],
      gst: Object,
      document: Object,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
    collection: "add-business", // 🔥 keep same collection
  }
);

export default mongoose.model("AddBusiness", AddBusinessSchema);
