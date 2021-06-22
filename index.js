const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

// connect to db
mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("connected to db")
);

// import routes
const testRoutes = require("./routes/test");
const authRoutes = require("./routes/employee/auth");
const dashboardRoutes = require("./routes/employee/dashboard");
const feedbackRoutes = require("./routes/employee/feedback");
const reimbursementRoutes = require("./routes/employee/reimbursement");
const advanceRoutes = require("./routes/employee/advance");
const ifscRoutes = require("./routes/employee/ifsc");
const kycRoutes = require("./routes/employee/KYC");
const leaveRoutes = require("./routes/employee/leave");
const punchRoutes = require("./routes/employee/Punch");
const breakRoutes = require("./routes/employee/Break");

// machine routes
const logRoutes = require("./routes/machine/log");


// asset routes
const assetRoutes = require("./routes/asset/asset");

// admin routes
const adminAuthRoutes = require("./routes/admin/auth-admin");
const adminDashboardRoutes = require("./routes/admin/admin-dashboard");
const companyLogoRoutes = require("./routes/admin/companyLogo");
const adminImagesRoutes = require("./routes/admin/adminImagesRoute");

// JWT verify Token
const verifyToken = require("./routes/validate-token");

// middlewares
// app.use(express.json()); // for body parser
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// CORS enabled
app.use(cors());

// route middlewares for employee
app.use("/test", testRoutes);

app.use("/api/v1/emp", authRoutes);
app.use("/api/v1/employee", verifyToken, dashboardRoutes);
app.use("/api/v1/employee/feedback", verifyToken, feedbackRoutes);
app.use("/api/v1/employee/reimbursement", verifyToken, reimbursementRoutes);
app.use("/api/v1/employee/advance", verifyToken, advanceRoutes);
app.use("/api/v1/employee/ifsc", verifyToken, ifscRoutes);
app.use("/api/v1/employee/KYC", verifyToken, kycRoutes);
app.use("/api/v1/employee/leave", verifyToken, leaveRoutes);
app.use("/api/v1/employee/punch", verifyToken, punchRoutes);
app.use("/api/v1/employee/break", verifyToken, breakRoutes);

// machine routes
app.use("/api/v1/machine/logSheet", verifyToken, logRoutes);

// asses routes
app.use("/api/v1/asset", verifyToken, assetRoutes);

// route middlewares for admin
app.use("/api/v1/admin", adminAuthRoutes);
app.use("/images", adminImagesRoutes);
app.use("/api/v1/admin/dashboard", verifyToken, adminDashboardRoutes);
app.use("/api/v1/admin/CompanyLogo", verifyToken, companyLogoRoutes);

app.listen(3000, () => console.log("server is running..."));
