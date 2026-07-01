/* eslint-disable react-hooks/exhaustive-deps */
// useCallback is a hook that memoized functions ,performance optimization tools that prevents function recreation, Helps to memoize or cache the function

import { useCallback, useEffect, useState } from "react";

// useCallback(Fn to be memoized, array of dependencies)
const UseCallBackLearn = () => {
  const [count, setCount] = useState(0);
  const [otherCount, setOtherCount] = useState(0);
  // without useCallback
  //   const increment = () => {
  //     setCount(count + 1);
  //   };
  // useEffect(() => {
  //   console.log("Incerment fn is getting recreated");
  // }, [increment]);

  // with useCallback

  const increment = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  useEffect(() => {
    console.log("Incerment fn is getting recreated");
  }, [increment]);

  return (
    <div>
      <h1>UseCallBackLearn</h1>
      <h1>Count: {count}</h1>
      <button onClick={increment}>Increment</button>
      <h1>Other Count: {otherCount}</h1>
      <button onClick={() => setOtherCount(otherCount + 1)}>
        Increment Other Count
      </button>
    </div>
  );
};

export default UseCallBackLearn;

// when useCallback 
/*
-> prevents function recreation on every render, it will only recreate the function when the dependencies change.
-> useCallback is useful when passing functions as props to child components, especially when those child components are wrapped in React.memo. It helps to avoid unnecessary re-renders of the child components by ensuring that the function reference remains the same unless its dependencies change.
*/
// Best practice 
// use only when it is necessary, don't overuse
// not needed for child comp which is small or fast
// works best when combined with react.memo 
// keeps the dependency array  correctly
// use for functions that are computationally expensive