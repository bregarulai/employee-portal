import LeaveStatus from "../models/LeaveStatus.model.js";

const createLeaveStatus = async (req, res, next) => {
  const newLeaveStatus = LeaveStatus({
    title: req.body.title,
  });
  try {
    const leaveStatus = await newLeaveStatus.save();
    const { createdAt, updatedAt, ...info } = leaveStatus._doc;
    res.status(201).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllLeaveStatuses = async (req, res, next) => {
  try {
    const leaveStatus = await LeaveStatus.find();
    const returnLeaveStatuses = leaveStatus.map((item) => {
      const { createdAt, updatedAt, ...info } = item._doc;
      return info;
    });
    res.status(200).json(returnLeaveStatuses);
  } catch (err) {
    res.status(500).json(err);
  }
};

export default {
  createLeaveStatus,
  getAllLeaveStatuses,
};
