import ColorModeSwitch from "./ColorModeSwitch";
import { HStack, Image, Link, Button, Text, border } from "@chakra-ui/react";
import logo from "../assets/logo.png";
import buttonBorder from "../assets/buttonBorder.png";
import { CgNotes } from "react-icons/cg";
import { PiUserRectangleFill } from "react-icons/pi";

import { IoLogOut } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
const Navbar = () => {
  const navigate = useNavigate();
  const client = useQueryClient();
  const handleLogout = () => {
    localStorage.setItem("jwt-token", "");
    client.setQueryData(["user-notes"], []);
    navigate("/login");
  };
  return (
    <HStack justifyContent={"space-between"} paddingX={3} paddingTop={"40px"}>
      <HStack>
        <CgNotes size={40} />
        <Text fontSize={"max(1.5rem,min(3rem,4vw))"} lineHeight={"40px"}>
          Note App
        </Text>
      </HStack>
      <HStack gap={5}>
        {localStorage.getItem("jwt-token") == "" && (
          <>
            <Link
              href="/login"
              className="button-border"
              w="100px"
              textAlign={"center"}
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="button-border"
              w="100px"
              textAlign={"center"}
            >
              sign Up
            </Link>
          </>
        )}
        {localStorage.getItem("jwt-token") != "" && (
          <>
            <HStack>
              <PiUserRectangleFill size={40} />
              <Text fontSize={"1.3rem"}>{localStorage.getItem("name")}</Text>
            </HStack>
            <Link onClick={handleLogout} className="button-border">
              <HStack>
                <Text>Log out </Text>
                <IoLogOut />
              </HStack>
            </Link>
          </>
        )}
      </HStack>
    </HStack>
  );
};

export default Navbar;
