import mongoose from "mongoose";
import dotenv from "dotenv";
import AdminUser from "./models/AdminUser.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const run = async () => {
  // old admin delete (optional but clean)
  await AdminUser.deleteMany({ email: "madjock@gmail.com" });

  const admin = new AdminUser({
    name: "Admin",
    email: "madjock@gmail.com",
    password: "madjock123",  // 👈 plain text, schema auto-hash pannum
    approved: true,
    mobile: "9999999999",
  });

  await admin.save(); // 🔐 password auto-hash here (pre-save hook)

  console.log("✅ Admin created with hashed password");
  process.exit();
};

run();
