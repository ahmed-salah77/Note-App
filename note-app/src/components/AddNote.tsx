import { Button } from "@chakra-ui/react";
import { useContext } from "react";
import AddNoteContext from "../contexts/addNoteContext";
import { BsFillPinAngleFill } from "react-icons/bs";

const AddNote = () => {
  const { dispatch } = useContext(AddNoteContext);
  return (
    <Button
      colorScheme="teal"
      h="60px"
      w="60px"
      borderRadius={"100%"}
      onClick={() => dispatch({ type: "open adding form" })}
    >
      <BsFillPinAngleFill size={"100px"} />
    </Button>
  );
};

export default AddNote;
