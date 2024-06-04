import { useContext, useState } from "react";
import { Note, colors, noteSchema } from "../services/noteServices";
import {
  Card,
  CardBody,
  HStack,
  CardHeader,
  CardFooter,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  Button,
  GridItem,
  SimpleGrid,
} from "@chakra-ui/react";
import useNotes from "../hooks/useNotes";
import EditNoteContext from "../contexts/editNoteContext";
import AlertContext from "../contexts/alertContext";
interface Props {
  note: Note;
}
const NoteEditForm = ({ note }: Props) => {
  const { dispatch } = useContext(EditNoteContext);
  const { setAlert } = useContext(AlertContext);

  const [formData, setFormData] = useState<Note>(note);
  const { editNote } = useNotes();
  const handleSave = () => {
    console.log(formData);
    const { error } = noteSchema.validate(formData, { abortEarly: true });
    if (error) {
      let flag = false;
      error.details.forEach((err) => {
        const name = err.context?.key;
        if (name == "content" || name == "title") {
          flag = true;
          setAlert({
            type: {
              message: err.message as string,
              type: "error",
            },
          });
        }
      });
      if (flag) return;
    }
    dispatch({ type: "close edit form" });
    editNote.mutate(formData);
    setAlert({
      type: {
        message: "Note updated successfully",
        type: "success",
      },
    });
  };
  return (
    <FormControl>
      <Card
        justifyContent="space-between"
        borderRadius={15}
        height="400px"
        width={"390px"}
        bg={formData.color}
        color={"black"}
      >
        <CardHeader>
          <FormLabel fontSize={"1.2rem"}>Title</FormLabel>
          <Input
            maxLength={20}
            focusBorderColor="pink.400"
            border="1px solid black"
            type="text"
            fontSize="1.5rem"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </CardHeader>
        <CardBody mt={"-20px"}>
          <FormLabel fontSize={"1.2rem"}>Content</FormLabel>
          <Textarea
            resize={"none"}
            maxLength={500}
            border="1px solid black"
            focusBorderColor="pink.400"
            height={"190px"}
            fontSize="1.1rem"
            whiteSpace={"wrap"}
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
          />
        </CardBody>
        <CardFooter mt="-35px" justifyContent={"space-between"}>
          <SimpleGrid
            bg={"white"}
            left={"20px"}
            borderRadius={"7px"}
            border={"2px solid white"}
            columns={5}
            spacing={"5px"}
            justifyContent={"center"}
          >
            {colors.map((color) => (
              <GridItem
                key={color}
                onClick={() => setFormData({ ...formData, color: color })}
                className="cursor-pointer"
                bg={color}
                color={"white"}
                fontSize={"1.3rem"}
                textAlign={"center"}
                fontWeight={"bold"}
                borderRadius={"100%"}
                width={"33px"}
                height={"33px"}
              ></GridItem>
            ))}
          </SimpleGrid>
          <HStack>
            <Button
              colorScheme="red"
              onClick={() => dispatch({ type: "close edit form" })}
            >
              Cancel
            </Button>
            <Button colorScheme="green" onClick={handleSave}>
              Save
            </Button>
          </HStack>
        </CardFooter>
      </Card>
    </FormControl>
  );
};

export default NoteEditForm;
