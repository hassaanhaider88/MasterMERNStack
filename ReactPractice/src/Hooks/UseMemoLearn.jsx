  /*React.memo is Higher Order Component In React, that prevents unnecessary re-rendering of a component when its props have not changed. It is used to optimize the performance of functional components by memoizing the rendered output and skipping the rendering process if the props remain the same.

 import React, { useState } from "react";

  its use shallow comparison to check if the props have changed or not. If the props are the same, React.memo will return the previously rendered output instead of re-rendering the component.
 const UseMemoLearn = () => {
   const [count, setCount] = useState(0);
   const [msg, setmsg] = useState("");

   return (
     <div>
       <h1>UseMemoLearn</h1>
       <Counter count={count} />
       <button onClick={() => setCount(count + 1)}>Increment</button>
       <input
         type="text"
         value={msg}
         onChange={(e) => setmsg(e.target.value)}
         placeholder="Type something..."
       />
     </div>
   );
 };

 export default UseMemoLearn;

  without React.memo
  const Counter = ({ count }) => {
    console.log("Counter component rendered");
    return <h2>Count: {count}</h2>;
  };

  with React.memo
 const Counter = React.memo(({ count }) => {
   console.log("Counter component rendered");
   return <h2>Count: {count}</h2>;
 });

import React, { useState } from "react";

const UseMemoLearn = () => {
  const [FirstCount, setFirstCount] = useState(0);
  const [SecondCount, setSecondCount] = useState(0);
   const person = { id: 1, name: "John", age: 30 }; this was causing the re-rendering of the Detail component because the object reference is changing on every render. To fix this, we can use useMemo to memoize the person object and prevent unnecessary re-renders of the Detail component.

  const [person, setPerson] = useState({ id: 1, name: "John", age: 30 });
  return (
    <div>
      <h1>UseMemoLearn</h1>
      <Detail FirstCount={FirstCount} /> 
      <Person name={person.name} age={person.age} />
      <button onClick={() => setFirstCount(FirstCount + 1)}>
        Inc First Count {FirstCount}
      </button>
      <button onClick={() => setSecondCount(SecondCount + 1)}>
        Inc Second Count {SecondCount}
      </button> 
      <button onClick={() => setPerson({ ...person, age: person.age + 1 })}>
        Inc Age {FirstCount}
      </button>
      <button onClick={() => setPerson({ ...person, name: "Ram" })}>
        Update Name {SecondCount}
      </button>
    </div>
  );
};

export default UseMemoLearn;

 without React.memo, this component will re-render every time the parent component re-renders, even if the props have not changed. This can lead to unnecessary re-renders and performance issues in larger applications. By using React.memo, we can prevent this behavior and optimize the performance of our application.
 const Detail = ({ FirstCount }) => {
   console.log("Detail component rendered");
   return <h2>First Count: {FirstCount}</h2>;
 };

 with React.memo
 const Detail = React.memo(({ FirstCount }) => {
   console.log("Detail component rendered");
   return <h2>First Count: {FirstCount}</h2>;
 });

 first of all it necessary to understand that react.memo only re-render the component when the props have changed. In this case, the Person component is receiving two props: name and age. When the parent component re-renders, if the name and age props have not changed, React.memo will prevent the Person component from re-rendering, even if the parent component has re-rendered. This can help improve performance by avoiding unnecessary re-renders of child components.
 const Person = React.memo(({ name, age }) => {
   console.log("Person component rendered");
   return (
     <div>
       <h2>Person Name: {name}</h2>
       <h2>Person Age: {age}</h2>
     </div>
   );
 });

 to achive to stop re-rendering of the Person component when the name prop is updated, we can use useMemo to memoize the name prop and prevent unnecessary re-renders of the Person component. This way, even if the parent component re-renders, the Person component will only re-render if the name prop has changed.
const Person = React.memo(
  ({ name, age }) => {
    console.log("Person component rendered");
    return (
      <div>
        <h2>Person Name: {name}</h2>
        <h2>Person Age: {age}</h2>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.name === nextProps.name;
  },
);
Scenarios In which we should not use React.memo:
simple component without heavy computations 
when parent commp rarely updates the props
when we pass complex objjecst or functions as props
when parent component re-render frequently
when component is consuming values from react's context api
when component is using useState or useReducer hooks
when component is using useEffect or useLayoutEffect hooks
*/