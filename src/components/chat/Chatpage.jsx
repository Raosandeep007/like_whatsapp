import React from "react";
import axios from "axios";
const Chatpage = () => {
  const fetchMessages = async () => {
    const data = await axios.get("http://localhost:5000/api/messages");
  };

  return <div>Chatpage</div>;
};

export default Chatpage;
