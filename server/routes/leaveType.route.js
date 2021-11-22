import express from "express";

import leaveTypeController from "../controllers/leaveType.controller.js";

const router = express.Router();

router.post("/", leaveTypeController.createLeaveType);
router.get("/", leaveTypeController.getAllLeaveTypes);

export default router;
