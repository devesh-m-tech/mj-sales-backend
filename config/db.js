import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // 🔐 Safety check
    if (!process.env.MONGO_URI) {
      console.error("❌ MongoDB connection failed");
      console.error("❌ MONGO_URI is missing in .env file");
      process.exit(1);
    }

    // 🔧 Optional: mongoose global settings (safe)
    mongoose.set("strictQuery", true);

    // 🔗 Connect MongoDB
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB error:", err.message);
    process.exit(1);
  }
};

export default connectDB;
