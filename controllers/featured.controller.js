import FeaturedAd from "../models/FeaturedAdvertisement.js";

export const getFeaturedAds = async (req, res) => {
  try {
    const ads = await FeaturedAd.find({ status: "Approved" })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: ads.length,
      data: ads,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
