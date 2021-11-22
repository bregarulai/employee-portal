import mongoose from "mongoose";

const LeaveTypeSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    max: 100,
  },
});

export default mongoose.model("LeaveType", LeaveTypeSchema);
