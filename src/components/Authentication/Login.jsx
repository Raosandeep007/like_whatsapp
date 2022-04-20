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
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showpassword, setShowpassword] = useState(false);
  const [newData, setnewData] = useState({});
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleEntries = (e) => {
    const { name } = e.target;
    setnewData({ ...newData, [name]: e.target.value });
  };
  const submitHandler = () => {
    setLoading(true);
    if (!newData.email || !newData.password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isclosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    } else {
      try {
        axios.post("http://127.0.0.1:5000/users/login", newData).then((res) => {
          localStorage.setItem("userInfo", JSON.stringify(res.data));
          toast({
            title: "Login Successful",
            description: res.data.message,
            status: "success",
            duration: 5000,
            isclosable: true,
            position: "top",
          });
          setLoading(false);
          navigate("/chat");
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
    }
  };
  return (
    <VStack spacing="5px">
      <FormControl id="enter_email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          name="email"
          type="email"
          placeholder="Enter your email"
          onChange={(e) => handleEntries(e)}
        />
      </FormControl>
      <FormControl id="enter_password" isRequired>
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

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>
      <Button
        variant="solid"
        colorScheme="red"
        width="100%"
        onClick={() => {
          setnewData({ email: "guest@example.com", password: "123456789" });
          submitHandler();
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
};

export default Login;
