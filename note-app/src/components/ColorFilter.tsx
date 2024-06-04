import {
  Circle,
  HStack,
  Hide,
  List,
  ListItem,
  Show,
  VStack,
} from "@chakra-ui/react";
import { colors } from "../services/noteServices";
interface Props {
  selectedColor: string;
  onClick: (color: string) => void;
}
const ColorFilter = ({ selectedColor, onClick }: Props) => {
  return (
    <List spacing={5}>
      <Hide above="lg">
        <HStack>
          {colors.map((color, index) => {
            return (
              <ListItem key={index}>
                {color === selectedColor ? (
                  <Circle
                    className="cursor-pointer"
                    onClick={() => onClick("")}
                    border="2px solid teal"
                    size="40px"
                    bg={color}
                  ></Circle>
                ) : (
                  <Circle
                    className="cursor-pointer"
                    onClick={() => onClick(color)}
                    size="40px"
                    bg={color}
                  ></Circle>
                )}
              </ListItem>
            );
          })}
        </HStack>
      </Hide>
      <Show above="lg">
        <VStack>
          {colors.map((color, index) => {
            return (
              <ListItem key={index}>
                {color === selectedColor ? (
                  <Circle
                    className="cursor-pointer"
                    onClick={() => onClick("")}
                    border="2px solid teal"
                    size="40px"
                    bg={color}
                  ></Circle>
                ) : (
                  <Circle
                    className="cursor-pointer"
                    onClick={() => onClick(color)}
                    size="40px"
                    bg={color}
                  ></Circle>
                )}
              </ListItem>
            );
          })}
        </VStack>
      </Show>
    </List>
  );
};

export default ColorFilter;
