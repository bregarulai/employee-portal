import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import employeeRoutes from "./routes/employee.route.js";
import leaveTypeRoutes from "./routes/leaveType.route.js";
import leaveRoutes from "./routes/leave.route.js";
import leaveStatusRoutes from "./routes/leaveStatus.route.js";
import attendanceRoutes from "./routes/attendance.route.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGOOSE_URL, () => {
  console.log("Connected to MongoDB...");
});

// MIDDLEWARE
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/employee", employeeRoutes);
app.use("/api/leavetype", leaveTypeRoutes);
app.use("/api/leave", leaveRoutes);
app.use("/api/leavestatus", leaveStatusRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/auth", authRoutes);

app.listen(8801, () => {
  console.log("Server is running");
});
