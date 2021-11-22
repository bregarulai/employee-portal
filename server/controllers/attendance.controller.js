import Attendance from "../models/Attendance.model.js";
import Employee from "../models/Employee.model.js";
import moment from "moment";

const punchIn = async (req, res, next) => {
  try {
    const currentEmployee = await Employee.findById(req.body.employeeId);
    if (!currentEmployee) {
      res.status(404).json(`Employee ${req.body.employeeId} Not Found!`);
    }
    const newAttendance = Attendance({
      punchInTime: new Date(),
      punchInNote: req.body.note,
      employeeId: currentEmployee._id,
    });
    const punchedIn = await newAttendance.save();
    const { createdAt, updatedAt, ...info } = punchedIn._doc;
    res.status(201).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
};

const punchOut = async (req, res, next) => {
  try {
    const attendance = await Attendance.findByIdAndUpdate(
      req.body._id,
      { $set: req.body },
      { new: true }
    );
    if (!attendance) {
      res.status(404).json(`Employee ${req.body._id} Not Found!`);
    }
    const { createdAt, updatedAt, ...info } = attendance._doc;
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getLatestPunchIn = async (req, res, next) => {
  try {
    const currentEmployee = await Employee.findById(req.params.employeeId);
    if (!currentEmployee) {
      res.status(404).json(`Employee ${req.params.employeeId} Not Found!`);
    }
    const attendances = await Attendance.find({
      employeeId: currentEmployee._id,
      punchOutTime: null,
    });

    const returnAttendances = attendances.map((item) => {
      const { createdAt, updatedAt, ...info } = item._doc;
      return info;
    });

    res.status(200).json(returnAttendances);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllAttendaces = async (req, res, next) => {
  const date = req.query.date;
  try {
    const currentEmployee = await Employee.findById(req.params.employeeId);
    if (!currentEmployee) {
      res.status(404).json(`Employee ${req.params.employeeId} Not Found!`);
    }

    if (date) {
      const attendances = await Attendance.find({
        employeeId: currentEmployee._id,
        punchInTime: {
          $gte: moment(date).startOf("day"),
          $lte: moment(date).endOf("day").toDate(),
        },
      });
      const returnAttendances = attendances.map((item) => {
        const { createdAt, updatedAt, ...info } = item._doc;
        return info;
      });
      res.status(200).json(returnAttendances);
    } else {
      const attendances = await Attendance.find({
        employeeId: currentEmployee._id,
      });
      const returnAttendances = attendances.map((item) => {
        const { createdAt, updatedAt, ...info } = item._doc;
        return info;
      });
      res.status(200).json(returnAttendances);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export default {
  punchIn,
  punchOut,
  getAllAttendaces,
  getLatestPunchIn,
};
