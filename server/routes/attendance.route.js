import express from "express";

import attendanceController from "../controllers/attendance.controller.js";

const router = express.Router();

router.post("/", attendanceController.punchIn);
router.put("/", attendanceController.punchOut);
router.get("/:employeeId", attendanceController.getLatestPunchIn);
router.get("/all/:employeeId", attendanceController.getAllAttendaces);

export default router;
