import {
  Flex,
  Box,
  Input,
  Text,
  Button,
  FormControl,
} from "@chakra-ui/react";
import React, {  useState } from "react";
import SHOW_ALERT from "../Alert";
import { login } from "../api/UserApi";

const colors = ["blue.400", "green.400", "telegram.400", "cyan.400"];
const bg = colors[Math.floor(Math.random() * colors.length)];
const Login = () => {
  const [data, setData] = useState({ username: "", password: "" });

  const [alert, setAlert] = useState({ status: "", message: "" })

  const getInputData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const sendData = (e) => {
    e.preventDefault();
    login(data, setAlert, bg,alert);
  };
  return (
    <Flex direction={"column"} w={"full"} justify={"center"} m={"auto"} mt={32}>
      <Box w={{ base: "90%", md: "600px" }} m={"auto"}>
        <SHOW_ALERT status={alert.status} message={alert.message} />

        <form onSubmit={sendData}>
          <FormControl m={"auto"} p={4} shadow={"base"}>
            <Text fontSize={"x-large"} mb={2}>
              Login
            </Text>
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
              m={"10px 0"}
              type="password"
              name={"password"}
              placeholder={"Password"}
            />
            <Button
              w={"full"}
              type={"submit"}
              bg={"gray.800"}
              color={"white"}
              _hover={{
                bg: "gray.700",
                transition: ".5s",
              }}
            >
              Login
            </Button>
          </FormControl>
        </form>
      </Box>
    </Flex>
  );
};

export default Login;
