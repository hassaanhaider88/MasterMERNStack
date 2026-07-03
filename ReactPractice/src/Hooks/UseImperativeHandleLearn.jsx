/*
a powserfull tool that allow us to expose functiona or values from a child component to a parent component
it has relation with forwardRef


import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

const UseImperativeHandleLearn = () => {
  return (
    <div>
      <h2>UseImperativeHandleLearn</h2>
      {/* simple ref
      {/* <FarwardsRef /> 
      <EffectParent />
    </div>
  );
};

export default UseImperativeHandleLearn;

const FarwardsRef = () => {
  const myRef = useRef(null);
  const handleClick = () => {
    myRef.current.focus();
  };

  return (
    <div>
      {/* <input type="text" ref={myRef} /> 
      <FrowardRefChild ref={myRef}/>
      <button onClick={handleClick}>Focus Input</button>
    </div>
  );
};

const FrowardRefChild = forwardRef((props,inputRef) => {
  return <input type="text" ref={inputRef} />;
});

const EffectChild = forwardRef((props, btRef) => {
  const [count, setCount] = useState(0);
  const handleIncrease = () => {
    setCount(count + 1);
  };

  useImperativeHandle(btRef, () => ({
    handleIncrease,
  }));
  return (
    <>
      <div>{count}</div>
    </>
  );
});

const EffectParent = () => {
  const btRef = useRef(null);
  const handleInc = () => {
    btRef.current.handleIncrease();
  };
  return (
    <>
      <EffectChild ref={btRef} />
      <button onClick={handleInc}>Increase</button>
    </>
  );
};

*/