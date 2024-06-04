import Joi from "joi";

export interface Note {
  _id: string;
  title: string;
  content: string;
  userId: string;
  // createdTime: string;
  color: string;
  createdAt: Date;
}
export const noteSchema = Joi.object({
  title: Joi.string().min(2).max(20).required().trim().messages({
    "string.empty": "Note title can't be empty",
    "string.min": "Title length must be at least 2",
    "string.max": "Title length must be less than 20",
  }),
  content: Joi.string().max(500).required().trim().messages({
    "string.empty": "Note content can't be empty",
    "string.max": "Content length must be at most 500 characters",
  }),
  color: Joi.string().trim().required(),
}).required();


export const colors = ["#FFE666", "#F5C27D", "#F6CEBF", "#E3B7D2", "#BFE7F6"];
