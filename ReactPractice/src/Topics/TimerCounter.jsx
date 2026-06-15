// Basic Example of Counter
import { useState } from "react";
const TimerCounter = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>Inc</button>
      <h1>{count}</h1>
      <button onClick={() => setCount((c) => c - 1)}>Dec</button>
      <button onClick={() => setCount(0)}>reset</button>
    </div>
  );
};
export default TimerCounter;
// https://www.youtube.com/watch?v=1jmVAv7zMjw 3:54
