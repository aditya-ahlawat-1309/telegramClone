import {useState} from "react";
import { Box } from "@chakra-ui/layout";
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import Chatbox from "../components/Chatbox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";
import "../App.css"

const Chatpage = () => {

    const reload = function () {
      if (!window.location.hash) {
        window.location = window.location + "#loaded";
        console.log("reloaded");
        window.location.reload();
      }
    };

    reload();

  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

   const [tabIndex, setTabIndex] = useState(0);

   const handleSliderChange = (event) => {
     setTabIndex(1);
   };

   const handleTabsChange = (index) => {
     setTabIndex(index);
   };
//   useEffect(() => {
// window.location.reload();

//   },[]);
  return (
    <div className="App">
      {/* <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        d="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
       className="display-screen"
      >
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
        <br/>
        {user && <MyChats fetchAgain={fetchAgain} />}
      </Box>
    </div> */}

      {window.innerWidth > 15000 ? (
        <div style={{ width: "100%" }}>
          {user && <SideDrawer />}
          <Box
            d="flex"
            justifyContent="space-between"
            w="100%"
            h="91.5vh"
            p="10px"
            className="display-screen"
          >
            {user && (
              <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
            )}
            {user && <MyChats fetchAgain={fetchAgain} />}
          </Box>
        </div>
      ) : (
        <div style={{ width: "100%" }}>
          {user && !tabIndex && <SideDrawer onClick={handleTabsChange} />}
          <Box
            // d="flex"
            // justifyContent="space-between"
            w="100%"
            style={{width:"100%"}}
            // h="91.5vh"
            // // p="10px"
            // className="display-screen"
          >
            {" "}
            <Tabs
              isFitted
              variant="soft-rounded"
              colorScheme="green"
              index={tabIndex}
              onChange={handleTabsChange}
            >
              {/* <TabList mb="1em">
                <Tab>My Chats</Tab>
                <Tab>Chat Page</Tab>
              </TabList> */}
              <TabPanels>
                <TabPanel onClick={handleSliderChange}>
                  {user && <MyChats fetchAgain={fetchAgain} />}
                </TabPanel>
                <TabPanel>
                  {user && (
                    <Chatbox
                      fetchAgain={fetchAgain}
                      setFetchAgain={setFetchAgain}
                    />
                  )}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </div>
      )}
    </div>
  );
};

export default Chatpage;
