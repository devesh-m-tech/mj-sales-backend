import mongoose from "mongoose";

const AddBusinessSchema = new mongoose.Schema(
  {
    ownerName: {
      type: String,
      required: true,
      trim: true,
    },

    businessName: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      default: "",
    },

    pincode: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      default: "",
    },

    state: {
      type: String,
      default: "",
    },

    whatsapp: {
      type: String,
      default: "",
    },

    // Social
    instagram: {
      type: String,
      default: "",
    },
    instagramLink: {
      type: String,
      default: "",
    },

    twitter: {
      type: String,
      default: "",
    },
    twitterLink: {
      type: String,
      default: "",
    },

    facebook: {
      type: String,
      default: "",
    },
    facebookLink: {
      type: String,
      default: "",
    },

    website: {
      type: String,
      default: "",
    },
    websiteLink: {
      type: String,
      default: "",
    },

    // From UI
    products: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    gstDoc: {
      type: String,
      enum: ["YES", "NO"],
      default: "NO",
    },

    businessDoc: {
      type: String,
      enum: ["YES", "NO"],
      default: "NO",
    },

    media: {
      banner: { type: Object, default: null },
      logo: { type: Object, default: null },
      images: { type: [Object], default: [] },
      gst: { type: Object, default: null },
      document: { type: Object, default: null },
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    // ASSIGNED SALES PERSON
    assignedSalesPersonId: {
      type: String, // e.g. SP001
      default: null,
      index: true,
    },

    assignedSalesPersonUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
    collection: "add-business",
  }
);

export default mongoose.model("AddBusiness", AddBusinessSchema);
