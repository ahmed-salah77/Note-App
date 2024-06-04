import { LoginData } from "./useLogin";

const useLoginValidator = ({ email, password }: LoginData) => {
  const emailValidator = (): string => {
    if (!email) {
      return "Please enter your email address";
    }
    console.log(email);
    if (email.length < 4) return "Email must be four or more characters";
    if (!new RegExp(/\S+@\S+\.\S+/).test(email)) {
      return "Incorrect email format";
    }
    return "";
  };

  const passwordValidator = (): string => {
    const re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
    if (!password) {
      return "Please enter your password";
    } else if (password.length < 8 || re.test(password) == false) {
      return "Password must contain at least 8 characters with one uppercase character one lowercase character";
    }
    return "";
  };
  return { email: emailValidator(), password: passwordValidator() };
};

export default useLoginValidator;
