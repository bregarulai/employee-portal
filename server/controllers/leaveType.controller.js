import LeaveType from "../models/LeaveType.model.js";

const getAllLeaveTypes = async (req, res, next) => {
  try {
    const leaveTypes = await LeaveType.find();
    res.status(200).json(leaveTypes);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createLeaveType = async (req, res, next) => {
  const newLeaveType = new LeaveType({
    title: req.body.title,
  });
  try {
    const leaveType = await newLeaveType.save();
    res.status(201).json(leaveType);
  } catch (err) {
    res.status(500).json(err);
  }
};

export default {
  getAllLeaveTypes,
  createLeaveType,
};
