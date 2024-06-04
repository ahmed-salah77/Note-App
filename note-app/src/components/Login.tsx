import { Box, Link, Text, HStack, FormControl } from "@chakra-ui/react";
import { FormEvent, useContext, useState } from "react";
import useLogin, { LoginData } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import AlertContext from "../contexts/alertContext";

const Login = () => {
  const navigate = useNavigate();
  const { setAlert } = useContext(AlertContext);
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Map<string, string>>();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, email: e.target.value });
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, password: e.target.value });
  };
  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    const { error, login } = useLogin(formData);
    const newErrors = new Map<string, string>();
    if (error) {
      error.details.forEach((err) => {
        const name = err.context?.key;
        if (name) newErrors.set(name, err.message);
      });
      setErrors(newErrors);
      return;
    }
    login()
      .then((response) => {
        setErrors(new Map<string, string>());
        localStorage.setItem("jwt-token", "7enk4__" + response.data.token);
        localStorage.setItem("name", response.data.username);
        navigate("/");
      })
      .catch((error) => {
        if (error.response.status == 401)
          setErrors(
            new Map<string, string>([
              ["password", "Incorrect email or password"],
            ])
          );
      });
    
  };
  return (
    <Box w={"100%"} display={"flex"} justifyContent="center" paddingTop="10vh">
      <Box maxW={"100%"}>
        <FormControl className="form__contact">
          <Box className="fieldset">
            <Text color="fg.muted" fontSize={"1rem"}>
              Don't have an account?{" "}
              <Link
                href="/signup"
                color={"darkcyan"}
                textDecoration={"underline"}
              >
                Sign up
              </Link>
            </Text>
            <HStack mt={"40px"}>
              <Text>{`Email: `}</Text>
              <input
                id="email"
                type="email"
                value={formData?.email}
                onChange={handleEmailChange}
                className="form__field field--name"
                placeholder="Your Email"
              ></input>
            </HStack>
            <Text color="red" fontSize={"1rem"} minH={"40px"}>
              {errors?.get("email")}
            </Text>
            <HStack>
              <Text>{`Password: `}</Text>
              <input
                id="password"
                type="password"
                value={formData?.password}
                onChange={handlePasswordChange}
                className="form__field field--name"
                placeholder="Your Password"
              ></input>
            </HStack>
            <Text color="red" fontSize={"1rem"} minH={"40px"}>
              {errors?.get("password")}
            </Text>
            <button type="submit" onClick={handleLogin}>
              Login &#187;
            </button>
          </Box>
        </FormControl>
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="blur0">
              <feGaussianBlur in="SourceGraphic" stdDeviation="0 0" />
            </filter>
            <filter id="blur1">
              <feGaussianBlur in="SourceGraphic" stdDeviation="0 5" />
            </filter>
            <filter id="blur2">
              <feGaussianBlur in="SourceGraphic" stdDeviation="0 10" />
            </filter>
            <filter id="blur3">
              <feGaussianBlur in="SourceGraphic" stdDeviation="0 15" />
            </filter>
            <filter id="blur4">
              <feGaussianBlur in="SourceGraphic" stdDeviation="0 20" />
            </filter>
          </defs>
        </svg>
      </Box>
    </Box>
  );
};
export default Login;
