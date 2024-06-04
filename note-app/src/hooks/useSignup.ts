import axios from "axios";
import Joi from "joi";
export interface SignupData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: number | null;
}

export const signUpSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    "string.empty": "Please enter your name",
    "string.min": "Name must be at least 3 characters",
    "string.max": "Name must be less than 20 characters",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .max(256)
    .required()
    .messages({
      "string.empty": "Please enter your email",
      "string.email": "Please enter valid email address",
    }),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$"))
    .max(256)
    .required()
    .messages({
      "string.empty": "Please enter you password",
      "string.pattern.base":
        "Password must be at least 8 characters with at least one lowercase character and uppercase character",
    }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "string.empty": "Please confirm your password",
    "any.only": "Please make sure your passwords match",
  }),
  age: Joi.number().required().min(15).max(80).messages({
    "number.base": "Please enter your age",
    "number.min": "Your age must be greater than 15 years",
    "number.max": "Your age must be less than 80 years",
  }),
});

const useSignup = (userData: SignupData) => {
  const { error } = signUpSchema.validate(userData, { abortEarly: false });
  const signup = () =>
    axios.post("http://localhost:3000/user/signup/", userData);
  return { error, signup };
};
export default useSignup;
