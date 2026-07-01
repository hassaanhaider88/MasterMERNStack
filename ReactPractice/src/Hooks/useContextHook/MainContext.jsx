import { createContext, useState } from "react";

const MessageContext = createContext();

function ContextProvider({ children }) {
  const [message, setMessage] = useState("Hello, world!");
  return (
    <MessageContext.Provider value={{ message, setMessage }}>
      {children}
    </MessageContext.Provider>
  );
}

export { MessageContext, ContextProvider };
