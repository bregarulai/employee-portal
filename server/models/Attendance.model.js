import mongoose from "mongoose";

const AttendanceSchema = mongoose.Schema(
  {
    punchInTime: {
      type: Date,
      required: true,
    },
    employeeId: {
      type: String,
      required: true,
    },
    punchInNote: {
      type: String,
    },
    punchOutTime: {
      type: Date,
    },
    punchOutNote: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Attendance", AttendanceSchema);
