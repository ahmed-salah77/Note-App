import { Box, FormErrorMessage, GridItem, Text, Wrap } from "@chakra-ui/react";
import CardContainer from "./CardContainer";
import AddNoteForm from "./AddNoteForm";
import useNotes from "../hooks/useNotes";
import { useContext, useState } from "react";
import AddNoteContext from "../contexts/addNoteContext";

interface Props {
  selectedColor: string;
}
const NotesGrid = ({ selectedColor }: Props) => {
  const { isAdding } = useContext(AddNoteContext);
  const { getUserNotes } = useNotes();
  const notes = getUserNotes.data;
  notes?.sort((note1, note2) => (note1.createdAt > note2.createdAt ? -1 : 1));
  return (
    <Box>
      <Text mb={5} fontSize={"max(2.5rem,2vw)"}>
        Notes
      </Text>
      {notes && (
        <Box>
          <Wrap spacing={5}>
            {isAdding && (
              <GridItem key={"addNote"}>
                <AddNoteForm />
              </GridItem>
            )}
            {notes?.map((note) => {
              if (note.color != selectedColor && selectedColor) return null;
              return (
                <GridItem key={note._id}>
                  <CardContainer note={note} />
                </GridItem>
              );
            })}
          </Wrap>
        </Box>
      )}
    </Box>
  );
};

export default NotesGrid;
