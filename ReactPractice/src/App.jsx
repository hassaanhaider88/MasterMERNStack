// import { useState } from "react";
// import TimerCounter from "./Topics/TimerCounter";
// import Todo from "./Topics/Todo";
// import Outer from "./Topics/Outer";
// import UserEffectLearn from "./Hooks/UserEffectLearn";
// import UseStateLearn from "./Hooks/UseStateLearn";
// import UseRefLearn from "./Hooks/UseRefLearn"

import FirstComponent from "./Hooks/useContextHook/FirstComponent";



const App = () => {
  // const [ToggleUserEffect, setToggleUserEffect] = useState(false);
  // const fn = (name) => {
  //   console.log(name);
  // };
  return (
    <>
      {/* <button className="py-2 px-10 rounded-4xl ml-10" onClick={() => setToggleUserEffect(!ToggleUserEffect)}>
        {ToggleUserEffect ? "Hide Effect" : "Show Effect"}
      </button> */}
      {/* <UseStateLearn /> */}
      {/* {ToggleUserEffect ? <UserEffectLearn /> : ""} */}
      {/* <UseRefLearn/> */}
      <FirstComponent/>
    </>
  );
};

export default App;

// https://www.youtube.com/watch?v=FMzzmbYpc0I useRef