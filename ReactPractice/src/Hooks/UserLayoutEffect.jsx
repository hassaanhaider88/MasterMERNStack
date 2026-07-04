/* 
UserLayout Effect 
After the DOM updates but before the sreen painted as compare to useEffect it run after render is painted to the screen
fires synchonoously as compare to useEffect it runs asynchronously
*/

import { useRef, useState, useLayoutEffect } from "react";

const UseLayoutEffectLearn = () => {
  const boxRef = useRef();
  const [textContent, settextContent] = useState("Inital text");
  const [boxHeight, setBoxHeight] = useState(0);

  useLayoutEffect(() => {
    const height = boxRef.current.getBoundingClientRect().height;
    setBoxHeight(height);
  }, []);
  return (
    <div className={`w-${100}`} ref={boxRef}>
      {textContent}
      {boxHeight}
    </div>
  );
};

export default UseLayoutEffectLearn;
