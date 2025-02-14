import mongoose from "mongoose";

const toggleSchema = new mongoose.Schema({
    companyID: { type: String, required: true, unique: true },
    isToggleOrderOn: { type: Boolean, default: true },
    isToggleLockOn:  { type: Boolean, default: true },
    isToggleMuteOn:  { type: Boolean, default: true },
    isToggleCounterOn:  { type: Boolean, default: true },
});

export default mongoose.model("Toogles", toggleSchema);