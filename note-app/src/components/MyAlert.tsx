import { ReactNode, useContext, useEffect, useState } from "react";
import { Alert as Alrt, AlertIcon } from "@chakra-ui/react";
import AlertContext from "../contexts/alertContext";
interface Props {
  children: ReactNode;
  type: "error" | "success";
}
const MyAlert = () => {
  const { alert, setAlert } = useContext(AlertContext);
  useEffect(() => {
    // Hide the alert after 3 seconds
    setTimeout(() => {
      setAlert({ type: null });
    }, 3000);
  }, [alert]);
  console.log(alert);
  if (alert == null) return null;
  return (
    <Alrt
      className="alert"
      status={alert.type}
      position={"fixed"}
      zIndex={10}
      width={"fit-content"}
      paddingX={10}
      top={5}
      left={"50%"}
      marginLeft={"-175px"}
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <AlertIcon />
      {alert.message}
    </Alrt>
  );
};

export default MyAlert;
