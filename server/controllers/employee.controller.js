import Employee from "../models/Employee.model.js";

const createEmployee = async (req, res, next) => {
  const newEmployee = Employee({
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    dateOfBirth: req.body.dateOfBirth,
    maritalStatus: req.body.maritalStatus,
    gender: req.body.gender,
    hireDate: req.body.hireDate,
  });
  try {
    const employee = await newEmployee.save();
    const { updatedAt, createdAt, ...info } = employee._doc;
    res.status(201).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);
    const { updatedAt, createdAt, ...info } = employee._doc;
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.body._id,
      {
        $set: req.body,
      },
      { new: true }
    );
    const { updatedAt, createdAt, ...info } = employee._doc;
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
};

export default {
  createEmployee,
  getEmployee,
  updateEmployee,
};
