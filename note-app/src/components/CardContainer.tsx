import { useReducer } from "react";
import NoteEditForm from "./NoteEditForm";
import { Note } from "../services/noteServices";
import NoteCard from "./NoteCard";
import editNoteReducer from "../reducers/editNoteReducer";
import EditNoteContext from "../contexts/editNoteContext";
interface Props {
  note: Note;
}
const CardContainer = ({ note }: Props) => {
  const [isEditing, dispatch] = useReducer(editNoteReducer, false);
  return (
    <EditNoteContext.Provider value={{ isEditing, dispatch }}>
      {isEditing ? (
        <NoteEditForm note={note}></NoteEditForm>
      ) : (
        <NoteCard note={note} />
      )}
    </EditNoteContext.Provider>
  );
};

export default CardContainer;
