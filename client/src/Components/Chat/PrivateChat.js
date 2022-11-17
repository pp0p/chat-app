import { React, useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Flex, Text, Input, IconButton, Box } from "@chakra-ui/react";
import Users from "../Nav/Users";
import auth from "../api/auth";
import { BiSend } from "react-icons/bi";
import MessagesList from "./MessagesList";
import { getMessages } from "../api/UserApi";
const PrivateChat = ({ users, socket }) => {
  const { user } = useParams();
  const [messages, setMessages] = useState([]);
  const getUserInfo = users.filter((u) => u.username === user);
  const { photo, username } = auth.getUser();
  const InputRef = useRef();
  // Send New Message
  const sendMessage = () => {
    if (InputRef.current.value === "") {
      alert("Pleace Type Something !");
    } else {
      socket.emit(`PrivateChat`, {
        user: username,
        message: InputRef.current.value,
        to: user,
        photoSrc: photo ? photo : null,
        time: new Date(),
      });

      InputRef.current.value = "";
    }
  };
  useEffect(() => {
    // clear old meesages
    setMessages([]);

    // get messages after open another chat
    const get_Messages = async () => {
      const messages = await getMessages(auth.getUser().username, user);
      setMessages(messages);
    };

    get_Messages();
  }, [user]);
  useEffect(() => {
    socket.on("PrivateChat", (data) => {
      setMessages(data);
    });
  });

  return (
    <Flex h={"100%"} w={"100%"}>
      <Flex
        h="full"
        w={"200px"}
        bg={"gray.700"}
        p={2}
        display={{ base: "none", md: "flex" }}
        overflowY={"scroll"}
      >
        <Users users={users} currentUser={user} />
      </Flex>
      <Flex
        w={"full"}
        flexDirection={"column"}
        justifyContent={"space-between"}
      >
        <Flex
          color={"white"}
          p={2}
          align={"center"}
          justify={"center"}
          justifyContent={"space-between"}
          w={"full"}
          h={"fit-content"}
          bg={"gray.600"}
        >
          {/* User Photo And Username */}
          <Flex align={"center"} justifyContent={"center"}>
            <Flex
              borderRadius={"full"}
              backgroundSize={"cover"}
              backgroundPosition={"center"}
              backgroundImage={getUserInfo[0]?.photo}
              justify={"center"}
              align={"center"}
              mr={2}
              bg={getUserInfo[0].photo ? "" : localStorage.getItem("bg")}
              h={"40px"}
              w={"40px"}
            >
              <Text fontSize={"1xl"}>
                {getUserInfo[0]?.photo
                  ? ""
                  : getUserInfo[0].username[0].toUpperCase()}
              </Text>
            </Flex>
            <Text>{getUserInfo[0].username}</Text>
          </Flex>

          {/* User Status */}
          <Box display={"flex"} alignItems={"center"}>
            <Text>{getUserInfo[0].status === true ? "online" : "offline"}</Text>
            <Box
              ml={2}
              h={"10px"}
              w={"10px"}
              bg={getUserInfo[0].status === true ? "green.400" : "gray.300"}
              borderRadius={"full"}
            />
          </Box>
        </Flex>
        {/* Messsages */}
        <Box h={"full"} overflow={"scroll"} w={"full"}>
          <MessagesList messages={messages} users={users} />
        </Box>
        <Flex p={1}>
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
    </Flex>
  );
};

export default PrivateChat;
