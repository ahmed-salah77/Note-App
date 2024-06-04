import { Box, List, ListItem } from "@chakra-ui/react";
import {   useContext, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import useNotes from "../hooks/useNotes";
import { Note } from "../services/noteServices";
import EditNoteContext from "../contexts/editNoteContext";
import AlertContext from "../contexts/alertContext";
interface Props {
  note: Note;
}
interface Props {}
const EditNote = ({ note }: Props) => {
  const { dispatch } = useContext(EditNoteContext);
  const { setAlert } = useContext(AlertContext);
  const [visible, setVisibilty] = useState(false);
  const { deleteNote } = useNotes();
  const handleDelete = () => {
    deleteNote.mutate(note);
    setAlert({
      type: { message: "Note Deleted Successfully", type: "success" },
    });
  };
  return (
    <Box position={"relative"}>
      {visible && (
        <List
          width={"20px"}
          spacing={2}
          mb={3}
          position={"absolute"}
          top={"-80px"}
        >
          <ListItem paddingLeft={"5px"}>
            <FaEdit
              color="yellow"
              size={25}
              className="cursor-pointer"
              onClick={() => dispatch({ type: "open edit form" })}
            />
          </ListItem>
          <ListItem>
            <MdDeleteForever
              color="red"
              size={30}
              className="cursor-pointer"
              onClick={handleDelete}
            />
          </ListItem>
        </List>
      )}
      <BsThreeDotsVertical
        size={30}
        className="cursor-pointer"
        onClick={() => setVisibilty(!visible)}
      />
    </Box>
  );
};

export default EditNote;
