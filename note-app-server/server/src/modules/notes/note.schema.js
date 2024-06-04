import Joi from "joi";
import { objectIdValidation } from "../../middleware/val.middleware.js";
import { Types } from "mongoose";

export const addNoteSchema = Joi.object({
  title: Joi.string().min(2).max(20).required().trim(),
  content: Joi.string().max(500).required().trim(),
  color: Joi.string().trim().required(),
}).required();

export const updateNoteSchema = Joi.object({
  title: Joi.string().min(2).max(20).trim(),
  content: Joi.string().max(500).trim(),
  color: Joi.string().trim(),
  id: Joi.custom(objectIdValidation).required(),
}).required();

export const deleteNoteSchema = Joi.object({
  id: Joi.custom(objectIdValidation).required(),
}).required();
