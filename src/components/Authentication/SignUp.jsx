import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
const SignUp = () => {
  const [showpassword, setShowpassword] = useState(false);
  const [showconfirmpassword, setShowconfirmpassword] = useState(false);
  const [newData, setnewData] = useState({});
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleEntries = (e) => {
    const { name } = e.target;
    setnewData({ ...newData, [name]: e.target.value });
  };
  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (
      pics.type === "image/jpeg" ||
      pics.type === "image/png" ||
      pics.type === "image/jpg"
    ) {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "like_whatsapp");
      data.append("cloud_name", "like-whatsapp");
      fetch("https://api.cloudinary.com/v1_1/like-whatsapp/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isclosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };
  const submitHandler = async () => {
    setLoading(true);
    newData.pic = pic;
    if (
      !newData.name ||
      !newData.email ||
      !newData.password ||
      !newData.confirmpassword
    ) {
      toast({
        title: "Please Fill All the Fields!",
        status: "warning",
        duration: 5000,
        isclosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    if (newData.password !== newData.confirmpassword) {
      toast({
        title: "Passwords do not match!",
        status: "warning",
        duration: 5000,
        isclosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    try {
      axios
        .post("http://127.0.0.1:5000/users/register", newData)
        .then((res) => {
          toast({
            title: "Successfully Registered!",
            description: res.data.message,
            status: "success",
            duration: 5000,
            isclosable: true,
            position: "top",
          });
          setLoading(false);
        });
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isclosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          name="name"
          placeholder="Enter your name"
          onChange={(e) => handleEntries(e)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          name="email"
          placeholder="Enter your email"
          onChange={(e) => handleEntries(e)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>password</FormLabel>
        <InputGroup>
          <Input
            name="password"
            type={showpassword ? "text" : "password"}
            placeholder="Enter your password"
            onChange={(e) => handleEntries(e)}
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={() => setShowpassword(!showpassword)}
            >
              {showpassword ? (
                <AiFillEye size="20px" />
              ) : (
                <AiFillEyeInvisible size="20px" />
              )}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="Confirmpassword" isRequired>
        <FormLabel>Confirm password</FormLabel>
        <InputGroup>
          <Input
            name="confirmpassword"
            type={showconfirmpassword ? "text" : "password"}
            placeholder="confirm your password"
            onChange={(e) => handleEntries(e)}
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={() => setShowconfirmpassword(!showconfirmpassword)}
            >
              {showconfirmpassword ? (
                <AiFillEye size="20px" />
              ) : (
                <AiFillEyeInvisible size="20px" />
              )}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="pic">
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          name="pic"
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default SignUp;
