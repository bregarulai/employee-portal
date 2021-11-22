import mongoose from "mongoose";

const LeaveSchema = mongoose.Schema(
  {
    leaveTypeId: {
      type: String,
      required: true,
      max: 100,
    },
    employeeId: {
      type: String,
      required: true,
      max: 100,
    },
    leaveStatusId: {
      type: String,
      required: true,
      max: 100,
      default: "61952db1704dba5de4178258",
    },
    fromDate: {
      type: Date,
      required: true,
    },
    toDate: {
      type: Date,
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Leave", LeaveSchema);
