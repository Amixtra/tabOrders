import mongoose from "mongoose";

const StaffSchema = new mongoose.Schema(
  {
    staffId: { type: Number, required: true, unique: true },
    userID: { type: String, required: true },
    categoryId: { type: Number, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    middleName: { type: String },
    suffix: { type: String },
    homeAddress: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    pinCode: { type: String, required: true },
  },
  { timestamps: true }
);

const Staff = mongoose.model("Staff", StaffSchema);

export default Staff;
