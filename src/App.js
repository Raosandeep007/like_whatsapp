import { Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./components/Homepage/Homepage";
import { ChakraProvider } from "@chakra-ui/react";
import Chatpage from "./components/chat/Chatpage";
import { ChatState } from "./components/context/chatprovider";

function App() {
  const { user } = ChatState();

  return (
    <ChakraProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          {user && <Route path="/chat" element={<Chatpage />}></Route>}
        </Routes>
      </div>
    </ChakraProvider>
  );
}

export default App;
