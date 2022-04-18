import { Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./components/Homepage/Homepage";
import { ChakraProvider } from "@chakra-ui/react";
import Chatpage from "./components/chat/Chatpage";

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/chat" element={<Chatpage />}></Route>
        </Routes>
      </div>
    </ChakraProvider>
  );
}

export default App;
