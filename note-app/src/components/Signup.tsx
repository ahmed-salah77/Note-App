import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import useSignup, { SignupData } from "../hooks/useSignup";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignupData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: null,
  });
  const [errors, setErrors] = useState<Map<string, string>>(
    new Map<string, string>()
  );
  const handleSignup = (e: FormEvent) => {
    e.preventDefault();
    const { error, signup } = useSignup(formData);
    const newErrors = new Map<string, string>();
    if (error) {
      error.details.forEach((err) => {
        const name = err.context?.key;
        console.log(name);
        if (name) newErrors.set(name, err.message);
      });
      setErrors(newErrors);
      return;
    }
    signup().then(() => {
      navigate("/login");
    });
  };
  return (
    <Box w={"100%"} display={"flex"} justifyContent="center" paddingTop="10vh">
      <Box w={"900px"} transform={"scale:0.5"}>
        <FormControl className="form__contact">
          <div className="fieldset">
            <Text textAlign={"center"}>Create an account</Text>
            <HStack mt={"40px"}>
              <Text>{`Name: `}</Text>
              <input
                id="name"
                type="string"
                value={formData?.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="form__field field--email"
                placeholder="Your Name"
              ></input>
            </HStack>
            <Text color="red" fontSize={"1rem"} minH={"40px"}>
              {errors.get("name")}
            </Text>
            <HStack>
              <Text>{`Email: `}</Text>
              <input
                id="email"
                type="email"
                value={formData?.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="form__field field--name"
                placeholder="Your Email"
              ></input>
            </HStack>
            <Text color="red" fontSize={"1rem"} minH={"40px"}>
              {errors.get("email")}
            </Text>
            <HStack>
              <Text>{`Password: `}</Text>
              <input
                id="password"
                type="password"
                value={formData?.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
                className="form__field field--email"
                placeholder="Your Password"
              ></input>
            </HStack>
            <Text color="red" fontSize={"1rem"} minH={"40px"}>
              {errors.get("password")}
            </Text>
            <HStack>
              <Text>{"Confirm Password: "}</Text>
              <input
                id="confirm_password"
                type="password"
                value={formData?.confirmPassword}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    confirmPassword: e.target.value,
                  })
                }
                className="form__field field--email"
                placeholder="Your Password Confirmation"
              ></input>
            </HStack>
            <Text color="red" fontSize={"1rem"} minH={"40px"}>
              {errors.get("confirmPassword")}
            </Text>
            <HStack>
              <Text>{`Age: `}</Text>
              <input
                id="age"
                type="number"
                value={formData?.age?.toString()}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    age: +e.target.value,
                  })
                }
                className="form__field field--age"
                placeholder="Your Age"
              ></input>
            </HStack>
            <Text color="red" fontSize={"1rem"} minH={"40px"}>
              {errors.get("age")}
            </Text>

            <button type="submit" onClick={handleSignup}>
              Sign up &#187;
            </button>
            <Text fontSize={"1.3rem"} mt={"40px"} textAlign={"center"}>
              Already have an account ?
              <Link href="/login" color={"#e08183"}>
                Login
              </Link>
            </Text>
          </div>
        </FormControl>
      </Box>
    </Box>
  );
};
export default Signup;
