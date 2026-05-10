import mongoose from "mongoose";

const TeacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  Designation: { type: String, required: true },
  department: String,
  email: String,
  photo: String,
  phdSupervisor: Boolean,
  rating: Number,
});

export default mongoose.model("Teachers", TeacherSchema);
