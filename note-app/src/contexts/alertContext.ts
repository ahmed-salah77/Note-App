import React, { Dispatch, ReactNode } from "react";
import { AlertAction } from "../reducers/alertReducer";
export interface AlertType {
  message: ReactNode;
  type: "success" | "error";
}
interface AlertContextType {
  alert: AlertType | null;
  setAlert: Dispatch<AlertAction>;
}

const AlertContext = React.createContext<AlertContextType>(
  {} as AlertContextType
);

export default AlertContext;
