# 🚀 MERN Stack Senior Developer Interview Guide
### Full Explanations with Code Examples — JavaScript → React → Node → Express → MongoDB → Mongoose → System Design

> Every question is answered with a minimum 10-line explanation and working code snippets, written from a **Senior Engineer's perspective**.

---

## Table of Contents

1. [JavaScript (Core & Modern ES6+)](#1-javascript-core--modern-es6)
2. [React.js](#2-reactjs)
3. [Node.js](#3-nodejs)
4. [Express.js](#4-expressjs)
5. [MongoDB](#5-mongodb)
6. [Mongoose](#6-mongoose)
7. [Full Stack Integration & Architecture](#7-full-stack-integration--architecture)
8. [AI Integration with MERN](#8-ai-integration-with-mern)
9. [Security & Authentication](#9-security--authentication)
10. [Testing & DevOps](#10-testing--devops)
11. [Performance & Optimization](#11-performance--optimization)
12. [System Design & Scalability](#12-system-design--scalability)

---

## 1. JavaScript (Core & Modern ES6+)

### 🟢 Basic

---

### Q1. What is the difference between `var`, `let`, and `const`?

`var` is the oldest way to declare variables in JavaScript and is **function-scoped** — meaning it lives within the nearest enclosing function, not block. It is also **hoisted** to the top of its scope with an initial value of `undefined`, which can lead to subtle bugs. `let` and `const` were introduced in ES6 and are both **block-scoped**, meaning they are confined to the nearest `{}` block (if-statement, loop, etc.). The key difference between `let` and `const` is that `let` allows reassignment while `const` does not — however, `const` does **not** make objects or arrays immutable; it only prevents the variable binding from being reassigned. In a senior codebase, you should default to `const`, use `let` only when reassignment is needed, and avoid `var` entirely to prevent hoisting surprises and scope leaks.

```javascript
// var — function-scoped, hoisted, can be re-declared
function varExample() {
  if (true) {
    var x = 10; // hoisted to function scope
  }
  console.log(x); // 10 — accessible outside the if block!
}

// let — block-scoped
function letExample() {
  if (true) {
    let y = 20;
  }
  // console.log(y); // ReferenceError: y is not defined
}

// const — block-scoped, no reassignment
const PI = 3.14159;
// PI = 3; // TypeError: Assignment to constant variable

// const with objects — reference is fixed, contents are mutable
const user = { name: "Alice" };
user.name = "Bob"; // ✅ Allowed — mutating the object
// user = {};      // ❌ Error — can't reassign the binding

// var hoisting trap
console.log(a); // undefined (not ReferenceError)
var a = 5;

// let/const TDZ (Temporal Dead Zone)
// console.log(b); // ReferenceError
let b = 5;
```

---

### Q2. What is hoisting in JavaScript?

Hoisting is JavaScript's default behavior of moving **declarations** to the top of their scope during the compilation phase, before code executes. It is important to understand that only **declarations** are hoisted, not **initializations**. Function declarations are fully hoisted (both the name and the body), which means you can call a function before it appears in the code. `var` declarations are hoisted with a value of `undefined` until the line of assignment is reached. `let` and `const` are also hoisted but are placed in a **Temporal Dead Zone (TDZ)** — accessing them before their declaration throws a `ReferenceError`. Class declarations are also hoisted but in TDZ. Understanding hoisting prevents bugs where you access variables before they're ready and is a common senior interview topic.

```javascript
// Function declaration — fully hoisted
greet(); // ✅ Works: "Hello!"
function greet() {
  console.log("Hello!");
}

// Function expression — NOT hoisted
// sayBye(); // TypeError: sayBye is not a function
var sayBye = function () {
  console.log("Bye!");
};

// var hoisting example
console.log(score); // undefined (declaration hoisted, not assignment)
var score = 100;
console.log(score); // 100

// Under the hood, JS interprets the above as:
var score;           // hoisted
console.log(score);  // undefined
score = 100;
console.log(score);  // 100

// let/const — Temporal Dead Zone
// console.log(points); // ReferenceError: Cannot access 'points' before initialization
let points = 50;

// Hoisting in loops — classic bug with var
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // prints 3, 3, 3 (not 0, 1, 2)
}
// Fix: use let
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log(j), 100); // prints 0, 1, 2 ✅
}
```

---

### Q3. Explain `==` vs `===`

The `==` operator performs **loose equality** with **type coercion** — JavaScript attempts to convert both operands to the same type before comparing. This can produce surprising results, such as `0 == false` being `true` or `null == undefined` being `true`. The `===` operator performs **strict equality**, comparing both **value and type** without any coercion, making it far more predictable and safe. In production code, always use `===` to avoid accidental type coercion bugs. The only common exception is intentionally checking `null == undefined` (both are falsy in the same way) using `==`, but even that is better replaced with explicit checks. Knowing the coercion rules helps you reason about legacy code that still uses `==`.

```javascript
// == (Loose equality with type coercion)
console.log(0 == false);      // true  — false coerces to 0
console.log("" == false);     // true  — both coerce to 0
console.log(null == undefined); // true — special rule
console.log(1 == "1");        // true  — string coerces to number
console.log([] == false);     // true  — [] → "" → 0, false → 0

// === (Strict equality — no coercion)
console.log(0 === false);     // false — different types
console.log(1 === "1");       // false — different types
console.log(null === undefined); // false — different types

// Practical safe patterns
const value = getUserInput(); // could be null, undefined, string, or number

// Bad
if (value == null) { /* matches null AND undefined */ }

// Good — explicit and readable
if (value === null || value === undefined) { /* clear intent */ }

// Even better with optional chaining
const name = user?.profile?.name ?? "Anonymous";

// NaN special case — NaN !== NaN
console.log(NaN === NaN); // false — use Number.isNaN()
console.log(Number.isNaN(NaN)); // true ✅
```

---

### Q4. What are the primitive data types in JavaScript?

JavaScript has **7 primitive types**: `String`, `Number`, `BigInt`, `Boolean`, `undefined`, `null`, and `Symbol`. Primitives are **immutable** and stored by **value** on the stack, meaning when you assign a primitive to another variable, you get a full independent copy. This is in contrast to **reference types** (objects, arrays, functions) which are stored by reference on the heap. Understanding this distinction is crucial for avoiding bugs when comparing or copying values. `BigInt` (ES2020) was introduced to handle integers larger than `Number.MAX_SAFE_INTEGER` (2^53 - 1). `Symbol` creates globally unique identifiers, useful for avoiding property key collisions in libraries. `typeof null === 'object'` is a famous JavaScript bug that has persisted since the language's inception.

```javascript
// All 7 primitive types
const str = "Hello";           // String
const num = 42;                // Number
const big = 9007199254740993n; // BigInt (note the 'n' suffix)
const bool = true;             // Boolean
let undef;                     // undefined (no assignment)
const nothing = null;          // null (intentional absence)
const sym = Symbol("id");      // Symbol (always unique)

// Primitives are immutable — operations return new values
let name = "Alice";
name.toUpperCase(); // returns "ALICE" but doesn't mutate 'name'
console.log(name); // "Alice" — unchanged

// Primitives are copied by value
let a = 10;
let b = a;
b = 20;
console.log(a); // 10 — unchanged

// typeof checks
console.log(typeof "hello");    // "string"
console.log(typeof 42);         // "number"
console.log(typeof 42n);        // "bigint"
console.log(typeof true);       // "boolean"
console.log(typeof undefined);  // "undefined"
console.log(typeof null);       // "object" ⚠️ historic bug in JS
console.log(typeof Symbol());   // "symbol"

// Correct null check
const val = null;
console.log(val === null); // true ✅

// BigInt usage for large integers
const maxSafe = Number.MAX_SAFE_INTEGER; // 9007199254740991
console.log(maxSafe + 1 === maxSafe + 2); // true (precision lost!)
const bigNum = 9007199254740991n;
console.log(bigNum + 1n === bigNum + 2n); // false ✅ exact arithmetic
```

---

### Q5. What is the difference between `null` and `undefined`?

Both `null` and `undefined` represent the absence of a value, but they convey different semantics. `undefined` is the **default** state — JavaScript automatically assigns it when a variable is declared but not given a value, when a function parameter is not passed, or when accessing a non-existent object property. `null`, on the other hand, is an **intentional** empty value — a developer explicitly assigns it to indicate "no value here." In practice, you set `null` purposefully (e.g., clearing a reference), while `undefined` typically indicates something hasn't been set up yet. When using `typeof`, `undefined` returns `"undefined"`, but `typeof null` returns `"object"` (a historic language bug). In MongoDB/Mongoose, storing `null` in a field is different from a field being absent (`undefined`), which matters for queries.

```javascript
// undefined — JavaScript assigns it automatically
let uninitialized;           // undefined by default
console.log(uninitialized);  // undefined

function greet(name) {
  console.log(name);         // undefined if not passed
}
greet(); // undefined

const obj = { a: 1 };
console.log(obj.b);          // undefined — property doesn't exist

// null — developer sets it intentionally
let currentUser = null;      // explicitly no user logged in
currentUser = { id: 1, name: "Alice" }; // assign user on login
currentUser = null;          // clear on logout

// Comparison
console.log(null == undefined);  // true  (loose)
console.log(null === undefined); // false (strict)

// Practical null-checks in a MERN API
function getUserById(id) {
  const user = db.find(id);
  return user ?? null; // explicitly null if not found
}

const user = getUserById(999);
if (user === null) {
  res.status(404).json({ error: "User not found" });
}

// Nullish coalescing (??) vs OR (||)
const count = 0;
console.log(count || "default"); // "default" — 0 is falsy!
console.log(count ?? "default"); // 0 — only null/undefined trigger ??
```

---

### Q6. What is a closure in JavaScript?

A closure is a function that **retains access to its outer (lexical) scope** even after the outer function has finished executing. When a function is created, it captures a reference to the surrounding variable environment — not just a snapshot copy. This means the inner function can read and modify those variables even when called much later. Closures are foundational to many JavaScript patterns: **data encapsulation** (private variables), **factory functions**, **event handlers** that remember state, **memoization**, and the **module pattern**. Every function in JavaScript forms a closure over its surrounding scope. In a senior interview, you should demonstrate closures being used to encapsulate private state, create function factories, and implement partial application.

```javascript
// Basic closure — inner function accesses outer variable
function makeCounter() {
  let count = 0; // private variable — not accessible outside

  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count,
  };
}

const counter = makeCounter();
counter.increment(); // 1
counter.increment(); // 2
counter.decrement(); // 1
console.log(counter.getCount()); // 1
// console.log(count); // ReferenceError — count is private!

// Closure in factory functions
function multiplierFactory(factor) {
  return (number) => number * factor; // closes over 'factor'
}

const double = multiplierFactory(2);
const triple = multiplierFactory(3);
console.log(double(5));  // 10
console.log(triple(5));  // 15

// Closures in async/event handlers
function setupButton(buttonId) {
  let clicks = 0;
  document.getElementById(buttonId).addEventListener("click", () => {
    clicks++; // closes over 'clicks'
    console.log(`Button ${buttonId} clicked ${clicks} times`);
  });
}

// Practical: middleware closure in Express
function requireRole(role) {
  return (req, res, next) => { // closes over 'role'
    if (req.user.role !== role) {
      return res.status(403).json({ error: "Forbidden" });
    }
    next();
  };
}
app.get("/admin", requireRole("admin"), adminController);
```

---

### Q7. What is the event loop?

The JavaScript event loop is the mechanism that allows single-threaded JS to handle **asynchronous operations** without blocking. The runtime has a **call stack** (executes synchronous code), a **heap** (memory), a **callback queue** (macrotasks like setTimeout), and a **microtask queue** (Promises, `queueMicrotask`). The event loop's job is simple: check if the call stack is empty, drain all microtasks first, then take one macrotask from the queue and execute it, then drain microtasks again, and repeat. This order — **microtasks before macrotasks** — is critical to understand for predicting async execution order. Node.js extends this with phases: timers, pending callbacks, poll, check (setImmediate), and close callbacks, each with their own queue.

```javascript
// Understanding the execution order
console.log("1 — synchronous");

setTimeout(() => console.log("2 — macrotask (setTimeout)"), 0);

Promise.resolve().then(() => console.log("3 — microtask (Promise)"));

queueMicrotask(() => console.log("4 — microtask (queueMicrotask)"));

console.log("5 — synchronous");

// Output order:
// 1 — synchronous
// 5 — synchronous
// 3 — microtask (Promise)     ← microtasks drain before macrotasks
// 4 — microtask (queueMicrotask)
// 2 — macrotask (setTimeout)

// Nested microtasks vs macrotasks
setTimeout(() => {
  console.log("timeout 1");
  Promise.resolve().then(() => console.log("promise inside timeout"));
}, 0);

setTimeout(() => console.log("timeout 2"), 0);

// Output: timeout 1 → promise inside timeout → timeout 2
// Microtask from inside timeout 1 runs before timeout 2!

// Practical example — why API calls don't block UI
async function fetchData() {
  console.log("Start fetch");             // sync
  const data = await fetch("/api/data");  // async — yields control
  console.log("Data received");           // runs after event loop iteration
}
fetchData();
console.log("This runs before 'Data received'"); // sync runs first
```

---

### Q8. What is the difference between `forEach`, `map`, `filter`, and `reduce`?

These four array methods are the backbone of functional programming in JavaScript. `forEach` iterates over each element and executes a callback but **returns `undefined`** — it is used purely for side effects (logging, mutations). `map` transforms each element and returns a **new array of the same length** — essential for data transformations. `filter` tests each element against a predicate and returns a **new array with only matching elements**, potentially shorter than the original. `reduce` is the most powerful — it accumulates all elements into a **single value** (number, string, object, or even another array) using a reducer function and an initial accumulator. Senior developers chain these methods fluently and know when to use `reduce` to combine transformations that would otherwise require multiple passes.

```javascript
const products = [
  { name: "Laptop", price: 999, category: "electronics", inStock: true },
  { name: "Phone", price: 699, category: "electronics", inStock: false },
  { name: "Desk", price: 299, category: "furniture", inStock: true },
  { name: "Chair", price: 199, category: "furniture", inStock: true },
];

// forEach — side effects only, no return value
products.forEach((p) => console.log(p.name));
// returns undefined

// map — transform each item, same length array returned
const prices = products.map((p) => p.price);
// [999, 699, 299, 199]

const summaries = products.map((p) => ({
  label: `${p.name} - $${p.price}`,
  available: p.inStock,
}));

// filter — keep only matching items
const inStockItems = products.filter((p) => p.inStock);
// [Laptop, Desk, Chair]

const electronics = products.filter((p) => p.category === "electronics");

// reduce — accumulate into a single value
const totalValue = products.reduce((acc, p) => acc + p.price, 0);
// 2196

// Grouping with reduce
const byCategory = products.reduce((acc, p) => {
  if (!acc[p.category]) acc[p.category] = [];
  acc[p.category].push(p);
  return acc;
}, {});
// { electronics: [...], furniture: [...] }

// Chaining — only in-stock electronics, get total price
const totalElectronicsInStock = products
  .filter((p) => p.category === "electronics" && p.inStock)
  .map((p) => p.price)
  .reduce((sum, price) => sum + price, 0);
// 999
```

---

### Q9. What is a Promise in JavaScript?

A `Promise` is an object representing the **eventual completion or failure** of an asynchronous operation. It acts as a placeholder for a value that isn't available yet. A Promise exists in one of three states: **pending** (initial state, neither fulfilled nor rejected), **fulfilled** (operation succeeded, has a value), or **rejected** (operation failed, has a reason/error). Once a Promise settles (either fulfills or rejects), it **cannot change state** — it is immutable from that point forward. Promises chain with `.then()`, `.catch()`, and `.finally()`, enabling clean sequential async workflows without callback hell. `Promise.all()`, `Promise.allSettled()`, `Promise.race()`, and `Promise.any()` allow coordinating multiple concurrent async operations. Modern code uses `async/await` on top of Promises for even cleaner syntax.

```javascript
// Creating a Promise
const fetchUser = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({ id, name: "Alice" }); // fulfill with value
      } else {
        reject(new Error("Invalid user ID")); // reject with error
      }
    }, 1000);
  });
};

// .then / .catch chaining
fetchUser(1)
  .then((user) => {
    console.log("User:", user);
    return fetchUser(2); // return another promise — chaining
  })
  .then((user2) => console.log("User 2:", user2))
  .catch((err) => console.error("Error:", err.message))
  .finally(() => console.log("Done")); // always runs

// Promise combinators
// Promise.all — all must succeed, fail fast on any rejection
const [user, posts, comments] = await Promise.all([
  fetchUser(1),
  fetchPosts(1),
  fetchComments(1),
]);

// Promise.allSettled — get results regardless of success/failure
const results = await Promise.allSettled([fetchUser(1), fetchUser(-1)]);
results.forEach((r) => {
  if (r.status === "fulfilled") console.log("✅", r.value);
  else console.log("❌", r.reason);
});

// Promise.race — first to settle wins (useful for timeouts)
const timeout = new Promise((_, reject) =>
  setTimeout(() => reject(new Error("Timeout")), 5000)
);
const data = await Promise.race([fetchUser(1), timeout]);

// Promisifying a callback-based function
const readFile = (path) =>
  new Promise((resolve, reject) =>
    fs.readFile(path, "utf8", (err, data) =>
      err ? reject(err) : resolve(data)
    )
  );
```

---

### Q10. What is the difference between synchronous and asynchronous code?

**Synchronous** code executes line by line in sequence — each operation must complete before the next one starts. This means an expensive operation (like a network request or file read) **blocks** all subsequent code from running, freezing the UI or hanging the server. **Asynchronous** code allows operations to be initiated and then execution continues without waiting for their completion — the result is handled via callbacks, Promises, or `async/await` when it's eventually ready. JavaScript's single-threaded nature makes async essential: blocking the thread blocks everything. In a Node.js server context, synchronous I/O would mean one slow request blocks all others. The event loop, callbacks, Promises, and async/await are all tools for managing async code effectively without blocking.

```javascript
// ❌ Synchronous I/O in Node.js — BLOCKS the entire process
const fs = require("fs");

const data = fs.readFileSync("large-file.txt", "utf8"); // blocks!
console.log("File read"); // won't run until readFileSync finishes
processRequest(); // ALL other requests wait during the file read

// ✅ Asynchronous I/O — non-blocking
fs.readFile("large-file.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log("File read");
}); // continues immediately without waiting
handleOtherRequests(); // runs right away, doesn't block

// ✅ Modern async/await pattern
async function readFileAsync() {
  try {
    const data = await fs.promises.readFile("large-file.txt", "utf8");
    console.log("File read:", data.length, "bytes");
    return data;
  } catch (err) {
    console.error("Failed to read file:", err);
  }
}

// Real-world Express route — async database operation
app.get("/users/:id", async (req, res) => {
  try {
    // Non-blocking DB query — other requests can be handled while waiting
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "Not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});
```

---

### 🟡 Intermediate

---

### Q11. Explain `async/await` and how it works under the hood

`async/await` is **syntactic sugar over Promises** that makes asynchronous code look and behave more like synchronous code. An `async` function always returns a Promise — even if you return a plain value, it's wrapped in `Promise.resolve()`. The `await` keyword pauses execution **within the async function** (not globally) until the Promise resolves, then resumes with the resolved value. Under the hood, the JavaScript engine compiles `async/await` into a state machine based on **generators** (`function*` with `yield`). Each `await` point creates a new state, and the function yields control back to the event loop, which can process other tasks while waiting. This is why other requests are still handled while your `await` call is pending — only that specific async function is paused, not the thread.

```javascript
// async/await basic syntax
async function fetchUserData(userId) {
  // Pauses here, but event loop still processes other code
  const user = await User.findById(userId);
  const posts = await Post.find({ userId }); // sequential
  return { user, posts };
}

// Parallel async operations — don't await sequentially if independent!
async function fetchUserDataParallel(userId) {
  // ❌ Sequential — slow (waits for each before starting next)
  // const user = await User.findById(userId);
  // const posts = await Post.find({ userId });

  // ✅ Parallel — both start simultaneously
  const [user, posts] = await Promise.all([
    User.findById(userId),
    Post.find({ userId }),
  ]);
  return { user, posts };
}

// Error handling with try/catch
async function safeCreateUser(data) {
  try {
    const user = await User.create(data);
    await sendWelcomeEmail(user.email); // another async op
    return { success: true, user };
  } catch (err) {
    if (err.code === 11000) {
      throw new Error("Email already exists");
    }
    throw err; // re-throw unexpected errors
  }
}

// Under the hood — equivalent generator version
function* fetchUserGen(userId) {
  const user = yield User.findById(userId); // yields a Promise
  const posts = yield Post.find({ userId });
  return { user, posts };
}
// The async runtime "runs" this generator, resolving each yielded Promise

// async IIFE for top-level await in older environments
(async () => {
  const result = await fetchUserData(1);
  console.log(result);
})();
```

---

### Q12. What is the prototype chain?

JavaScript uses **prototypal inheritance** — every object has an internal `[[Prototype]]` property (accessible via `Object.getPrototypeOf()` or `__proto__`) pointing to another object called its **prototype**. When you access a property on an object and it doesn't exist there, JavaScript walks up the **prototype chain** looking for it in each parent prototype until it reaches `Object.prototype`, whose prototype is `null` (the end of the chain). This chain is how all objects "inherit" methods like `.toString()`, `.hasOwnProperty()`, etc. — they're defined on `Object.prototype`. Classes in ES6 are syntactic sugar over prototype-based inheritance. Understanding prototypes helps explain how `instanceof`, `Object.create()`, `class extends`, and method lookup all work under the hood.

```javascript
// Prototype chain visualization
const animal = {
  speak() {
    return `${this.name} makes a sound`;
  },
};

const dog = Object.create(animal); // dog's prototype IS animal
dog.name = "Rex";
dog.bark = function () {
  return "Woof!";
};

console.log(dog.bark());   // "Woof!" — own method
console.log(dog.speak());  // "Rex makes a sound" — found on prototype
console.log(dog.toString()); // found on Object.prototype (end of chain)

// Prototype chain inspection
console.log(Object.getPrototypeOf(dog) === animal); // true
console.log(Object.getPrototypeOf(animal) === Object.prototype); // true
console.log(Object.getPrototypeOf(Object.prototype)); // null (end!)

// Class syntax — syntactic sugar over prototypes
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return `${this.name} makes a sound`;
  }
}

class Dog extends Animal {
  bark() {
    return "Woof!";
  }
}

const rex = new Dog("Rex");
rex.bark();   // own prototype method
rex.speak();  // inherited via prototype chain

// Inspecting class prototype
console.log(rex.__proto__ === Dog.prototype);          // true
console.log(Dog.prototype.__proto__ === Animal.prototype); // true
console.log(typeof Dog); // "function" — classes are functions!

// hasOwnProperty — distinguishes own vs inherited
console.log(rex.hasOwnProperty("name")); // true — own property
console.log(rex.hasOwnProperty("speak")); // false — inherited
```

---

### Q13. What are higher-order functions?

A **higher-order function (HOF)** is a function that either **takes one or more functions as arguments** or **returns a function** (or both). This is a first-class feature of functional programming enabled by JavaScript treating functions as first-class values — they can be stored in variables, passed as arguments, and returned from other functions. HOFs enable powerful patterns like composition, currying, partial application, and the creation of reusable abstractions. All built-in array methods (`map`, `filter`, `reduce`, `sort`, `find`, `every`, `some`) are higher-order functions. In a senior codebase, HOFs reduce boilerplate and separate "what to do" from "how to iterate." Middleware in Express, decorators, and React's HOCs are all HOF patterns.

```javascript
// HOF taking a function as argument
function applyTwice(fn, value) {
  return fn(fn(value));
}
const addTen = (n) => n + 10;
console.log(applyTwice(addTen, 5)); // 25

// HOF returning a function (factory pattern)
function createValidator(min, max) {
  return (value) => value >= min && value <= max;
}
const isValidAge = createValidator(0, 120);
const isValidScore = createValidator(0, 100);
console.log(isValidAge(25));   // true
console.log(isValidScore(150)); // false

// Function composition
const compose = (...fns) => (x) => fns.reduceRight((v, f) => f(v), x);
const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

const sanitize = pipe(
  (str) => str.trim(),
  (str) => str.toLowerCase(),
  (str) => str.replace(/[^a-z0-9]/g, "")
);
console.log(sanitize("  Hello World! ")); // "helloworld"

// HOF in Express middleware factory
function rateLimit(requestsPerMinute) {
  const requests = new Map();
  return (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();
    const windowStart = now - 60000;
    const userRequests = (requests.get(ip) || []).filter(t => t > windowStart);
    if (userRequests.length >= requestsPerMinute) {
      return res.status(429).json({ error: "Too many requests" });
    }
    requests.set(ip, [...userRequests, now]);
    next();
  };
}
app.use(rateLimit(100));
```

---

### Q14. What is the `this` keyword, and how is its context determined?

`this` in JavaScript refers to the **execution context** of a function — specifically, the object that "owns" the call. The value of `this` is **not determined by where a function is defined** but by **how it is called**. In the global scope (non-strict mode), `this` is the `window` (browser) or `global` (Node.js) object. In a method call (`obj.method()`), `this` is `obj`. In a constructor (`new Fn()`), `this` is the newly created object. Arrow functions are the exception — they **do not have their own `this`** and instead **lexically inherit** `this` from their enclosing scope. This makes arrow functions ideal for callbacks inside methods to avoid `this` losing its context. `call()`, `apply()`, and `bind()` allow explicit `this` binding.

```javascript
// 1. Global context
console.log(this); // window (browser) / {} or global (Node.js)

// 2. Object method — this = the object
const person = {
  name: "Alice",
  greet() {
    return `Hi, I'm ${this.name}`; // this = person
  },
};
console.log(person.greet()); // "Hi, I'm Alice"

// 3. Method reference loses 'this'
const greetFn = person.greet;
// greetFn(); // TypeError or undefined name — 'this' is now global/undefined

// 4. Arrow functions — lexical 'this'
const timer = {
  seconds: 0,
  start() {
    setInterval(() => {
      this.seconds++; // 'this' is 'timer' — captured lexically
      console.log(this.seconds);
    }, 1000);
  },
};

// Without arrow function, 'this' would be undefined (strict) or global
// With regular function: setInterval(function() { this.seconds++ }) // broken!

// 5. Constructor — this = new object
class User {
  constructor(name) {
    this.name = name; // 'this' is the new instance
    this.greet = () => `Hi from ${this.name}`; // arrow — safe in constructor
  }
}

// 6. Explicit binding with call/apply/bind
function introduce(greeting) {
  return `${greeting}, I'm ${this.name}`;
}
const alice = { name: "Alice" };
console.log(introduce.call(alice, "Hello"));    // "Hello, I'm Alice"
console.log(introduce.apply(alice, ["Hey"]));   // "Hey, I'm Alice"
const boundIntroduce = introduce.bind(alice);
console.log(boundIntroduce("Hi"));              // "Hi, I'm Alice"
```

---

### Q15. What is the difference between `call`, `apply`, and `bind`?

All three methods on `Function.prototype` allow you to **explicitly set the `this` context** of a function. The difference lies in how arguments are passed and when the function executes. `call` **invokes the function immediately** and accepts arguments **individually** (comma-separated). `apply` also **invokes immediately** but accepts arguments as an **array** — historically useful before the spread operator. `bind` **does not invoke the function** — instead, it returns a **new function** permanently bound to the specified `this`, which can be called later with any number of arguments. In modern code, `bind` is commonly used to create pre-bound event handlers or method references. The spread operator has largely replaced `apply` for array arguments.

```javascript
function formatName(greeting, punctuation) {
  return `${greeting}, ${this.firstName} ${this.lastName}${punctuation}`;
}

const user = { firstName: "John", lastName: "Doe" };

// call — invoke immediately, args spread out
console.log(formatName.call(user, "Hello", "!"));
// "Hello, John Doe!"

// apply — invoke immediately, args as array
console.log(formatName.apply(user, ["Hey", "."]));
// "Hey, John Doe."

// bind — returns new function, doesn't invoke
const boundFormat = formatName.bind(user, "Hi");
console.log(boundFormat("?")); // "Hi, John Doe?"
// 'greeting' is pre-filled with "Hi", only 'punctuation' needed

// Real-world use: bind in React (class components)
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    // Without bind, 'this' inside handleClick would be undefined
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({ count: this.state.count + 1 });
  }
}

// Modern alternative: arrow function (lexical this)
class CounterModern extends React.Component {
  state = { count: 0 };
  handleClick = () => { // arrow function — no bind needed
    this.setState({ count: this.state.count + 1 });
  };
}

// apply use case — spread array as args (legacy)
const numbers = [1, 5, 2, 8, 3];
console.log(Math.max.apply(null, numbers)); // 8
console.log(Math.max(...numbers));          // 8 — modern way with spread
```

---

### Q16. What is destructuring in ES6?

Destructuring is a powerful ES6 syntax that allows you to **unpack values from arrays or properties from objects** into distinct variables in a concise, readable way. Array destructuring uses position, while object destructuring uses property names. You can provide **default values** (used when the value is `undefined`), use **rest patterns** (`...rest`) to collect remaining items, and **rename** properties during destructuring with the alias syntax (`{ prop: alias }`). Destructuring is pervasive in modern JavaScript — function parameter destructuring, React's `useState` return pattern, Express's `req.body` unpacking, and API response handling all rely on it. It eliminates repetitive dot-notation access and makes code more expressive.

```javascript
// Object destructuring
const user = { name: "Alice", age: 30, email: "alice@example.com", role: "admin" };

const { name, age } = user;
console.log(name, age); // "Alice" 30

// Renaming during destructuring
const { name: userName, email: userEmail } = user;
console.log(userName, userEmail); // "Alice" "alice@example.com"

// Default values
const { role = "user", location = "Unknown" } = user;
console.log(role);     // "admin" — value exists, default ignored
console.log(location); // "Unknown" — not in object, default used

// Nested destructuring
const config = {
  db: { host: "localhost", port: 27017, name: "mydb" },
  server: { port: 3000 }
};
const { db: { host, port: dbPort }, server: { port: serverPort } } = config;
console.log(host, dbPort, serverPort); // "localhost" 27017 3000

// Array destructuring (position-based)
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first, second, rest); // 1 2 [3, 4, 5]

// Skip elements
const [, , third] = [1, 2, 3];
console.log(third); // 3

// Swap variables elegantly
let a = 1, b = 2;
[a, b] = [b, a];
console.log(a, b); // 2 1

// Function parameter destructuring (very common in MERN)
async function createUser({ name, email, password, role = "user" }) {
  const hashed = await bcrypt.hash(password, 10);
  return User.create({ name, email, password: hashed, role });
}

// Express route destructuring
app.post("/users", async (req, res) => {
  const { name, email, password } = req.body;
  // instead of: req.body.name, req.body.email, etc.
});

// React useState
const [count, setCount] = useState(0);
```

---

### Q17. What are generators in JavaScript?

A **generator** is a special function (declared with `function*`) that can **pause its execution** and **resume later**, yielding multiple values over time. When called, a generator function does not execute immediately — it returns an **iterator object**. Each call to `.next()` on the iterator resumes execution until the next `yield` statement, which pauses again and returns the yielded value along with a `done: false` flag. When the function returns (or has no more yields), `done: true` is set. Generators enable **lazy evaluation** (produce values on demand), **infinite sequences**, **async workflow control** (the mechanism behind `async/await` internally), and **custom iterables**. They're less commonly used directly in application code since `async/await` handles the most common use case, but understanding them shows deep JS knowledge.

```javascript
// Basic generator
function* counter(start = 0) {
  while (true) {
    yield start++;
  }
}

const gen = counter(1);
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }

// Finite generator — range utility
function* range(start, end, step = 1) {
  for (let i = start; i < end; i += step) {
    yield i;
  }
}

for (const num of range(0, 10, 2)) {
  console.log(num); // 0, 2, 4, 6, 8
}

// Generators as iterables
const uniqueId = (function* () {
  let id = 1;
  while (true) yield id++;
})();

console.log(uniqueId.next().value); // 1
console.log(uniqueId.next().value); // 2

// Two-way communication with next(value)
function* calculator() {
  let result = 0;
  while (true) {
    const input = yield result; // yield sends result, receives input
    result += input;
  }
}
const calc = calculator();
calc.next();      // start (first yield, result=0)
calc.next(5);     // result = 5
calc.next(3);     // result = 8
console.log(calc.next(2).value); // 10

// Generator-based pagination (lazy loading)
async function* fetchPages(url) {
  let page = 1;
  let hasMore = true;
  while (hasMore) {
    const data = await fetch(`${url}?page=${page}`).then(r => r.json());
    yield data.items;
    hasMore = data.hasNext;
    page++;
  }
}
for await (const items of fetchPages("/api/products")) {
  processItems(items);
}
```

---

### Q18. What is the difference between deep copy and shallow copy?

A **shallow copy** creates a new object with the same **top-level properties** as the original. For primitive values, the copy is independent. But for **nested objects or arrays**, the shallow copy only copies the **reference**, meaning both the original and copy point to the same nested object in memory — mutating the nested object in one affects the other. A **deep copy** recursively clones all levels of nesting, creating a fully independent clone where no references are shared. `Object.assign()` and the spread operator (`{...obj}`) create shallow copies. For deep copies, use `structuredClone()` (native, modern), `JSON.parse(JSON.stringify(obj))` (fast but loses functions, `undefined`, Dates become strings), or libraries like Lodash's `_.cloneDeep()`.

```javascript
const original = {
  name: "Alice",
  scores: [90, 85, 92],
  address: { city: "NYC", zip: "10001" },
};

// SHALLOW COPY — spread operator
const shallow = { ...original };

shallow.name = "Bob"; // primitive — doesn't affect original
shallow.scores.push(88); // ⚠️ mutates original.scores too!
shallow.address.city = "LA"; // ⚠️ mutates original.address too!

console.log(original.scores); // [90, 85, 92, 88] — mutated!
console.log(original.address.city); // "LA" — mutated!

// DEEP COPY — structuredClone (modern, native)
const deep1 = structuredClone(original);
deep1.scores.push(100);
deep1.address.city = "Chicago";
console.log(original.scores.length); // 3 — unchanged ✅
console.log(original.address.city);  // "NYC" — unchanged ✅

// JSON method — fast but with limitations
const deep2 = JSON.parse(JSON.stringify(original));
// Loses: functions, undefined, Symbol, Dates (→ string), Map, Set, circular refs

// For complex objects use structuredClone or lodash
// structuredClone handles: Dates, Maps, Sets, ArrayBuffers, circular refs
const complex = {
  date: new Date(),
  map: new Map([["key", "value"]]),
  set: new Set([1, 2, 3]),
};
const cloned = structuredClone(complex);
console.log(cloned.date instanceof Date); // true ✅
console.log(cloned.map instanceof Map);   // true ✅

// Practical MERN example — safely updating state without mutation
const state = { users: [{ id: 1, name: "Alice" }], total: 1 };

// BAD: mutates original state
state.users[0].name = "Bob"; // direct mutation — buggy in React/Redux

// GOOD: immutable update pattern
const newState = {
  ...state,
  users: state.users.map((u) =>
    u.id === 1 ? { ...u, name: "Bob" } : u
  ),
};
```

---

### Q19. What is event delegation?

Event delegation is a technique where instead of attaching event listeners to **each individual child element**, you attach a **single listener to a parent element** and use **event bubbling** to catch events from children. When an event occurs on a child, it "bubbles up" through the DOM tree to the parent, where the handler can inspect `event.target` to determine which child triggered it and respond accordingly. This is highly efficient for **dynamic content** (children added/removed at runtime) because you don't need to re-attach listeners when new items are added. It also reduces **memory usage** by maintaining far fewer event listeners. The pattern is a cornerstone of performance optimization in DOM-heavy applications and the underlying mechanism of React's Synthetic Event system.

```javascript
// ❌ Without delegation — attaching to every item
const items = document.querySelectorAll(".list-item");
items.forEach((item) => {
  item.addEventListener("click", handleClick); // N listeners!
  // Also, new items added dynamically won't have this listener!
});

// ✅ With delegation — single listener on parent
const list = document.getElementById("item-list");

list.addEventListener("click", (event) => {
  // event.target = the element that was actually clicked
  const item = event.target.closest(".list-item");
  if (!item) return; // clicked outside an item

  const itemId = item.dataset.id;
  const action = event.target.dataset.action; // e.g., "delete", "edit"

  if (action === "delete") {
    deleteItem(itemId);
  } else if (action === "edit") {
    editItem(itemId);
  } else {
    selectItem(itemId);
  }
});

// Dynamic items automatically handled!
function addItem(id, text) {
  const li = document.createElement("li");
  li.className = "list-item";
  li.dataset.id = id;
  li.innerHTML = `
    ${text}
    <button data-action="edit">Edit</button>
    <button data-action="delete">Delete</button>
  `;
  list.appendChild(li); // No need to attach new event listeners
}

// Event bubbling — how delegation works
// Child click → parent click → grandparent click → ... → document
// event.stopPropagation() halts the bubbling

// React's synthetic event system uses delegation under the hood
// All events are attached to the root element (React 17+)
// and dispatched via delegation
```

---

### Q20. What are WeakMap and WeakSet?

`WeakMap` and `WeakSet` are special collection types that hold **weak references** to their keys/values (objects only), meaning they don't prevent JavaScript's garbage collector from reclaiming those objects when no other strong references exist. A regular `Map` or `Set` holding an object keeps it alive even if nothing else references it. `WeakMap` maps objects to values — its keys must be objects. `WeakSet` stores only objects. Neither is iterable (no `.size`, no `.forEach`, no iteration) because their contents can disappear at any time due to GC. This makes them ideal for **caches and metadata storage** tied to object lifetimes, **preventing memory leaks** in DOM element tracking, and storing **private data** associated with instances without leaking.

```javascript
// WeakMap — keys must be objects, values can be anything
const metadata = new WeakMap();

class Component {
  constructor(element) {
    metadata.set(this, { // 'this' as key — private data per instance
      element,
      handlers: [],
      created: Date.now(),
    });
  }

  addHandler(handler) {
    metadata.get(this).handlers.push(handler);
  }

  destroy() {
    const data = metadata.get(this);
    data.handlers = [];
    // When 'this' component is GC'd, metadata entry is GC'd too — no leak!
  }
}

// WeakMap for DOM element caching
const cache = new WeakMap();

function getComputedData(element) {
  if (cache.has(element)) return cache.get(element);
  const data = expensiveComputation(element);
  cache.set(element, data);
  return data;
  // When element is removed from DOM and GC'd, cache entry disappears automatically
}

// WeakSet — track visited objects without memory leak
const visited = new WeakSet();

function processNode(node) {
  if (visited.has(node)) return; // already processed
  visited.add(node);
  // process node...
  // When node is GC'd, WeakSet entry is cleaned up automatically
}

// Contrast: regular Map causes memory leak
const regularMap = new Map();
let obj = { id: 1 };
regularMap.set(obj, "data");
obj = null; // obj no longer referenced by us...
// BUT regularMap still holds a reference! obj won't be GC'd.

// WeakMap doesn't prevent GC
const weakMap = new WeakMap();
let obj2 = { id: 2 };
weakMap.set(obj2, "data");
obj2 = null; // obj2 CAN now be GC'd — weakMap won't hold it back
```

---

### 🔴 Advanced

---

### Q26. What is the difference between microtasks and macrotasks?

The JavaScript event loop processes asynchronous work in two distinct queues with **different priorities**. **Macrotasks** (also called tasks) include: `setTimeout`, `setInterval`, `setImmediate` (Node.js), I/O operations, and UI rendering. **Microtasks** include: resolved Promises (`.then`/`.catch`/`.finally`), `queueMicrotask()`, and `MutationObserver` callbacks. The critical rule is: **after every single macrotask completes, ALL pending microtasks are drained before the next macrotask runs**. This means microtasks have higher priority. Practically, this affects UI responsiveness (heavy microtask chains can delay rendering) and async order guarantees. In Node.js, `process.nextTick` runs before the microtask queue itself, making it the highest priority.

```javascript
// Execution order demonstration
console.log("Script start"); // sync

setTimeout(() => console.log("setTimeout"), 0);   // macrotask
setImmediate(() => console.log("setImmediate"));   // Node.js macrotask

Promise.resolve()
  .then(() => console.log("Promise 1"))            // microtask
  .then(() => console.log("Promise 2"));           // microtask (chained)

queueMicrotask(() => console.log("queueMicrotask")); // microtask

process.nextTick(() => console.log("nextTick"));   // before microtasks! (Node.js only)

console.log("Script end"); // sync

// Output order:
// Script start
// Script end
// nextTick        ← Node.js: runs before microtask queue
// Promise 1       ← microtask queue drained
// Promise 2       ← microtask queue (chained)
// queueMicrotask  ← microtask queue
// setTimeout      ← macrotask
// setImmediate    ← macrotask (after poll phase in Node.js)

// ⚠️ Starvation: endless microtasks block macrotasks!
// This will prevent setTimeout from ever running:
// function infiniteMicrotask() {
//   Promise.resolve().then(infiniteMicrotask); // never yields to macrotask queue
// }

// Practical implications for React
// State updates batched in microtasks — React 18 auto-batching
// renders are scheduled as macrotasks to not starve microtasks

// Node.js use case: process.nextTick for error propagation
class EventEmitter {
  on(event, handler) { /* ... */ }
  emit(event, data) {
    process.nextTick(() => {
      // Emit asynchronously but before I/O — safer for recursive scenarios
      this.listeners.forEach(l => l(data));
    });
  }
}
```

---

### Q30. Explain currying and partial application

**Currying** is the technique of transforming a function with multiple arguments into a **chain of functions**, each taking exactly one argument. `f(a, b, c)` becomes `f(a)(b)(c)`. **Partial application** is related but distinct — you pre-fill some arguments of a function and return a new function that takes the remaining ones. Not all arguments need to be fixed one at a time. Currying is named after mathematician Haskell Curry and is foundational in functional programming. In practice, curried and partially-applied functions create **reusable, specialized** versions of general functions. Libraries like Ramda and Lodash provide `curry()` and `partial()` utilities. In a MERN context, partial application is common for creating specialized middleware or query builders.

```javascript
// Regular function
function add(a, b, c) {
  return a + b + c;
}

// Manually curried version
function curriedAdd(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}
console.log(curriedAdd(1)(2)(3)); // 6

// Arrow function currying — concise
const curriedAdd2 = (a) => (b) => (c) => a + b + c;
const add5 = curriedAdd2(5);    // partially applied — a=5
const add5and3 = add5(3);       // partially applied — a=5, b=3
console.log(add5and3(2));        // 10

// Generic curry utility
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return (...moreArgs) => curried(...args, ...moreArgs);
  };
}

const curriedMultiply = curry((a, b, c) => a * b * c);
console.log(curriedMultiply(2)(3)(4)); // 24
console.log(curriedMultiply(2, 3)(4)); // 24 — flexible!

// Partial application with bind
function log(level, timestamp, message) {
  console.log(`[${level}] ${timestamp}: ${message}`);
}
const logError = log.bind(null, "ERROR"); // pre-fill level
const logInfo = log.bind(null, "INFO");

logError(new Date().toISOString(), "Something went wrong");

// Real-world: curried validator for API
const validate = (schema) => (data) => schema.parse(data);
const validateUser = validate(userSchema);
const validatePost = validate(postSchema);

app.post("/users", (req, res) => {
  const user = validateUser(req.body); // reusable
  // ...
});
```

---



## 2. React.js

### 🟢 Basic

---

### Q35. What is React and what problem does it solve?

React is a **declarative, component-based UI library** developed and maintained by Meta (Facebook). Before React, building dynamic user interfaces required directly manipulating the DOM, which was slow, error-prone, and hard to reason about as complexity grew. React solves this by letting you describe **what the UI should look like** for a given state, and React figures out the minimal DOM operations needed to make it happen (via the **Virtual DOM diffing algorithm** called **reconciliation**). The **component model** promotes code reuse, separation of concerns, and composability. React introduced the **unidirectional data flow** pattern — data flows down through props, events flow up — making state changes predictable and debuggable. It's the "V" in MVC and is intentionally un-opinionated about routing, state management, and data fetching.

```javascript
// Before React — imperative DOM manipulation (jQuery era)
// Hard to maintain, error-prone, manual DOM sync
const count = 0;
function increment() {
  count++;
  document.getElementById("counter").textContent = count; // manual sync!
  if (count > 10) {
    document.getElementById("warning").style.display = "block"; // more manual sync!
  }
}

// With React — declarative, React handles DOM updates
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  // Just describe the UI, React handles DOM updates automatically
  return (
    <div>
      <p>Count: {count}</p>
      {count > 10 && <p className="warning">Getting high!</p>}
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}

// Component composition — building complex UIs from simple pieces
function UserCard({ user }) {
  return (
    <div className="card">
      <Avatar src={user.avatar} name={user.name} />
      <UserInfo name={user.name} email={user.email} />
      <UserActions userId={user.id} />
    </div>
  );
}

// Reusable across the app
function App() {
  return (
    <div>
      {users.map(user => <UserCard key={user.id} user={user} />)}
    </div>
  );
}
```

---

### Q36. What is JSX?

JSX (JavaScript XML) is a **syntax extension** for JavaScript that looks like HTML but compiles to `React.createElement()` calls via **Babel** (or the new JSX Transform in React 17+). It is **not** a string, not HTML, and not a template engine — it's just syntactic sugar that makes React component trees readable. JSX requires expressions inside `{}`, has some differences from HTML (`className` instead of `class`, `htmlFor` instead of `for`, camelCase event handlers like `onClick`), and must return a **single root element** (use fragments `<>...</>` to avoid adding extra DOM nodes). The JSX Transform in React 17+ removed the requirement to `import React` in every file since it auto-imports the new JSX runtime.

```javascript
// JSX compiles to React.createElement calls
const element = <h1 className="title">Hello, {name}!</h1>;

// ↑ compiles to ↓ (old transform)
const element = React.createElement(
  "h1",
  { className: "title" },
  "Hello, ",
  name,
  "!"
);

// JSX Rules
// 1. Must have single root (or fragment)
return (
  <>
    <h1>Title</h1>
    <p>Paragraph</p>
  </>
);

// 2. className, not class (it's JS reserved)
<div className="container">

// 3. Expressions in curly braces
<p>{isLoggedIn ? "Welcome back!" : "Please log in"}</p>
<ul>{items.map(item => <li key={item.id}>{item.name}</li>)}</ul>

// 4. Self-closing tags required for no-children elements
<img src={url} alt="description" />
<Input type="text" onChange={handleChange} />

// 5. camelCase event handlers
<button onClick={handleClick} onMouseEnter={handleHover}>Click</button>

// 6. Inline styles as objects
<div style={{ backgroundColor: "#fff", fontSize: "16px" }}>

// JSX security — auto-escapes to prevent XSS
const userInput = '<script>alert("xss")</script>';
<p>{userInput}</p> // renders as text, not HTML — safe! ✅

// Dangerous — only for trusted HTML
<p dangerouslySetInnerHTML={{ __html: trustedHtml }} />
```

---

### Q37. What is the difference between state and props?

**Props** (short for properties) are **read-only data** passed from a parent component to a child, analogous to function arguments. A child component can never modify its own props — they are owned by the parent. Props flow **downward** in the component tree (unidirectional data flow). **State**, on the other hand, is **mutable data owned and managed within a component**. When state changes, React re-renders the component and its children. State is private to the component unless passed down as props. The distinction is crucial: props define **what a component receives**, while state defines **what a component remembers between renders**. Senior developers know when to lift state up versus keep it local, and how to derive values from props/state rather than storing redundant state.

```javascript
// Props — data from parent to child (read-only in child)
function Button({ label, onClick, disabled = false, variant = "primary" }) {
  // Props are function parameters — child cannot change them
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

// State — data owned and managed by this component
function ToggleButton() {
  const [isOn, setIsOn] = useState(false); // owned by this component

  const toggle = () => setIsOn(prev => !prev); // updates state

  // isOn flows DOWN to Button as a prop
  return (
    <Button
      label={isOn ? "Turn Off" : "Turn On"}
      onClick={toggle}
      variant={isOn ? "danger" : "primary"}
    />
  );
}

// State lifting — share state between siblings via parent
function ProductPage() {
  const [cart, setCart] = useState([]); // lifted to common parent

  const addToCart = (product) =>
    setCart(prev => [...prev, product]);

  return (
    <div>
      <ProductList onAddToCart={addToCart} />  {/* receives callback */}
      <CartSummary items={cart} />             {/* receives data */}
    </div>
  );
}

// Derived state — calculate from existing state instead of adding new state
function PriceDisplay({ prices }) {
  // ✅ Derive — no useState needed
  const total = prices.reduce((sum, p) => sum + p, 0);
  const average = total / prices.length;

  // ❌ Don't add redundant state
  // const [total, setTotal] = useState(0); — bugs when prices changes!
}
```

---

### Q38. What is the Virtual DOM and how does React use it?

The **Virtual DOM (VDOM)** is a lightweight, in-memory JavaScript representation of the real DOM tree. When your component state or props change, React creates a **new virtual DOM tree** and compares it to the **previous virtual DOM snapshot** using a process called **reconciliation** (implemented by React Fiber). This diffing algorithm identifies the **minimal set of changes** needed and applies only those to the real DOM — known as **patching**. Direct real DOM operations are expensive (they trigger layout/paint in the browser), so batching and minimizing them improves performance. React's diffing algorithm runs in O(n) time (not O(n³) like naive tree diffing) by making two assumptions: elements of different types produce different trees, and developers hint about stable child identity via `key` props.

```javascript
// React creates a VDOM tree like this (simplified)
// When you write:
const element = (
  <div className="container">
    <h1>Hello</h1>
    <p>World</p>
  </div>
);

// React internally holds a JS object like:
// {
//   type: "div",
//   props: {
//     className: "container",
//     children: [
//       { type: "h1", props: { children: "Hello" } },
//       { type: "p", props: { children: "World" } }
//     ]
//   }
// }

// When state changes, React re-runs the component,
// gets a new VDOM tree, diffs it with the old one,
// and patches only the changed parts in the real DOM

function UserList({ users }) {
  const [filter, setFilter] = useState("");

  const filtered = users.filter(u => u.name.includes(filter));

  return (
    <div>
      <input value={filter} onChange={e => setFilter(e.target.value)} />
      {/* CRITICAL: keys help React identify which items changed */}
      {filtered.map(user => (
        <UserCard key={user.id} user={user} />
        // Without key — React can't tell if an item was removed from the
        // middle vs reordered. Bad keys cause bugs and poor performance!
      ))}
    </div>
  );
}

// Why keys matter — bad key example
// ❌ Using array index as key — breaks when list is reordered/filtered
{items.map((item, index) => <Item key={index} {...item} />)}

// ✅ Use stable unique ID
{items.map(item => <Item key={item.id} {...item} />)}
```

---

### Q40. What is `useState`?

`useState` is a React Hook that lets functional components **manage local state**. It takes an initial value and returns a **tuple** `[state, setState]` — the current state value and a function to update it. Calling `setState` with a new value **schedules a re-render** and ensures the component re-renders with the new state value. State updates are **asynchronous** — the new state is available on the next render, not immediately after calling `setState`. For updates based on the **previous state** (e.g., incrementing), always use the **functional updater form** `setState(prev => prev + 1)` to avoid stale closure bugs. Multiple `useState` calls maintain independent state variables, and React preserves their order across renders (which is why Hooks can't be called conditionally).

```javascript
import { useState } from "react";

// Basic usage
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}

// ✅ Functional updater form — avoids stale closure bugs
function SafeCounter() {
  const [count, setCount] = useState(0);

  const handleMultipleIncrements = () => {
    // ❌ These all read the same stale 'count' from closure
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1); // count is still 0 here! Result: 1, not 3

    // ✅ Functional updater — always gets latest state
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    setCount(prev => prev + 1); // Result: 3 ✅
  };
}

// Object state
function UserForm() {
  const [user, setUser] = useState({ name: "", email: "", age: "" });

  const handleChange = (field) => (e) => {
    setUser(prev => ({ ...prev, [field]: e.target.value })); // spread prev
  };

  return (
    <form>
      <input value={user.name} onChange={handleChange("name")} />
      <input value={user.email} onChange={handleChange("email")} />
    </form>
  );
}

// Lazy initial state — expensive computation only runs once
function ExpensiveComponent() {
  // ❌ This function runs every render
  const [data, setData] = useState(parseHugeDataset());

  // ✅ Pass a function — only called on mount
  const [data2, setData2] = useState(() => parseHugeDataset());
}
```

---

### Q41. What is `useEffect`?

`useEffect` is a Hook for performing **side effects** in functional components — operations that affect something outside the component's render output, such as: data fetching, DOM manipulation, subscriptions, timers, and logging. It runs **after the render is committed to the screen**. The **dependency array** controls when it re-runs: no array means run after every render, `[]` means run only on mount, and `[dep1, dep2]` means run when any dependency changes. The **cleanup function** returned from `useEffect` runs before the next effect and on unmount — essential for clearing timers, canceling requests, and unsubscribing. Understanding the dependency array and avoiding **stale closures** is one of the most common challenges for React developers.

```javascript
import { useState, useEffect } from "react";

// 1. Run on mount only (empty deps)
function DataFetcher({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; // prevent state update on unmounted component
    setLoading(true);

    fetch(`/api/users/${userId}`)
      .then(r => r.json())
      .then(data => {
        if (isMounted) {
          setUser(data);
          setLoading(false);
        }
      });

    // Cleanup — runs when component unmounts
    return () => { isMounted = false; };
  }, [userId]); // Re-runs whenever userId changes

  if (loading) return <Spinner />;
  return <UserProfile user={user} />;
}

// 2. Subscription with cleanup
function WebSocketComponent() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("wss://api.example.com/ws");

    ws.onmessage = (event) => {
      setMessages(prev => [...prev, JSON.parse(event.data)]);
    };

    // ✅ Cleanup — close WebSocket when component unmounts
    return () => ws.close();
  }, []); // only on mount
}

// 3. Timer with cleanup
function Countdown({ seconds }) {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(timer); // cleanup previous timer
  }, [timeLeft]);
}

// 4. Modern alternative — use AbortController for fetch
useEffect(() => {
  const controller = new AbortController();

  fetch(`/api/data`, { signal: controller.signal })
    .then(r => r.json())
    .then(setData)
    .catch(err => {
      if (err.name !== "AbortError") setError(err);
    });

  return () => controller.abort(); // cancels in-flight request
}, [id]);
```

---

### 🟡 Intermediate

---

### Q45. What is `useContext` and when would you use it?

`useContext` is a Hook that allows a component to **consume a React Context value** without prop drilling through intermediate components. Context provides a way to share values (theme, authentication state, language/locale, user preferences) between components at any level of the tree without passing them as props through every intermediate component. You create a context with `React.createContext()`, wrap the tree with a `Provider` that supplies the value, and then any descendant can call `useContext(MyContext)` to access that value. A key performance consideration: **any component that consumes a context re-renders when the context value changes**, so avoid putting frequently-changing values (like a counter) in context shared widely. For high-frequency updates, use Zustand, Jotai, or Redux instead.

```javascript
import { createContext, useContext, useState, useMemo } from "react";

// 1. Create the context
const AuthContext = createContext(null);

// 2. Create a Provider component
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    setUser(data.user);
    localStorage.setItem("token", data.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  // useMemo prevents re-renders when value object is recreated
  const value = useMemo(() => ({ user, login, logout, loading }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 3. Custom hook wrapping useContext (best practice)
function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

// 4. Consume in any component — no prop drilling!
function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav>
      {user ? <button onClick={logout}>Logout {user.name}</button> : <LoginLink />}
    </nav>
  );
}

// Wrap the app
function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>{/* ... */}</Routes>
      </Router>
    </AuthProvider>
  );
}
```

---

### Q47. What is `useMemo` and `useCallback`?

Both are optimization Hooks that prevent unnecessary recalculations and function recreations between renders. `useMemo` **memoizes the result of a computation** — it only re-runs the function when its dependencies change. `useCallback` **memoizes a function reference** — it returns the same function object between renders unless dependencies change. This matters because in JavaScript, `() => {}` creates a new function object on every render, which causes `React.memo` child components to re-render even if the logic is identical. Use `useMemo` for expensive computations (sorting/filtering large lists, complex derivations). Use `useCallback` for functions passed as props to memoized components or as dependencies to other hooks. Importantly, **don't overuse them** — they add overhead and most components don't need them.

```javascript
import { useState, useMemo, useCallback, memo } from "react";

// useMemo — expensive computation
function ProductCatalog({ products, searchTerm, sortBy }) {
  // ✅ Only recalculated when products, searchTerm, or sortBy changes
  const processedProducts = useMemo(() => {
    console.log("Computing filtered & sorted products...");
    return products
      .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => {
        if (sortBy === "price") return a.price - b.price;
        if (sortBy === "name") return a.name.localeCompare(b.name);
        return 0;
      });
  }, [products, searchTerm, sortBy]);
  // Without useMemo: this runs on EVERY render (e.g., typing in unrelated fields)

  return <ProductList products={processedProducts} />;
}

// useCallback — stable function reference for memoized children
function ParentComponent({ userId }) {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);

  // ✅ Same function reference as long as userId doesn't change
  const fetchUserData = useCallback(async () => {
    const response = await fetch(`/api/users/${userId}`);
    setData(await response.json());
  }, [userId]); // Only recreate when userId changes

  // ✅ Increment doesn't depend on any external values
  const increment = useCallback(() => setCount(c => c + 1), []);

  return (
    <>
      <MemoizedChild onFetch={fetchUserData} onIncrement={increment} />
      <p>{count}</p>
    </>
  );
}

// Memoized child — React.memo prevents re-render if props unchanged
const MemoizedChild = memo(function Child({ onFetch, onIncrement }) {
  console.log("Child rendered"); // only when onFetch/onIncrement change
  return (
    <div>
      <button onClick={onFetch}>Fetch</button>
      <button onClick={onIncrement}>+</button>
    </div>
  );
});

// ⚠️ Don't overuse — bad example
function SimpleComponent({ value }) {
  // Unnecessary — string concatenation is not expensive
  const displayValue = useMemo(() => `Value: ${value}`, [value]);
  return <p>{displayValue}</p>;
}
```

---

### Q48. What is `useRef`?

`useRef` returns a mutable **ref object** whose `.current` property is initialized to the passed argument. The key characteristic is that **changing `.current` does NOT trigger a re-render** — it persists across renders as a mutable "box" outside the rendering flow. This gives `useRef` two main use cases: **accessing DOM elements directly** (e.g., focusing inputs, measuring dimensions, controlling video playback) and **storing mutable values that should persist across renders but not cause re-renders** (e.g., previous values, timers, interval IDs, socket connections, abort controllers). Unlike `useState`, `useRef` is synchronous — `.current` is updated immediately and is always the current value (no stale closures from state).

```javascript
import { useRef, useEffect, useState } from "react";

// 1. DOM access
function AutoFocusInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus(); // directly access DOM node
  }, []);

  return <input ref={inputRef} placeholder="Auto-focused!" />;
}

// 2. Storing previous value (comparison without triggering re-render)
function PreviousValue({ value }) {
  const prevValue = useRef(value);

  useEffect(() => {
    prevValue.current = value; // store after render
  });

  return <p>Current: {value}, Previous: {prevValue.current}</p>;
}

// 3. Storing timer/interval IDs
function StopwatchComponent() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null); // store interval ID — no re-render needed

  const start = () => {
    setRunning(true);
    intervalRef.current = setInterval(() => setTime(t => t + 1), 1000);
  };

  const stop = () => {
    setRunning(false);
    clearInterval(intervalRef.current); // access without triggering re-render
  };

  return (
    <div>
      <p>{time}s</p>
      <button onClick={start} disabled={running}>Start</button>
      <button onClick={stop} disabled={!running}>Stop</button>
    </div>
  );
}

// 4. Store latest callback (avoid stale closures in event listeners)
function EventComponent({ onEvent }) {
  const onEventRef = useRef(onEvent);
  useEffect(() => { onEventRef.current = onEvent; }); // always latest

  useEffect(() => {
    window.addEventListener("resize", () => onEventRef.current()); // never stale
    return () => window.removeEventListener("resize", () => onEventRef.current());
  }, []); // empty deps — listener set up once, always calls latest handler
}
```

---

### Q60. What are custom Hooks?

Custom Hooks are **functions starting with `use`** that encapsulate **reusable stateful logic** by composing React's built-in Hooks. They let you extract complex logic out of components, making components smaller and more readable, and enabling the same logic to be reused across multiple components without code duplication. Unlike utility functions, custom Hooks can call other Hooks and manage state, effects, refs, and context. They are the primary way React encourages logic reuse (replacing class component patterns like Higher-Order Components and render props for stateful logic). A well-designed custom Hook has a clear purpose, returns only what the consumer needs, and handles cleanup internally.

```javascript
// useLocalStorage — persists state to localStorage
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setStoredValue = (newValue) => {
    const valueToStore = newValue instanceof Function ? newValue(value) : newValue;
    setValue(valueToStore);
    localStorage.setItem(key, JSON.stringify(valueToStore));
  };

  return [value, setStoredValue];
}

// useFetch — data fetching with loading/error state
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    fetch(url, { signal: controller.signal })
      .then(r => r.ok ? r.json() : Promise.reject(new Error(r.statusText)))
      .then(data => { setData(data); setLoading(false); })
      .catch(err => {
        if (err.name !== "AbortError") {
          setError(err);
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}

// useDebounce — debounce a value (for search inputs)
function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// Usage in component
function SearchComponent() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500); // only search after 500ms pause
  const { data, loading } = useFetch(`/api/search?q=${debouncedQuery}`);

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      {loading ? <Spinner /> : <Results data={data} />}
    </div>
  );
}
```

---

### 🔴 Advanced

---

### Q64. What is Server-Side Rendering (SSR) vs Static Site Generation (SSG)?

**SSR** (Server-Side Rendering) generates the HTML for each page **on the server at request time** — the server fetches data, renders the React tree to HTML, and sends it to the client. This ensures users always get fresh, personalized content and is great for SEO since crawlers receive fully-rendered HTML. The tradeoff is **higher server load** and slightly higher **Time to First Byte (TTFB)** compared to static files. **SSG** (Static Site Generation) pre-renders pages to static HTML **at build time** — the HTML is generated once and served from a CDN, resulting in extremely fast response times. SSG is ideal for content that doesn't change per user (blogs, docs, marketing pages). **ISR** (Incremental Static Regeneration, Next.js) bridges the gap — static pages that can be regenerated in the background at configurable intervals.

```javascript
// Next.js App Router — Server Component (SSR by default)
// app/users/[id]/page.tsx
async function UserPage({ params }) {
  // This runs on the SERVER — direct DB access, no client bundle cost
  const user = await User.findById(params.id).lean();

  if (!user) notFound();

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <UserPosts userId={user._id} /> {/* can also be a server component */}
    </div>
  );
}

// Next.js SSG with generateStaticParams
export async function generateStaticParams() {
  const posts = await Post.find({}, "_id").lean();
  return posts.map(post => ({ id: post._id.toString() }));
}

async function PostPage({ params }) {
  const post = await Post.findById(params.id).lean();
  // This page is pre-rendered at build time as static HTML
  return <PostContent post={post} />;
}

// ISR — revalidate every 60 seconds
export const revalidate = 60;

// Client component — opt-in when you need interactivity
"use client";
function InteractiveWidget({ initialData }) {
  const [data, setData] = useState(initialData); // initialData from server
  const [filter, setFilter] = useState("");
  // ... interactive logic
}

// The key pattern: Server renders the shell with data,
// Client component hydrates for interactivity
async function Page() {
  const initialData = await fetchFromDB(); // server-side
  return (
    <main>
      <StaticHeader />               {/* server component */}
      <InteractiveWidget initialData={initialData} /> {/* client component */}
    </main>
  );
}
```

---

### Q67. How do you optimize a slow React app?

Optimizing a slow React app requires **profiling first** — never optimize blindly. Use the React DevTools Profiler to identify which components render most frequently and take the longest. Common optimization strategies include: **memoization** (`React.memo`, `useMemo`, `useCallback`) to prevent unnecessary re-renders, **list virtualization** (react-window, react-virtual) for rendering only visible list items in large lists, **code splitting** with `React.lazy()` and `Suspense` to load components on demand, **debouncing/throttling** expensive operations, **avoiding object/function creation in render** (use refs or memoization), and **optimizing context** (splitting contexts, memoizing values). At the network level: prefetch data, use TanStack Query for caching, and implement proper loading states to prevent layout shift.

```javascript
// 1. Profile first with React DevTools
// Then target specific bottlenecks

// 2. Memoize expensive components
const HeavyTable = React.memo(function HeavyTable({ rows, onRowClick }) {
  return (
    <table>
      {rows.map(row => <tr key={row.id} onClick={() => onRowClick(row.id)}>...</tr>)}
    </table>
  );
}, (prevProps, nextProps) => {
  // Custom comparison — only re-render if rows or onRowClick actually changed
  return prevProps.rows === nextProps.rows && prevProps.onRowClick === nextProps.onRowClick;
});

// 3. Virtualize long lists
import { FixedSizeList as List } from "react-window";

function VirtualizedList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}> {/* style contains position — required! */}
      <Item data={items[index]} />
    </div>
  );

  return (
    <List
      height={600}
      itemCount={items.length}
      itemSize={80}
      width="100%"
    >
      {Row}
    </List>
    // Only renders visible items — handles 100,000 items smoothly
  );
}

// 4. Code splitting with lazy loading
const AdminPanel = React.lazy(() => import("./AdminPanel"));
const ChartDashboard = React.lazy(() => import("./ChartDashboard"));

function App() {
  const { user } = useAuth();
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {user?.role === "admin" && (
          <Route path="/admin" element={<AdminPanel />} /> {/* loaded on demand */}
        )}
      </Routes>
    </Suspense>
  );
}

// 5. Debounce search input
function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const debouncedSearch = useCallback(
    debounce((q) => onSearch(q), 300),
    [onSearch]
  );

  const handleChange = (e) => {
    setQuery(e.target.value);
    debouncedSearch(e.target.value);
  };

  return <input value={query} onChange={handleChange} />;
}
```

---





## 3. Node.js

### 🟢 Basic

---

### Q71. What is Node.js and why is it used for backend?

Node.js is a **JavaScript runtime built on Chrome's V8 JavaScript engine** that allows JavaScript to run outside the browser — on servers, CLIs, desktop apps, and more. Its key architectural innovation is the **non-blocking, event-driven I/O model**: instead of creating a new thread for each connection (like Apache/PHP), Node uses a **single-threaded event loop** that efficiently handles thousands of concurrent connections via callbacks, Promises, and async/await. This makes Node exceptionally performant for **I/O-bound workloads** — web APIs, real-time apps, streaming, proxies — because most server time is spent waiting on I/O (network, database, file system), not on CPU. Node is NOT suited for **CPU-intensive tasks** (image processing, video encoding, ML inference) without Worker Threads or offloading to other services. The `npm` ecosystem is the world's largest, providing packages for virtually any use case.

```javascript
// Comparing blocking vs non-blocking in Node context

// ❌ BLOCKING — synchronous I/O (never use in production)
const fs = require("fs");
const data1 = fs.readFileSync("file1.txt"); // BLOCKS all other operations
const data2 = fs.readFileSync("file2.txt"); // can't start until file1 done
console.log(data1, data2);

// ✅ NON-BLOCKING — async I/O
const { readFile } = require("fs/promises");

async function readFiles() {
  // Both files read in parallel — neither blocks the other
  const [data1, data2] = await Promise.all([
    readFile("file1.txt", "utf8"),
    readFile("file2.txt", "utf8"),
  ]);
  console.log(data1, data2);
}

// A Node.js HTTP server — handles concurrent connections with one thread
const http = require("http");

const server = http.createServer(async (req, res) => {
  if (req.url === "/users") {
    // While this awaits DB, other requests are being handled!
    const users = await db.query("SELECT * FROM users");
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  }
});

server.listen(3000, () => console.log("Server running on port 3000"));

// Real-world Node strengths:
// - REST APIs (Express/Fastify)
// - Real-time apps (Socket.IO)
// - BFF (Backend For Frontend)
// - Microservices
// - CLI tools
// - Streaming (video, file uploads)
// - Serverless functions (Lambda, Vercel)
```

---

### Q79. Explain Node.js event-driven architecture

Node.js is built on the **Observer pattern** via the `EventEmitter` class. Objects emit named events, and listeners register handlers for those events. The event loop picks up emitted events and dispatches them to the appropriate listeners. This architecture underpins core Node modules: `http.Server` emits `request` events, `fs.ReadStream` emits `data` and `end` events, `net.Socket` emits `data`, `close`, and `error`. Custom events let you decouple components — emitters don't know who's listening. This is the foundation for **microservice messaging**, **webhook systems**, **stream processing**, and **plugin architectures**. In large systems, you'd replace in-process `EventEmitter` with message brokers (Redis Pub/Sub, RabbitMQ, Kafka) for cross-service communication.

```javascript
const EventEmitter = require("events");

// Creating a custom EventEmitter
class OrderService extends EventEmitter {
  async placeOrder(orderData) {
    try {
      const order = await db.orders.create(orderData);

      // Emit events — decoupled from consumers
      this.emit("order:created", order);
      this.emit("order:payment-required", order);

      return order;
    } catch (error) {
      this.emit("order:failed", { orderData, error });
      throw error;
    }
  }
}

const orderService = new OrderService();

// Listeners registered independently — loose coupling
orderService.on("order:created", async (order) => {
  await emailService.sendConfirmation(order.userId, order);
  console.log(`Confirmation sent for order ${order.id}`);
});

orderService.on("order:created", async (order) => {
  await inventoryService.reserve(order.items);
});

orderService.on("order:payment-required", async (order) => {
  await paymentService.initiate(order);
});

orderService.on("order:failed", ({ orderData, error }) => {
  logger.error("Order placement failed", { orderData, error });
  monitoring.trackError("order_failure", error);
});

// Use 'once' for one-time listeners
orderService.once("order:first-ever", (order) => {
  celebrate(); // only fires once!
});

// Error handling — special 'error' event
orderService.on("error", (err) => {
  // Without this listener, unhandled 'error' events crash the process!
  console.error("OrderService error:", err);
});

// Max listeners warning — default is 10
orderService.setMaxListeners(20); // increase if needed
```

---

### Q80. What are streams in Node.js?

Streams are Node.js's mechanism for **processing data in chunks** rather than buffering the entire dataset in memory at once. This is critical for large files, video streaming, HTTP request/response bodies, and any data pipeline. There are four types: **Readable** (source of data — file, HTTP request), **Writable** (destination — file, HTTP response, stdout), **Duplex** (both readable and writable — TCP socket, WebSocket), and **Transform** (duplex that can modify data — compression, encryption, parsing). Streams implement the **backpressure** mechanism — when the writable side is slower than the readable, the readable pauses, preventing memory overflow. The `pipe()` method connects streams and handles backpressure automatically.

```javascript
const fs = require("fs");
const zlib = require("zlib");
const { Transform } = require("stream");
const { pipeline } = require("stream/promises");

// ❌ Without streams — loads entire file into memory
const huge = fs.readFileSync("huge-file.csv"); // 10GB file = crash!

// ✅ With streams — processes in chunks, constant memory usage
async function compressFile(input, output) {
  await pipeline(
    fs.createReadStream(input),          // Readable: reads in chunks
    zlib.createGzip(),                   // Transform: compresses each chunk
    fs.createWriteStream(output)         // Writable: writes compressed chunks
  );
  console.log("Compression complete");
}

compressFile("huge-file.csv", "huge-file.csv.gz");

// Custom Transform stream — process CSV line by line
class CSVParser extends Transform {
  constructor(options) {
    super({ ...options, objectMode: true });
    this._buffer = "";
    this._headers = null;
  }

  _transform(chunk, encoding, callback) {
    this._buffer += chunk.toString();
    const lines = this._buffer.split("\n");
    this._buffer = lines.pop(); // keep incomplete last line

    lines.forEach((line) => {
      if (!this._headers) {
        this._headers = line.split(",");
      } else {
        const obj = {};
        line.split(",").forEach((val, i) => {
          obj[this._headers[i]] = val.trim();
        });
        this.push(obj); // push parsed object downstream
      }
    });
    callback();
  }
}

// Express streaming response — for AI/LLM output
app.get("/stream", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const readable = getAIResponseStream();
  readable.on("data", (chunk) => {
    res.write(`data: ${JSON.stringify({ token: chunk.toString() })}\n\n`);
  });
  readable.on("end", () => {
    res.write("data: [DONE]\n\n");
    res.end();
  });
});
```

---

### Q91. What are Worker Threads in Node.js?

Worker Threads (introduced in Node.js 10.5) enable **true multi-threading** in Node.js for **CPU-intensive tasks** that would otherwise block the event loop. Unlike child processes, Worker Threads share the same Node.js process memory (through `SharedArrayBuffer` and `Atomics`) making data passing more efficient for large datasets. Worker Threads run their own V8 instance and event loop but can communicate with the main thread via **message passing** (`postMessage` / `on('message')`). Use cases: video/image processing, PDF generation, complex calculations, machine learning inference, and data compression — any task that takes >10ms and shouldn't block incoming requests. For simpler CPU tasks, the built-in **libuv thread pool** (used by crypto, fs operations) is sufficient.

```javascript
// main.js — spawning a worker thread
const { Worker, isMainThread, parentPort, workerData } = require("worker_threads");
const path = require("path");

if (isMainThread) {
  // ---- MAIN THREAD ----
  function runHeavyComputation(data) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(__filename, {
        workerData: { data }, // pass data to worker
      });

      worker.on("message", resolve);   // receive result
      worker.on("error", reject);
      worker.on("exit", (code) => {
        if (code !== 0) reject(new Error(`Worker exited with code ${code}`));
      });
    });
  }

  // Express route — heavy computation in worker, event loop free!
  app.post("/generate-report", async (req, res) => {
    try {
      const result = await runHeavyComputation(req.body.dataset);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

} else {
  // ---- WORKER THREAD ----
  const { data } = workerData;

  // CPU-intensive work — runs in separate thread, doesn't block main
  function heavyComputation(dataset) {
    let result = {};
    // Complex aggregation, sorting, ML inference...
    for (const item of dataset) {
      // expensive processing
    }
    return result;
  }

  const result = heavyComputation(data);
  parentPort.postMessage(result); // send result back to main thread
}

// SharedArrayBuffer for high-performance data sharing
const shared = new SharedArrayBuffer(4);
const arr = new Int32Array(shared);
Atomics.store(arr, 0, 42); // atomic write — thread-safe
```

---

## 4. Express.js

### 🟢 Basic

---

### Q95. What is Express.js?

Express.js is a **minimal, unopinionated web framework** for Node.js that abstracts the low-level `http` module with a clean routing API, middleware system, and request/response utilities. "Minimal" means it makes very few decisions for you — you choose your database, authentication strategy, templating engine, etc. "Unopinionated" means there's no single "correct" way to structure an Express app, which is both its strength (flexibility) and weakness (no enforced structure leads to inconsistency on teams). Express handles the boilerplate of creating servers, routing requests to handlers, parsing request bodies, and sending responses. Its **middleware pipeline** is its most powerful concept — every incoming request passes through a chain of middleware functions in order, each able to modify the request/response or end the cycle.

```javascript
const express = require("express");
const app = express();

// Built-in middleware
app.use(express.json());            // parse JSON bodies
app.use(express.urlencoded({ extended: true })); // parse form data

// Third-party middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev")); // request logging

// Route handlers
app.get("/", (req, res) => {
  res.json({ message: "Hello MERN!" });
});

app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.json(user);
});

app.post("/users", async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

app.put("/users/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  res.json(user);
});

app.delete("/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// Error handling middleware (must be last)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    error: err.message || "Internal server error",
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));
```

---

### Q96. What is middleware in Express?

Middleware functions are **the core building blocks of Express**. A middleware is any function with access to `req`, `res`, and `next` — where `req` is the request, `res` is the response, and `next` is a callback to pass control to the next middleware in the chain. Middleware can: **execute any code**, **modify req/res objects**, **end the request-response cycle** (via `res.json()`, `res.send()`, etc.), or **call `next()`** to continue to the next middleware. If a middleware doesn't end the cycle or call `next()`, the request hangs. Middleware can be **application-level** (`app.use()`), **router-level** (`router.use()`), **error-handling** (4 arguments: `err, req, res, next`), or **built-in/third-party**. The middleware chain executes in **registration order**, making order critical.

```javascript
// Application-level middleware — runs for ALL requests
app.use((req, res, next) => {
  req.requestTime = Date.now(); // augment request
  console.log(`${req.method} ${req.url} at ${req.requestTime}`);
  next(); // must call next() or the request hangs!
});

// Path-specific middleware
app.use("/api", (req, res, next) => {
  // Only runs for requests starting with /api
  req.isApiRequest = true;
  next();
});

// Authentication middleware factory (HOF pattern)
function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
    // Don't call next() — end the cycle here
  }
}

// Apply to specific routes only
app.get("/profile", authenticate, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user);
});

// Error-handling middleware (4 arguments)
app.use((err, req, res, next) => {
  // Called when next(error) is invoked anywhere upstream
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: err.message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// Async middleware wrapper — auto-catches async errors
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

app.get("/users", asyncHandler(async (req, res) => {
  const users = await User.find(); // if this throws, next(err) is called auto
  res.json(users);
}));
```

---

### Q104. How do you handle errors in Express?

Error handling in Express requires a **dedicated 4-argument middleware** (`err, req, res, next`) placed at the **end of the middleware stack**. Errors are forwarded to it by calling `next(err)` from any route or middleware. For `async` routes, unhandled promise rejections don't automatically reach the error handler — you must either wrap them in try/catch and call `next(err)`, or use an `asyncHandler` utility. A senior approach creates a **custom AppError class** with HTTP status codes, distinguishes **operational errors** (invalid input, not found) from **programmer errors** (bugs, unexpected states), and handles Mongoose validation errors, duplicate key errors, and JWT errors gracefully. In production, never send stack traces to clients.

```javascript
// Custom error class
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // vs programmer errors
    Error.captureStackTrace(this, this.constructor);
  }
}

// Async wrapper — removes try/catch boilerplate
const catchAsync = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};

// Routes — throw AppError for operational errors
const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(new AppError("User not found", 404));
  res.json(user);
});

// Global error handler
function globalErrorHandler(err, req, res, next) {
  let error = { ...err };
  error.message = err.message;
  error.statusCode = err.statusCode || 500;

  // Handle specific Mongoose errors
  if (err.name === "CastError") {
    error = new AppError(`Invalid ID: ${err.value}`, 400);
  }
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    error = new AppError(`Duplicate value for ${field}`, 409);
  }
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map(e => e.message);
    error = new AppError(messages.join(". "), 422);
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") error = new AppError("Invalid token", 401);
  if (err.name === "TokenExpiredError") error = new AppError("Token expired", 401);

  // Send response
  if (process.env.NODE_ENV === "development") {
    res.status(error.statusCode).json({
      status: "error",
      message: error.message,
      stack: err.stack,
      error: err,
    });
  } else {
    // Production: only send operational errors to client
    if (error.isOperational) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      // Programmer error — don't leak details
      console.error("PROGRAMMER ERROR:", err);
      res.status(500).json({ error: "Something went wrong" });
    }
  }
}

app.use(globalErrorHandler);
```

---

### Q106. What is rate limiting and how do you implement it?

Rate limiting restricts how many requests a client (identified by IP, user ID, or API key) can make within a time window, protecting your API from **abuse, brute-force attacks, and DoS**. Without rate limiting, a single malicious client can overwhelm your server or exhaust your database connections. `express-rate-limit` is the standard library for Express — it stores request counts in memory (single server) or Redis (distributed, via `rate-limit-redis` store). For production multi-server environments, always use a **shared Redis store** so limits are enforced across all instances. Different rate limits for different endpoints is a common pattern: strict for auth endpoints (prevent brute-force), lenient for read APIs.

```javascript
const rateLimit = require("express-rate-limit");
const RedisStore = require("rate-limit-redis");
const { createClient } = require("redis");

const redisClient = createClient({ url: process.env.REDIS_URL });

// General API rate limit
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                  // 100 requests per window per IP
  standardHeaders: true,     // Return RateLimit-* headers
  legacyHeaders: false,
  store: new RedisStore({    // Redis store for distributed env
    sendCommand: (...args) => redisClient.sendCommand(args),
  }),
  handler: (req, res) => {
    res.status(429).json({
      error: "Too many requests",
      retryAfter: Math.ceil(req.rateLimit.resetTime / 1000 - Date.now() / 1000),
    });
  },
});

// Strict limit for auth routes — prevent brute force
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,                    // only 5 login attempts per 15 min
  skipSuccessfulRequests: true, // don't count successful logins
  message: "Too many login attempts, please try again later",
});

// Per-user rate limiting (after authentication)
const userLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30,
  keyGenerator: (req) => req.user?.id || req.ip, // use user ID if authenticated
});

app.use("/api", apiLimiter);
app.post("/api/auth/login", authLimiter, loginController);
app.use("/api/user", authenticate, userLimiter);
```

---

### Q112. How do you implement request-scoped logging with correlation IDs?

Correlation IDs (also called **trace IDs** or **request IDs**) are unique identifiers generated per request and attached to all log entries, making it possible to trace a complete request lifecycle across log lines, services, and time. Without correlation IDs, debugging production issues means searching through thousands of interleaved log lines from concurrent requests. The implementation involves generating a UUID at the start of each request, storing it in `AsyncLocalStorage` (so it's accessible in all async operations without passing it explicitly), attaching it to the response as a header, and including it in every log entry. In a microservices setup, you propagate the ID via headers (`X-Correlation-ID`) so the entire distributed trace is connected.

```javascript
const { AsyncLocalStorage } = require("async_hooks");
const { v4: uuidv4 } = require("uuid");

// AsyncLocalStorage — request-scoped storage without prop drilling
const requestContext = new AsyncLocalStorage();

// Logger that automatically includes correlation ID
const logger = {
  info: (message, data = {}) => {
    const ctx = requestContext.getStore();
    console.log(JSON.stringify({
      level: "info",
      message,
      correlationId: ctx?.correlationId,
      userId: ctx?.userId,
      timestamp: new Date().toISOString(),
      ...data,
    }));
  },
  error: (message, error, data = {}) => {
    const ctx = requestContext.getStore();
    console.error(JSON.stringify({
      level: "error",
      message,
      correlationId: ctx?.correlationId,
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      ...data,
    }));
  },
};

// Middleware — create context for each request
app.use((req, res, next) => {
  const correlationId = req.headers["x-correlation-id"] || uuidv4();

  // Run the rest of the request in this context
  requestContext.run({ correlationId, userId: null }, () => {
    res.setHeader("X-Correlation-ID", correlationId);
    logger.info(`${req.method} ${req.url}`);
    next();
  });
});

// After auth — enrich context with user ID
app.use("/api", authenticate, (req, res, next) => {
  const store = requestContext.getStore();
  if (store) store.userId = req.user.id;
  next();
});

// Now any log anywhere in the async chain has the correlation ID!
async function processOrder(orderId) {
  logger.info("Processing order", { orderId });     // includes correlationId!
  const order = await Order.findById(orderId);
  logger.info("Order found", { orderId, total: order.total });
}
```

---

### Q115. How do you gracefully shut down an Express server?

Graceful shutdown ensures that when your server process is stopped (via `SIGTERM`, `SIGINT`, or deployment), **in-flight requests complete** before the process exits, rather than being abruptly terminated. Without graceful shutdown, active clients get connection errors, and database operations may be left in inconsistent states. The process involves: listening for termination signals, stopping the server from accepting new connections (`server.close()`), waiting for in-flight requests to finish, closing database connections and other resources, and then exiting. In container environments (Kubernetes, Docker), the platform sends `SIGTERM` and waits a configurable grace period (typically 30 seconds) before force-killing with `SIGKILL`.

```javascript
const mongoose = require("mongoose");
const http = require("http");

const app = express();
const server = http.createServer(app);

// Track active connections for graceful shutdown
let connections = new Set();
server.on("connection", (connection) => {
  connections.add(connection);
  connection.on("close", () => connections.delete(connection));
});

// Graceful shutdown function
async function gracefulShutdown(signal) {
  console.log(`\nReceived ${signal}. Starting graceful shutdown...`);

  // 1. Stop accepting new connections
  server.close(async () => {
    console.log("HTTP server closed");

    try {
      // 2. Close database connections
      await mongoose.connection.close(false);
      console.log("MongoDB connection closed");

      // 3. Close Redis, message queues, etc.
      await redisClient.quit();

      // 4. Exit successfully
      process.exit(0);
    } catch (err) {
      console.error("Error during shutdown:", err);
      process.exit(1);
    }
  });

  // 3. Force close remaining connections after timeout
  setTimeout(() => {
    console.error("Forced shutdown after timeout");
    connections.forEach((conn) => conn.destroy());
    process.exit(1);
  }, 30000); // 30 second grace period
}

// Listen for termination signals
process.on("SIGTERM", () => gracefulShutdown("SIGTERM")); // Kubernetes/Docker
process.on("SIGINT", () => gracefulShutdown("SIGINT"));   // Ctrl+C

// Handle uncaught errors — log but don't crash
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason);
  // In production, log to Sentry/Datadog then gracefully shut down
  // Continuing after unhandled rejection is unsafe
  gracefulShutdown("unhandledRejection");
});

server.listen(3000, () => console.log("Server started on port 3000"));
```

---