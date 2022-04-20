import { Box } from "@chakra-ui/react";
import React from "react";
import { ChatState } from "../context/chatprovider";
import Sidebar from "./chatpages/Sidebar";
import Mychat from "./chatpages/Mychat";
import Chatbox from "./chatpages/Chatbox";
const Chatpage = () => {
  const { user } = ChatState();
  return (
    <div style={{ width: "100%" }}>
      {user && <Sidebar />}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="90vh"
        p="10px"
      >
        {user && <Mychat />}
        {user && <Chatbox />}
      </Box>
    </div>
  );
};

export default Chatpage;
