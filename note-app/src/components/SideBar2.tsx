import AddNote from "./AddNote";
import { Box, Center, HStack, VStack } from "@chakra-ui/react";
import ColorFilter from "./ColorFilter";

interface Props {
  color: string;
  onClickColor: (color: string) => void;
}
const SideBar2 = ({ color, onClickColor }: Props) => {
  return (
    <Box w={"100%"}>
      <Center>
        <HStack alignItems={"center"} justifyContent={"center"}>
            <AddNote />
            <ColorFilter selectedColor={color} onClick={onClickColor} />
        </HStack>
      </Center>
    </Box>
  );
};

export default SideBar2;
