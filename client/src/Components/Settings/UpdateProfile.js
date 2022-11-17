import { Button, Flex, FormLabel, Input, Text, Box } from "@chakra-ui/react";
import SHOW_ALERT from "../Alert";
import React, { useState } from "react";
import { BiUpload } from "react-icons/bi";
import auth from "../api/auth";
import { updateProfile } from "../api/UserApi";
const UpdateProfile = () => {
  const bg = localStorage.getItem("bg");
  const userInfo = auth.getUser();
  const [data, setData] = useState({
    _id: userInfo._id,
    username: userInfo.username,
    profile_image: "",
  });
  const getInputData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const [alert, setAlert] = useState({ status: "", message: "" });

  const [photoPreview, setPhotoPreview] = useState("");

  const handleFileChange = (e) => {
    setPhotoPreview(URL.createObjectURL(e.target.files[0]));
    setData({ ...data, profile_image: e.target.files[0] });
  };

  const [edit, setEdit] = useState(false);

  const isEdit = !edit ? true : false;

  const update_Profile = (e) => {
    e.preventDefault();
    updateProfile(data, setAlert);
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

      <form onSubmit={update_Profile}>
        <FormLabel
          cursor={"pointer"}
          textAlign={"center"}
          htmlFor="file_input"
          backgroundImage={photoPreview ? photoPreview : userInfo.photo}
          backgroundSize={"cover"}
          backgroundPosition={"center"}
          h={"80px"}
          w={"80px"}
          m={"auto"}
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
            bg={photoPreview || userInfo.photo ? "" : bg}
          >
            <Text fontSize={"2xl"}>
              {photoPreview || userInfo.photo
                ? ""
                : userInfo.username[0]?.toUpperCase()}
            </Text>
          </Flex>
        </FormLabel>
        {photoPreview ? (
          ""
        ) : (
          <FormLabel
            bg={"gray.600"}
            w={"70%"}
            m={"auto"}
            color={"white"}
            borderRadius={"base"}
            p={2}
            justifyContent={"space-between"}
            alignItems={"center"}
            display={"flex"}
            cursor={"pointer"}
            htmlFor="file_input"
            mt={2}
          >
            <Text mr={2}>Upload Image</Text>
            <BiUpload />
          </FormLabel>
        )}
        <Box display={"none"}>
          <Input
            id="file_input"
            disabled={isEdit}
            mb={2}
            name="profile_image"
            onChange={handleFileChange}
            placeholder={"Upload Your Image"}
            type={"file"}
          />
        </Box>
        <FormLabel>Username</FormLabel>
        <Input
          name={"username"}
          disabled={isEdit}
          onChange={getInputData}
          type="text"
          value={data.username}
        />
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

export default UpdateProfile;
