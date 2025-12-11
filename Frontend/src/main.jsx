import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { useState } from "react";
import { createContext } from "react";

export const context = createContext({ isAuthenticated: false });
const AppWarpper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, isUser] = useState({});

  return (
    <context.Provider
      value={{ isAuthenticated, setIsAuthenticated, user, isUser }}
    >
      <App />
    </context.Provider>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppWarpper />
  </StrictMode>
);
