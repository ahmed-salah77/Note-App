import { Dispatch } from "react";
import { EditNoteAction } from "../reducers/editNoteReducer";
import React from "react";

interface EditeNoteContextType {
  isEditing: boolean;
  dispatch: Dispatch<EditNoteAction>;
}

const EditNoteContext = React.createContext<EditeNoteContextType>(
  {} as EditeNoteContextType
);

export default EditNoteContext;
