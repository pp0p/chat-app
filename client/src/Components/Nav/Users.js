import React from "react";
import authApi from "../api/auth";
import { Flex, Text, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { BiWorld } from "react-icons/bi";
const Users = ({ currentUser, users }) => {
  const activeUser = {
    borderRadius: "base",
    transition: ".5s",
    bg: "gray.500",
    cursor: "pointer",
  };
  return (
    <Flex h={"full"} flexDirection={"column"} w={"full"}>
      <Link to={"/"}>
        <Flex
          _hover={activeUser}
          align={"center"}
          m={"3px 0"}
          height={"full"}
          justify={"space-between"}
          p={2}
          w={"100%"}
          textColor={"white"}
        >
          <Text>Global</Text>
          <BiWorld />
        </Flex>
      </Link>
      {users &&
        users.map((user) => (
          <Link
            style={{ margin: "10px 0" }}
            to={
              authApi.getUser().username === user.username
                ? ""
                : `/chat/${user.username}`
            }
            key={Math.floor(Math.random() * 9999999)}
          >
            <Flex
              sx={currentUser === user.username ? activeUser : ""}
              _hover={activeUser}
              align={"center"}
              m={"4px 0"}
              height={"full"}
              justify={"space-between"}
              p={1}
              borderBottom={"1px solid rgba(0, 0, 0, 0.1)"}
              w={"100%"}
              textColor={"white"}
            >
              <Flex
                position={"relative"}
                borderRadius={"full"}
                backgroundSize={"cover"}
                backgroundPosition={"center"}
                backgroundImage={user?.photo}
                justify={"center"}
                align={"center"}
                bg={user.photo ? "" : localStorage.getItem("bg")}
                h={"50px"}
                w={"50px"}
              >
                {user?.photo ? "" : user.username[0].toUpperCase()}
                <Box
                  ml={2}
                  position={"absolute"}
                  left={0}
                  bottom={-1}
                  h={"10px"}
                  w={"10px"}
                  bg={user.status === true ? "green.400" : "gray.300"}
                  borderRadius={"full"}
                />
              </Flex>
              <Text ml={2}>{user.username}</Text>
            </Flex>
          </Link>
        ))}
    </Flex>
  );
};

export default Users;
