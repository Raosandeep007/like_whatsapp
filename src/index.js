import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ChatProvider from "./components/context/chatprovider";

const root = createRoot(document.getElementById("root"));
root.render(
  <ChatProvider>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </ChatProvider>
);
