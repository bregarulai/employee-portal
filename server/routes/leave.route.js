import express from "express";

import leaveController from "../controllers/leave.controller.js";

const router = express.Router();

router.post("/", leaveController.createLeave);
router.get("/all/:employeeId", leaveController.getAllLeaves);

export default router;
