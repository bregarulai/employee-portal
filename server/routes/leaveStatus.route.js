import express from "express";
import leaveStatusController from "../controllers/leaveStatus.controller.js";
const router = express.Router();

router.get("/", leaveStatusController.getAllLeaveStatuses);
router.post("/", leaveStatusController.createLeaveStatus);

export default router;
