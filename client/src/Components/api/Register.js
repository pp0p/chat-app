import React, { useRef, useState } from "react";
import {
  Flex,
  Box,
  Input,
  Text,
  Button,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

import { register } from "../api/UserApi";
import { BiUpload } from "react-icons/bi";
import SHOW_ALERT from "../Alert";

// Get Random Color
const colors = ["blue.400", "green.400", "telegram.400", "cyan.400"];
const bg = colors[Math.floor(Math.random() * colors.length)];

const Register = () => {
  const passwordConfirmRef = useRef();
  const passwordRef = useRef();
  const [data, setData] = useState({
    username: "",
    password: "",
    profile_image: "",
  });
  const [alert, setAlert] = useState({ status: "", message: "" })

  const [photoPreview, setPhotoPreview] = useState("");

  const getInputData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setPhotoPreview(URL.createObjectURL(e.target.files[0]));
    setData({ ...data, profile_image: e.target.files[0] });
  };

  const sendData = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setAlert({ status: 'error', message: "Passowrd are not match" })
    } else {
      register(data, setAlert, bg);
    }
  };
  return (
    <Flex direction={"column"} w={"full"} justify={"center"} m={"auto"} mt={32}>
      <Box w={{ base: "90%", md: "600px" }} m={"auto"}>
        <SHOW_ALERT status={alert.status} message={alert.message} />
        <form onSubmit={sendData} encType={"multipart/form-data"}>
          <FormControl m={"auto"} p={4} shadow={"base"}>
            <Text fontSize={"x-large"} mb={2}>
              Register
            </Text>
            <Flex
              justify={"center"}
              align={"center"}
              m={"auto"}
              flexDirection={"column"}
            >
              <FormLabel
                cursor={"pointer"}
                textAlign={"center"}
                htmlFor="file_input"
                backgroundImage={photoPreview || ''}
                backgroundSize={"cover"}
                backgroundPosition={"center"}
                h={"80px"}
                w={"80px"}
                overflow={"hidden"}
                borderRadius={"50%"}
              >
                <Flex
                  mr={4}
                  align={"center"}
                  justify={"center"}
                  h={"full"}
                  w={"full"}
                  color={"white"}
                  textAlign={"center"}
                  bg={photoPreview || bg}
                >
                  <Text fontSize={"2xl"}>
                    {photoPreview ? "" : data.username[0]?.toUpperCase()}
                  </Text>
                </Flex>
              </FormLabel>
              {photoPreview ? (
                ""
              ) : (
                <FormLabel
                  bg={"gray.600"}
                  color={"white"}
                  borderRadius={"base"}
                  p={2}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  display={"flex"}
                  cursor={"pointer"}
                  htmlFor="file_input"
                >
                  <Text mr={2}>Upload Image</Text>
                  <BiUpload />
                </FormLabel>
              )}
              <Box display={"none"}>
                <Input
                  id="file_input"
                  mb={2}
                  name="profile_image"
                  onChange={handleFileChange}
                  placeholder={"Upload Your Image"}
                  type={"file"}
                />
              </Box>
            </Flex>
            <Input
              onChange={getInputData}
              type={"text"}
              placeholder={"Username"}
              required
              name={"username"}
            />
            <Input
              onChange={getInputData}
              required
              ref={passwordRef}
              m={"10px 0"}
              type="password"
              name={"password"}
              placeholder={"Password"}
            />
            <Input
              required
              ref={passwordConfirmRef}
              type="password"
              name={"password"}
              placeholder={"Confirm Password"}
            />
            <Button
              mt={2}
              w={"full"}
              type={"submit"}
              bg={"gray.800"}
              color={"white"}
              _hover={{
                bg: "gray.700",
                transition: ".5s",
              }}
            >
              Register
            </Button>
          </FormControl>
        </form>
      </Box>
    </Flex>
  );
};

export default Register;
