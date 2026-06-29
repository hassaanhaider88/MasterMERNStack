/*import { useEffect, useState } from "react";
useEffect Use in  side effeccts that  can be

fetchung data form APIs
setting up subscriptions or timers
moditying DOM elements directly
Accessing browser APIs


const UserEffectLearn = () => {
  const [users, setUsers] = useState([]);
  const fetchData = async () => {
    console.log("fetching...");
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await res.json();
    setUsers(data);
  };
  // without UseEffect
  //   fetchData();
  useEffect(() => {
    fetchData();
  }, []); // empty dependency mean run only on first render
  return (
    <div>
      <h1>UserEffectLearn</h1>
      {users?.map((u, i) => {
        return <div key={i}>{u.name}</div>;
      })}
    </div>
  );
};

export default UserEffectLearn;

import { useEffect } from "react";

const UserEffectLearn = () => {
  let count = 0;
    // this will case memory leak
    useEffect(() => {
     setInterval(() => {
        count++;
        console.log("Couninggg", count);
      }, 1000);
    }, []);
  useEffect(() => {
    const timer = setInterval(() => {
      count++;
      console.log("Couninggg", count);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return <div>UserEffectLearn</div>;
};

export default UserEffectLearn;
*/
