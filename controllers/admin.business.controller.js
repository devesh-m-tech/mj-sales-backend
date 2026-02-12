import mongoose from "mongoose";
import AddBusiness from "../models/AddBusiness.js";
import FeaturedAdvertisement from "../models/FeaturedAdvertisement.js";

/**
 * GET all businesses (ADMIN)
 * OPTIONAL: ?status=pending | approved | rejected
 */
export const getAllBusinesses = async (req, res) => {
  try {
    const { status } = req.query;

    const filter = {};
    if (status) {
      filter.status = status;
    }

    const sortOption =
      status === "approved" ? { updatedAt: -1 } : { createdAt: -1 };

    const businesses = await AddBusiness.find(filter).sort(sortOption);

    res.json({
      success: true,
      count: businesses.length,
      data: businesses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * ADD business (USER SIDE)
 * ✅ FIXED: SAVES IN EXACT OLD STRUCTURE (PENDING)
 */
export const addBusiness = async (req, res) => {
  try {
    const body = req.body;
    const { businessName, ownerName, whatsapp } = body;

    if (!businessName || !ownerName || !whatsapp) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    // Check duplicate by whatsapp (inside selectedApprovedBusiness)
    const existing = await AddBusiness.findOne({
      "selectedApprovedBusiness.contactNumber": String(whatsapp).trim(),
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Business with this WhatsApp already exists",
      });
    }

    // 🔥 Generate simple id like old structure (string)
    const generatedId = Date.now().toString();

    // 🔥 Build EXACT OLD STRUCTURE
    const doc = {
      _id: generatedId, // keep string id like old sample (optional, remove if Mongo ObjectId needed)
      fileUrls: (body.media?.images || []).map((i) => i.uri),
      status: "pending", // TOP LEVEL STATUS = pending
      allowPayment: true,
      createdAt: new Date(),

      selectedApprovedBusiness: {
        // ===== SAME KEYS AS OLD STRUCTURE =====
        noOfEmployee: body.noOfEmployee || "",
        businessImages: (body.media?.images || []).map((i) => i.uri),
        twitterLink: body.twitterLink || "",
        businessLocation: body.address || "",
        generatedid: generatedId,
        businessDocument: body.businessDoc === "YES",
        businessLogo: body.media?.logo?.uri || "",
        websiteLink: body.websiteLink ? [body.websiteLink] : [],
        streetAddresses: body.streetAddresses?.length
          ? body.streetAddresses
          : [body.address || ""],
        businessBanner: body.media?.banner?.uri || "",
        ownerName: body.ownerName || "",
        state: body.state || "",
        businessDescription: body.description || "",
        city: body.city || "",
        uid: "", // keep empty if not available
        pinCode: body.pincode || "",
        establishedIn: body.establishedIn || "",
        payment: false,
        paymentId: "",
        status: "pending", // INSIDE STATUS = pending
        productsOffered: body.products || "",
        amountPaid: 0,
        twitterAccount: body.twitter === "YES",
        subscription: [],
        instagramProfileLink: body.instagramLink || "",
        startDate: "",
        selfieImage: body.media?.selfie?.uri || "",
        instagramLink: body.instagramLink || "",
        userId: body.whatsapp || "",
        id: "",
        timestamp: {
          _seconds: Math.floor(Date.now() / 1000),
          _nanoseconds: 0,
        },
        contactNumber: body.whatsapp || "",
        instagramProfile: body.instagram === "YES",
        location: {
          latitude: 0,
          longitude: 0,
        },
        facebookProfile: body.facebook === "YES",
        businessCategory: body.businessCategory || "",
        website: body.website === "YES",
        gstCertificate: body.gstDoc === "YES",
        expiryDate: "",
        facebookLink: body.facebookLink || "",
        businessName: body.businessName || "",
      },
    };

    const business = new AddBusiness(doc);
    await business.save();

    res.status(201).json({
      success: true,
      message: "Business added successfully (Pending approval)",
      data: business,
    });
  } catch (error) {
    console.error("❌ Add business error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * APPROVE business (ADMIN)
 */
export const approveBusiness = async (req, res) => {
  try {
    const { businessId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(businessId) && !businessId) {
      return res.status(400).json({
        success: false,
        message: "Invalid business ID",
      });
    }

    const updatedBusiness = await AddBusiness.findByIdAndUpdate(
      businessId,
      {
        status: "approved", // top-level
        "selectedApprovedBusiness.status": "approved", // inside
      },
      { new: true }
    );

    if (!updatedBusiness) {
      return res.status(404).json({
        success: false,
        message: "Business not found",
      });
    }

    // Insert into FeaturedAdvertisements (if not exists)
    const alreadyFeatured = await FeaturedAdvertisement.findOne({
      businessId: updatedBusiness._id,
    });

    if (!alreadyFeatured) {
      await FeaturedAdvertisement.create({
        businessId: updatedBusiness._id,
        selectedApprovedBusiness: updatedBusiness.toObject(),
        status: "approved",
        fileUrls: updatedBusiness.fileUrls || [],
      });
    }

    res.json({
      success: true,
      message: "Business approved successfully",
      data: updatedBusiness,
    });
  } catch (error) {
    console.error("❌ Approve error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * REJECT business (ADMIN)
 */
export const rejectBusiness = async (req, res) => {
  try {
    const { businessId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(businessId) && !businessId) {
      return res.status(400).json({
        success: false,
        message: "Invalid business ID",
      });
    }

    const updatedBusiness = await AddBusiness.findByIdAndUpdate(
      businessId,
      {
        status: "rejected", // top-level
        "selectedApprovedBusiness.status": "rejected", // inside
      },
      { new: true }
    );

    if (!updatedBusiness) {
      return res.status(404).json({
        success: false,
        message: "Business not found",
      });
    }

    res.json({
      success: true,
      message: "Business rejected successfully",
      data: updatedBusiness,
    });
  } catch (error) {
    console.error("❌ Reject error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * 🆕 ASSIGN BUSINESS TO SALES PERSON (ADMIN)
 */
export const assignBusinessToSalesPerson = async (req, res) => {
  try {
    const { businessId } = req.params;
    const { salesPersonId, salesPersonUserId } = req.body;

    if (!businessId) {
      return res.status(400).json({
        success: false,
        message: "Invalid business ID",
      });
    }

    if (!salesPersonId || !salesPersonUserId) {
      return res.status(400).json({
        success: false,
        message: "salesPersonId and salesPersonUserId are required",
      });
    }

    const business = await AddBusiness.findById(businessId);

    if (!business) {
      return res.status(404).json({
        success: false,
        message: "Business not found",
      });
    }

    business.selectedApprovedBusiness.assignedSalesPersonId = salesPersonId;
    business.selectedApprovedBusiness.assignedSalesPersonUserId =
      salesPersonUserId;

    await business.save();

    return res.status(200).json({
      success: true,
      message: "Business assigned to sales person successfully",
      data: business,
    });
  } catch (error) {
    console.error("❌ Assign business error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to assign business",
    });
  }
};

/**
 * 🆕 GET BUSINESSES FOR A SALES PERSON (MOBILE APP)
 */
export const getBusinessesForSalesPerson = async (req, res) => {
  try {
    const { salesPersonId } = req.params;

    if (!salesPersonId) {
      return res.status(400).json({
        success: false,
        message: "salesPersonId is required",
      });
    }

    const businesses = await AddBusiness.find({
      "selectedApprovedBusiness.assignedSalesPersonUserId": salesPersonId,
      status: "approved",
    }).sort({ updatedAt: -1 });

    return res.status(200).json({
      success: true,
      count: businesses.length,
      data: businesses,
    });
  } catch (error) {
    console.error("❌ Get businesses for sales person error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch businesses",
    });
  }
};
