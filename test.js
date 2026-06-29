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


// const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
// for (const element in arr) {
//     if (element % 2 === 0) {
//         console.log(element) // string
//     }
// }
// for (const element of arr) {
//     if (element % 2 === 0) {
//         console.log(element) // number
//     }
// }

// Functions in Depth
// function f2(a,b,c,d,e){
//     return "nothing.."
// }

// console.log(f2.length) // return number of argues a function takes

// f2(function (a, b) { // anonymous function
//     console.log(a ** b)
// })

// function f2(fnc) {
//     fnc(2, 5)
// }

// console.log("1")
// setTimeout(() => {
//     console.log("SetTimeOut After 300")
// }, 3000);
// console.log("2")
// fetchData()
// console.log("3")
// setTimeout(() => {
//     console.log("SetTimeOut")
// }, 0);
// console.log("4")

// // function fetchData() {
// //     const res = "somthing";
// //     console.log(res) // print at 3rd line
// // }
// async function fetchData() {
//     const res = await fetch("https://dummyjson.com/comment");
//     console.log(await res.json()) // print at last line
// }

// //  DOM Document Object Model
// const body = document.querySelector("body");
// const btn = document.getElementById("btn")

// body.addEventListener("click", () => {
//     console.log("Body is clicked")
// })
// btn.addEventListener("click", (e) => {
//     e.stopPropagation()
//     console.log("Butn is click")
// })

// const Btn2 = document.createElement("button");
// Btn2.innerText = "Button ho"
// body.appendChild(Btn2)

// Btn2.addEventListener("click", (e) => {
//     e.stopPropagation()
//     btn.toggleAttribute("hidden")
// })


// function createCounter() {
//     let count = 0;

//     return {
//         increment() {
//             count++;
//             console.log(count);
//         },

//         delayedIncrement() {
//             setTimeout(() => {
//                 count++;
//                 console.log("Delayed:", count);
//             }, 1000);
//         }
//     };
// }

// const counter1 = createCounter();
// const counter2 = createCounter();

// counter1.increment();
// counter1.delayedIncrement();

// counter2.increment();

// setTimeout(() => {
//     counter1.increment();
// }, 500);

// // Argumental Objects
// function meraFunc() {
//     console.log([arguments])
// }

// meraFunc(1, 2, 3) //{ '0': 1, '1': 2, '2': 3 }

// // constructor function
// function Perso(name, age) {
//     this.name = name;
//     this.age = age;
//     return `Hi ${this.name}! You are ${this.age} Old`
// }
// console.log(Perso("HMK", 20))
// console.log(Perso("HMKCode WEb", 3))

// // Generator Function
// function* counter() {
//     yield 1;
//     yield 2;
//     yield 3;
// }
// const g = counter();
// console.log(g.next()) // { value: 1, done: false }
// console.log(g.next()) // { value: 2, done: false }
// console.log(g.next()) // {  value: 3, done: false }
// console.log(g.next())// { value: undefined, done: true }

// const b = [1, 2, 3, 4, 5, 7, , , 9, 8]

// console.log(b)
// console.log(b.length)

// const a = new Array(10).fill("*")

// a.forEach((e) => {
//     console.log(e, "_")
// })

// // Filter Map reduce functions
// const b = [1, 2, 3, 4, 5, 7, 9, 8]
// console.log(b.sort(() => Math.random() - 0.5)) // randomly shuffle arrayk

// const a = [1, 2, 3, 4]
// const b = [1, 2, 3, 4]
// const c = [1, 2, 3, 4]

// a.splice(1, 0, 8) // 0 mean place place at
// b.splice(3, 1, 8) // 1 mean replace
// c.splice(3, 0, 8) // 0 mean place place at
// console.log(a) 
// console.log(b)
// console.log(c)

// ForEach (elemnt,index,whole array)
// Map () => return/create new 
// const a = [1, 2, 3, 4]
// let b = a.map((e) => e * 3)
// console.log(b) //[ 3, 6, 9, 12 ]
// Filter evaluate condition
// Reduce (a,b) accept two argues first will be element and second will be variable
// const a = [1, 2, 3, 4]
// const result = a.reduce((a, b) => a + b, 0)
// console.log(result)

// const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min)) + min;
// console.log(getRandomNumber(1, 100))
// console.log(getRandomNumber(1, 100))
// Count the vowels in a string.
// const countVowels = str => (str.match(/[aeiou]/gi) || []).length;
// console.log(countVowels("hASSAANAHIDER"))

const s = "hassaan haider full stack developer";

s.split();
console.log(s)
// s.forEach((s) => {
//     s[0].toUpperCase();
// })

console.log(s)