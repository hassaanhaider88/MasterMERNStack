/*
alternative to useState but for more complex states


import { useState } from "react";

const UseReducerLearn = () => {
  // without useReducer
  const [count, setCount] = useState(0);
  const [history, sethistory] = useState([]);

  const increment = () => {
    setCount((prev) => prev + 1);
    sethistory([...history, count + 1]);
  };
  const decrement = () => {
    setCount((prev) => prev - 1);
    sethistory([...history, count - 1]);
  };

  const reset = () => {
    setCount(0);
    sethistory([...history, 0]);
  };

  const increaseBy10 = () => {
    setCount(count + 10);
    sethistory([...history, 10]);
  };
  return (
    <div>
      <h1>UseReducer</h1>
      <h1>WithOut Reducer</h1>
      <h1>Count {count}</h1>

      <button onClick={() => increment()}>Inc</button>
      <button onClick={() => decrement()}>dec</button>
      <button onClick={() => reset()}>reset</button>
      <button onClick={() => increaseBy10()}>Inc By 10</button>
      <div>
        {history.map((h, i) => {
          return <span key={i}>{h}</span>;
        })}
      </div>
    </div>
  );
};

export default UseReducerLearn;


// with Reducer
import { useReducer } from "react";

const UseReducerLearn = () => {
  const initialState = { count: 0, history: [] };
  const reducer = (state, action) => {
    switch (action.type) {
      case "inc":
        return {
          count: state.count + 1,
          history: [...state.history, state.count + 1],
        };
      case "dec":
        return {
          count: state.count - 1,
          history: [...state.history, state.count - 1],
        };
      case "reset":
        return {
          count: 0,
          history: [...state.history, 0],
        };
      case "increBy10":
        return {
          count: state.count + 10,
          history: [...state.history, 10],
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h1>UseReducer</h1>
      <h1>With Reducer</h1>
      <h1>Count {state.count}</h1>

      <button onClick={() => dispatch({ type: "inc" })}>Inc</button>
      <button onClick={() => dispatch({ type: "dec" })}>dec</button>
      <button onClick={() => dispatch({ type: "reset" })}>reset</button>
      <button onClick={() => dispatch({type : "increBy10"})}>Inc By 10</button>
      <div>
        {state.history.map((h, i) => {
          return <span key={i}>{h}</span>;
        })}
      </div>
    </div>
  );
};

export default UseReducerLearn;


import { useReducer } from "react";

// Lazy initalization
const UseReducerLearn = () => {
  const complexCalculation = (intialVal) => {
    console.log("running complex logic");
    let result = intialVal;
    for (let i = 0; i < 600000000; i++) {
      result += 1;
    }
    console.log("Calculation done.");

    return { count: result };
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case "inc":
        return { count: state.count + 1 };
      default:
        return state;
    }
  };
  // const intailState = complexCalculation(0);
  // const [state, dispatch] = useReducer(reducer, intailState);
  

  const [state, dispatch] = useReducer(reducer, 0,complexCalculation);
  return (
    <div>
      <h1>Use reducer learning.</h1>
      <p>count {state.count}</p>
      <button onClick={() => dispatch({ type: "inc" })}>increse</button>
    </div>
  );
};


export default UseReducerLearn;

Best Practices
Aboid side effects in reducers like api call
do not mutate the existing state directly
ensure actions are structured consistenly

*/