import mongoose from "mongoose";

const LeaveStatusSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      max: 100,
    },
  },
  { timestamps: true }
);

export default mongoose.model("LeaveStatus", LeaveStatusSchema);
