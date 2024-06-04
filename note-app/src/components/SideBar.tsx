import AddNote from "./AddNote";
import { Box, Center, VStack } from "@chakra-ui/react";
import ColorFilter from "./ColorFilter";

interface Props {
  color: string;
  onClickColor: (color: string) => void;
}
const LeftSide = ({ color, onClickColor }: Props) => {
  return (
    <Box h={"100%"}>
      <Center>
        <VStack>
          <AddNote />
          <ColorFilter selectedColor={color} onClick={onClickColor} />
        </VStack>
      </Center>
    </Box>
  );
};

export default LeftSide;
