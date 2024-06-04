import { useContext, useState } from "react";
import { Note, colors, noteSchema } from "../services/noteServices";
import {
  Card,
  CardBody,
  HStack,
  CardHeader,
  CardFooter,
  useColorModeValue,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  Button,
  GridItem,
  SimpleGrid,
} from "@chakra-ui/react";
import useNotes from "../hooks/useNotes";
import AddNoteContext from "../contexts/addNoteContext";
import AlertContext from "../contexts/alertContext";

const AddNoteForm = () => {
  const { dispatch } = useContext(AddNoteContext);
  const { setAlert } = useContext(AlertContext);
  const color = useColorModeValue("black", "#3E3E3E");
  const defaultNote = {
    title: "",
    content: "",
    color: colors[Math.floor(Math.random() * 5)],
  } as Note;
  const [formData, setFormData] = useState<Note>(defaultNote);
  const { addNote } = useNotes();
  const handleAdd = () => {
    const { error } = noteSchema.validate(formData, { abortEarly: true });
    if (error) {
      error.details.forEach((err) => {
        const name = err.context?.key;
        if (name)
          setAlert({
            type: {
              message: err.message,
              type: "error",
            },
          });
      });
      return;
    }
    addNote.mutate(formData);
    setAlert({
      type: {
        message: "Note added successfully",
        type: "success",
      },
    });
    dispatch({ type: "close adding form" });
  };
  return (
    <FormControl>
      <Card
        justifyContent="space-between"
        borderRadius={0}
        height="400px"
        width={"390px"}
        bg={formData.color}
        color={color}
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
              onClick={() => dispatch({ type: "close adding form" })}
            >
              Cancel
            </Button>
            <Button colorScheme="green" onClick={handleAdd}>
              Save
            </Button>
          </HStack>
        </CardFooter>
      </Card>
    </FormControl>
  );
};

export default AddNoteForm;
