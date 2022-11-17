import {
  Box,
  Button,
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import React from "react";
import { FaAngleDown } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { CheckLogin } from "../api/auth";
import auth from "../api/auth";
import Sidebar from "./Sidebar";
const Navbar = ({ socket, users }) => {
  const isLoggedIn = CheckLogin();
  const userData = auth.getUser();
  const logOut = () => {
    auth.deleteToken();

    socket.emit("userOut", {
      message: "user out: ",
      username: userData.username,
    });
    window.location.href = "/login";
  };
  const hoverBtn = {
    bg: "gray.600",
    transition: ".5s",
  };
  return (
    <Flex
      h={"fit-content"}
      p={3}
      bg={"gray.800"}
      justify={"center"}
      align={"center"}
      justifyContent={"space-between"}
      color={"white"}
    >
      {isLoggedIn ? <Sidebar users={users} /> : ""}
      <Box>
        <Link to={"/"}>
          <Text userSelect={"none"} fontSize={"14px"}>
            Chat App
          </Text>
        </Link>
      </Box>
      <Flex justify={"center"} align={"center"}>
        {isLoggedIn ? (
          <>
            <Menu>
              <MenuButton
                mr={2}
                w={"fit-content"}
                _hover={{}}
                bg={"none"}
                _expanded={{ bg: "none" }}
                as={Button}
                rightIcon={<FaAngleDown />}
              >
                <Flex
                  align={"center"}
                  justify={"center"}
                  h={"40px"}
                  w={"40px"}
                  textAlign={"center"}
                  borderRadius={"full"}
                  bg={userData.photo ? "" : localStorage.getItem("bg")}
                  backgroundImage={userData?.photo ? userData.photo : ""}
                  backgroundSize={"cover"}
                  backgroundPosition={"center"}
                >
                  {userData?.photo ? "" : userData.username[0].toUpperCase()}
                </Flex>
              </MenuButton>
              <MenuList>
                <Link to={"/settings"}>
                  <MenuItem
                    color={"black"}
                    _expanded={{ bg: "none" }}
                    _hover={{}}
                    h={"full"}
                    w={"full"}
                    bg={"white"}
                  >
                    <Button
                      w={"full"}
                      bg={"gray.700"}
                      color={"white"}
                      _hover={hoverBtn}
                      rightIcon={<IoSettingsSharp />}
                    >
                      Settings
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button
                      w={"full"}
                      onClick={logOut}
                      bg={"gray.700"}
                      color={"white"}
                      _hover={hoverBtn}
                    >
                      Logout
                    </Button>
                  </MenuItem>
                </Link>
              </MenuList>
            </Menu>
          </>
        ) : (
          <>
            <Link to={"/login"}>
              <Button
                w={"60px"}
                color={"white"}
                bg={"gray.700"}
                _hover={hoverBtn}
                fontSize={{ base: "sm", md: "md" }}
                mr={2}
              >
                Login
              </Button>
            </Link>
            <Link to={"/register"}>
              <Button
                w={"fit-content"}
                color={"white"}
                fontSize={{ base: "sm", md: "md" }}
                bg={"gray.700"}
                _hover={hoverBtn}
              >
                Register
              </Button>
            </Link>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Navbar;
