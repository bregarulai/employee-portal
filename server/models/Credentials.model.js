import mongoose from "mongoose";

const CredentialsSchema = mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Credentials", CredentialsSchema);
