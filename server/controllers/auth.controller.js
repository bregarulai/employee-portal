import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import Credentials from "../models/Credentials.model.js";
import Employee from "../models/Employee.model.js";

const register = async (req, res, next) => {
  try {
    const currentEmployee = await Employee.findOne({ email: req.body.email });
    if (!currentEmployee) {
      res.status(404).json(`Employee ${req.body.email} Not Found!`);
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const newCredentials = Credentials({
      employeeId: currentEmployee._id,
      password: hashedPassword,
    });
    const createdCredentials = await newCredentials.save();
    const { createdAt, updatedAt, password, ...info } = createdCredentials._doc;
    const token = jwt.sign(
      { lastname: currentEmployee.lastName, id: info.employeeId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "24h" }
    );
    res.status(201).json({ info, token });
  } catch (err) {
    res.status(500).json(err);
  }
};

const login = async (req, res, next) => {
  try {
    const currentEmployee = await Employee.findOne({ email: req.body.email });
    if (!currentEmployee) {
      res.status(404).json(`Employe ${req.body.email} Not Found!`);
    }
    const currentCredentials = await Credentials.findOne({
      employeeId: currentEmployee._id,
    });
    if (!currentCredentials) {
      res.status(404).json(`Credentials ${currentEmployee._id} Not Found`);
    }
    const isCorrectPassword = await bcrypt.compare(
      req.body.password,
      currentCredentials.password
    );
    if (!isCorrectPassword) {
      res.status(403).json(`Invalid Credentials`);
    }

    const token = await jwt.sign(
      { lastname: currentEmployee.lastName, id: currentCredentials.employeeId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "24h" }
    );
    const { createdAt, updatedAt, ...info } = currentEmployee._doc;
    res.status(200).json({ info, token });
  } catch (err) {
    res.status(500).json(err);
  }
};

const check = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedData = await jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );
    const info = {
      lastname: decodedData.lastname,
      _id: decodedData.id,
    };
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
};

export default {
  register,
  login,
  check,
};
