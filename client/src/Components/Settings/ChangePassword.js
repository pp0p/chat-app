import {
  Button,
  Flex,
  FormLabel,
  Input,
  Box,
  Checkbox,
} from "@chakra-ui/react";
import React, { useState, useRef } from "react";
import auth from "../api/auth";
import SHOW_ALERT from "../Alert";
import { updatePassword } from "../api/UserApi";
const ChangePassword = () => {
  const userInfo = auth.getUser();
  const passwordConfirmRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    _id: userInfo._id,
    currentPass: "",
    newPassword: "",
  });
  const getInputData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const [alert, setAlert] = useState({ status: "", message: "" });

  const [edit, setEdit] = useState(false);
  const isEdit = !edit ? true : false;

  const Change_Password = (e) => {
    e.preventDefault();
    if (data.newPassword !== passwordConfirmRef.current.value) {
      setAlert({ status: "error", message: "Passowrd are not match" });
    } else {
      updatePassword(data, setAlert);
    }
  };
  return (
    <Flex
      m={"auto"}
      mt={10}
      p={4}
      w={"fit-content"}
      h={"fit-content"}
      boxShadow={"base"}
      flexDirection={"column"}
      justify={"center"}
    >
      <Box mb={5}>
        <SHOW_ALERT status={alert.status} message={alert.message} />
      </Box>
      <form onSubmit={Change_Password}>
        <FormLabel>Current Password</FormLabel>
        <Input
          onChange={getInputData}
          name={"currentPass"}
          type={showPassword ? "text" : "password"}
          disabled={isEdit}
          placeholder={"current password "}
        />
        <FormLabel>New Password</FormLabel>
        <Input
          onChange={getInputData}
          type={showPassword ? "text" : "password"}
          name={"newPassword"}
          disabled={isEdit}
          placeholder={"new password"}
        />
        <Input
          ref={passwordConfirmRef}
          mt={2}
          type={showPassword ? "text" : "password"}
          placeholder={"confirm new password"}
          disabled={isEdit}
        />
        <Checkbox
          disabled={isEdit}
          onChange={(e) => setShowPassword(e.target.checked)}
          isChecked={showPassword}
        >
          Show Passowrd
        </Checkbox>
        <Flex
          justifyContent={"space-evenly"}
          mt={2}
          justify={"center"}
          align={"center"}
        >
          <Button type={"submit"} w={"120px"} disabled={isEdit}>
            Save
          </Button>
          {!edit ? (
            <Button w={"120px"} onClick={() => setEdit(true)}>
              Edit
            </Button>
          ) : (
            <Button w={"120px"} onClick={() => setEdit(false)}>
              Cancel
            </Button>
          )}
        </Flex>
      </form>
    </Flex>
  );
};

export default ChangePassword;
