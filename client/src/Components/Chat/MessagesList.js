import React, { useRef, useEffect } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import auth from "../api/auth";
import moment from "moment";
const MessagesList = ({ messages }) => {
  const userInfo = auth.getUser();
  const lastMessageRef = useRef(null);
  useEffect(() => {
    //  scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <React.Fragment>
      {messages &&
        messages.map((u) => (
          <Flex
            key={Math.floor(Math.random() * 100000)}
            justifyContent={
              userInfo.username === u.user ? "flex-end" : "flex-start"
            }
          >
            <Flex
              m={"10px 4px"}
              p={1}
              borderRadius={"md"}
              bg={userInfo.username === u.user ? "#e3effd" : "#f6f6f6 "}
              justify={"center"}
              alignItems={"center"}
              flexDirection={"column"}
              w={"fit-content"}
            >
              <Flex
                h={"fit-content"}
                p={2}
                flexDirection={
                  userInfo.username === u.user ? "row-reverse" : "row"
                }
                w={"fit-content"}
                justify={"center"}
                align={"center"}
                justifyContent={"flex-start"}
              >
                <Flex
                  position={"relative"}
                  borderRadius={"full"}
                  backgroundSize={"cover"}
                  backgroundPosition={"center"}
                  backgroundImage={u.photoSrc}
                  justify={"center"}
                  align={"center"}
                  bg={u.photoSrc ? "" : localStorage.getItem("bg")}
                  h={"40px"}
                  w={"40px"}
                >
                  <Text fontSize={"1xl"} color={'white'}>
                    {u?.photoSrc ? "" : u.user[0].toUpperCase()}
                  </Text>
                </Flex>

                {/* Messages */}
                <Flex
                  ml={2}
                  mr={2}
                  maxW={"120px"}
                  flexWrap={"wrap"}
                  h={"fit-content"}
                  w={"fit-content"}
                  p={2}
                  shadow={"base"}
                  borderRadius={"base"}
                >
                  <Text>{u.message}</Text>
                </Flex>
                <Box ref={lastMessageRef} />
              </Flex>
              <Text>{moment(u.time).fromNow() }</Text>
            </Flex>
          </Flex>
        ))}
    </React.Fragment>
  );
};

export default MessagesList;
