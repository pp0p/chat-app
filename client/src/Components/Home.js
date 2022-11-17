import { Flex } from "@chakra-ui/react";
import { React } from "react";

import Users from "./Nav/Users";
import GlobalChat from "./Chat/GlobalChat";

const Home = ({ users, socket, messages }) => {
  return (
    <Flex w={"full"} h={"full"}>
      <Flex
        h="full"
        w={"200px"}
        bg={"gray.700"}
        p={2}
        display={{ base: "none", md: "flex" }}
        overflowY={"scroll"}
      >
        <Users users={users} />
      </Flex>
      <GlobalChat messages={messages} socket={socket} />
    </Flex>
  );
};

export default Home;
