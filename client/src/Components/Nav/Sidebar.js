import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  DrawerContent,
  Box,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import Users from "./Users";
import { BiUserCircle } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
const Sidebar = ({ users }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box display={{ base: "inline", md: "none" }}>
      <IconButton
        _hover={{}}
        bg={"gray.700"}
        onClick={onOpen}
        icon={<BiUserCircle />}
      />
      <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent color={"white"} bg={"gray.700"}>
          <Flex align={'center'} borderBottomWidth="1px" justifyContent={'space-between'}>
            <DrawerHeader >Users</DrawerHeader>
            <IconButton _hover={{}} bg={'gray.600'} mr={4} icon={<FaTimes />} onClick={() => onClose()} />
          </Flex>
          <DrawerBody>
            <Users users={users} currentUser={''} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
