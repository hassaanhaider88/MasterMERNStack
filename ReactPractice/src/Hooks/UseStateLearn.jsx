// // import { useState } from "react";

// // const UseStateLearn = () => {
// //   const [count, setcount] = useState(0);
// //   const handleCountUpdate = (task) => {
// //     if (task == "inc") {
// //       setcount((pre) => pre + 1);
// //     } else if (task == "dec") {
// //       if (count == 0) {
// //         return;
// //       }
// //       setcount((pre) => pre - 1);
// //     }
// //   };
// //   return (
// //     <div className="py-10 px-20">
// //       <h1>UseStateLearn</h1>
// //       <p className="text-5xl">{count}</p>
// //       <button
// //         className="py-2 px-6 rounded-3xl bg-black text-white"
// //         onClick={() => handleCountUpdate("inc")}
// //       >
// //         Inc
// //       </button>
// //       <button
// //         className="py-2 ml-3 px-6 rounded-3xl bg-black text-white"
// //         onClick={() => handleCountUpdate("dec")}
// //       >
// //         Dec
// //       </button>
// //     </div>
// //   );
// // };

// // export default UseStateLearn;

// // import { useState } from "react";

// // const UseStateLearn = () => {
// //   const expensiveCalculation = () => {
// //     console.log("here Expensive Cal done!");
// //     return 10;
// //   };
// //   const [state, setState] = useState(() => ({
// //     count: expensiveCalculation(),
// //     firstName: "Hassaan",
// //     lastName: "Haider",
// //   }));
// //   const handeUpdate = () => {
// //     setState({ ...state, count: state.count + 1 });
// //   };
// //   return (
// //     <div>
// //       <h1>UseStateLearn</h1>
// //       <h1>{state.count}</h1>
// //       <h1>{state.firstName}</h1>
// //       <h1>{state.lastName}</h1>
// //       <button
// //         className="py-2 ml-3 px-6 rounded-3xl bg-black text-white"
// //         onClick={handeUpdate}
// //       >
// //         Inc
// //       </button>
// //     </div>
// //   );
// // };

// // export default UseStateLearn;

// import { useState } from "react";

// const UseStateLearn = () => {
//   const [num, setNum] = useState([1, 2, 3, 4]);
//   const handleAddNewNumber = (newNum) => {
//     setNum([newNum, ...num]);
//     // setNum([...num,newNum]); this will add at bottom
//   };
//   return (
//     <div>
//       <h1>UseStateLearn</h1>
//       {num.map((n, i) => {
//         return <li key={i}>{n}</li>;
//       })}
//       <button
//         className="py-2 ml-3 px-6 rounded-3xl bg-black text-white"
//         onClick={() => handleAddNewNumber(num.length + 1)}
//       >
//         Add new
//       </button>
//     </div>
//   );
// };

// export default UseStateLearn;
