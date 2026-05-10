import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  papers: Number,
  creditHours: Number,
});

export default mongoose.model("Course", CourseSchema);
