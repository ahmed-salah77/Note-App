import { Note } from "../services/noteServices";
import {
  Card,
  CardBody,
  HStack,
  Heading,
  Text,
  CardHeader,
  CardFooter,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaRegStar } from "react-icons/fa";
import { IoOpenOutline } from "react-icons/io5";

import EditNote from "./EditNote";

interface Props {
  note: Note;
}
const NoteCard = ({ note }: Props) => {
  const color = useColorModeValue("black", "#3E3E3E");
  return (
    <Card
      justifyContent="space-between"
      borderRadius={0}
      height="400px"
      width={"390px"}
      bg={note.color}
      color={color}
    >
      <CardHeader>
        <HStack justifyContent={"space-between"}>
          <Heading fontSize="1.5rem">{note.title}</Heading>
          <IoOpenOutline size={30} className="cursor-pointer" />
        </HStack>
      </CardHeader>
      <CardBody textOverflow="clip"  maxH={"260px"} overflow={"hidden"}>
        <Text fontSize="1.1rem" whiteSpace="pre-wrap" overflow={"hidden"}>
          {note.content}
        </Text>
      </CardBody>
      <CardFooter>
        <HStack alignItems={"end"} w="100%" justifyContent={"space-between"}>
          <EditNote note={note} />
          <Text> {new Date(note.createdAt).toLocaleString()}</Text>
          <FaRegStar size={30} className="cursor-pointer" />
        </HStack>
      </CardFooter>
    </Card>
  );
};

export default NoteCard;
