import React, { useEffect, useRef } from "react";
import auth from "../api/auth";
import { BiSend } from "react-icons/bi";
import { Flex, IconButton, Input, Box, Heading } from "@chakra-ui/react";
import MessagesList from "./MessagesList";
const GlobalChat = ({ socket, messages }) => {
  const InputRef = useRef();
  const { photo, username } = auth.getUser();
  useEffect(() => {
    const inputFocus = () => InputRef.current.focus();
    inputFocus();
  }, []);
  const sendMessage = () => {
    if (InputRef.current.value === "") {
      alert("Pleace Type Something !");
    } else {
      socket.emit("message", {
        user: username,
        message: InputRef.current.value,
        time: new Date(),
        photoSrc: photo ? photo : null,
      });
    }
    InputRef.current.value = "";
  };
  useEffect(() => {

   socket.emit("activeUser", auth.getUser().username)
    console.log('hey');
  }, [socket]);

  return (
    <Flex
      w={"full"}
      h={"100vh"}
      flexDirection={"column"}
      justifyContent={"space-between"}
    >
      <Box>
        <Heading fontSize={"3xl"} textAlign={"center"}>
          Global Chat
        </Heading>
        <Box h={"1px"} w={"full"} bg={"black"}></Box>
      </Box>
      <Box h={"full"} overflowY={"scroll"} w={"full"}>
        <MessagesList messages={messages} />
      </Box>
      <Flex
        justify={"center"}
        align={"center"}
        h={"fit-content"}
        p={1}
        w={"full"}
      >
        <Input
          border={"none"}
          bg={"#212324"}
          color={"white"}
          mr={1}
          ref={InputRef}
          placeholder="Type Your Message"
        />
        <IconButton
          borderRadius={"50%"}
          h={"full"}
          w={"30px"}
          color={"white"}
          _hover={{}}
          bg={"gray.600"}
          onClick={() => sendMessage()}
          icon={<BiSend />}
        />
      </Flex>
    </Flex>
  );
};

export default GlobalChat;
