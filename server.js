import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

// ================= DB =================
import connectDB from "./config/db.js";

// ================= ROUTES =================

// AUTH
import authRoutes from "./routes/auth.routes.js";

// ADMIN – BUSINESS
import adminBusinessRoutes from "./routes/admin.business.routes.js";

// ADMIN – SERVICES
import adminServiceRoutes from "./routes/admin.service.routes.js";
import manageServiceRoutes from "./routes/service.routes.js";

// ADMIN – USERS
import adminUserRoutes from "./routes/admin.user.routes.js";

// NORMAL USERS
import userRoutes from "./routes/user.routes.js";
import manageUsersRoutes from "./routes/manageUsers.routes.js";

// FEATURED ADS (Approved Businesses)
import featuredRoutes from "./routes/featured.routes.js";

// ALTER BUSINESS
import alterRoutes from "./routes/alter.routes.js";

// 🆕 ADMIN – SALES PERSONS
import adminSalesRoutes from "./routes/admin.sales.routes.js";

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json({ limit: "10mb" })); // allow large payloads (images/meta)

// ================= DATABASE =================
connectDB();

// ================= ROUTE MOUNTS =================

// AUTH
app.use("/api/auth", authRoutes);

// ADMIN – BUSINESS (🔥 IMPORTANT)
app.use("/api/admin/business", adminBusinessRoutes);
/*
  POST    /api/admin/business/add-business
  GET     /api/admin/business/all
  PUT     /api/admin/business/:businessId/approve
  PUT     /api/admin/business/:businessId/reject
*/

// ADMIN – SERVICES
app.use("/api/admin/service", adminServiceRoutes);
app.use("/api/admin/service", manageServiceRoutes);

// FEATURED ADVERTISEMENTS (Approved only)
app.use("/api/admin/featured", featuredRoutes);
/*
  GET /api/admin/featured/all
*/

// ADMIN – USERS
app.use("/api/admin/users", adminUserRoutes);

// 🆕 ADMIN – SALES PERSONS
app.use("/api/admin/salespersons", adminSalesRoutes);
/*
  GET /api/admin/salespersons/all
  PUT /api/admin/salespersons/:id/approve
  PUT /api/admin/salespersons/:id/reject
*/

// NORMAL USERS
app.use("/api/app-users", userRoutes);     // old users
app.use("/api/users", manageUsersRoutes);  // new usersInfo

// ALTER BUSINESS
app.use("/api/admin/alter", alterRoutes);

// ================= HEALTH CHECK =================
app.get("/", (req, res) => {
  res.send("✅ MJ-SALES Backend Running");
});

// ================= SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
