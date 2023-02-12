import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSender } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { Avatar, Button } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";

const MyChats = ({ fetchAgain }) => {

    const reload = function () {
      if (!window.location.hash) {
        window.location = window.location + "#loaded";
        console.log("reloaded");
        window.location.reload();
      }
    };

    reload();

  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        "https://lazy-pear-sea-lion-tam.cyclic.app/api/chat",
        config
      );
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);


  return (
    <>
      {/* <Box
        d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
        flexDir="column"
        alignItems="center"
        // p={3}
        bg="transparent"
        // w={{ base: "100%", md: "31%" }}
        // borderRadius="lg"
        // borderWidth="1px"
        style={{ display: "flex" }}
      > */}
      {/* <Box
        // pb={3}
        // px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        style={{ display: "flex" }}
      >
        <div className="display-small-screen">My Chats</div>
      </Box> */}
      <Box
        // d="flex"
        // flexDir="column"
        // p={3}
        // bg="#F8F8F8"
        bg="#fff"
        w="100%"
        h="88vh"
        // borderRadius="lg"
        // border="black"
        overflowY="scroll"
        // style={{ dipslay: "flex" }}
        // className="my-chats-stack"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <div>
                <span
                  style={{
                    float: "right",
                    color: "black",
                    fontSize: "11px",
                    marginTop: "11px",
                    color: "green",
                  }}
                >
                  {chat.latestMessage.createdAt.substring(0, 10) ===
                  new Date(Date.now()).toISOString().substring(0, 10)
                    ? chat.latestMessage.createdAt.substring(11, 16)
                    : chat.latestMessage.createdAt.substring(0, 10)}
                </span>
                <Box
                  onClick={() => setSelectedChat(chat)}
                  cursor="pointer"
                  bg={selectedChat === chat ? "#25D366" : "#fff"}
                  color={selectedChat === chat ? "black" : "black"}
                  px={3}
                  py={2}
                  borderRadius="lg"
                  key={chat._id}
                  style={{ display: "flex" }}
                  // border="1px"
                  // borderColor="black.200"
                >
                  <Avatar
                    mt="7px"
                    mr={1}
                    size="sm"
                    cursor="pointer"
                    name={
                      !chat.isGroupChat
                        ? user._id === chat.users[0]._id
                          ? chat.users[1].name
                          : chat.users[0].name
                        : chat.chatName
                    }
                    src={
                      !chat.isGroupChat
                        ? user._id === chat.users[0]._id
                          ? chat.users[1].name
                          : chat.users[0].name
                        : chat.chatName
                    }
                    color="black"
                    bg={`#${Math.floor(
                      (getSender(loggedUser, chat.users).charCodeAt(0) / 1000) *
                        18789500
                    ).toString(16)}`}
                  />
                  {/* {console.log(new Date(Date.now()).toISOString().substring(0,10))} */}
                  <Text>
                    &nbsp;&nbsp;&nbsp;
                    {!chat.isGroupChat
                      ? user._id === chat.users[0]._id
                        ? chat.users[1].name
                        : chat.users[0].name
                      : chat.chatName}
                    {/* {chat.chatName}*/}
                    {chat.latestMessage && (
                      <Text fontSize="xs">
                        &nbsp;&nbsp;&nbsp;
                        <b>
                          {chat.isGroupChat
                            ? chat.latestMessage.sender.name + " : "
                            : " "}
                        </b>
                        {chat.latestMessage.content.length > 50
                          ? chat.latestMessage.content.substring(0, 51) + "..."
                          : chat.latestMessage.content}
                      </Text>
                    )}
                  </Text>
                </Box>
              </div>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
      {/* </Box> */}
    </>
  );
};

export default MyChats;

 {/* */}
      {
        /* </Box> */
      }
