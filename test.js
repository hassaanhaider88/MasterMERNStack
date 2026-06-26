// // function analyzeArray(arr) {
// //     if (arr.length < 1) return {}
// //     let min = arr[0];
// //     for (let i = 0; i < arr.length; i++) {
// //         if (arr[i] < min) {
// //             min = arr[i]
// //         }
// //     }

// //     let max = arr[0];
// //     for (let i = 0; i < arr.length; i++) {
// //         if (arr[i] > max) {
// //             max = arr[i]
// //         }
// //     }
// //     const sum = arr.reduce((a, b) => a + b, 0);
// //     const avg = sum / arr.length;
// //     return {
// //         "min": min,
// //         "max": max,
// //         "sum": sum,
// //         "avg": avg
// //     }
// // }

// // // console.log(analyzeArray([5, 2, 9, 1, 7]))
// // // console.log(analyzeArray([]))

// // function countCharacters(str) {
// //     str.toLowerCase();
// //     const obj = {};
// //     for (let i = 0; i < str.length; i++) {
// //         const char = str[i];
// //         if (obj[char] === "") continue;
// //         if (obj[char]) {
// //             obj[char]++;
// //         } else {
// //             obj[char] = 1;
// //         }
// //     }
// //     return obj;
// // }

// // // console.log(countCharacters("java"))

// // console.log([] == false); // true
// // console.log([] === false); // false
// // console.log("5" + 2); // 52
// // console.log("5" - 2); // 3

// // function getEvenNumbers(arr) {
// //     const EvenArr = [];
// //     for (let i = 0; i < arr.length; i++) {
// //         if (arr[i] % 2 === 0) {
// //             EvenArr.push(arr[i]);
// //         }
// //     }
// //     return EvenArr;
// // }

// // // console.log(getEvenNumbers([1, 2, 3, 4, 5, 6]))

// // const user = {
// //     name: "Hassaan",
// //     address: {
// //         city: "Karachi",
// //         country: "Pakistan"
// //     }
// // };

// // console.log(user.address.city) // karachi

// // let a = 10;

// // function test() {
// //     let a = 20;
// //     console.log(a); // 20
// // }

// // test();
// // console.log(a); // 10

// // function isPalindrome(str) {
// //     const revers = str.split("").reverse().join("");
// //     if (revers === str) {
// //         return true
// //     } else {
// //         return false
// //     }
// // }

// // // console.log(isPalindrome("madam")) // true

// // function findDuplicates(arr) {
// //     // const set = new Set([...arr]);
// //     // return set;
// //     const newArr = [];
// //     for (let i = 0; i < arr.length; i++) {
// //         if (newArr.includes(arr[i])) {
// //             continue
// //         }else{
// //             newArr.push(arr[i])
// //         }
// //     }
// //     return newArr;
// // }

// // console.log(findDuplicates([1, 2, 3, 2, 4, 5, 1, 6, 1]))

// const users = [
//     { name: "Ali", role: "admin" },
//     { name: "Sara", role: "user" },
//     { name: "Usman", role: "admin" },
//     { name: "Ayesha", role: "user" }
// ];

// function groupBy(arr, key) {
//     const result = {}
//     for (let i = 0; i < arr.length; i++) {
//         const item = arr[i];
//         const groupBy = item[key];
//         if (!result[groupBy]) {
//             result[groupBy] = [];
//         }
//         result[groupBy].push(item)
//     }
//     return result;
// }

// console.log(groupBy(users, "role"))

// Parsing code to (EST)
// Ignition Interpreter
// Sparkplug compiler
// Maglev Compiler
// Turbofan Compiler
// Execution

// JavaScript is a
// -> Prototype based
// -> muti paradigm
// -> sinlge threaded / syncronize coding
// -> dynamic language
// -> imperative  (step by step guide how code work) / procedural Programming
// -> Declartive / functional programming

// function count() {
//     count.counter++;
// }
// count.counter = 0;
// debugger
// count()
// count()
// count()
// debugger
// count()

// console.log(count.counter) // 4
// https://www.youtube.com/watch?v=NcQ5UUteZvY&list=PL7ersPsTyYt1t3I-ehKTNsRj8tSAdofZC&index=8
// http://pagefy.io/system-design-interview-by-alex-xu

// BitWise operator
// & And
// | Or
// ^ Xor
// ~ Not
// << Left shift
// >> right shift
// >>> Unsigned right shift

// const a = 12 & 10;
// console.log(a) // 8


// // Date Time 
// let d1 = new Date();
// let d2 = new Date("2007-03-01");

// console.log(d1.getFullYear())
// console.log(d1.getMonth())
// console.log(d1.getDate())
// console.log(d1.getDay())
// console.log("Hours", Math.floor(d2.getTime() / 1000 / 60 / 60 / 24))
// console.log(d1.getHours())
// console.log(d1.getMinutes())
// console.log(d1.getSeconds())
// console.log(d1.getSeconds())

// console.log(d1.toLocaleString("default", {
//     weekday: "long", // Long -> Frinday , short -> Fri , Narrow -> F
//     day: "2-digit",
//     month : "short",
//     year : "numeric"
// }))

// let diff = d1 - d2;
// console.log(diff / 1000 / 60 / 60 /24)

