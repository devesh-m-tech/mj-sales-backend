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

    // 🆕 ASSIGNED SALES PERSON
    assignedSalesPersonId: {
      type: String, // we will store salesPersonId like: MJ2026001
      default: null,
      index: true,
    },

    // 🆕 OPTIONAL: store user _id also (future use)
    assignedSalesPersonUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
    collection: "add-business", // 🔥 keep same collection
  }
);

export default mongoose.model("AddBusiness", AddBusinessSchema);
