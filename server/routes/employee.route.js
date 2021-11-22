import express from "express";

import employeeController from "../controllers/employee.controller.js";

const router = express.Router();

router.post("/", employeeController.createEmployee);
router.get("/:id", employeeController.getEmployee);
router.put("/", employeeController.updateEmployee);

export default router;
