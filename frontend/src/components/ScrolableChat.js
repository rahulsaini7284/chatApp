import React from "react";
import { useSelector } from "react-redux";
import ScrolableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "./config/ChatLogics";
import { Avatar, Tooltip } from "@chakra-ui/react";

const ScrolableChat = ({ messages }) => {
  const { userInfo } = useSelector((state) => state.userLogin);

  return (
    <ScrolableFeed forceScroll>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, userInfo?._id) ||
              isLastMessage(messages, i, userInfo?._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.image}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === userInfo._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, userInfo._id),
                marginTop: isSameUser(messages, m, i, userInfo._id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </ScrolableFeed>
  );
};

export default ScrolableChat;
