import { AlertType } from "../contexts/alertContext";

export interface AlertAction {
  type: AlertType | null;
}
const alertReducer = (
  state: AlertType | null,
  action: AlertAction
): AlertType | null => {
  return action.type;
};

export default alertReducer;
