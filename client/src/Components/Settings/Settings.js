import { Text, Button, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { FaKey, FaUser } from "react-icons/fa";
const Settings = () => {
  return (
    <Flex
      shadow={"base"}
      align={"center"}
      flexDirection={"column"}
      m={"auto"}
      mt={4}
      p={4}
      h={"fit-content"}
      w={"fit-content"}
    >
      <Heading mb={4} fontSize={"md"} alignSelf={"flex-start"}>
        Settings
      </Heading>
      <Link to={"/settings/updateProfile"}>
        <Button
          bg={"gray.700"}
          color={"white"}
          w={"200px"}
          _hover={{}}
          leftIcon={<FaUser />}
        >
          Update Profile
        </Button>
      </Link>
      <Link to={"/settings/changePassword"}>
        <Button
          mt={4}
          _hover={{}}
          bg={"gray.700"}
          color={"white"}
          w={"200px"}
          leftIcon={<FaKey />}
        >
          Change Password
        </Button>
      </Link>
    </Flex>
  );
};

export default Settings;
