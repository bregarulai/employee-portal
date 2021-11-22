import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      max: 200,
    },
    middleName: {
      type: String,
      max: 200,
    },
    lastName: {
      type: String,
      required: true,
      max: 200,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 200,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    maritalStatusId: {
      type: String,
      required: true,
      max: 100,
    },
    title: {
      type: String,
      max: 200,
    },
    genderId: {
      type: String,
      required: true,
      max: 50,
    },
    hireDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Employee", EmployeeSchema);
