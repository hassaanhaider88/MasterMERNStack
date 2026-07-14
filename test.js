/*function analyzeArray(arr) {
    if (arr.length < 1) return {}
    let min = arr[0];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < min) {
            min = arr[i]
        }
    }

    let max = arr[0];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i]
        }
    }
    const sum = arr.reduce((a, b) => a + b, 0);
    const avg = sum / arr.length;
    return {
        "min": min,
        "max": max,
        "sum": sum,
        "avg": avg
    }
}

console.log(analyzeArray([5, 2, 9, 1, 7]))
console.log(analyzeArray([]))

function countCharacters(str) {
    str.toLowerCase();
    const obj = {};
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (obj[char] === "") continue;
        if (obj[char]) {
            obj[char]++;
        } else {
            obj[char] = 1;
        }
    }
    return obj;
}

// console.log(countCharacters("java"))

console.log([] == false); // true
console.log([] === false); // false
console.log("5" + 2); // 52
console.log("5" - 2); // 3

function getEvenNumbers(arr) {
    const EvenArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] % 2 === 0) {
            EvenArr.push(arr[i]);
        }
    }
    return EvenArr;
}

// console.log(getEvenNumbers([1, 2, 3, 4, 5, 6]))

const user = {
    name: "Hassaan",
    address: {
        city: "Karachi",
        country: "Pakistan"
    }
};

console.log(user.address.city) // karachi

let a = 10;

function test() {
    let a = 20;
    console.log(a); // 20
}

test();
console.log(a); // 10

function isPalindrome(str) {
    const revers = str.split("").reverse().join("");
    if (revers === str) {
        return true
    } else {
        return false
    }
}

// console.log(isPalindrome("madam")) // true

function findDuplicates(arr) {
    // const set = new Set([...arr]);
    // return set;
    const newArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (newArr.includes(arr[i])) {
            continue
        }else{
            newArr.push(arr[i])
        }
    }
    return newArr;
}

console.log(findDuplicates([1, 2, 3, 2, 4, 5, 1, 6, 1]))

const users = [
    { name: "Ali", role: "admin" },
    { name: "Sara", role: "user" },
    { name: "Usman", role: "admin" },
    { name: "Ayesha", role: "user" }
];

function groupBy(arr, key) {
    const result = {}
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        const groupBy = item[key];
        if (!result[groupBy]) {
            result[groupBy] = [];
        }
        result[groupBy].push(item)
    }
    return result;
}

console.log(groupBy(users, "role"))

Parsing code to (EST)
Ignition Interpreter
Sparkplug compiler
Maglev Compiler
Turbofan Compiler
Execution

JavaScript is a
-> Prototype based
-> muti paradigm
-> sinlge threaded / syncronize coding
-> dynamic language
-> imperative  (step by step guide how code work) / procedural Programming
-> Declartive / functional programming

function count() {
    count.counter++;
}
count.counter = 0;
debugger
count()
count()
count()
debugger
count()

console.log(count.counter) // 4
https://www.youtube.com/watch?v=NcQ5UUteZvY&list=PL7ersPsTyYt1t3I-ehKTNsRj8tSAdofZC&index=8
http://pagefy.io/system-design-interview-by-alex-xu

BitWise operator
& And
| Or
^ Xor
~ Not
<< Left shift
>> right shift
>>> Unsigned right shift

const a = 12 & 10;
console.log(a) // 8


// Date Time
let d1 = new Date();
let d2 = new Date("2007-03-01");

console.log(d1.getFullYear())
console.log(d1.getMonth())
console.log(d1.getDate())
console.log(d1.getDay())
console.log("Hours", Math.floor(d2.getTime() / 1000 / 60 / 60 / 24))
console.log(d1.getHours())
console.log(d1.getMinutes())
console.log(d1.getSeconds())
console.log(d1.getSeconds())

console.log(d1.toLocaleString("default", {
    weekday: "long", // Long -> Frinday , short -> Fri , Narrow -> F
    day: "2-digit",
    month : "short",
    year : "numeric"
}))

let diff = d1 - d2;
console.log(diff / 1000 / 60 / 60 /24)


const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
for (const element in arr) {
    if (element % 2 === 0) {
        console.log(element) // string
    }
}
for (const element of arr) {
    if (element % 2 === 0) {
        console.log(element) // number
    }
}

Functions in Depth
function f2(a,b,c,d,e){
    return "nothing.."
}

console.log(f2.length) // return number of argues a function takes

f2(function (a, b) { // anonymous function
    console.log(a ** b)
})

function f2(fnc) {
    fnc(2, 5)
}

console.log("1")
setTimeout(() => {
    console.log("SetTimeOut After 300")
}, 3000);
console.log("2")
fetchData()
console.log("3")
setTimeout(() => {
    console.log("SetTimeOut")
}, 0);
console.log("4")

// function fetchData() {
//     const res = "somthing";
//     console.log(res) // print at 3rd line
// }
async function fetchData() {
    const res = await fetch("https://dummyjson.com/comment");
    console.log(await res.json()) // print at last line
}

//  DOM Document Object Model
const body = document.querySelector("body");
const btn = document.getElementById("btn")

body.addEventListener("click", () => {
    console.log("Body is clicked")
})
btn.addEventListener("click", (e) => {
    e.stopPropagation()
    console.log("Butn is click")
})

const Btn2 = document.createElement("button");
Btn2.innerText = "Button ho"
body.appendChild(Btn2)

Btn2.addEventListener("click", (e) => {
    e.stopPropagation()
    btn.toggleAttribute("hidden")
})


function createCounter() {
    let count = 0;

    return {
        increment() {
            count++;
            console.log(count);
        },

        delayedIncrement() {
            setTimeout(() => {
                count++;
                console.log("Delayed:", count);
            }, 1000);
        }
    };
}

const counter1 = createCounter();
const counter2 = createCounter();

counter1.increment();
counter1.delayedIncrement();

counter2.increment();

setTimeout(() => {
    counter1.increment();
}, 500);

// Argumental Objects
function meraFunc() {
    console.log([arguments])
}

meraFunc(1, 2, 3) //{ '0': 1, '1': 2, '2': 3 }

// constructor function
function Perso(name, age) {
    this.name = name;
    this.age = age;
    return `Hi ${this.name}! You are ${this.age} Old`
}
console.log(Perso("HMK", 20))
console.log(Perso("HMKCode WEb", 3))

// Generator Function
function* counter() {
    yield 1;
    yield 2;
    yield 3;
}
const g = counter();
console.log(g.next()) // { value: 1, done: false }
console.log(g.next()) // { value: 2, done: false }
console.log(g.next()) // {  value: 3, done: false }
console.log(g.next())// { value: undefined, done: true }

const b = [1, 2, 3, 4, 5, 7, , , 9, 8]

console.log(b)
console.log(b.length)

const a = new Array(10).fill("*")

a.forEach((e) => {
    console.log(e, "_")
})

// Filter Map reduce functions
const b = [1, 2, 3, 4, 5, 7, 9, 8]
console.log(b.sort(() => Math.random() - 0.5)) // randomly shuffle arrayk

const a = [1, 2, 3, 4]
const b = [1, 2, 3, 4]
const c = [1, 2, 3, 4]

a.splice(1, 0, 8) // 0 mean place place at
b.splice(3, 1, 8) // 1 mean replace
c.splice(3, 0, 8) // 0 mean place place at
console.log(a) 
console.log(b)
console.log(c)

ForEach (elemnt,index,whole array)
Map () => return/create new 
const a = [1, 2, 3, 4]
let b = a.map((e) => e * 3)
console.log(b) //[ 3, 6, 9, 12 ]
Filter evaluate condition
Reduce (a,b) accept two argues first will be element and second will be variable
const a = [1, 2, 3, 4]
const result = a.reduce((a, b) => a + b, 0)
console.log(result)

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min)) + min;
console.log(getRandomNumber(1, 100))
console.log(getRandomNumber(1, 100))
Count the vowels in a string.
const countVowels = str => (str.match(/[aeiou]/gi) || []).length;
console.log(countVowels("hASSAANAHIDER"))

let s = "hassaan haider full stack developer";
let upper = "";
s = s.split(" ")
// console.log(s) //hassaan haider full stack developer
s.forEach((word) => {
    upper += word.charAt(0).toUpperCase() + word.slice(1) + " ";
});
console.log(upper)

CallBack Hell
console.log("run 1")
setTimeout(() => {
    console.log("run after 500")
    setTimeout(() => {
        console.log("run after 300")
        setTimeout(() => {
            console.log("run after 100")
        }, 100);
    }, 300);
}, 500);
console.log("run 2")

console.log("run 3")


Promises
 async await 
const oneFun = async (url) => {
    console.log("Function One Start")
    const data = await fetch(url);
    const resutl = await data.json();
    console.log("Function One Finished")
}

const TwoFun = async (url) => {
    console.log("Function Two Start")
    const data = await fetch(url);
    const resutl = await data.json();
    console.log("Function Two Finished")
}

oneFun('https://api.escuelajs.co/api/v1/products')
TwoFun("https://api.escuelajs.co/api/v1/products")
function someAPi() {
    let p1 = new Promise((resolve, reject) => {
        console.log("Me Promise hn");
        if (true) {
            resolve()
        } else {
            reject()
        }
    })
    return p1;
}
let p1 = someAPi();
p1.then(() => {
    console.log("Promise full filled then run")
}, () => {
    console.log("Promise rejected then run")
})
p1.catch(() => {
    console.log("Promise rejected then run")
})

Primose Chaning
function someAPI1() {
    let p1 = new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Me Promise hn");
            if (true) {
                resolve()
            } else {
                reject()
            }
        }, 5000)
    })
    return p1;
}
function someAPI2() {
    let p2 = new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Me Promise hn");
            if (true) {
                resolve()
            } else {
                reject()
            }
        }, 4000)
    })
    return p2;
}
let p1 = someAPI1();
let p2 = someAPI2();
p1.then(() => {
    console.log("Promise full filled then run of 1")
}, () => {
    console.log("Promise rejected then run of 1")
})

p2.then(() => {
    console.log("Promise full filled then run of 2")
}, () => {
    console.log("Promise rejected then run of 1")
})

someAPI1().then(() => {
    console.log("Promise fulled 1");
    return someAPI2();
}, () => {
    console.log("erorr in 1")
}).then(() => {
    console.log("Promise full 2")
}, () => {
    console.log("reject 2")
})
*/



// Node practice

// console.log(process.platform)
// console.log(process.cwd())
// console.log(__dirname)
// console.log(__filename)

// const startHighResTime = process.hrtime.bigint();

// 3. Advanced console logging structures
// console.table([
//     { module: "Auth", status: "Active" },
//     { module: "Database", status: "Connecting" },
//     { module: "Database", status: "Connecting" },
// ]);

// console.time("LoopDuration");
// var h = "lajlksd"
// var h = "lajlksd"
// var h = "lajlksd"
// var h = "lajlksd"
// // for (let i = 0; i < 1_000_000; i++) { } // Quick loop
// console.timeEnd("LoopDuration");

// const endHighResTime = process.hrtime.bigint();
// console.log(`Precise execution took: ${endHighResTime - startHighResTime} nanoseconds.`);
// import fs from 'node:fs/promises';
// import path from "path"
// import os from "os"

// async function manageFiles() {
//     // const folderName = join(process.cwd(), "logs");
//     // const fileName = join(folderName, "serer.log");

//     // await fs.mkdir(folderName, { recursive: true });

//     // await fs.writeFile(fileName, 'Initial server status: Healthy\n');

//     // await fs.appendFile(fileName, 'New entry: User logged in\n');

//     // const content = await fs.readFile(fileName, 'utf-8');
//     // console.log("--- File Contents --- \n", content);
//     // const contenet = await fs.readdir(process.cwd());
//     // const contenet = await fs.readdir(join(process.cwd(), "BackEndTechPractice"));
//     // const contenet = await fs.watch(join(process.cwd(), "CSS.md"))
//     // console.log(contenet)
//     // console.log(path.resolve("images"));
//     // console.log(path.parse(path.join(process.cwd(),"DSAWithJS.js")));
//     console.log(process.chdir(path.join(process.cwd())))
// }


// manageFiles()

// const myUrl = new URL("https://example.com/users?id=10&name=Ali");

// console.log(myUrl);
// console.log(myUrl.searchParams.get("name"));

// {              
//   href: 'https://example.com/users?id=10&name=Ali',
//   origin: 'https://example.com',
//   protocol: 'https:',
//   username: '',
//   password: '',
//   host: 'example.com',
//   hostname: 'example.com',
//   port: '',
//   pathname: '/users',
//   search: '?id=10&name=Ali',
//   searchParams: URLSearchParams { 'id' => '10', 'name' => 'Ali' },
//   hash: ''
// }

// console.log(os.networkInterfaces())

// console.log(process.argv)

// import { EventEmitter } from 'node:events';

// class OrderService extends EventEmitter { }
// const orderService = new OrderService();

// // Register listeners
// orderService.on('payment_success', (orderId, amount) => {
//     console.log(`[Email Service] Receipt sent for order ${orderId} ($${amount})`);
// });

// orderService.once('payment_success', () => {
//     console.log(`[Analytics] This metric runs only on the first payment success!`);
//     orderService.emit("payment", "IDyahapr")
// });

// orderService.on("payment", (id) => {
//     console.log(id)
// })

// // Triggering the event
// export default orderService;

// import fs from "node:fs"
// const readStream = fs.createReadStream("CSS.md");

// readStream.on("data", (chunk) => {
//     console.log(chunk.toString().replaceAll("|--",""));
// });

// import fs from 'node:fs';
// import { join } from 'node:path';
// import { pipeline } from 'node:stream/promises';
// import zlib from 'node:zlib';

// async function compressLogFile() {
//   // Gracefully stream data, zip it, and stream it back out to a file
//   await pipeline(
//     fs.createReadStream(join(process.cwd(),'logs/server.log')),
//     zlib.createGzip(),
//     fs.createWriteStream(join(process.cwd(),'logs/server.log.gz'))
//   );
//   console.log('Streaming compression completed without bloating RAM.');
// }


// compressLogFile().catch(console.error);

// import { Buffer } from "buffer"

// const buf= Buffer.from(" ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijlmnopqrstuvwxyz","utf8")
// console.log(buf.toString())
// const crypto = require("node:crypto");

// console.log(
//     crypto.randomBytes(16).toString("hex")
// );

// import { promisify } from 'node:util';
// const { generateKeyPair, sign, verify } = await import('node:crypto');

// const { publicKey, privateKey } = await promisify(generateKeyPair)('ed25519');
// // console.log(publicKey,"/n",privateKey)
// // A KeyObject holds the parsed key in memory and can be reused
// // across multiple operations without re-parsing.
// const data = new TextEncoder().encode('message to sign');
// const signature = sign(null, data, privateKey);
// console.log(signature)
// console.log(verify(null, "message to sign", publicKey, signature))

// const crypto = require("node:crypto");

// const algorithm = "aes-256-cbc";
// const key = crypto.randomBytes(32);
// const iv = crypto.randomBytes(16);

// const cipher = crypto.createCipheriv(
//     algorithm,
//     key,
//     iv
// );

// let encrypted = cipher.update(
//     "Hello",
//     "utf8",
//     "hex"
// );

// encrypted += cipher.final("hex");

// console.log(encrypted);

// const zlib = require("node:zlib");

// zlib.gzip("Hello World", (err, buffer) => {
//     console.log(buffer);
// });

// const { spawn } = require('child_process');
// const path = require('path');

// // Target the script file path
// const scriptPath = path.join(__dirname, 'app.py');

// // Spawn the python process with arguments
// // Use 'python3' instead of 'python' depending on your OS configuration
// const pythonProcess = spawn('python', [scriptPath, 'John', 'Doe']);

// const { execFile } = require("node:child_process");

// // const child =spawn("cmd", ["/c", "dir"]);

// // child.stdout.on("data", data => {
// //     console.log(data.toString());
// // });

// execFile("npm", ["-v"], (err, stdout) => {

//     console.log(stdout);

// });

// const { isMainThread, Worker, parentPort } = require("node:worker_threads");

// const workder = new Worker("./worker.js", { workerData: 100 })
// // console.log(workder)
// // console.log(isMainThread,"this is in parent");
// workder.on("message", (msg) => {
//     console.log(msg)
// })

// const { performance } = require("node:perf_hooks");

// const start = performance.now();

// for (let i = 0; i < 10000e6; i++) {}

// const end = performance.now();

// console.log(end - start,"ms");

// const { performance } = require("node:perf_hooks");

// performance.mark("start");

// for(let i=0;i<10e8;i++){}

// performance.mark("end");

// performance.measure(
//     "Loop Time",
//     "start",
//     "end"
// );

// console.log(
//     performance.getEntriesByType("measure")
// );


// const net=require("node:net");

// const server=net.createServer(socket=>{

//     socket.write("Hello");
//    socket.write("How are you")
// });

// server.listen(3000);

// import util from "node:util"
// import fs from 'node:fs'
// import { join } from "node:path";

// const readFile = util.promisify(fs.readFile)

// async function main(fileName) {
//     const data = await readFile(fileName, "utf8");
//     console.log(data)
// }
// main(join(process.cwd(), "Prisma.md"))

// const util = require("node:util");
// const obj = {
//     user: {
//         profile: {
//             skills: ["Node", "React"]
//         }
//     }
// };

// console.log(obj);

// console.log(
//     util.inspect(obj,{
//         depth: null,
//         // color : true
//         showHidden: true
//     })
// );


// const util = require("node:util");

// const result = util.formatWithOptions(
//     {
//         colors: true
//     },
//     "%O",
//     {
//         name: "Hassaan"
//     }
// );

// console.log(result);

// const util = require("node:util");

// function greet(name) {
//     return `Hello ${name}`;
// }

// const oldGreet = util.deprecate(
//     greet,
//     "greet() is deprecated. Use greetUser() instead."
// );

// console.log(oldGreet("Ali"));


// console.log(Object.keys(require.cache))

// console.log(import.meta.url);
// console.log(__dirname)
// console.log(__filename)
// import { fileURLToPath } from "node:url";

// // const __filename = fileURLToPath(import.meta.url);
// const __dirname = fileURLToPath(import.meta.dirname);

// // console.log(__filename);
// console.log(__dirname);

