import mongoose from "mongoose";

const ifscSchema = new mongoose.Schema({
  BANK: String,
  IFSC: String,
  BRANCH: String,
  ADDRESS: String,
  STATE: String,
  "STD CODE": String,
  PHONE: String,
  CITIES: [String],
}, { collection: "bankdata" }); // <-- correct collection name

export default mongoose.model("Ifsc", ifscSchema);
