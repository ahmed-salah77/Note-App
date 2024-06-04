import { Schema, Types, model } from "mongoose";

const noteSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String },
    color: { type: String },
    userId: { type: Types.ObjectId, ref: "User" },
    isFavoiurite: { type: Boolean },
  },
  { timestamps: true }
);

export const Note = model("Note", noteSchema);
