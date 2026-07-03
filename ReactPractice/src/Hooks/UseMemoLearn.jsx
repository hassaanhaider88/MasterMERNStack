/* React hook that allows to memoize the result of a computation 
used for performance optimization
ensure that computations are only performed when necessary


import { useMemo, useState } from "react";

const UseMemoLearn = () => {
  const num = 300000000;
  const [count, setcount] = useState(0);

  const expensiveCalc = () => {
    let temCount = 0;
    for (let i = 0; i <= num; i++) {
      temCount++;
    }
    return temCount;
  };
  const memoziedVal = useMemo(() => expensiveCalc(), [num]);

  return (
    <div>
      <h1>UseMemoLearn</h1>
      <h1>Count Is {count}</h1>
      <h1>Expensive Result {memoziedVal}</h1>
      <button onClick={() => setcount(count + 1)}>Incr</button>
    </div>
  );
};

export default UseMemoLearn;


import React, { useMemo, useState } from "react";

function UseMemoLearn() {
  const [count, setcount] = useState(0);
  const [userName, setuserName] = useState("HMK");

//   const user = { name: userName }; // this will rerender the child even i used react.memo
    const user = useMemo(
      () => ({
        name: userName,
      }),
      [userName],
    );
  return (
    <div>
      <button onClick={() => setcount(count + 1)}>Ince Count {count}</button>
      <button onClick={() => setuserName("Hassaan")}>Change name</button>
      <Child userData={user} />
    </div>
  );
}

const Child = React.memo(({ userData }) => {
  console.log("Child is rendering..");
  return <div>{userData.name}</div>;
});

export default UseMemoLearn;

best practice
use for expensive calculations and for passing arrays or objects as props
for cheap computation, useMemo may add unnecessary complexity
over-memoizing decrease the performance
mising or incorrect dependencies may lead to defects

*/
