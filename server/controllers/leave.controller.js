import Employee from "../models/Employee.model.js";
import Leave from "../models/Leave.model.js";
import LeaveStatus from "../models/LeaveStatus.model.js";
import LeaveType from "../models/LeaveType.model.js";

const createLeave = async (req, res, next) => {
  const newLeave = Leave({
    employeeId: req.body.employeeId,
    leaveTypeId: req.body.leaveTypeId,
    fromDate: req.body.fromDate,
    toDate: req.body.toDate,
    comment: req.body.comment,
  });
  try {
    const leave = await newLeave.save();
    const { createdAt, updatedAt, ...info } = leave._doc;
    res.status(201).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllLeaves = async (req, res, next) => {
  try {
    const currentEmployee = await Employee.findById(req.params.employeeId);
    const leaves = await Leave.find({ employeeId: currentEmployee._id });
    const returnLeaves = await Promise.all(
      leaves.map(async (item) => {
        const type = await LeaveType.findById(item.leaveTypeId);
        const status = await LeaveStatus.findById(item.leaveStatusId);
        const { leaveTypeId, leaveStatusId, createdAt, updatedAt, ...info } =
          item._doc;
        return {
          ...info,
          type: type.title,
          status: status.title,
          name: `${currentEmployee.firstName} ${currentEmployee.lastName}`,
        };
      })
    );

    res.status(200).json(returnLeaves);
  } catch (err) {
    console.log("LEAVES ERR: ", err);
    res.status(500).json(err);
  }
};

export default {
  createLeave,
  getAllLeaves,
};
