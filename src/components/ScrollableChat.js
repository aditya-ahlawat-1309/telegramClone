import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
  isLastMessageOnDifferentDateFromPrevMessage,
  getSender,
} from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  
// console.log(messages.length)
// console.log(messages[messages.length-1].sender._id === user._id)
// console.log(messages[messages.length - 1].sender._id);
// console.log(messages[messages.length - 1].readBy)
// console.log(messages[messages.length-1].createdAt)
// console.log(messages[messages.length-2].createdAt)
// console.log(
//   messages[messages.length - 1].createdAt ===
//     messages[messages.length - 2].createdAt
// 
// console.log(user._id)
// for(var i=0;i<messages.length;i++)
// {
//     messages[i].readBy.push(user._id);
// }
    return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i, array) => (
          <div>
            {/* <br />
            <br />
            <span
              style={{
                color: "black",
                fontSize: "10px",
                padding: "15px 5px 5px 15px",
                textAlign: "center",
                marginLeft: "45%",
                marginBottom: "10%",
                backgroundColor: "lightblue",
                borderRadius: "20px",
                padding: "5px 15px",
              }}
            > */}
          {/* {"S=" + m.sender._id}
          <br/>
      {"U=" + user._id} */}
            {array[i - 1] ? (
              array[i].createdAt.substring(0, 10) ===
              array[i - 1].createdAt.substring(0, 10) ? (
                ""
              ) : (
                <div>
                  <br />
                  <br />
                  <span
                    style={{
                      color: "black",
                      fontSize: "10px",
                      padding: "15px 5px 5px 15px",
                      textAlign: "center",
                      marginLeft: "40%",
                      marginBottom: "10%",
                      backgroundColor: "lightblue",
                      borderRadius: "5px",
                      padding: "5px 15px",
                    }}
                  >
                    {m.createdAt.substring(0, 10)}
                  </span>

                  <br />
                  <br />
                </div>
              )
            ) : i - 1 < 0 ? (
              <div>
                <br />
                <br />
                <span
                  style={{
                    color: "black",
                    fontSize: "10px",
                    padding: "15px 5px 5px 15px",
                    textAlign: "center",
                    marginLeft: "45%",
                    marginBottom: "10%",
                    backgroundColor: "lightblue",
                    borderRadius: "20px",
                    padding: "5px 15px",
                  }}
                >
                  {m.createdAt.substring(0, 10)}
                </span>

                <br />
                <br />
              </div>
            ) : (
              ""
            )}

            <div style={{ display: "flex" }} key={m._id}>
              {(isSameSender(messages, m, i, user._id) ||
                isLastMessage(messages, i, user._id)) && (
                <Tooltip
                  label={m.sender.name}
                  placement="bottom-start"
                  hasArrow
                >
                  <Avatar
                    mt="7px"
                    mr={1}
                    size="sm"
                    cursor="pointer"
                    name={m.sender.name}
                    src={m.sender.name}
                    color="white"
                    bg={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
                  />
                </Tooltip>
              )}
              <span
                style={{
                  backgroundColor: `${
                    m.sender._id === user._id ? "	#25D366" : "#ffffff"
                  }`,
                  color: "black",
                  marginLeft: isSameSenderMargin(messages, m, i, user._id),
                  marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                  borderRadius: "20px",
                  padding: "5px 15px",
                  maxWidth: "75%",
                }}
              >
                {m.content}
                <span
                  style={{
                    color: "black",
                    fontSize: "10px",
                    padding: "15px 5px 5px 15px",
                  }}
                >
                  {m.updatedAt.substring(11, 16)}
                  &nbsp;{" "}
                  {m.sender._id === user._id ? ( array[i].readBy.includes(user._id)
                      ? "seen"
                      : "sent" ) : ""
                    
                    }
                </span>
              </span>
            </div>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
