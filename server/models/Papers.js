import mongoose from "mongoose";

const PapersSchema = new mongoose.Schema({
  id: String,
  session: String,
  year: Number,
  link: String,
  difficulty: String,
});

export default mongoose.model("PastPapers", PapersSchema);
