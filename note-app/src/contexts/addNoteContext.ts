import React, { Dispatch } from "react";
import { AddNoteAction } from "../reducers/addNoteReducer";

interface addNoteContextType {
  isAdding: boolean;
  dispatch: Dispatch<AddNoteAction>;
}

const AddNoteContext = React.createContext<addNoteContextType>(
  {} as addNoteContextType
);

export default AddNoteContext;
