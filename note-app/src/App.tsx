import { Center, Grid, GridItem, Hide, Show } from "@chakra-ui/react";
import "./App.css";
import Navbar from "./components/Navbar";
import NotesGrid from "./components/NotesGrid";
import SideBar from "./components/SideBar";
import { useEffect, useReducer, useState } from "react";
import AddNoteContext from "./contexts/addNoteContext";
import addNoteReducer from "./reducers/addNoteReducer";
import SideBar2 from "./components/SideBar2";
import { useNavigate } from "react-router-dom";
import alertReducer from "./reducers/alertReducer";
import AlertContext from "./contexts/alertContext";
import MyAlert from "./components/MyAlert";
function App() {
  const [alert, setAlert] = useReducer(alertReducer, null);
  const [selectedColor, setSelectedColor] = useState("");
  const [isAdding, dispatch] = useReducer(addNoteReducer, false);
  const navigate = useNavigate();
  useEffect(() => {
    if (
      localStorage.getItem("jwt-token") == "" ||
      localStorage.getItem("jwt-token") == null
    ) {
      console.log("here");
      navigate("/login");
    }
  }, []);

  return (
    <AddNoteContext.Provider value={{ isAdding, dispatch }}>
      <AlertContext.Provider value={{ alert, setAlert }}>
        {alert && <MyAlert />}
        <Grid
          templateAreas={{
            base: `"nav" "aside" "main"`,
            lg: `"aside nav" "aside main"`,
          }}
          templateColumns={{
            base: "1fr",
            lg: "10vw 1fr",
          }}
          templateRows={{
            base: "1fr",
            lg: "100px 1fr",
          }}
        >
          <GridItem area="nav" height={"100px"}>
            <Navbar />
          </GridItem>
          <Show above="lg">
            <GridItem
              area="aside"
              paddingTop={"20%"}
              maxW="140px"
              height="max(100%,100vh)"
              borderRight={"1px solid #db4034"}
            >
              <Center>
                <SideBar
                  color={selectedColor}
                  onClickColor={setSelectedColor}
                />
              </Center>
            </GridItem>
          </Show>
          <Hide above="lg">
            <GridItem area="aside" w="100%" mt={10}>
              <Center>
                <SideBar2
                  color={selectedColor}
                  onClickColor={setSelectedColor}
                />
              </Center>
            </GridItem>
          </Hide>
          <GridItem id="main" area="main" padding={2}>
            <NotesGrid selectedColor={selectedColor} />
          </GridItem>
        </Grid>
      </AlertContext.Provider>
    </AddNoteContext.Provider>
  );
}
// return (
//   <></>

// );

export default App;
