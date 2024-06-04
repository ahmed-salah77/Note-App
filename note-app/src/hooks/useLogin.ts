import axios from "axios";
import { FieldValues } from "react-hook-form";
import Joi from "joi";

export interface LoginData {
  email: string;
  password: string;
}
const LoginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label("email")
    .messages({
      "string.empty": "Please enter your email",
      "string.email": "Please enter valid email address",
    }),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$"))
    .required()
    .label("password")
    .messages({
      "string.empty": "Please enter you password",
      "string.pattern.base":
        "Password must be at least 8 characters with at least one lowercase character and uppercase character",
    }),
}).options({
  presence: "required",
});

const useLogin = (loginData: LoginData) => {
  const { error } = LoginSchema.validate(loginData, { abortEarly: false });
  const login = () =>
    axios.post("http://localhost:3000/user/signin/", loginData);
  return { error, login };
};
export default useLogin;
