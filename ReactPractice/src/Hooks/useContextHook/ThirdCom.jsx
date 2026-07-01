import { useContext } from "react";
import { MessageContext } from "./MainContext";

const ThirdCom = () => {
  const {message, setMessage} = useContext(MessageContext);
  return (
    <div>
      <h1>ThirdCom</h1>
      <h1>{message}</h1>
      <button onClick={() => setMessage("Hello from ThirdCom")}>
        Change Message
      </button>
    </div>
  );
};

export default ThirdCom;
