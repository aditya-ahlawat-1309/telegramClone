import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import "../App.css"

function Homepage() {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chats");
  }, [history]);

  return (
    <Container maxW="xl" centerContent className="App">
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="transparent"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="0px"
        style={{ display: "flex" }}
      >
        <Text fontSize="4xl" fontFamily="Work sans">
          WhatsApp
        </Text>
      </Box>
      <Box bg="transparent" w="100%" p={4} borderRadius="lg" borderWidth="0px">
        <Tabs isFitted variant="soft-rounded">
          <TabList mb="1em">
            <Tab>Login</Tab>
            <Tab>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Homepage;
