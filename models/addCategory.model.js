import mongoose from "mongoose";

const addCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("AddCategory", addCategorySchema, "add-category");
