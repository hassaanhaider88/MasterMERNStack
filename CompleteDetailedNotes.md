# MERN Stack Complete Notes - From Basic to Advanced
## A Comprehensive Guide for Junior Developers

---

# JavaScript - The Foundation

## 1. Syntax Constructs & Variable Declarations

### Understanding Variables: var, let, and const

Think of variables as containers that hold data. In modern JavaScript (2026), we have three ways to declare variables, each with its own personality and rules.

**var - The Old School Way (Avoid in Modern Code)**

```javascript
// var is function-scoped and hoisted
function example() {
  console.log(x); // undefined (hoisted but not initialized)
  var x = 10;
  
  if (true) {
    var x = 20; // Same variable! Not block-scoped
    console.log(x); // 20
  }
  console.log(x); // 20 (changed from inside the block)
}
```

**Industry Standard:** Never use `var` in new code. It causes bugs because:
- It's function-scoped, not block-scoped
- Variables are hoisted (moved to top)
- You can accidentally redeclare and overwrite

**let - For Variables That Change**

```javascript
// let is block-scoped
function userStatus() {
  let isLoggedIn = false;
  
  if (userExists) {
    let isLoggedIn = true; // Different variable, scoped to this block
    console.log(isLoggedIn); // true
  }
  
  console.log(isLoggedIn); // false (outer variable unchanged)
}

// Real-world example
let counter = 0;
for (let i = 0; i < 5; i++) {
  counter += i;
}
console.log(counter); // 10
// console.log(i); // Error: i is not defined (block-scoped)
```

**const - For Constants and Objects**

```javascript
// const cannot be reassigned
const API_URL = 'https://api.example.com';
// API_URL = 'other'; // Error!

// IMPORTANT: const objects/arrays CAN be mutated
const user = { name: 'Hassaan', age: 25 };
user.age = 26; // This works! We're not reassigning, just mutating
user.city = 'Lahore'; // Adding properties also works

const numbers = [1, 2, 3];
numbers.push(4); // Works! Array is mutated, not reassigned
// numbers = [5, 6]; // Error! Can't reassign
```

**Industry Standard 2026:**
- Use `const` by default for everything
- Only use `let` when you know the value will change
- Never use `var`

**Temporal Dead Zone (TDZ)**

This is a crucial concept that trips up many developers:

```javascript
// TDZ Example
function demonstrateTDZ() {
  // console.log(x); // ReferenceError: Cannot access before initialization
  // This is the "Temporal Dead Zone"
  
  let x = 10; // Now x is available
  console.log(x); // 10
}

// Why it matters in real code
function processUser(userId) {
  // If you try to use userId here before declaration, you get TDZ error
  // const userData = getUserData(userId); // Error if userId is let/const below
  
  let userId = 123; // Declaration
}
```

### Function Declarations vs Expressions

**Function Declaration (Hoisted)**

```javascript
// You can call this BEFORE it's defined
greet('Hassaan'); // Works! Outputs: "Hello, Hassaan"

function greet(name) {
  console.log(`Hello, ${name}`);
}

// Why? Function declarations are hoisted
// The entire function is moved to the top during compilation
```

**Function Expression (Not Hoisted)**

```javascript
// This WON'T work
// calculatePrice(100); // Error: calculatePrice is not a function

const calculatePrice = function(amount) {
  return amount * 1.2; // Adding 20% tax
};

// Now you can use it
console.log(calculatePrice(100)); // 120
```

**Arrow Functions (Modern Syntax)**

```javascript
// Traditional function
const add = function(a, b) {
  return a + b;
};

// Arrow function - shorter syntax
const add = (a, b) => {
  return a + b;
};

// Even shorter for single expressions (implicit return)
const add = (a, b) => a + b;

// Single parameter doesn't need parentheses
const double = x => x * 2;

// No parameters need empty parentheses
const getRandom = () => Math.random();

// Real-world example: Array operations
const users = [
  { name: 'Ali', age: 25 },
  { name: 'Sara', age: 30 },
  { name: 'Hassan', age: 22 }
];

// Filter adults
const adults = users.filter(user => user.age >= 25);
console.log(adults); // [{ name: 'Ali', age: 25 }, { name: 'Sara', age: 30 }]

// Get names only
const names = users.map(user => user.name);
console.log(names); // ['Ali', 'Sara', 'Hassan']
```

**Critical Difference: The 'this' Keyword**

```javascript
// Regular function
const regularObj = {
  name: 'Regular',
  greet: function() {
    console.log(`Hello, I'm ${this.name}`); // 'this' refers to regularObj
  }
};
regularObj.greet(); // "Hello, I'm Regular"

// Arrow function - NO own 'this'
const arrowObj = {
  name: 'Arrow',
  greet: () => {
    console.log(`Hello, I'm ${this.name}`); // 'this' is NOT arrowObj!
    // Arrow functions inherit 'this' from parent scope
  }
};
arrowObj.greet(); // "Hello, I'm undefined"

// Real-world use case where arrow functions shine
class DataFetcher {
  constructor() {
    this.data = [];
  }
  
  // Using regular function would cause issues
  fetchData() {
    setTimeout(() => {
      // Arrow function inherits 'this' from fetchData()
      this.data = ['item1', 'item2'];
      console.log(this.data); // Works correctly!
    }, 1000);
  }
}
```

**Industry Best Practice:**
- Use arrow functions for callbacks, array methods, and short utilities
- Use regular functions for object methods when you need 'this'
- Use function declarations for top-level utility functions

---

## 2. Operators in JavaScript

### Arithmetic Operators

```javascript
// Basic arithmetic
let a = 10, b = 3;

console.log(a + b);  // 13 - Addition
console.log(a - b);  // 7  - Subtraction
console.log(a * b);  // 30 - Multiplication
console.log(a / b);  // 3.333... - Division
console.log(a % b);  // 1  - Remainder (modulus)
console.log(a ** b); // 1000 - Exponentiation (10^3)

// Increment and Decrement
let count = 5;
console.log(++count); // 6 - Pre-increment (increment first, then use)
console.log(count++); // 6 - Post-increment (use first, then increment)
console.log(count);   // 7

// Real-world example: Price calculation
let price = 100;
let quantity = 3;
let tax = 0.15; // 15% tax

let subtotal = price * quantity;
let taxAmount = subtotal * tax;
let total = subtotal + taxAmount;

console.log(`Subtotal: $${subtotal}`); // $300
console.log(`Tax: $${taxAmount}`);     // $45
console.log(`Total: $${total}`);       // $345
```

### Comparison Operators

**Equality: == vs === (CRITICAL DIFFERENCE)**

```javascript
// == (loose equality) - performs type coercion
console.log(5 == '5');   // true (string '5' converted to number)
console.log(0 == false); // true (false converted to 0)
console.log('' == 0);    // true (empty string converted to 0)

// === (strict equality) - no type coercion
console.log(5 === '5');   // false (different types)
console.log(0 === false); // false (different types)
console.log('' === 0);    // false (different types)

// Industry Standard: ALWAYS use === and !==
// Avoid == and != to prevent bugs

// Real-world example
function validateUserId(userId) {
  // BAD - can accept "123" as string
  if (userId == 123) {
    return true;
  }
  
  // GOOD - only accepts number 123
  if (userId === 123) {
    return true;
  }
  return false;
}

console.log(validateUserId('123')); // false with ===, true with ==
console.log(validateUserId(123));   // true in both cases
```

**Comparison Chain**

```javascript
let age = 25;

console.log(age > 18);  // true - Greater than
console.log(age >= 25); // true - Greater than or equal
console.log(age < 30);  // true - Less than
console.log(age <= 25); // true - Less than or equal
console.log(age !== 18); // true - Not equal (strict)

// Real-world: Form validation
function canVote(age) {
  return age >= 18;
}

function isTeenager(age) {
  return age >= 13 && age <= 19;
}

function isValidPassword(password) {
  return password.length >= 8 && password.length <= 50;
}

console.log(canVote(17)); // false
console.log(isTeenager(15)); // true
console.log(isValidPassword('pass')); // false (too short)
```

### Logical Operators

**AND (&&), OR (||), NOT (!)**

```javascript
// AND (&&) - both must be true
let hasAccount = true;
let isVerified = false;

console.log(hasAccount && isVerified); // false (one is false)

// OR (||) - at least one must be true
console.log(hasAccount || isVerified); // true (one is true)

// NOT (!) - inverts boolean
console.log(!hasAccount); // false
console.log(!isVerified); // true

// Real-world: Authentication check
function canAccessDashboard(user) {
  return user.isLoggedIn && (user.role === 'admin' || user.role === 'editor');
}

const user1 = { isLoggedIn: true, role: 'admin' };
const user2 = { isLoggedIn: true, role: 'viewer' };
const user3 = { isLoggedIn: false, role: 'admin' };

console.log(canAccessDashboard(user1)); // true
console.log(canAccessDashboard(user2)); // false (not admin or editor)
console.log(canAccessDashboard(user3)); // false (not logged in)

// Short-circuit evaluation
let userName = '';
let displayName = userName || 'Guest'; // If userName is falsy, use 'Guest'
console.log(displayName); // 'Guest'

userName = 'Hassaan';
displayName = userName || 'Guest';
console.log(displayName); // 'Hassaan'
```

### Nullish Coalescing Operator (??) - Modern JavaScript

```javascript
// ?? only checks for null or undefined (not other falsy values)
let value1 = 0 || 'default';  // 'default' (0 is falsy)
let value2 = 0 ?? 'default';  // 0 (0 is not null/undefined)

let value3 = '' || 'default'; // 'default' (empty string is falsy)
let value4 = '' ?? 'default'; // '' (empty string is not null/undefined)

// Real-world: API configuration with defaults
function fetchUserData(config) {
  // Using || would treat 0 as 'no value'
  const timeout = config.timeout || 5000; // BAD if timeout is 0
  
  // Using ?? only replaces null/undefined
  const timeout = config.timeout ?? 5000; // GOOD - allows 0 as valid
  
  return `Fetching with timeout: ${timeout}ms`;
}

console.log(fetchUserData({ timeout: 0 }));    // With ??: "timeout: 0ms"
console.log(fetchUserData({ timeout: null })); // With ??: "timeout: 5000ms"
console.log(fetchUserData({}));                // With ??: "timeout: 5000ms"
```

### Optional Chaining (?.) - Safely Access Nested Properties

```javascript
// Without optional chaining (OLD WAY - UGLY)
const user = { name: 'Ali' };
let city;

if (user && user.address && user.address.city) {
  city = user.address.city;
}

// With optional chaining (MODERN WAY - CLEAN)
city = user?.address?.city; // undefined (no error!)

// Real-world examples
const users = [
  { 
    name: 'Hassaan',
    address: { city: 'Lahore', country: 'Pakistan' }
  },
  {
    name: 'Ali',
    // No address property
  }
];

// Safely access nested data
users.forEach(user => {
  console.log(`${user.name} lives in ${user?.address?.city ?? 'Unknown'}`);
});
// Output:
// "Hassaan lives in Lahore"
// "Ali lives in Unknown"

// Optional chaining with function calls
const response = {
  data: {
    getUsers: () => ['user1', 'user2']
  }
};

console.log(response?.data?.getUsers?.()); // ['user1', 'user2']
console.log(response?.data?.getAdmins?.()); // undefined (method doesn't exist)

// Array access
const arr = [1, 2, 3];
console.log(arr?.[0]); // 1
console.log(arr?.[10]); // undefined
console.log(undefined?.[0]); // undefined (no error!)
```

### Logical Assignment Operators (ES2021)

```javascript
// &&= assigns only if left side is truthy
let user = { name: 'Ali', isActive: true };
user.isActive &&= false; // Assigns because isActive is truthy
console.log(user.isActive); // false

// ||= assigns only if left side is falsy
let config = { theme: '' };
config.theme ||= 'dark'; // Assigns because theme is falsy
console.log(config.theme); // 'dark'

// ??= assigns only if left side is null or undefined
let settings = { volume: 0 };
settings.volume ??= 50; // Does NOT assign (0 is not null/undefined)
console.log(settings.volume); // 0

settings.brightness ??= 80; // Assigns (brightness is undefined)
console.log(settings.brightness); // 80

// Real-world: Initialize object with defaults
function initializeUser(user) {
  user.role ??= 'viewer';
  user.permissions ??= [];
  user.theme ||= 'light';
  
  return user;
}

const newUser = { name: 'Sara' };
console.log(initializeUser(newUser));
// { name: 'Sara', role: 'viewer', permissions: [], theme: 'light' }
```

### Ternary Operator - Inline If-Else

```javascript
// Syntax: condition ? valueIfTrue : valueIfFalse

let age = 20;
let status = age >= 18 ? 'Adult' : 'Minor';
console.log(status); // 'Adult'

// Chaining ternaries (use sparingly - can get messy)
let score = 85;
let grade = score >= 90 ? 'A' :
            score >= 80 ? 'B' :
            score >= 70 ? 'C' :
            score >= 60 ? 'D' : 'F';
console.log(grade); // 'B'

// Real-world: Dynamic CSS classes
function getUserBadge(user) {
  return {
    className: user.isPremium ? 'badge-gold' : 'badge-silver',
    label: user.isPremium ? 'Premium Member' : 'Free Member'
  };
}

// In JSX/React (very common)
const ProfileCard = ({ user }) => (
  <div className={user.isOnline ? 'online' : 'offline'}>
    {user.name}
    {user.verified ? <VerifiedIcon /> : null}
  </div>
);
```

---

## 3. Control Flow & Loops

### If-Else Statements

```javascript
// Basic if-else
let temperature = 25;

if (temperature > 30) {
  console.log('Hot day!');
} else if (temperature > 20) {
  console.log('Nice weather');
} else if (temperature > 10) {
  console.log('Cool weather');
} else {
  console.log('Cold day');
}

// Real-world: User authentication flow
function authenticateUser(username, password) {
  if (!username || !password) {
    return { success: false, message: 'Missing credentials' };
  }
  
  if (username.length < 3) {
    return { success: false, message: 'Username too short' };
  }
  
  if (password.length < 8) {
    return { success: false, message: 'Password must be 8+ characters' };
  }
  
  // Simulate database check
  if (username === 'admin' && password === 'password123') {
    return { success: true, message: 'Login successful' };
  }
  
  return { success: false, message: 'Invalid credentials' };
}

console.log(authenticateUser('admin', 'password123'));
// { success: true, message: 'Login successful' }
```

### Switch Statement

```javascript
// Switch is better than multiple if-else for checking one value
function getDayName(dayNumber) {
  switch (dayNumber) {
    case 0:
      return 'Sunday';
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';
    default:
      return 'Invalid day';
  }
}

// IMPORTANT: break statement (or return)
// Without break, it "falls through" to next case
function getSeasonActivity(season) {
  let activity;
  
  switch (season) {
    case 'winter':
      activity = 'skiing';
      break; // MUST have break or will continue to next case
    case 'spring':
      activity = 'hiking';
      break;
    case 'summer':
      activity = 'swimming';
      break;
    case 'fall':
    case 'autumn': // Fall-through intentionally (both map to same output)
      activity = 'apple picking';
      break;
    default:
      activity = 'stay inside';
  }
  
  return activity;
}

// Real-world: API response handling
function handleAPIResponse(statusCode) {
  switch (statusCode) {
    case 200:
    case 201:
      return { success: true, message: 'Request successful' };
    
    case 400:
      return { success: false, message: 'Bad request' };
    
    case 401:
      return { success: false, message: 'Unauthorized' };
    
    case 404:
      return { success: false, message: 'Not found' };
    
    case 500:
      return { success: false, message: 'Server error' };
    
    default:
      return { success: false, message: 'Unknown error' };
  }
}
```

### For Loop

```javascript
// Traditional for loop
for (let i = 0; i < 5; i++) {
  console.log(`Iteration ${i}`);
}
// Output: Iteration 0, 1, 2, 3, 4

// Real-world: Processing array items
const products = [
  { name: 'Laptop', price: 1000 },
  { name: 'Mouse', price: 25 },
  { name: 'Keyboard', price: 75 }
];

let totalPrice = 0;
for (let i = 0; i < products.length; i++) {
  console.log(`${products[i].name}: $${products[i].price}`);
  totalPrice += products[i].price;
}
console.log(`Total: $${totalPrice}`); // Total: $1100

// Nested loops (use carefully - can be slow)
// Creating a multiplication table
for (let i = 1; i <= 5; i++) {
  let row = '';
  for (let j = 1; j <= 5; j++) {
    row += `${i * j}\t`;
  }
  console.log(row);
}
```

### For...of Loop (Modern - For Iterables)

```javascript
// for...of is the modern way to iterate arrays
const fruits = ['apple', 'banana', 'orange'];

for (const fruit of fruits) {
  console.log(fruit);
}
// Output: apple, banana, orange

// Works with strings too
const text = 'Hello';
for (const char of text) {
  console.log(char);
}
// Output: H, e, l, l, o

// Real-world: Processing user data
const users = [
  { id: 1, name: 'Ali', age: 25 },
  { id: 2, name: 'Sara', age: 30 },
  { id: 3, name: 'Hassan', age: 22 }
];

for (const user of users) {
  if (user.age >= 25) {
    console.log(`${user.name} is eligible`);
  }
}

// Works with Maps
const userRoles = new Map([
  ['user1', 'admin'],
  ['user2', 'editor'],
  ['user3', 'viewer']
]);

for (const [userId, role] of userRoles) {
  console.log(`${userId}: ${role}`);
}

// Works with Sets
const uniqueSkills = new Set(['JavaScript', 'React', 'Node.js', 'JavaScript']);
for (const skill of uniqueSkills) {
  console.log(skill);
}
// Output: JavaScript, React, Node.js (Set removes duplicates)
```

### For...in Loop (For Object Properties - Use Carefully)

```javascript
// for...in iterates over enumerable properties
const user = {
  name: 'Hassaan',
  age: 25,
  city: 'Lahore',
  country: 'Pakistan'
};

for (const key in user) {
  console.log(`${key}: ${user[key]}`);
}
// Output:
// name: Hassaan
// age: 25
// city: Lahore
// country: Pakistan

// WARNING: for...in also iterates inherited properties
// Always use hasOwnProperty check for safety
for (const key in user) {
  if (user.hasOwnProperty(key)) {
    console.log(`${key}: ${user[key]}`);
  }
}

// Industry Standard: Prefer Object methods over for...in
// Better approach
Object.keys(user).forEach(key => {
  console.log(`${key}: ${user[key]}`);
});

// Even better for key-value pairs
Object.entries(user).forEach(([key, value]) => {
  console.log(`${key}: ${value}`);
});

// NEVER use for...in with arrays (use for...of instead)
const numbers = [10, 20, 30];
// BAD
for (const index in numbers) {
  console.log(numbers[index]); // Works but wrong tool
}
// GOOD
for (const number of numbers) {
  console.log(number);
}
```

### While and Do-While Loops

```javascript
// while - checks condition first
let count = 0;
while (count < 5) {
  console.log(count);
  count++;
}

// do-while - executes at least once, then checks condition
let attempts = 0;
do {
  console.log(`Attempt ${attempts + 1}`);
  attempts++;
} while (attempts < 3);

// Real-world: Retry mechanism for API calls
async function fetchWithRetry(url, maxRetries = 3) {
  let attempts = 0;
  let lastError;
  
  while (attempts < maxRetries) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return await response.json();
      }
      throw new Error(`HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
      attempts++;
      console.log(`Attempt ${attempts} failed: ${error.message}`);
      
      if (attempts < maxRetries) {
        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
      }
    }
  }
  
  throw new Error(`Failed after ${maxRetries} attempts: ${lastError.message}`);
}

// Real-world: User input validation
function getValidAge() {
  let age;
  let isValid = false;
  
  do {
    age = prompt('Enter your age (1-120):');
    age = parseInt(age);
    isValid = age >= 1 && age <= 120;
    
    if (!isValid) {
      alert('Please enter a valid age');
    }
  } while (!isValid);
  
  return age;
}
```

### Break and Continue

```javascript
// break - exits the loop completely
for (let i = 0; i < 10; i++) {
  if (i === 5) {
    break; // Stop loop when i is 5
  }
  console.log(i);
}
// Output: 0, 1, 2, 3, 4

// continue - skips current iteration
for (let i = 0; i < 10; i++) {
  if (i % 2 === 0) {
    continue; // Skip even numbers
  }
  console.log(i);
}
// Output: 1, 3, 5, 7, 9

// Real-world: Finding first matching user
function findUserByEmail(email) {
  const users = [
    { id: 1, email: 'ali@example.com', name: 'Ali' },
    { id: 2, email: 'sara@example.com', name: 'Sara' },
    { id: 3, email: 'hassan@example.com', name: 'Hassan' }
  ];
  
  for (const user of users) {
    if (user.email === email) {
      return user; // break and return
    }
  }
  
  return null; // Not found
}

// Filtering valid items
function getValidUsers(users) {
  const valid = [];
  
  for (const user of users) {
    // Skip invalid users
    if (!user.email || !user.name) {
      continue;
    }
    
    if (user.age < 18) {
      continue;
    }
    
    valid.push(user);
  }
  
  return valid;
}
```

### Labeled Statements (Rare but Useful)

```javascript
// Labels allow breaking/continuing outer loops
outerLoop: for (let i = 0; i < 3; i++) {
  innerLoop: for (let j = 0; j < 3; j++) {
    if (i === 1 && j === 1) {
      break outerLoop; // Breaks the outer loop
    }
    console.log(`i=${i}, j=${j}`);
  }
}
// Output:
// i=0, j=0
// i=0, j=1
// i=0, j=2
// i=1, j=0

// Real-world: Finding element in 2D array
function find2D(matrix, target) {
  search: for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === target) {
        console.log(`Found at [${i}, ${j}]`);
        break search; // Exit both loops
      }
    }
  }
}

const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];
find2D(matrix, 5); // Found at [1, 1]
```

---

## 4. Functions & Closures - The Heart of JavaScript

### Function Parameters and Arguments

**Default Parameters**

```javascript
// Old way (before ES6)
function greet(name) {
  name = name || 'Guest';
  return `Hello, ${name}!`;
}

// Modern way (ES6+) - much cleaner
function greet(name = 'Guest') {
  return `Hello, ${name}!`;
}

console.log(greet()); // "Hello, Guest!"
console.log(greet('Hassaan')); // "Hello, Hassaan!"

// Defaults can be expressions
function createUser(name, id = Date.now(), role = 'user') {
  return { name, id, role };
}

console.log(createUser('Ali'));
// { name: 'Ali', id: 1234567890123, role: 'user' }

// Defaults can reference previous parameters
function calculatePrice(price, tax = price * 0.15, shipping = 10) {
  return price + tax + shipping;
}

console.log(calculatePrice(100));
// 100 + 15 + 10 = 125
```

**Rest Parameters (...args)**

```javascript
// Collect remaining arguments into an array
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3)); // 6
console.log(sum(1, 2, 3, 4, 5)); // 15

// Mix regular parameters with rest
function introduce(greeting, ...names) {
  return `${greeting}, ${names.join(' and ')}!`;
}

console.log(introduce('Hello', 'Ali', 'Sara')); // "Hello, Ali and Sara!"
console.log(introduce('Welcome', 'Hassan', 'Ahmed', 'Fatima'));
// "Welcome, Hassan and Ahmed and Fatima!"

// Real-world: Logger function
function log(level, ...messages) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${level}]:`, ...messages);
}

log('INFO', 'User logged in', { userId: 123 });
log('ERROR', 'Database connection failed', new Error('Connection timeout'));
```

**Destructuring Parameters**

```javascript
// Object destructuring in parameters
function createProfile({ name, age, city = 'Unknown' }) {
  return `${name}, ${age}, from ${city}`;
}

const user = { name: 'Hassaan', age: 25 };
console.log(createProfile(user)); // "Hassaan, 25, from Unknown"

// Array destructuring
function getCoordinates([lat, lng]) {
  return { latitude: lat, longitude: lng };
}

console.log(getCoordinates([31.5204, 74.3587]));
// { latitude: 31.5204, longitude: 74.3587 }

// Real-world: React component props
function UserCard({ name, email, avatar = '/default-avatar.png', isOnline = false }) {
  return {
    html: `
      <div class="${isOnline ? 'online' : 'offline'}">
        <img src="${avatar}" />
        <h3>${name}</h3>
        <p>${email}</p>
      </div>
    `
  };
}

// API response handling
function handleResponse({ status, data, error = null }) {
  if (status === 200) {
    return { success: true, data };
  }
  return { success: false, error };
}
```

### Closures - Functions Remember Their Environment

This is one of the most powerful and frequently asked interview topics!

```javascript
// Basic closure example
function createCounter() {
  let count = 0; // This variable is "closed over"
  
  return function() {
    count++; // Inner function has access to outer scope
    return count;
  };
}

const counter1 = createCounter();
console.log(counter1()); // 1
console.log(counter1()); // 2
console.log(counter1()); // 3

const counter2 = createCounter(); // New closure, new count
console.log(counter2()); // 1 (separate from counter1)

// Real-world: Private variables (before class private fields)
function createBankAccount(initialBalance) {
  let balance = initialBalance; // Private variable
  
  return {
    deposit(amount) {
      if (amount > 0) {
        balance += amount;
        return `Deposited: $${amount}. Balance: $${balance}`;
      }
      return 'Invalid amount';
    },
    
    withdraw(amount) {
      if (amount > 0 && amount <= balance) {
        balance -= amount;
        return `Withdrawn: $${amount}. Balance: $${balance}`;
      }
      return 'Insufficient funds or invalid amount';
    },
    
    getBalance() {
      return balance; // Only way to read balance
    }
  };
}

const myAccount = createBankAccount(1000);
console.log(myAccount.deposit(500)); // "Deposited: $500. Balance: $1500"
console.log(myAccount.withdraw(300)); // "Withdrawn: $300. Balance: $1200"
console.log(myAccount.getBalance()); // 1200
// console.log(myAccount.balance); // undefined (private!)

// Real-world: Function factory for API clients
function createAPIClient(baseURL, authToken) {
  // These are private to each client instance
  return {
    get(endpoint) {
      return fetch(`${baseURL}${endpoint}`, {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
    },
    
    post(endpoint, data) {
      return fetch(`${baseURL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
    }
  };
}

const apiClient = createAPIClient('https://api.example.com', 'token123');
// baseURL and authToken are encapsulated in closure
apiClient.get('/users');

// Real-world: Event handler with state
function createClickTracker() {
  let clicks = 0;
  let lastClickTime = null;
  
  return function handleClick(event) {
    clicks++;
    const now = Date.now();
    const timeSinceLastClick = lastClickTime ? now - lastClickTime : 0;
    lastClickTime = now;
    
    console.log(`Click #${clicks}, ${timeSinceLastClick}ms since last click`);
  };
}

const trackClicks = createClickTracker();
// Use this as event listener:
// button.addEventListener('click', trackClicks);
```

**Common Closure Pitfall (Loop Problem)**

```javascript
// WRONG - Common beginner mistake
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i); // Prints 3, 3, 3 (not 0, 1, 2)
  }, 1000);
}
// Why? var is function-scoped, all closures share same i

// Solution 1: Use let (block-scoped)
for (let i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i); // Prints 0, 1, 2
  }, 1000);
}

// Solution 2: IIFE (before let was available)
for (var i = 0; i < 3; i++) {
  (function(index) {
    setTimeout(function() {
      console.log(index);
    }, 1000);
  })(i);
}

// Real-world: Creating multiple event listeners
const buttons = document.querySelectorAll('.btn');

// WRONG
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function() {
    console.log('Button ' + i + ' clicked'); // All print same i
  });
}

// RIGHT
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function() {
    console.log('Button ' + i + ' clicked');
  });
}

// Or better: use array methods
buttons.forEach((button, index) => {
  button.addEventListener('click', () => {
    console.log(`Button ${index} clicked`);
  });
});
```

### IIFE (Immediately Invoked Function Expression)

```javascript
// Basic IIFE - executes immediately
(function() {
  console.log('I run immediately!');
})();

// IIFE with parameters
(function(name) {
  console.log(`Hello, ${name}!`);
})('Hassaan');

// IIFE with return value
const result = (function() {
  const x = 10;
  const y = 20;
  return x + y;
})();
console.log(result); // 30

// Real-world: Module pattern (before ES6 modules)
const calculator = (function() {
  // Private variables
  let result = 0;
  
  // Private function
  function log(operation, value) {
    console.log(`${operation}: ${value}`);
  }
  
  // Public API
  return {
    add(x) {
      result += x;
      log('Add', x);
      return this; // Enable chaining
    },
    
    subtract(x) {
      result -= x;
      log('Subtract', x);
      return this;
    },
    
    getResult() {
      return result;
    },
    
    reset() {
      result = 0;
      return this;
    }
  };
})();

calculator.add(10).add(5).subtract(3);
console.log(calculator.getResult()); // 12

// Real-world: Avoiding global namespace pollution
(function() {
  // All these variables are private to this IIFE
  const API_URL = 'https://api.example.com';
  const API_KEY = 'secret-key';
  
  function init() {
    // Setup code
  }
  
  function fetchData() {
    // Fetch from API
  }
  
  // Only expose what's needed
  window.myApp = {
    init,
    fetchData
  };
})();
```

### Function Methods: call, apply, bind

```javascript
// Understanding 'this' context
const person = {
  name: 'Hassan',
  greet() {
    console.log(`Hello, I'm ${this.name}`);
  }
};

person.greet(); // "Hello, I'm Hassan"

// Problem: losing 'this' context
const greetFunction = person.greet;
// greetFunction(); // Error: cannot read 'name' of undefined

// Solution 1: call() - invoke with specific 'this'
greetFunction.call(person); // "Hello, I'm Hassan"

// call() with arguments
function introduce(greeting, punctuation) {
  console.log(`${greeting}, I'm ${this.name}${punctuation}`);
}

introduce.call(person, 'Hi', '!'); // "Hi, I'm Hassan!"

// Solution 2: apply() - same as call but array of arguments
introduce.apply(person, ['Hey', '...']); // "Hey, I'm Hassan..."

// Solution 3: bind() - creates new function with fixed 'this'
const boundGreet = person.greet.bind(person);
boundGreet(); // "Hello, I'm Hassan" (works!)

setTimeout(boundGreet, 1000); // Still works after 1 second

// Real-world: React event handlers (before arrow functions)
class Button {
  constructor(label) {
    this.label = label;
    this.clicks = 0;
    
    // Without bind, 'this' would be undefined in handleClick
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    this.clicks++;
    console.log(`${this.label} clicked ${this.clicks} times`);
  }
}

const button = new Button('Submit');
// Now safe to pass as callback
document.addEventListener('click', button.handleClick);

// Real-world: Borrowing methods
const user1 = {
  name: 'Ali',
  age: 25,
  toString() {
    return `${this.name}, ${this.age}`;
  }
};

const user2 = {
  name: 'Sara',
  age: 30
  // No toString method
};

// Borrow toString from user1 for user2
console.log(user1.toString.call(user2)); // "Sara, 30"

// Practical example: Finding max in array
const numbers = [5, 1, 9, 3, 7];
// Math.max doesn't accept arrays, but we can use apply
const max = Math.max.apply(null, numbers);
console.log(max); // 9

// Modern way (spread operator - cleaner)
console.log(Math.max(...numbers)); // 9
```

### Arrow Functions Deep Dive

```javascript
// Arrow function doesn't have its own 'this'
const obj = {
  name: 'Test',
  
  regularMethod: function() {
    console.log(this.name); // 'Test'
  },
  
  arrowMethod: () => {
    console.log(this.name); // undefined (inherits from parent scope)
  }
};

// Perfect use case: callbacks in methods
class Timer {
  constructor() {
    this.seconds = 0;
  }
  
  start() {
    // Arrow function inherits 'this' from start()
    setInterval(() => {
      this.seconds++;
      console.log(this.seconds);
    }, 1000);
  }
  
  // If we used regular function:
  startWrong() {
    setInterval(function() {
      // this.seconds++; // Error! 'this' is not Timer instance
    }, 1000);
  }
}

const timer = new Timer();
timer.start(); // Works correctly

// Real-world: Array methods in React/Vue
class TodoList {
  constructor(todos) {
    this.todos = todos;
    this.filter = 'all';
  }
  
  getFilteredTodos() {
    // Arrow function has access to 'this.filter'
    return this.todos.filter(todo => {
      if (this.filter === 'completed') return todo.completed;
      if (this.filter === 'active') return !todo.completed;
      return true;
    });
  }
}

// Arrow functions can't be constructors
const MyClass = () => {};
// new MyClass(); // Error: not a constructor

// No arguments object in arrow functions
const regularFunc = function() {
  console.log(arguments); // Works
};

const arrowFunc = () => {
  // console.log(arguments); // ReferenceError
};

// Use rest parameters instead
const arrowWithRest = (...args) => {
  console.log(args); // Works!
};
```

---

## 5. Objects & Classes - Object-Oriented JavaScript

### Object Creation and Manipulation

**Object Literals**

```javascript
// Basic object creation
const user = {
  name: 'Hassaan',
  age: 25,
  city: 'Lahore'
};

// Property shorthand (when variable name matches property name)
const name = 'Ali';
const age = 30;

const user2 = {
  name, // Same as name: name
  age,  // Same as age: age
  city: 'Karachi'
};

// Method shorthand
const calculator = {
  // Old way
  add: function(a, b) {
    return a + b;
  },
  
  // New way (method shorthand)
  subtract(a, b) {
    return a - b;
  },
  
  // Arrow function (be careful with 'this')
  multiply: (a, b) => a * b
};

// Computed property names
const dynamicKey = 'email';
const user3 = {
  name: 'Sara',
  [dynamicKey]: 'sara@example.com', // email: 'sara@example.com'
  ['is' + 'Active']: true // isActive: true
};

console.log(user3.email); // 'sara@example.com'
console.log(user3.isActive); // true

// Real-world: Building dynamic objects
function createQueryParams(filters) {
  const params = {};
  
  Object.keys(filters).forEach(key => {
    if (filters[key] !== null && filters[key] !== undefined) {
      params[key] = filters[key];
    }
  });
  
  return params;
}

const filters = {
  category: 'electronics',
  minPrice: 100,
  maxPrice: null,
  inStock: true
};

console.log(createQueryParams(filters));
// { category: 'electronics', minPrice: 100, inStock: true }
```

**Accessing and Modifying Properties**

```javascript
const product = {
  id: 1,
  name: 'Laptop',
  price: 1000
};

// Dot notation (when property name is known and valid identifier)
console.log(product.name); // 'Laptop'
product.price = 1200;

// Bracket notation (when property name is dynamic or contains spaces/special chars)
console.log(product['name']); // 'Laptop'

const property = 'price';
console.log(product[property]); // 1200

// Property with spaces (use bracket notation)
const obj = {
  'user name': 'Hassaan',
  'is-active': true
};

console.log(obj['user name']); // 'Hassaan'
// console.log(obj.user name); // Syntax error

// Adding new properties
product.category = 'Electronics';
product['stock'] = 50;

// Deleting properties
delete product.category;
console.log(product.category); // undefined

// Checking if property exists
console.log('name' in product); // true
console.log('category' in product); // false (deleted)
console.log(product.hasOwnProperty('price')); // true
```

**Object Methods (Static)**

```javascript
const user = {
  name: 'Hassan',
  age: 25,
  email: 'hassan@example.com'
};

// Object.keys() - returns array of keys
console.log(Object.keys(user)); // ['name', 'age', 'email']

// Object.values() - returns array of values
console.log(Object.values(user)); // ['Hassan', 25, 'hassan@example.com']

// Object.entries() - returns array of [key, value] pairs
console.log(Object.entries(user));
// [['name', 'Hassan'], ['age', 25], ['email', 'hassan@example.com']]

// Iterating over object
Object.entries(user).forEach(([key, value]) => {
  console.log(`${key}: ${value}`);
});

// Object.assign() - copy/merge objects (shallow copy)
const defaults = { theme: 'light', language: 'en' };
const userSettings = { theme: 'dark' };

const settings = Object.assign({}, defaults, userSettings);
console.log(settings); // { theme: 'dark', language: 'en' }

// Modern way: spread operator (cleaner)
const settings2 = { ...defaults, ...userSettings };

// Object.create() - create object with specific prototype
const personPrototype = {
  greet() {
    console.log(`Hello, I'm ${this.name}`);
  }
};

const person = Object.create(personPrototype);
person.name = 'Ali';
person.greet(); // "Hello, I'm Ali"

// Object.freeze() - make object immutable
const config = Object.freeze({
  API_URL: 'https://api.example.com',
  API_KEY: 'secret'
});

// config.API_URL = 'other'; // Fails silently (strict mode: error)
console.log(config.API_URL); // Still 'https://api.example.com'

// Object.seal() - prevent adding/deleting properties (can modify existing)
const sealedObj = Object.seal({ name: 'Test' });
sealedObj.name = 'Changed'; // Allowed
// sealedObj.age = 25; // Not allowed
// delete sealedObj.name; // Not allowed

// Real-world: Deep clone object (shallow copy vs deep copy)
const original = {
  name: 'Ali',
  address: {
    city: 'Lahore',
    country: 'Pakistan'
  }
};

// Shallow copy - nested objects are still referenced
const shallow = { ...original };
shallow.address.city = 'Karachi';
console.log(original.address.city); // 'Karachi' (MODIFIED!)

// Deep clone (multiple approaches)
// Method 1: JSON (works for simple objects, loses functions/dates)
const deep1 = JSON.parse(JSON.stringify(original));

// Method 2: structuredClone (modern, best for most cases)
const deep2 = structuredClone(original);

// Method 3: Lodash _.cloneDeep (most reliable)
// const deep3 = _.cloneDeep(original);
```

### Classes - Modern OOP in JavaScript

**Basic Class Structure**

```javascript
// Class declaration
class User {
  // Constructor - called when new User() is invoked
  constructor(name, email) {
    this.name = name;
    this.email = email;
    this.createdAt = new Date();
  }
  
  // Instance method
  greet() {
    return `Hello, I'm ${this.name}`;
  }
  
  // Getter
  get displayName() {
    return this.name.toUpperCase();
  }
  
  // Setter
  set displayName(value) {
    this.name = value.toLowerCase();
  }
  
  // Static method (called on class, not instance)
  static create(name, email) {
    return new User(name, email);
  }
}

// Creating instances
const user1 = new User('Hassaan', 'hassaan@example.com');
console.log(user1.greet()); // "Hello, I'm Hassaan"
console.log(user1.displayName); // "HASSAAN" (getter)

user1.displayName = 'AHMED'; // Setter
console.log(user1.name); // "ahmed" (lowercase)

// Static method usage
const user2 = User.create('Ali', 'ali@example.com');

// Real-world: Database model
class Product {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.price = data.price;
    this.stock = data.stock || 0;
  }
  
  // Business logic methods
  calculateDiscount(percentage) {
    return this.price * (1 - percentage / 100);
  }
  
  isInStock() {
    return this.stock > 0;
  }
  
  reduceStock(quantity) {
    if (quantity > this.stock) {
      throw new Error('Insufficient stock');
    }
    this.stock -= quantity;
  }
  
  // Static factory methods
  static fromAPI(apiResponse) {
    return new Product({
      id: apiResponse.product_id,
      name: apiResponse.product_name,
      price: apiResponse.price_usd,
      stock: apiResponse.inventory_count
    });
  }
  
  static async findById(id) {
    const response = await fetch(`/api/products/${id}`);
    const data = await response.json();
    return Product.fromAPI(data);
  }
}

// Usage
const product = new Product({
  id: 1,
  name: 'Laptop',
  price: 1000,
  stock: 5
});

console.log(product.isInStock()); // true
product.reduceStock(2);
console.log(product.stock); // 3
```

**Inheritance with extends and super**

```javascript
// Base class
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(`${this.name} makes a sound`);
  }
  
  move(distance) {
    console.log(`${this.name} moved ${distance} meters`);
  }
}

// Derived class
class Dog extends Animal {
  constructor(name, breed) {
    super(name); // MUST call super() before using 'this'
    this.breed = breed;
  }
  
  // Override parent method
  speak() {
    console.log(`${this.name} barks`);
  }
  
  // Call parent method
  moveAndSpeak(distance) {
    super.move(distance); // Call parent's move()
    this.speak();
  }
  
  // New method specific to Dog
  fetch() {
    console.log(`${this.name} fetches the ball`);
  }
}

const dog = new Dog('Max', 'Golden Retriever');
dog.speak(); // "Max barks"
dog.move(10); // "Max moved 10 meters"
dog.moveAndSpeak(15);
// "Max moved 15 meters"
// "Max barks"

// Real-world: User roles hierarchy
class BaseUser {
  constructor(name, email) {
    this.name = name;
    this.email = email;
    this.permissions = [];
  }
  
  hasPermission(permission) {
    return this.permissions.includes(permission);
  }
  
  login() {
    console.log(`${this.name} logged in`);
  }
}

class Admin extends BaseUser {
  constructor(name, email) {
    super(name, email);
    this.permissions = ['read', 'write', 'delete', 'admin'];
    this.role = 'admin';
  }
  
  deleteUser(userId) {
    if (this.hasPermission('delete')) {
      console.log(`Admin ${this.name} deleted user ${userId}`);
    }
  }
}

class Editor extends BaseUser {
  constructor(name, email) {
    super(name, email);
    this.permissions = ['read', 'write'];
    this.role = 'editor';
  }
  
  editPost(postId) {
    if (this.hasPermission('write')) {
      console.log(`Editor ${this.name} edited post ${postId}`);
    }
  }
}

class Viewer extends BaseUser {
  constructor(name, email) {
    super(name, email);
    this.permissions = ['read'];
    this.role = 'viewer';
  }
}

const admin = new Admin('Hassan', 'hassan@admin.com');
const editor = new Editor('Ali', 'ali@editor.com');

admin.deleteUser(123); // Works
// editor.deleteUser(123); // Would fail - no 'delete' permission
```

**Private Fields and Methods (ES2022)**

```javascript
// Private fields start with #
class BankAccount {
  #balance = 0; // Private field
  #transactionHistory = []; // Private field
  
  constructor(accountHolder, initialBalance = 0) {
    this.accountHolder = accountHolder;
    this.#balance = initialBalance;
    this.createdAt = new Date();
  }
  
  // Private method
  #recordTransaction(type, amount) {
    this.#transactionHistory.push({
      type,
      amount,
      date: new Date(),
      balance: this.#balance
    });
  }
  
  // Public methods
  deposit(amount) {
    if (amount <= 0) {
      throw new Error('Amount must be positive');
    }
    
    this.#balance += amount;
    this.#recordTransaction('deposit', amount);
    return this.getBalance();
  }
  
  withdraw(amount) {
    if (amount <= 0) {
      throw new Error('Amount must be positive');
    }
    
    if (amount > this.#balance) {
      throw new Error('Insufficient funds');
    }
    
    this.#balance -= amount;
    this.#recordTransaction('withdrawal', amount);
    return this.getBalance();
  }
  
  getBalance() {
    return this.#balance;
  }
  
  getTransactionHistory() {
    // Return copy to prevent external modification
    return [...this.#transactionHistory];
  }
}

const account = new Account('Hassaan', 1000);
account.deposit(500);
console.log(account.getBalance()); // 1500

// console.log(account.#balance); // SyntaxError: Private field
// account.#recordTransaction(); // SyntaxError: Private method

// Real-world: API client with private auth
class APIClient {
  #baseURL;
  #authToken;
  
  constructor(baseURL) {
    this.#baseURL = baseURL;
    this.#authToken = null;
  }
  
  // Private method to add auth header
  #getHeaders() {
    const headers = {
      'Content-Type': 'application/json'
    };
    
    if (this.#authToken) {
      headers['Authorization'] = `Bearer ${this.#authToken}`;
    }
    
    return headers;
  }
  
  // Public method to set auth
  setAuthToken(token) {
    this.#authToken = token;
  }
  
  async get(endpoint) {
    const response = await fetch(`${this.#baseURL}${endpoint}`, {
      headers: this.#getHeaders()
    });
    return response.json();
  }
  
  async post(endpoint, data) {
    const response = await fetch(`${this.#baseURL}${endpoint}`, {
      method: 'POST',
      headers: this.#getHeaders(),
      body: JSON.stringify(data)
    });
    return response.json();
  }
}

const api = new APIClient('https://api.example.com');
api.setAuthToken('secret-token-123');
// api.#authToken is completely private and cannot be accessed
```

**Static Members**

```javascript
class MathUtils {
  // Static property
  static PI = 3.14159;
  
  // Static method
  static add(a, b) {
    return a + b;
  }
  
  static circleArea(radius) {
    return this.PI * radius ** 2; // Use 'this' to access static members
  }
}

// Call static methods on class, not instances
console.log(MathUtils.add(5, 3)); // 8
console.log(MathUtils.circleArea(10)); // 314.159

// Cannot call on instance
const math = new MathUtils();
// math.add(5, 3); // Error: not a function

// Real-world: Database connection manager
class Database {
  static #connection = null;
  static #connectionCount = 0;
  
  static async connect(connectionString) {
    if (this.#connection) {
      console.log('Already connected');
      return this.#connection;
    }
    
    // Simulate connection
    this.#connection = { connectionString, connected: true };
    this.#connectionCount++;
    
    console.log('Database connected');
    return this.#connection;
  }
  
  static disconnect() {
    if (this.#connection) {
      this.#connection = null;
      console.log('Database disconnected');
    }
  }
  
  static getConnectionCount() {
    return this.#connectionCount;
  }
  
  static isConnected() {
    return this.#connection !== null;
  }
}

// Usage - singleton pattern
await Database.connect('mongodb://localhost:27017');
console.log(Database.isConnected()); // true
Database.disconnect();

// Real-world: User model with static queries
class User {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
  }
  
  // Instance methods
  async save() {
    // Save this user
  }
  
  async delete() {
    return User.deleteById(this.id);
  }
  
  // Static query methods
  static async findAll() {
    const response = await fetch('/api/users');
    const data = await response.json();
    return data.map(userData => new User(userData));
  }
  
  static async findById(id) {
    const response = await fetch(`/api/users/${id}`);
    const data = await response.json();
    return new User(data);
  }
  
  static async findByEmail(email) {
    const response = await fetch(`/api/users?email=${email}`);
    const data = await response.json();
    return data.length > 0 ? new User(data[0]) : null;
  }
  
  static async create(userData) {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    const data = await response.json();
    return new User(data);
  }
  
  static async deleteById(id) {
    await fetch(`/api/users/${id}`, { method: 'DELETE' });
  }
}

// Usage
const users = await User.findAll();
const user = await User.findById(123);
const newUser = await User.create({ name: 'Hassan', email: 'hassan@test.com' });
```

---

## 6. Built-in Objects and Types

### Arrays - The Most Used Collection

**Array Creation and Basic Operations**

```javascript
// Creating arrays
const numbers = [1, 2, 3, 4, 5];
const mixed = [1, 'text', true, { key: 'value' }, [1, 2]];
const empty = [];
const fromRange = Array.from({ length: 5 }, (_, i) => i + 1); // [1,2,3,4,5]

// Array.of() vs Array() constructor
const arr1 = Array(3); // [undefined, undefined, undefined]
const arr2 = Array.of(3); // [3]

// Basic operations
numbers.push(6); // Add to end → [1,2,3,4,5,6]
numbers.pop(); // Remove from end → returns 6
numbers.unshift(0); // Add to start → [0,1,2,3,4,5]
numbers.shift(); // Remove from start → returns 0

console.log(numbers.length); // 5
console.log(numbers[0]); // 1 (first element)
console.log(numbers[numbers.length - 1]); // 5 (last element)

// at() method (negative indexing - ES2022)
console.log(numbers.at(0)); // 1 (same as numbers[0])
console.log(numbers.at(-1)); // 5 (last element)
console.log(numbers.at(-2)); // 4 (second last)
```

**Array Transformation Methods (map, filter, reduce)**

```javascript
const users = [
  { id: 1, name: 'Ali', age: 25, active: true },
  { id: 2, name: 'Sara', age: 30, active: false },
  { id: 3, name: 'Hassan', age: 22, active: true },
  { id: 4, name: 'Fatima', age: 28, active: true }
];

// map() - transform each element
const names = users.map(user => user.name);
console.log(names); // ['Ali', 'Sara', 'Hassan', 'Fatima']

const userCards = users.map(user => ({
  id: user.id,
  label: `${user.name} (${user.age})`,
  status: user.active ? 'Active' : 'Inactive'
}));

// filter() - keep elements that match condition
const activeUsers = users.filter(user => user.active);
console.log(activeUsers.length); // 3

const adults = users.filter(user => user.age >= 25);

// Combining map and filter
const activeUserNames = users
  .filter(user => user.active)
  .map(user => user.name);
console.log(activeUserNames); // ['Ali', 'Hassan', 'Fatima']

// reduce() - reduce array to single value
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((total, num) => total + num, 0);
console.log(sum); // 15

// Real-world: Calculate total price
const cart = [
  { name: 'Laptop', price: 1000, quantity: 1 },
  { name: 'Mouse', price: 25, quantity: 2 },
  { name: 'Keyboard', price: 75, quantity: 1 }
];

const totalPrice = cart.reduce((total, item) => {
  return total + (item.price * item.quantity);
}, 0);
console.log(totalPrice); // 1125

// reduce() for grouping
const people = [
  { name: 'Ali', city: 'Lahore' },
  { name: 'Sara', city: 'Karachi' },
  { name: 'Hassan', city: 'Lahore' },
  { name: 'Fatima', city: 'Islamabad' }
];

const byCity = people.reduce((groups, person) => {
  const city = person.city;
  if (!groups[city]) {
    groups[city] = [];
  }
  groups[city].push(person.name);
  return groups;
}, {});

console.log(byCity);
// {
//   Lahore: ['Ali', 'Hassan'],
//   Karachi: ['Sara'],
//   Islamabad: ['Fatima']
// }
```

**Array Search and Test Methods**

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// find() - returns first match or undefined
const firstEven = numbers.find(num => num % 2 === 0);
console.log(firstEven); // 2

// findIndex() - returns index of first match or -1
const indexOfFive = numbers.findIndex(num => num === 5);
console.log(indexOfFive); // 4 (zero-based)

// includes() - check if value exists
console.log(numbers.includes(5)); // true
console.log(numbers.includes(11)); // false

// some() - true if ANY element matches
const hasEven = numbers.some(num => num % 2 === 0);
console.log(hasEven); // true

// every() - true if ALL elements match
const allPositive = numbers.every(num => num > 0);
console.log(allPositive); // true

const allEven = numbers.every(num => num % 2 === 0);
console.log(allEven); // false

// indexOf() and lastIndexOf()
const fruits = ['apple', 'banana', 'orange', 'banana'];
console.log(fruits.indexOf('banana')); // 1 (first occurrence)
console.log(fruits.lastIndexOf('banana')); // 3 (last occurrence)
console.log(fruits.indexOf('grape')); // -1 (not found)

// Real-world: Form validation
function validateForm(formData) {
  const requiredFields = ['name', 'email', 'password'];
  
  const missingFields = requiredFields.filter(field => {
    return !formData[field] || formData[field].trim() === '';
  });
  
  if (missingFields.length > 0) {
    return {
      valid: false,
      message: `Missing required fields: ${missingFields.join(', ')}`
    };
  }
  
  return { valid: true };
}

const form1 = { name: 'Ali', email: 'ali@test.com', password: '123456' };
const form2 = { name: 'Sara', email: '', password: '123456' };

console.log(validateForm(form1)); // { valid: true }
console.log(validateForm(form2)); // { valid: false, message: '...' }
```

**Modern Array Methods (ES2019+)**

```javascript
// flat() - flatten nested arrays
const nested = [1, [2, 3], [4, [5, 6]]];
console.log(nested.flat()); // [1, 2, 3, 4, [5, 6]] (depth 1)
console.log(nested.flat(2)); // [1, 2, 3, 4, 5, 6] (depth 2)
console.log(nested.flat(Infinity)); // Flatten completely

// flatMap() - map then flat (depth 1)
const sentences = ['Hello world', 'JavaScript is awesome'];
const words = sentences.flatMap(sentence => sentence.split(' '));
console.log(words); // ['Hello', 'world', 'JavaScript', 'is', 'awesome']

// Immutable methods (ES2023) - don't modify original array
const original = [3, 1, 4, 1, 5];

// toSorted() - returns sorted copy
const sorted = original.toSorted();
console.log(sorted); // [1, 1, 3, 4, 5]
console.log(original); // [3, 1, 4, 1, 5] (unchanged)

// toReversed() - returns reversed copy
const reversed = original.toReversed();
console.log(reversed); // [5, 1, 4, 1, 3]

// toSpliced() - returns copy with splice applied
const spliced = original.toSpliced(2, 1); // Remove 1 element at index 2
console.log(spliced); // [3, 1, 1, 5]

// with() - returns copy with element replaced
const replaced = original.with(0, 99);
console.log(replaced); // [99, 1, 4, 1, 5]

// Real-world: Immutable state updates (React/Redux pattern)
function updateCart(cart, productId, quantity) {
  const index = cart.findIndex(item => item.id === productId);
  
  if (index === -1) {
    // Add new item
    return [...cart, { id: productId, quantity }];
  }
  
  // Update existing item (immutably)
  return cart.with(index, {
    ...cart[index],
    quantity
  });
}

const cart = [
  { id: 1, name: 'Laptop', quantity: 1 },
  { id: 2, name: 'Mouse', quantity: 2 }
];

const updatedCart = updateCart(cart, 2, 3);
console.log(cart[1].quantity); // 2 (original unchanged)
console.log(updatedCart[1].quantity); // 3 (new copy)
```

**Array Iteration**

```javascript
const fruits = ['apple', 'banana', 'orange'];

// forEach() - execute function for each element
fruits.forEach((fruit, index) => {
  console.log(`${index}: ${fruit}`);
});
// 0: apple
// 1: banana
// 2: orange

// for...of (modern, preferred)
for (const fruit of fruits) {
  console.log(fruit);
}

// With index using entries()
for (const [index, fruit] of fruits.entries()) {
  console.log(`${index}: ${fruit}`);
}

// Real-world: Processing async operations
async function processUsers(userIds) {
  const results = [];
  
  for (const id of userIds) {
    const user = await fetchUser(id); // Sequential
    results.push(user);
  }
  
  return results;
}

// Parallel processing with Promise.all
async function processUsersParallel(userIds) {
  const promises = userIds.map(id => fetchUser(id));
  return Promise.all(promises); // All at once
}

// With error handling
async function processWithErrors(userIds) {
  const results = [];
  
  for (const id of userIds) {
    try {
      const user = await fetchUser(id);
      results.push({ success: true, data: user });
    } catch (error) {
      results.push({ success: false, error: error.message });
    }
  }
  
  return results;
}
```

---

### Strings - Text Manipulation

```javascript
// String creation
const str1 = 'Hello'; // Single quotes
const str2 = "World"; // Double quotes
const str3 = `Template literal`; // Backticks (template strings)

// Template literals (ES6) - MOST IMPORTANT
const name = 'Hassaan';
const age = 25;
const message = `My name is ${name} and I'm ${age} years old`;
console.log(message); // "My name is Hassaan and I'm 25 years old"

// Multi-line strings
const multiline = `
  This is
  a multi-line
  string
`;

// Expression evaluation in templates
const price = 100;
const tax = 0.15;
console.log(`Total: $${(price * (1 + tax)).toFixed(2)}`); // "Total: $115.00"

// String properties and methods
const text = 'JavaScript';

console.log(text.length); // 10
console.log(text.charAt(0)); // 'J'
console.log(text[0]); // 'J' (array-like access)
console.log(text.at(-1)); // 't' (last character)

// Case conversion
console.log(text.toLowerCase()); // 'javascript'
console.log(text.toUpperCase()); // 'JAVASCRIPT'

// Searching
console.log(text.includes('Script')); // true
console.log(text.startsWith('Java')); // true
console.log(text.endsWith('Script')); // true
console.log(text.indexOf('Script')); // 4
console.log(text.lastIndexOf('a')); // 3

// Extracting substrings
console.log(text.slice(0, 4)); // 'Java'
console.log(text.slice(4)); // 'Script'
console.log(text.slice(-6)); // 'Script' (negative = from end)
console.log(text.substring(0, 4)); // 'Java' (similar to slice)

// Trimming whitespace
const messy = '  Hello World  ';
console.log(messy.trim()); // 'Hello World'
console.log(messy.trimStart()); // 'Hello World  '
console.log(messy.trimEnd()); // '  Hello World'

// Padding (ES2017)
const num = '5';
console.log(num.padStart(3, '0')); // '005'
console.log(num.padEnd(3, '0')); // '500'

// Repeating
console.log('Ha'.repeat(3)); // 'HaHaHa'

// Splitting and joining
const sentence = 'JavaScript is awesome';
const words = sentence.split(' '); // ['JavaScript', 'is', 'awesome']
console.log(words.join('-')); // 'JavaScript-is-awesome'

// Replacing
const text2 = 'Hello Hello World';
console.log(text2.replace('Hello', 'Hi')); // 'Hi Hello World' (first only)
console.log(text2.replaceAll('Hello', 'Hi')); // 'Hi Hi World' (all)

// With regex
console.log(text2.replace(/Hello/g, 'Hi')); // 'Hi Hi World' (global)

// Real-world: URL slug generation
function createSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special chars
    .replace(/[\s_-]+/g, '-') // Replace spaces with -
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing -
}

console.log(createSlug('Hello World! This is Great'));
// 'hello-world-this-is-great'

// Real-world: Format phone number
function formatPhone(phone) {
  // Remove all non-digits
  const digits = phone.replace(/\D/g, '');
  
  // Format: (XXX) XXX-XXXX
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  
  return phone; // Return original if invalid
}

console.log(formatPhone('1234567890')); // '(123) 456-7890'

// Real-world: Truncate with ellipsis
function truncate(str, maxLength) {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + '...';
}

console.log(truncate('This is a very long text', 15));
// 'This is a ve...'

// Real-world: Validate email (basic)
function isValidEmail(email) {
  return email.includes('@') && 
         email.includes('.') && 
         email.indexOf('@') < email.lastIndexOf('.');
}

// Better with regex
function isValidEmailRegex(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
```

---

### Maps and Sets - Modern Collections

**Map - Key-Value Pairs with Any Type**

```javascript
// Object vs Map for key-value storage
// Object: keys must be strings/symbols
// Map: keys can be ANY type

// Creating a Map
const userRoles = new Map();

// Setting values
userRoles.set('user1', 'admin');
userRoles.set('user2', 'editor');
userRoles.set('user3', 'viewer');

// Getting values
console.log(userRoles.get('user1')); // 'admin'
console.log(userRoles.get('user4')); // undefined (doesn't exist)

// Checking existence
console.log(userRoles.has('user1')); // true
console.log(userRoles.has('user4')); // false

// Size
console.log(userRoles.size); // 3

// Deleting
userRoles.delete('user3');
console.log(userRoles.size); // 2

// Clear all
// userRoles.clear();

// Map with non-string keys (POWERFUL!)
const objectKeyMap = new Map();
const key1 = { id: 1 };
const key2 = { id: 2 };

objectKeyMap.set(key1, 'Value for object 1');
objectKeyMap.set(key2, 'Value for object 2');

console.log(objectKeyMap.get(key1)); // 'Value for object 1'

// Initialize with entries
const settings = new Map([
  ['theme', 'dark'],
  ['language', 'en'],
  ['fontSize', 14]
]);

// Iterating over Map
settings.forEach((value, key) => {
  console.log(`${key}: ${value}`);
});

// For...of with entries
for (const [key, value] of settings) {
  console.log(`${key} = ${value}`);
}

// Get all keys
console.log([...settings.keys()]); // ['theme', 'language', 'fontSize']

// Get all values
console.log([...settings.values()]); // ['dark', 'en', 14]

// Get all entries
console.log([...settings.entries()]);
// [['theme', 'dark'], ['language', 'en'], ['fontSize', 14]]

// Real-world: Caching function results
class Cache {
  constructor() {
    this.cache = new Map();
  }
  
  set(key, value, ttl = 60000) { // ttl in milliseconds
    const expiresAt = Date.now() + ttl;
    this.cache.set(key, { value, expiresAt });
  }
  
  get(key) {
    const item = this.cache.get(key);
    
    if (!item) return null;
    
    if (Date.now() > item.expiresAt) {
      this.cache.delete(key);
      return null;
    }
    
    return item.value;
  }
  
  has(key) {
    return this.get(key) !== null;
  }
  
  clear() {
    this.cache.clear();
  }
}

const cache = new Cache();
cache.set('user:123', { name: 'Hassan', age: 25 }, 5000); // 5 seconds
console.log(cache.get('user:123')); // { name: 'Hassan', age: 25 }

// Real-world: Request deduplication
class RequestManager {
  constructor() {
    this.pending = new Map();
  }
  
  async fetch(url) {
    // If request is already pending, return same promise
    if (this.pending.has(url)) {
      console.log(`Reusing pending request for ${url}`);
      return this.pending.get(url);
    }
    
    // Create new request
    const promise = fetch(url).then(res => res.json());
    this.pending.set(url, promise);
    
    try {
      const result = await promise;
      return result;
    } finally {
      // Remove from pending when done
      this.pending.delete(url);
    }
  }
}

const manager = new RequestManager();
// Multiple calls to same URL will reuse the same promise
manager.fetch('/api/users');
manager.fetch('/api/users'); // Reuses first request
```

**Set - Unique Values Collection**

```javascript
// Creating a Set
const numbers = new Set([1, 2, 3, 3, 4, 4, 5]); // Duplicates removed
console.log(numbers); // Set { 1, 2, 3, 4, 5 }

// Adding values
numbers.add(6);
numbers.add(6); // Duplicate, won't be added
console.log(numbers.size); // 6

// Checking existence
console.log(numbers.has(3)); // true
console.log(numbers.has(10)); // false

// Deleting
numbers.delete(3);
console.log(numbers.has(3)); // false

// Iterating
for (const num of numbers) {
  console.log(num);
}

numbers.forEach(num => {
  console.log(num);
});

// Convert to array
const array = [...numbers];
const array2 = Array.from(numbers);

// Real-world: Remove duplicates from array
function unique(array) {
  return [...new Set(array)];
}

const duplicates = [1, 2, 2, 3, 4, 4, 5, 5, 5];
console.log(unique(duplicates)); // [1, 2, 3, 4, 5]

// Real-world: Track unique visitors
class VisitorTracker {
  constructor() {
    this.visitors = new Set();
  }
  
  trackVisit(userId) {
    this.visitors.add(userId);
  }
  
  getUniqueVisitors() {
    return this.visitors.size;
  }
  
  hasVisited(userId) {
    return this.visitors.has(userId);
  }
}

const tracker = new VisitorTracker();
tracker.trackVisit('user1');
tracker.trackVisit('user2');
tracker.trackVisit('user1'); // Duplicate, not counted
console.log(tracker.getUniqueVisitors()); // 2

// Modern Set operations (ES2025)
const setA = new Set([1, 2, 3, 4]);
const setB = new Set([3, 4, 5, 6]);

// Union - all unique elements from both sets
console.log(setA.union(setB)); // Set { 1, 2, 3, 4, 5, 6 }

// Intersection - common elements
console.log(setA.intersection(setB)); // Set { 3, 4 }

// Difference - elements in A but not in B
console.log(setA.difference(setB)); // Set { 1, 2 }

// Symmetric difference - elements in A or B but not both
console.log(setA.symmetricDifference(setB)); // Set { 1, 2, 5, 6 }

// Subset check
const smallSet = new Set([1, 2]);
console.log(smallSet.isSubsetOf(setA)); // true

// Superset check
console.log(setA.isSupersetOf(smallSet)); // true

// Disjoint check (no common elements)
const setC = new Set([7, 8, 9]);
console.log(setA.isDisjointFrom(setC)); // true
```

---

## 7. Asynchronous JavaScript - Promises & Async/Await

### Understanding Asynchronous Programming

```javascript
// Synchronous code (blocking)
console.log('Start');
// Some heavy computation
console.log('End');

// Asynchronous code (non-blocking)
console.log('Start');
setTimeout(() => {
  console.log('Async operation');
}, 1000);
console.log('End');

// Output:
// Start
// End
// Async operation (after 1 second)
```

### Promises - Modern Way to Handle Async

**Creating and Using Promises**

```javascript
// Creating a Promise
const myPromise = new Promise((resolve, reject) => {
  // Simulate async operation
  setTimeout(() => {
    const success = true;
    
    if (success) {
      resolve('Operation successful!');
    } else {
      reject('Operation failed!');
    }
  }, 1000);
});

// Using the Promise
myPromise
  .then(result => {
    console.log(result); // 'Operation successful!'
  })
  .catch(error => {
    console.error(error);
  })
  .finally(() => {
    console.log('Promise completed');
  });

// Real-world: Fetching data from API
function fetchUser(userId) {
  return new Promise((resolve, reject) => {
    // Simulate API call
    setTimeout(() => {
      if (userId > 0) {
        resolve({
          id: userId,
          name: 'Hassan',
          email: 'hassan@example.com'
        });
      } else {
        reject(new Error('Invalid user ID'));
      }
    }, 1000);
  });
}

fetchUser(123)
  .then(user => {
    console.log('User:', user);
    return fetchUser(456); // Return another promise (chaining)
  })
  .then(anotherUser => {
    console.log('Another user:', anotherUser);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });

// Real-world: Sequential API calls with dependencies
function getUserProfile(userId) {
  return fetch(`/api/users/${userId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return response.json();
    })
    .then(user => {
      // Get user's posts
      return fetch(`/api/users/${user.id}/posts`)
        .then(response => response.json())
        .then(posts => ({
          ...user,
          posts
        }));
    });
}

getUserProfile(123)
  .then(profile => {
    console.log('Profile with posts:', profile);
  })
  .catch(error => {
    console.error('Failed to load profile:', error);
  });
```

**Promise.all - Parallel Execution**

```javascript
// Wait for ALL promises to resolve
const promise1 = fetch('/api/users');
const promise2 = fetch('/api/posts');
const promise3 = fetch('/api/comments');

Promise.all([promise1, promise2, promise3])
  .then(responses => {
    // All promises resolved successfully
    return Promise.all(responses.map(r => r.json()));
  })
  .then(([users, posts, comments]) => {
    console.log('Users:', users);
    console.log('Posts:', posts);
    console.log('Comments:', comments);
  })
  .catch(error => {
    // ANY promise rejection will trigger this
    console.error('One of the requests failed:', error);
  });

// Real-world: Dashboard data loading
async function loadDashboard() {
  const [
    userStats,
    recentOrders,
    notifications,
    revenue
  ] = await Promise.all([
    fetch('/api/stats/users').then(r => r.json()),
    fetch('/api/orders/recent').then(r => r.json()),
    fetch('/api/notifications').then(r => r.json()),
    fetch('/api/stats/revenue').then(r => r.json())
  ]);
  
  return {
    userStats,
    recentOrders,
    notifications,
    revenue
  };
}
```

**Promise.allSettled - Wait for All (Even Failures)**

```javascript
// Unlike Promise.all, doesn't reject if one fails
const promises = [
  fetch('/api/users'),
  fetch('/api/invalid'), // This will fail
  fetch('/api/posts')
];

Promise.allSettled(promises)
  .then(results => {
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        console.log(`Promise ${index} succeeded:`, result.value);
      } else {
        console.log(`Promise ${index} failed:`, result.reason);
      }
    });
  });

// Real-world: Batch operations with error handling
async function processUsers(userIds) {
  const operations = userIds.map(id => 
    updateUser(id).catch(error => ({ error, userId: id }))
  );
  
  const results = await Promise.allSettled(operations);
  
  const successful = results.filter(r => r.status === 'fulfilled');
  const failed = results.filter(r => r.status === 'rejected');
  
  return {
    successful: successful.length,
    failed: failed.length,
    errors: failed.map(f => f.reason)
  };
}
```

**Promise.race - First to Complete**

```javascript
// Returns when FIRST promise settles (resolve or reject)
const timeout = new Promise((_, reject) => {
  setTimeout(() => reject(new Error('Timeout')), 5000);
});

const dataFetch = fetch('/api/data').then(r => r.json());

Promise.race([dataFetch, timeout])
  .then(data => {
    console.log('Data loaded:', data);
  })
  .catch(error => {
    console.error('Operation failed or timed out:', error);
  });

// Real-world: Request with timeout
function fetchWithTimeout(url, timeout = 5000) {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Request timeout')), timeout);
  });
  
  const fetchPromise = fetch(url);
  
  return Promise.race([fetchPromise, timeoutPromise]);
}

fetchWithTimeout('/api/slow-endpoint', 3000)
  .then(response => response.json())
  .catch(error => {
    if (error.message === 'Request timeout') {
      console.error('Request took too long');
    }
  });
```

**Promise.any - First Success**

```javascript
// Returns when FIRST promise resolves (ignores rejections)
const servers = [
  fetch('https://api1.example.com/data'),
  fetch('https://api2.example.com/data'),
  fetch('https://api3.example.com/data')
];

Promise.any(servers)
  .then(response => {
    console.log('First successful response:', response);
  })
  .catch(error => {
    // Only fails if ALL promises reject
    console.error('All servers failed:', error);
  });

// Real-world: Fallback to backup servers
async function fetchFromFastestServer(endpoint) {
  const servers = [
    'https://primary.api.com',
    'https://backup1.api.com',
    'https://backup2.api.com'
  ];
  
  const requests = servers.map(server => 
    fetch(`${server}${endpoint}`).then(r => r.json())
  );
  
  try {
    return await Promise.any(requests);
  } catch (error) {
    throw new Error('All servers unavailable');
  }
}
```

### Async/Await - Modern Syntax

**Basic Async/Await**

```javascript
// async function always returns a Promise
async function getData() {
  return 'Hello'; // Automatically wrapped in Promise.resolve()
}

getData().then(data => console.log(data)); // 'Hello'

// await can only be used inside async functions
async function fetchUserData(userId) {
  // await pauses execution until promise resolves
  const response = await fetch(`/api/users/${userId}`);
  const user = await response.json();
  return user;
}

// Using async/await
async function main() {
  try {
    const user = await fetchUserData(123);
    console.log('User:', user);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Real-world: Sequential operations with clearer code
async function getUserProfile(userId) {
  try {
    // Step 1: Get user
    const userResponse = await fetch(`/api/users/${userId}`);
    const user = await userResponse.json();
    
    // Step 2: Get user's posts (depends on user.id)
    const postsResponse = await fetch(`/api/users/${user.id}/posts`);
    const posts = await postsResponse.json();
    
    // Step 3: Get comments for each post
    const postsWithComments = await Promise.all(
      posts.map(async post => {
        const commentsResponse = await fetch(`/api/posts/${post.id}/comments`);
        const comments = await commentsResponse.json();
        return { ...post, comments };
      })
    );
    
    return {
      ...user,
      posts: postsWithComments
    };
  } catch (error) {
    console.error('Failed to load profile:', error);
    throw error;
  }
}
```

**Error Handling in Async/Await**

```javascript
// try-catch for error handling
async function createUser(userData) {
  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const newUser = await response.json();
    return { success: true, user: newUser };
  } catch (error) {
    console.error('Failed to create user:', error);
    return { success: false, error: error.message };
  }
}

// Multiple try-catch blocks for granular error handling
async function processOrder(orderId) {
  let order;
  
  try {
    order = await fetchOrder(orderId);
  } catch (error) {
    console.error('Failed to fetch order:', error);
    return { status: 'fetch_failed', error };
  }
  
  try {
    await processPayment(order);
  } catch (error) {
    console.error('Payment failed:', error);
    await rollbackOrder(orderId);
    return { status: 'payment_failed', error };
  }
  
  try {
    await sendConfirmationEmail(order);
  } catch (error) {
    // Non-critical failure, just log
    console.error('Email failed:', error);
  }
  
  return { status: 'success', order };
}

// Real-world: Retry logic with async/await
async function fetchWithRetry(url, maxRetries = 3) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(url);
      
      if (response.ok) {
        return await response.json();
      }
      
      // Specific HTTP errors
      if (response.status === 404) {
        throw new Error('Not found');
      }
      
      // Retry on other errors
      console.log(`Attempt ${attempt + 1} failed, retrying...`);
    } catch (error) {
      if (attempt === maxRetries - 1) {
        throw error; // Last attempt, give up
      }
      
      // Exponential backoff
      await new Promise(resolve => 
        setTimeout(resolve, Math.pow(2, attempt) * 1000)
      );
    }
  }
}
```

**Parallel vs Sequential Execution**

```javascript
// SEQUENTIAL (slow) - each waits for previous
async function getDataSequential() {
  const users = await fetch('/api/users').then(r => r.json());
  const posts = await fetch('/api/posts').then(r => r.json());
  const comments = await fetch('/api/comments').then(r => r.json());
  
  return { users, posts, comments };
}
// Total time: 3 seconds (1s + 1s + 1s)

// PARALLEL (fast) - all at once
async function getDataParallel() {
  const [users, posts, comments] = await Promise.all([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json()),
    fetch('/api/comments').then(r => r.json())
  ]);
  
  return { users, posts, comments };
}
// Total time: 1 second (all run simultaneously)

// MIXED (depends on data)
async function getUserWithPosts(userId) {
  // Must be sequential (posts depend on user.id)
  const user = await fetch(`/api/users/${userId}`).then(r => r.json());
  
  // Can be parallel now
  const [posts, followers, following] = await Promise.all([
    fetch(`/api/users/${user.id}/posts`).then(r => r.json()),
    fetch(`/api/users/${user.id}/followers`).then(r => r.json()),
    fetch(`/api/users/${user.id}/following`).then(r => r.json())
  ]);
  
  return { ...user, posts, followers, following };
}

// Real-world: Batch processing with concurrency limit
async function processBatch(items, concurrency = 5) {
  const results = [];
  
  for (let i = 0; i < items.length; i += concurrency) {
    const batch = items.slice(i, i + concurrency);
    const batchResults = await Promise.all(
      batch.map(item => processItem(item))
    );
    results.push(...batchResults);
  }
  
  return results;
}

// Process 100 items, 5 at a time
await processBatch(arrayOf100Items, 5);
```

**Top-Level Await (Modern ES Modules)**

```javascript
// In ES modules, you can use await at the top level
// No need to wrap in async function

// module.js
const config = await fetch('/config.json').then(r => r.json());
const db = await connectToDatabase(config.dbUrl);

export { config, db };

// main.js
import { config, db } from './module.js';

// config and db are already loaded!
console.log(config);
```

---

## 8. ES6 Modules - Import/Export

**Named Exports**

```javascript
// utils.js
export const API_URL = 'https://api.example.com';

export function formatDate(date) {
  return date.toLocaleDateString();
}

export class Logger {
  log(message) {
    console.log(`[${new Date().toISOString()}] ${message}`);
  }
}

// Can also export at the end
function helper1() { }
function helper2() { }

export { helper1, helper2 };

// Import named exports
import { API_URL, formatDate, Logger } from './utils.js';

// Import with aliases
import { formatDate as format, Logger as Log } from './utils.js';

// Import all as namespace
import * as Utils from './utils.js';
Utils.formatDate(new Date());
```

**Default Exports**

```javascript
// user.js - ONE default export per file
export default class User {
  constructor(name) {
    this.name = name;
  }
}

// Or
class User {
  constructor(name) {
    this.name = name;
  }
}

export default User;

// Or inline
export default function createUser(name) {
  return { name, createdAt: new Date() };
}

// Import default (can use any name)
import User from './user.js';
import MyUser from './user.js'; // Same thing, different name

// Mix default and named exports
// api.js
export default class APIClient { }
export const API_VERSION = '1.0';
export function request() { }

// Import
import APIClient, { API_VERSION, request } from './api.js';
```

**Dynamic Imports**

```javascript
// Load modules conditionally
async function loadFeature() {
  if (userWantsFeature) {
    const module = await import('./feature.js');
    module.initialize();
  }
}

// Real-world: Code splitting in React
function AdminPanel() {
  const [adminModule, setAdminModule] = useState(null);
  
  useEffect(() => {
    if (user.isAdmin) {
      import('./AdminFeatures.js')
        .then(module => setAdminModule(module))
        .catch(error => console.error('Failed to load admin features'));
    }
  }, [user.isAdmin]);
  
  return adminModule ? <adminModule.Component /> : <div>Loading...</div>;
}

// Load based on route
async function loadRouteComponent(routeName) {
  switch (routeName) {
    case 'home':
      return await import('./pages/Home.js');
    case 'about':
      return await import('./pages/About.js');
    case 'dashboard':
      return await import('./pages/Dashboard.js');
    default:
      return await import('./pages/NotFound.js');
  }
}
```

**Real-World Module Patterns**

```javascript
// config.js - Configuration module
const config = {
  development: {
    apiUrl: 'http://localhost:3000',
    debug: true
  },
  production: {
    apiUrl: 'https://api.example.com',
    debug: false
  }
};

export default config[process.env.NODE_ENV || 'development'];

// api.js - API client module
import config from './config.js';

class APIClient {
  constructor(baseURL = config.apiUrl) {
    this.baseURL = baseURL;
    this.token = null;
  }
  
  setToken(token) {
    this.token = token;
  }
  
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };
    
    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }
    
    const response = await fetch(url, {
      ...options,
      headers
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    return response.json();
  }
  
  get(endpoint) {
    return this.request(endpoint);
  }
  
  post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
}

// Singleton export
const apiClient = new APIClient();
export default apiClient;

// Usage
import api from './api.js';
api.setToken('user-token-123');
const users = await api.get('/users');

// services/userService.js - Service layer
import api from '../api.js';

export async function getAllUsers() {
  return api.get('/users');
}

export async function getUserById(id) {
  return api.get(`/users/${id}`);
}

export async function createUser(userData) {
  return api.post('/users', userData);
}

export async function updateUser(id, userData) {
  return api.put(`/users/${id}`, userData);
}

export async function deleteUser(id) {
  return api.delete(`/users/${id}`);
}

// Usage in components
import { getAllUsers, createUser } from './services/userService.js';

async function loadUsers() {
  const users = await getAllUsers();
  displayUsers(users);
}
```

---

## 9. Modern JavaScript Features (2024-2026)

### Nullish Coalescing and Optional Chaining (Recap with More Examples)

```javascript
// Nullish coalescing with objects
const userSettings = {
  theme: null,
  notifications: false,
  autoSave: 0
};

const theme = userSettings.theme ?? 'light'; // 'light' (null)
const notifications = userSettings.notifications ?? true; // false (keeps false!)
const autoSave = userSettings.autoSave ?? 30; // 0 (keeps 0!)

// Chaining them together
const config = {
  user: {
    preferences: {
      display: {
        density: 'compact'
      }
    }
  }
};

const density = config?.user?.preferences?.display?.density ?? 'comfortable';
// 'compact'

const fontSize = config?.user?.preferences?.display?.fontSize ?? 14;
// 14 (property doesn't exist)
```

### Logical Assignment Operators

```javascript
// ||= Only assigns if left side is falsy
let count = 0;
count ||= 10; // count is now 10 (0 is falsy)

let name = 'Hassan';
name ||= 'Guest'; // name stays 'Hassan' (truthy)

// &&= Only assigns if left side is truthy
let user = { name: 'Ali' };
user.name &&= user.name.toUpperCase(); // 'ALI' (name exists)

let admin = null;
admin.role &&= 'superadmin'; // No assignment (admin is null)

// ??= Only assigns if left side is null/undefined
let settings = { theme: '' };
settings.theme ??= 'dark'; // theme stays '' (not null/undefined)

settings.language ??= 'en'; // language becomes 'en' (didn't exist)

// Real-world: Initialize nested objects safely
function ensureUserSettings(user) {
  user.settings ??= {};
  user.settings.notifications ??= {};
  user.settings.notifications.email ??= true;
  user.settings.notifications.push ??= false;
  
  return user;
}

let user = { name: 'Hassan' };
user = ensureUserSettings(user);
// user.settings.notifications is fully initialized
```

### Numeric Separators

```javascript
// Make large numbers readable
const million = 1_000_000;
const billion = 1_000_000_000;
const creditCard = 1234_5678_9012_3456;
const bytes = 0b1111_1111; // Binary
const hex = 0xFF_EC_DE_5E; // Hexadecimal

// Real-world: Financial calculations
const salary = 120_000; // $120,000 per year
const monthlyPayment = salary / 12;
console.log(monthlyPayment.toFixed(2)); // 10000.00
```

### Private Class Fields

```javascript
// Already covered earlier, but more examples
class Form {
  #data = {};
  #errors = {};
  #isDirty = false;
  
  setField(name, value) {
    this.#data[name] = value;
    this.#isDirty = true;
    this.#validate(name, value);
  }
  
  #validate(name, value) {
    // Private validation logic
    if (!value || value.trim() === '') {
      this.#errors[name] = 'This field is required';
    } else {
      delete this.#errors[name];
    }
  }
  
  getErrors() {
    return { ...this.#errors }; // Return copy
  }
  
  isValid() {
    return Object.keys(this.#errors).length === 0;
  }
  
  getData() {
    if (!this.isValid()) {
      throw new Error('Form has errors');
    }
    return { ...this.#data };
  }
}

const form = new Form();
form.setField('email', 'test@example.com');
console.log(form.isValid()); // true
console.log(form.getData()); // { email: 'test@example.com' }
```

### Array.prototype.at() - Negative Indexing

```javascript
const fruits = ['apple', 'banana', 'orange', 'grape'];

// Old way
console.log(fruits[fruits.length - 1]); // 'grape'
console.log(fruits[fruits.length - 2]); // 'orange'

// New way (much cleaner)
console.log(fruits.at(-1)); // 'grape'
console.log(fruits.at(-2)); // 'orange'
console.log(fruits.at(0)); // 'apple'
console.log(fruits.at(1)); // 'banana'

// Safe access (returns undefined instead of error)
console.log(fruits.at(10)); // undefined

// Real-world: Get last element safely
function getLastItem(array) {
  return array.at(-1);
}

// String support too
const text = 'Hello';
console.log(text.at(-1)); // 'o'
```

### Object.hasOwn() - Better than hasOwnProperty

```javascript
const obj = {
  name: 'Hassan',
  age: 25
};

// Old way (can be problematic)
console.log(obj.hasOwnProperty('name')); // true

// New way (ES2022 - more reliable)
console.log(Object.hasOwn(obj, 'name')); // true
console.log(Object.hasOwn(obj, 'toString')); // false (inherited)

// Why it's better:
const objWithoutPrototype = Object.create(null);
// objWithoutPrototype.hasOwnProperty('key'); // Error!
Object.hasOwn(objWithoutPrototype, 'key'); // Works fine
```

### Error Cause (ES2022)

```javascript
// Add context to errors
async function fetchUserData(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    return await response.json();
  } catch (error) {
    throw new Error('Failed to fetch user data', {
      cause: error // Wrap original error
    });
  }
}

// Usage
try {
  await fetchUserData(123);
} catch (error) {
  console.error(error.message); // 'Failed to fetch user data'
  console.error('Caused by:', error.cause); // Original error
}

// Real-world: Error chain with context
async function processOrder(orderId) {
  try {
    const order = await fetchOrder(orderId);
    try {
      await validateOrder(order);
      try {
        await chargePayment(order);
      } catch (error) {
        throw new Error('Payment failed', {
          cause: error,
          orderId,
          amount: order.total
        });
      }
    } catch (error) {
      throw new Error('Order validation failed', {
        cause: error,
        orderId
      });
    }
  } catch (error) {
    throw new Error('Order processing failed', {
      cause: error,
      orderId
    });
  }
}
```

---

# React.js - Complete Guide (Continuation of MERN Notes)

## React.js - Building User Interfaces

### 1. React Fundamentals - Understanding the Basics

**What is React?**

React is a JavaScript library for building user interfaces, particularly single-page applications. Think of it as a tool that helps you create interactive, dynamic websites by breaking them into reusable pieces called "components."

**Why React? (Industry Perspective 2026)**

1. **Component-Based**: Build encapsulated components that manage their own state
2. **Declarative**: Tell React what you want, it handles the "how"
3. **Learn Once, Write Anywhere**: React Native for mobile, React for web
4. **Huge Ecosystem**: Thousands of libraries and tools
5. **Industry Standard**: Used by Facebook, Netflix, Airbnb, Instagram, etc.

### JSX - JavaScript XML

```jsx
// JSX looks like HTML but it's JavaScript!
const element = <h1>Hello, World!</h1>;

// Under the hood, it's compiled to:
const element = React.createElement('h1', null, 'Hello, World!');

// JSX with expressions (use {})
const name = 'Hassan';
const greeting = <h1>Hello, {name}!</h1>;

// JSX with attributes
const link = <a href="https://example.com" className="btn">Click me</a>;

// IMPORTANT: className (not class), htmlFor (not for)
const label = <label htmlFor="email">Email:</label>;

// Inline styles (object with camelCase properties)
const styled = <div style={{ backgroundColor: 'blue', fontSize: '20px' }}>
  Styled content
</div>;

// Conditional rendering
const isLoggedIn = true;
const message = (
  <div>
    {isLoggedIn ? <p>Welcome back!</p> : <p>Please log in</p>}
  </div>
);

// JSX must have ONE root element
// WRONG:
return (
  <h1>Title</h1>
  <p>Paragraph</p>
);

// RIGHT:
return (
  <div>
    <h1>Title</h1>
    <p>Paragraph</p>
  </div>
);

// Or use React Fragment to avoid extra DOM element:
return (
  <>
    <h1>Title</h1>
    <p>Paragraph</p>
  </>
);

// Real-world: Dynamic content
function UserCard({ user }) {
  return (
    <div className="user-card">
      <img src={user.avatar} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      {user.isPremium && <span className="badge">Premium</span>}
    </div>
  );
}
```

### Components - Function vs Class

**Function Components (Modern Way - 2026 Standard)**

```jsx
// Basic function component
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// Arrow function (more common in 2026)
const Welcome = (props) => {
  return <h1>Hello, {props.name}</h1>;
};

// Implicit return (for simple components)
const Welcome = (props) => <h1>Hello, {props.name}</h1>;

// Destructuring props (industry best practice)
const Welcome = ({ name, age, isActive }) => {
  return (
    <div>
      <h1>Hello, {name}</h1>
      <p>Age: {age}</p>
      {isActive && <span>Active</span>}
    </div>
  );
};

// Default props with destructuring
const Welcome = ({ name = 'Guest', age = 0 }) => {
  return <h1>Hello, {name}, you are {age} years old</h1>;
};

// Real-world: Product Card Component
const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="price">${product.price.toFixed(2)}</p>
      <p className="description">{product.description}</p>
      <button onClick={() => onAddToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
};

// Usage
<ProductCard 
  product={{
    id: 1,
    name: 'Laptop',
    price: 999.99,
    image: '/laptop.jpg',
    description: 'Powerful laptop for work'
  }}
  onAddToCart={(product) => console.log('Added:', product)}
/>
```

**Class Components (Legacy - Still in Many Codebases)**

```jsx
// Class component syntax
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

// With state
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
    
    // Binding (required for event handlers)
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    this.setState({ count: this.state.count + 1 });
  }
  
  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.handleClick}>Increment</button>
      </div>
    );
  }
}

// Modern: Function component with hooks (equivalent)
const Counter = () => {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};
```

### React Hooks - Modern State Management

**useState - Managing Component State**

```jsx
import { useState } from 'react';

// Basic usage
function Counter() {
  // [stateVariable, setterFunction] = useState(initialValue)
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

// Multiple state variables
function UserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, email, age });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input 
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input 
        type="number"
        value={age}
        onChange={(e) => setAge(parseInt(e.target.value))}
        placeholder="Age"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

// State with objects
function UserProfile() {
  const [user, setUser] = useState({
    name: 'Hassan',
    email: 'hassan@example.com',
    age: 25
  });
  
  // Updating object state (must spread existing state)
  const updateName = (newName) => {
    setUser({
      ...user,  // Keep all existing properties
      name: newName  // Update only name
    });
  };
  
  // Better approach - use previous state
  const updateAge = () => {
    setUser(prevUser => ({
      ...prevUser,
      age: prevUser.age + 1
    }));
  };
  
  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Age: {user.age}</p>
      <button onClick={() => updateName('Ali')}>Change Name</button>
      <button onClick={updateAge}>Increase Age</button>
    </div>
  );
}

// State with arrays
function TodoList() {
  const [todos, setTodos] = useState(['Buy groceries', 'Walk the dog']);
  const [input, setInput] = useState('');
  
  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, input]); // Add to end
      setInput(''); // Clear input
    }
  };
  
  const removeTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };
  
  return (
    <div>
      <input 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && addTodo()}
      />
      <button onClick={addTodo}>Add</button>
      
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => removeTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Real-world: Shopping Cart
function ShoppingCart() {
  const [cart, setCart] = useState([]);
  
  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    
    if (existing) {
      // Update quantity
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      // Add new item
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };
  
  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };
  
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };
  
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <h4>{item.name}</h4>
              <p>${item.price.toFixed(2)}</p>
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
          <h3>Total: ${total.toFixed(2)}</h3>
        </>
      )}
    </div>
  );
}
```

**useEffect - Side Effects & Lifecycle**

```jsx
import { useState, useEffect } from 'react';

// Basic usage - runs after every render
function Example1() {
  useEffect(() => {
    console.log('Component rendered');
  });
  
  return <div>Example</div>;
}

// With dependency array - runs only when dependencies change
function Example2() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    console.log(`Count changed to: ${count}`);
  }, [count]); // Only runs when count changes
  
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

// Empty dependency array - runs only once (on mount)
function Example3() {
  useEffect(() => {
    console.log('Component mounted');
    // Like componentDidMount in class components
  }, []); // Empty array = run once
  
  return <div>Example</div>;
}

// Cleanup function - runs before component unmounts or effect runs again
function Timer() {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    
    // Cleanup function
    return () => {
      clearInterval(interval);
      console.log('Timer cleaned up');
    };
  }, []); // Empty array = only setup once
  
  return <div>Seconds: {seconds}</div>;
}

// Real-world: Fetch data on component mount
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    let cancelled = false; // Prevent state updates if unmounted
    
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/users/${userId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        
        const data = await response.json();
        
        if (!cancelled) {
          setUser(data);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };
    
    fetchUser();
    
    // Cleanup function
    return () => {
      cancelled = true;
    };
  }, [userId]); // Re-fetch when userId changes
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user found</div>;
  
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}

// Real-world: Document title sync
function PageTitle({ title }) {
  useEffect(() => {
    document.title = title;
    
    // Cleanup: restore original title when unmounting
    return () => {
      document.title = 'My App';
    };
  }, [title]);
  
  return null; // This component doesn't render anything
}

// Real-world: Window resize listener
function WindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup: remove listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Setup once
  
  return (
    <div>
      Width: {size.width}px, Height: {size.height}px
    </div>
  );
}

// Real-world: Debounced search
function SearchComponent() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    
    setLoading(true);
    
    // Debounce: wait 500ms after user stops typing
    const timeoutId = setTimeout(async () => {
      try {
        const response = await fetch(`/api/search?q=${query}`);
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setLoading(false);
      }
    }, 500);
    
    // Cleanup: cancel previous timeout
    return () => {
      clearTimeout(timeoutId);
    };
  }, [query]);
  
  return (
    <div>
      <input 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      {loading && <p>Searching...</p>}
      <ul>
        {results.map(result => (
          <li key={result.id}>{result.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

**useContext - Sharing State Across Components**

```jsx
import { createContext, useContext, useState } from 'react';

// Create context
const ThemeContext = createContext();

// Provider component
function App() {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`app theme-${theme}`}>
        <Header />
        <Content />
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
}

// Consumer components (anywhere in the tree)
function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <header>
      <h1>My App</h1>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'dark' : 'light'} mode
      </button>
    </header>
  );
}

function Content() {
  const { theme } = useContext(ThemeContext);
  
  return (
    <main>
      <p>Current theme: {theme}</p>
    </main>
  );
}

// Real-world: Authentication Context
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is logged in (e.g., from localStorage)
    const token = localStorage.getItem('token');
    if (token) {
      // Validate token and fetch user
      fetchUser(token).then(userData => {
        setUser(userData);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);
  
  const login = async (email, password) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    const { token, user } = await response.json();
    localStorage.setItem('token', token);
    setUser(user);
  };
  
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };
  
  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for easier usage
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

// Usage in components
function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      // Redirect to dashboard
    } catch (error) {
      alert('Login failed');
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input 
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}

function Dashboard() {
  const { user, logout } = useAuth();
  
  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;
  
  return children;
}
```

**useRef - Accessing DOM Elements & Persisting Values**

```jsx
import { useRef, useState, useEffect } from 'react';

// Accessing DOM elements
function TextInputWithFocusButton() {
  const inputRef = useRef(null);
  
  const focusInput = () => {
    // Access DOM element directly
    inputRef.current.focus();
  };
  
  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}

// Persisting values without causing re-renders
function Timer() {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);
  
  const startTimer = () => {
    if (intervalRef.current) return; // Already running
    
    intervalRef.current = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
  };
  
  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };
  
  const resetTimer = () => {
    stopTimer();
    setSeconds(0);
  };
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  
  return (
    <div>
      <p>Seconds: {seconds}</p>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}

// Real-world: Previous value tracking
function Counter() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef();
  
  useEffect(() => {
    prevCountRef.current = count;
  }, [count]);
  
  const prevCount = prevCountRef.current;
  
  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCount}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// Real-world: Video player controls
function VideoPlayer({ src }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  
  const togglePlay = () => {
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };
  
  const seek = (seconds) => {
    videoRef.current.currentTime += seconds;
  };
  
  return (
    <div>
      <video ref={videoRef} src={src} />
      <button onClick={togglePlay}>
        {playing ? 'Pause' : 'Play'}
      </button>
      <button onClick={() => seek(-10)}>-10s</button>
      <button onClick={() => seek(10)}>+10s</button>
    </div>
  );
}
```

**useMemo and useCallback - Performance Optimization**

```jsx
import { useMemo, useCallback, useState } from 'react';

// useMemo - Memoize expensive calculations
function DataTable({ data }) {
  const [sortBy, setSortBy] = useState('name');
  
  // Without useMemo: sorts on every render (expensive!)
  // const sortedData = data.sort((a, b) => a[sortBy] > b[sortBy] ? 1 : -1);
  
  // With useMemo: only recalculates when data or sortBy changes
  const sortedData = useMemo(() => {
    console.log('Sorting data...');
    return [...data].sort((a, b) => 
      a[sortBy] > b[sortBy] ? 1 : -1
    );
  }, [data, sortBy]); // Dependencies
  
  return (
    <div>
      <button onClick={() => setSortBy('name')}>Sort by Name</button>
      <button onClick={() => setSortBy('age')}>Sort by Age</button>
      <ul>
        {sortedData.map(item => (
          <li key={item.id}>{item.name} - {item.age}</li>
        ))}
      </ul>
    </div>
  );
}

// useCallback - Memoize function references
function ParentComponent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  
  // Without useCallback: new function on every render
  // ChildComponent will re-render even when unnecessary
  // const handleClick = () => {
  //   console.log('Clicked!', count);
  // };
  
  // With useCallback: same function reference unless count changes
  const handleClick = useCallback(() => {
    console.log('Clicked!', count);
  }, [count]);
  
  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <ChildComponent onClick={handleClick} />
    </div>
  );
}

const ChildComponent = React.memo(({ onClick }) => {
  console.log('ChildComponent rendered');
  return <button onClick={onClick}>Child Button</button>;
});

// Real-world: Search with debounce
function SearchComponent() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  
  // Memoized search function
  const search = useCallback(async (searchQuery) => {
    if (!searchQuery) {
      setResults([]);
      return;
    }
    
    const response = await fetch(`/api/search?q=${searchQuery}`);
    const data = await response.json();
    setResults(data);
  }, []);
  
  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      search(query);
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, [query, search]);
  
  return (
    <div>
      <input 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {results.map(result => (
          <li key={result.id}>{result.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

# Node.js - Complete Guide (Backend JavaScript Runtime)

## Node.js Fundamentals - Understanding Server-Side JavaScript

### What is Node.js?

Node.js is a JavaScript runtime built on Chrome's V8 engine that lets you run JavaScript on the server (outside the browser). Think of it as JavaScript that can read files, connect to databases, create servers, and handle all backend operations.

**Key Characteristics (2026 Perspective):**
- **Asynchronous & Event-Driven**: Non-blocking I/O operations
- **Single-Threaded**: But handles multiple connections efficiently
- **NPM Ecosystem**: Largest package registry in the world
- **Cross-Platform**: Works on Windows, Mac, Linux
- **Industry Standard**: Used by Netflix, PayPal, Uber, LinkedIn

---

## 1. Global Objects & Process

### The Process Object - Your Application's Control Center

```javascript
// process - Global object available everywhere (no require needed)

// Environment Variables
console.log(process.env.NODE_ENV); // 'development' or 'production'
console.log(process.env.PORT); // Custom env variables
console.log(process.env.DATABASE_URL); // Database connection string

// Real-world: Configuration management
const config = {
  port: process.env.PORT || 3000,
  dbUrl: process.env.DATABASE_URL || 'mongodb://localhost:27017/mydb',
  isDevelopment: process.env.NODE_ENV !== 'production',
  jwtSecret: process.env.JWT_SECRET || 'default-secret-change-me'
};

// Command-line arguments
// Run: node app.js --port=8080 --debug
console.log(process.argv);
// ['node', '/path/to/app.js', '--port=8080', '--debug']

// Real-world: Parse command-line arguments
function parseArgs() {
  const args = {};
  process.argv.slice(2).forEach(arg => {
    if (arg.startsWith('--')) {
      const [key, value] = arg.slice(2).split('=');
      args[key] = value || true;
    }
  });
  return args;
}

const args = parseArgs();
console.log(args); // { port: '8080', debug: true }

// Current working directory
console.log(process.cwd()); // '/Users/hassan/projects/myapp'

// Change directory
process.chdir('/path/to/other/directory');

// Platform information
console.log(process.platform); // 'darwin', 'win32', 'linux'
console.log(process.arch); // 'x64', 'arm64'
console.log(process.version); // 'v20.10.0'

// Memory usage
const memoryUsage = process.memoryUsage();
console.log(memoryUsage);
// {
//   rss: 25600000,        // Resident Set Size
//   heapTotal: 4096000,   // Total heap size
//   heapUsed: 2048000,    // Heap actually used
//   external: 1024000     // C++ objects bound to JS
// }

// Real-world: Memory monitoring
function logMemory() {
  const used = process.memoryUsage();
  const mb = (bytes) => Math.round(bytes / 1024 / 1024);
  
  console.log(`Memory Usage:
    RSS: ${mb(used.rss)} MB
    Heap Total: ${mb(used.heapTotal)} MB
    Heap Used: ${mb(used.heapUsed)} MB
  `);
}

setInterval(logMemory, 10000); // Log every 10 seconds

// Process uptime
console.log(`Process running for ${process.uptime()} seconds`);

// High-resolution time (for performance measurement)
const start = process.hrtime.bigint();
// ... some operation ...
const end = process.hrtime.bigint();
console.log(`Operation took ${(end - start) / 1000000n} milliseconds`);

// Exit the process
process.exit(0); // 0 = success
process.exit(1); // 1 = error

// Real-world: Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing server gracefully...');
  server.close(() => {
    console.log('Server closed');
    database.disconnect();
    process.exit(0);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  // Log to monitoring service
  logger.error('Uncaught exception', { error });
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Log to monitoring service
  logger.error('Unhandled rejection', { reason });
});
```

### Console Object - Debugging & Logging

```javascript
// Basic logging
console.log('Simple message');
console.info('Information'); // Same as log
console.warn('Warning message'); // Yellow in most terminals
console.error('Error message'); // Red in most terminals
console.debug('Debug info'); // Only shows if debugging enabled

// Multiple arguments
console.log('User:', { name: 'Hassan', age: 25 }, 'Status:', 'active');

// String substitution
console.log('User %s is %d years old', 'Hassan', 25);
// User Hassan is 25 years old

// Timing operations
console.time('database-query');
// ... perform database query ...
console.timeEnd('database-query');
// database-query: 234.567ms

// Table output (great for arrays of objects)
const users = [
  { name: 'Ali', age: 25, city: 'Lahore' },
  { name: 'Sara', age: 30, city: 'Karachi' },
  { name: 'Hassan', age: 22, city: 'Islamabad' }
];
console.table(users);
// ┌─────────┬──────────┬─────┬────────────┐
// │ (index) │   name   │ age │    city    │
// ├─────────┼──────────┼─────┼────────────┤
// │    0    │  'Ali'   │ 25  │  'Lahore'  │
// │    1    │  'Sara'  │ 30  │ 'Karachi'  │
// │    2    │ 'Hassan' │ 22  │'Islamabad' │
// └─────────┴──────────┴─────┴────────────┘

// Directory inspection (nested objects)
const complexObject = {
  user: {
    profile: {
      name: 'Hassan',
      contacts: {
        email: 'hassan@example.com',
        phone: '+92-300-1234567'
      }
    }
  }
};
console.dir(complexObject, { depth: null, colors: true });

// Assertions (testing)
console.assert(1 + 1 === 2, 'Math is broken!'); // Nothing (assertion passed)
console.assert(1 + 1 === 3, 'Math is broken!'); // AssertionError

// Count occurrences
console.count('api-call'); // api-call: 1
console.count('api-call'); // api-call: 2
console.count('api-call'); // api-call: 3
console.countReset('api-call'); // Reset counter

// Real-world: Custom logger
class Logger {
  constructor(prefix) {
    this.prefix = prefix;
  }
  
  info(message, ...args) {
    console.log(`[${new Date().toISOString()}] [${this.prefix}] INFO:`, message, ...args);
  }
  
  error(message, ...args) {
    console.error(`[${new Date().toISOString()}] [${this.prefix}] ERROR:`, message, ...args);
  }
  
  warn(message, ...args) {
    console.warn(`[${new Date().toISOString()}] [${this.prefix}] WARN:`, message, ...args);
  }
  
  time(label) {
    this.timeLabel = `${this.prefix}-${label}`;
    console.time(this.timeLabel);
  }
  
  timeEnd(label) {
    console.timeEnd(`${this.prefix}-${label}`);
  }
}

const logger = new Logger('API');
logger.info('Server started');
logger.time('request');
// ... handle request ...
logger.timeEnd('request');
```

---

## 2. File System (fs) Module

### Reading and Writing Files

```javascript
// Import fs module
const fs = require('fs');
// Or using promises (recommended for async/await)
const fs = require('fs').promises;
// Modern import
import { promises as fs } from 'fs';

// Synchronous file operations (BLOCKING - avoid in production)
try {
  const data = fs.readFileSync('./file.txt', 'utf8');
  console.log(data);
} catch (error) {
  console.error('Error reading file:', error);
}

// Asynchronous with callbacks (old way)
fs.readFile('./file.txt', 'utf8', (error, data) => {
  if (error) {
    console.error('Error:', error);
    return;
  }
  console.log(data);
});

// Modern async/await (BEST PRACTICE 2026)
async function readFile() {
  try {
    const data = await fs.readFile('./file.txt', 'utf8');
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error reading file:', error);
    throw error;
  }
}

// Writing files
async function writeFile() {
  try {
    const content = 'Hello, World!';
    await fs.writeFile('./output.txt', content, 'utf8');
    console.log('File written successfully');
  } catch (error) {
    console.error('Error writing file:', error);
  }
}

// Append to file
async function appendToFile() {
  try {
    await fs.appendFile('./log.txt', 'New log entry\n', 'utf8');
    console.log('Content appended');
  } catch (error) {
    console.error('Error:', error);
  }
}

// Real-world: JSON configuration file
async function loadConfig() {
  try {
    const data = await fs.readFile('./config.json', 'utf8');
    const config = JSON.parse(data);
    return config;
  } catch (error) {
    console.error('Error loading config:', error);
    // Return default config
    return {
      port: 3000,
      database: 'mongodb://localhost:27017/mydb'
    };
  }
}

async function saveConfig(config) {
  try {
    const data = JSON.stringify(config, null, 2); // Pretty print
    await fs.writeFile('./config.json', data, 'utf8');
    console.log('Config saved');
  } catch (error) {
    console.error('Error saving config:', error);
  }
}

// Real-world: Read and process large file line by line
import { createReadStream } from 'fs';
import { createInterface } from 'readline';

async function processLargeFile(filename) {
  const fileStream = createReadStream(filename);
  const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity // Recognize all instances of CR LF
  });
  
  let lineCount = 0;
  
  for await (const line of rl) {
    lineCount++;
    // Process each line
    if (line.includes('ERROR')) {
      console.log(`Line ${lineCount}: ${line}`);
    }
  }
  
  console.log(`Processed ${lineCount} lines`);
}

// Check if file exists
async function fileExists(path) {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}

// Get file information
async function getFileInfo(path) {
  try {
    const stats = await fs.stat(path);
    return {
      size: stats.size,
      isFile: stats.isFile(),
      isDirectory: stats.isDirectory(),
      created: stats.birthtime,
      modified: stats.mtime,
      permissions: stats.mode
    };
  } catch (error) {
    console.error('Error getting file info:', error);
    return null;
  }
}

// Real-world: Safe file write (atomic write)
async function safeWriteFile(path, content) {
  const tempPath = `${path}.tmp`;
  
  try {
    // Write to temporary file
    await fs.writeFile(tempPath, content, 'utf8');
    
    // Rename to actual file (atomic operation)
    await fs.rename(tempPath, path);
    
    console.log('File written safely');
  } catch (error) {
    // Clean up temp file on error
    try {
      await fs.unlink(tempPath);
    } catch {}
    
    throw error;
  }
}
```

### Directory Operations

```javascript
import { promises as fs } from 'fs';
import path from 'path';

// Create directory
async function createDirectory(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true }); // recursive creates parent dirs
    console.log('Directory created');
  } catch (error) {
    console.error('Error creating directory:', error);
  }
}

// Read directory contents
async function listFiles(dirPath) {
  try {
    const files = await fs.readdir(dirPath);
    console.log('Files:', files);
    return files;
  } catch (error) {
    console.error('Error reading directory:', error);
    return [];
  }
}

// Read directory with file types
async function listFilesDetailed(dirPath) {
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    
    const files = [];
    const directories = [];
    
    for (const entry of entries) {
      if (entry.isFile()) {
        files.push(entry.name);
      } else if (entry.isDirectory()) {
        directories.push(entry.name);
      }
    }
    
    return { files, directories };
  } catch (error) {
    console.error('Error:', error);
    return { files: [], directories: [] };
  }
}

// Remove directory
async function removeDirectory(dirPath) {
  try {
    await fs.rm(dirPath, { recursive: true, force: true });
    console.log('Directory removed');
  } catch (error) {
    console.error('Error removing directory:', error);
  }
}

// Real-world: Recursively find all files with extension
async function findFiles(dirPath, extension) {
  const results = [];
  
  async function scan(currentPath) {
    const entries = await fs.readdir(currentPath, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name);
      
      if (entry.isDirectory()) {
        await scan(fullPath); // Recurse into subdirectory
      } else if (entry.isFile() && entry.name.endsWith(extension)) {
        results.push(fullPath);
      }
    }
  }
  
  await scan(dirPath);
  return results;
}

// Usage: Find all .js files
const jsFiles = await findFiles('./src', '.js');
console.log('JavaScript files:', jsFiles);

// Real-world: Copy directory recursively
async function copyDirectory(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  
  const entries = await fs.readdir(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      await copyDirectory(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

// Real-world: Clean old files (delete files older than X days)
async function cleanOldFiles(dirPath, maxAgeDays) {
  const now = Date.now();
  const maxAge = maxAgeDays * 24 * 60 * 60 * 1000;
  
  const files = await fs.readdir(dirPath);
  
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stats = await fs.stat(filePath);
    
    if (stats.isFile()) {
      const age = now - stats.mtime.getTime();
      
      if (age > maxAge) {
        await fs.unlink(filePath);
        console.log(`Deleted old file: ${file}`);
      }
    }
  }
}

// Usage: Delete files older than 7 days
await cleanOldFiles('./logs', 7);
```

### File Streams - Efficient Large File Processing

```javascript
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';

// Reading large files with streams
function readLargeFile(filename) {
  const stream = createReadStream(filename, {
    encoding: 'utf8',
    highWaterMark: 64 * 1024 // 64KB chunks
  });
  
  stream.on('data', (chunk) => {
    console.log('Received chunk:', chunk.length, 'bytes');
  });
  
  stream.on('end', () => {
    console.log('File reading completed');
  });
  
  stream.on('error', (error) => {
    console.error('Stream error:', error);
  });
}

// Writing with streams
function writeLargeFile(filename, data) {
  const stream = createWriteStream(filename);
  
  stream.write(data);
  stream.end(); // Close the stream
  
  stream.on('finish', () => {
    console.log('File writing completed');
  });
  
  stream.on('error', (error) => {
    console.error('Write error:', error);
  });
}

// Real-world: Copy large file efficiently
async function copyFile(source, destination) {
  try {
    await pipeline(
      createReadStream(source),
      createWriteStream(destination)
    );
    console.log('File copied successfully');
  } catch (error) {
    console.error('Copy failed:', error);
  }
}

// Real-world: Process and transform file
import { Transform } from 'stream';

async function processLogFile(inputFile, outputFile) {
  const transformStream = new Transform({
    transform(chunk, encoding, callback) {
      // Convert to uppercase
      const transformed = chunk.toString().toUpperCase();
      callback(null, transformed);
    }
  });
  
  await pipeline(
    createReadStream(inputFile),
    transformStream,
    createWriteStream(outputFile)
  );
  
  console.log('Log file processed');
}

// Real-world: Count lines in huge file
async function countLines(filename) {
  let lineCount = 0;
  
  const lineCounter = new Transform({
    transform(chunk, encoding, callback) {
      lineCount += chunk.toString().split('\n').length - 1;
      callback(); // Don't pass data forward
    }
  });
  
  await pipeline(
    createReadStream(filename),
    lineCounter
  );
  
  return lineCount;
}

// Real-world: Compress file
import { createGzip } from 'zlib';

async function compressFile(inputFile, outputFile) {
  await pipeline(
    createReadStream(inputFile),
    createGzip(),
    createWriteStream(outputFile)
  );
  console.log('File compressed');
}

// Usage
await compressFile('./large-file.txt', './large-file.txt.gz');
```

---

## 3. Path Module - Cross-Platform File Paths

```javascript
import path from 'path';

// Join paths (handles separators correctly on all platforms)
const fullPath = path.join('/users', 'hassan', 'documents', 'file.txt');
console.log(fullPath); // '/users/hassan/documents/file.txt'

// Resolve absolute path
const absolutePath = path.resolve('src', 'components', 'Button.jsx');
console.log(absolutePath); // '/current/working/dir/src/components/Button.jsx'

// Get directory name
const dirname = path.dirname('/users/hassan/file.txt');
console.log(dirname); // '/users/hassan'

// Get file name
const filename = path.basename('/users/hassan/file.txt');
console.log(filename); // 'file.txt'

// Get file extension
const ext = path.extname('/users/hassan/file.txt');
console.log(ext); // '.txt'

// Get file name without extension
const nameWithoutExt = path.basename('/users/hassan/file.txt', '.txt');
console.log(nameWithoutExt); // 'file'

// Parse path into components
const parsed = path.parse('/users/hassan/project/src/index.js');
console.log(parsed);
// {
//   root: '/',
//   dir: '/users/hassan/project/src',
//   base: 'index.js',
//   ext: '.js',
//   name: 'index'
// }

// Format path from components
const formatted = path.format({
  dir: '/users/hassan/project',
  base: 'file.txt'
});
console.log(formatted); // '/users/hassan/project/file.txt'

// Get relative path between two paths
const relative = path.relative('/users/hassan/project', '/users/hassan/project/src/app.js');
console.log(relative); // 'src/app.js'

// Check if path is absolute
console.log(path.isAbsolute('/users/hassan')); // true
console.log(path.isAbsolute('src/app.js')); // false

// Platform-specific separators
console.log(path.sep); // '/' on Unix, '\' on Windows
console.log(path.delimiter); // ':' on Unix, ';' on Windows

// Normalize path (resolve .. and .)
const normalized = path.normalize('/users/hassan/../sara/./file.txt');
console.log(normalized); // '/users/sara/file.txt'

// Real-world: Build file paths safely
const projectRoot = process.cwd();
const srcDir = path.join(projectRoot, 'src');
const componentsDir = path.join(srcDir, 'components');
const buttonFile = path.join(componentsDir, 'Button.jsx');

// Real-world: Get all files with specific extension in directory
import { promises as fs } from 'fs';

async function getFilesByExtension(dirPath, extension) {
  const files = await fs.readdir(dirPath);
  
  return files.filter(file => 
    path.extname(file).toLowerCase() === extension.toLowerCase()
  );
}

const jsFiles = await getFilesByExtension('./src', '.js');

// Real-world: Safe file upload path
function getSafeUploadPath(filename) {
  // Remove any directory traversal attempts
  const safeName = path.basename(filename);
  
  // Generate unique filename
  const ext = path.extname(safeName);
  const nameWithoutExt = path.basename(safeName, ext);
  const timestamp = Date.now();
  const uniqueName = `${nameWithoutExt}-${timestamp}${ext}`;
  
  // Join with uploads directory
  return path.join(process.cwd(), 'uploads', uniqueName);
}

const uploadPath = getSafeUploadPath('../../etc/passwd'); // Safe!
console.log(uploadPath); // '/project/uploads/passwd-1234567890.txt'
```

---

## 4. HTTP Module - Creating Web Servers

```javascript
import http from 'http';
import url from 'url';

// Basic HTTP server
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});

// Real-world: Routing and methods
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;
  
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  
  if (method === 'GET' && pathname === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Welcome to the API</h1>');
  }
  else if (method === 'GET' && pathname === '/users') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify([
      { id: 1, name: 'Hassan' },
      { id: 2, name: 'Ali' }
    ]));
  }
  else if (method === 'POST' && pathname === '/users') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const userData = JSON.parse(body);
        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
          message: 'User created',
          user: userData
        }));
      } catch (error) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  }
  else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(3000, () => {
  console.log('API server running on port 3000');
});

// Real-world: Query parameters
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const query = parsedUrl.query;
  
  if (parsedUrl.pathname === '/search') {
    const searchTerm = query.q || '';
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      query: searchTerm,
      page,
      limit,
      results: []
    }));
  }
});

// Real-world: File server
import { promises as fs } from 'fs';
import path from 'path';

const server = http.createServer(async (req, res) => {
  try {
    // Security: prevent directory traversal
    const safePath = path.normalize(req.url).replace(/^(\.\.[\/\\])+/, '');
    const filePath = path.join(process.cwd(), 'public', safePath);
    
    // Check if file exists
    const stats = await fs.stat(filePath);
    
    if (!stats.isFile()) {
      res.statusCode = 404;
      res.end('Not found');
      return;
    }
    
    // Determine content type
    const ext = path.extname(filePath);
    const contentTypes = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'application/javascript',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.gif': 'image/gif'
    };
    
    const contentType = contentTypes[ext] || 'application/octet-stream';
    
    // Read and send file
    const content = await fs.readFile(filePath);
    
    res.statusCode = 200;
    res.setHeader('Content-Type', contentType);
    res.end(content);
  } catch (error) {
    if (error.code === 'ENOENT') {
      res.statusCode = 404;
      res.end('File not found');
    } else {
      res.statusCode = 500;
      res.end('Server error');
    }
  }
});

// Making HTTP requests (client)
const options = {
  hostname: 'api.example.com',
  port: 443,
  path: '/users',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
};

const req = http.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Response:', JSON.parse(data));
  });
});

req.on('error', (error) => {
  console.error('Request error:', error);
});

req.end();

// Modern way: Using fetch (Node 18+)
try {
  const response = await fetch('https://api.example.com/users');
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error('Fetch error:', error);
}
```

---

## 5. Events & EventEmitter - Event-Driven Architecture

### Understanding EventEmitter

```javascript
import { EventEmitter } from 'events';

// Create event emitter
const emitter = new EventEmitter();

// Register event listener
emitter.on('userCreated', (user) => {
  console.log('User created:', user);
});

// Emit event
emitter.emit('userCreated', { id: 1, name: 'Hassan' });
// Output: User created: { id: 1, name: 'Hassan' }

// Multiple listeners for same event
emitter.on('userCreated', (user) => {
  console.log('Send welcome email to:', user.name);
});

emitter.on('userCreated', (user) => {
  console.log('Log user creation:', user.id);
});

// Once listener (fires only once, then auto-removes)
emitter.once('serverStarted', () => {
  console.log('Server started!');
});

emitter.emit('serverStarted'); // Logs: "Server started!"
emitter.emit('serverStarted'); // Nothing (already removed)

// Remove specific listener
function onUserDeleted(user) {
  console.log('User deleted:', user.id);
}

emitter.on('userDeleted', onUserDeleted);
emitter.off('userDeleted', onUserDeleted); // Remove listener

// Remove all listeners for an event
emitter.removeAllListeners('userCreated');

// Get listener count
console.log(emitter.listenerCount('userCreated')); // 0

// Error handling
emitter.on('error', (error) => {
  console.error('Error occurred:', error);
});

emitter.emit('error', new Error('Something went wrong'));

// Real-world: Custom class extending EventEmitter
class UserService extends EventEmitter {
  constructor() {
    super();
    this.users = [];
  }
  
  async createUser(userData) {
    try {
      // Simulate database save
      const user = {
        id: Date.now(),
        ...userData,
        createdAt: new Date()
      };
      
      this.users.push(user);
      
      // Emit event
      this.emit('userCreated', user);
      
      return user;
    } catch (error) {
      this.emit('error', error);
      throw error;
    }
  }
  
  async deleteUser(userId) {
    const index = this.users.findIndex(u => u.id === userId);
    
    if (index === -1) {
      const error = new Error('User not found');
      this.emit('error', error);
      throw error;
    }
    
    const user = this.users.splice(index, 1)[0];
    this.emit('userDeleted', user);
    
    return user;
  }
}

// Usage
const userService = new UserService();

// Set up listeners
userService.on('userCreated', (user) => {
  console.log(`Welcome email sent to ${user.email}`);
});

userService.on('userCreated', (user) => {
  console.log(`Analytics: New user ${user.id}`);
});

userService.on('userDeleted', (user) => {
  console.log(`Cleanup user data: ${user.id}`);
});

userService.on('error', (error) => {
  console.error('UserService error:', error.message);
});

// Use the service
const newUser = await userService.createUser({
  name: 'Hassan',
  email: 'hassan@example.com'
});

// Real-world: Order processing with events
class OrderProcessor extends EventEmitter {
  async processOrder(order) {
    try {
      this.emit('orderStarted', order);
      
      // Step 1: Validate
      await this.validateOrder(order);
      this.emit('orderValidated', order);
      
      // Step 2: Process payment
      await this.processPayment(order);
      this.emit('paymentProcessed', order);
      
      // Step 3: Create shipment
      await this.createShipment(order);
      this.emit('shipmentCreated', order);
      
      // Step 4: Send confirmation
      await this.sendConfirmation(order);
      this.emit('orderCompleted', order);
      
      return { success: true, order };
    } catch (error) {
      this.emit('orderFailed', { order, error });
      throw error;
    }
  }
  
  async validateOrder(order) {
    // Validation logic
  }
  
  async processPayment(order) {
    // Payment logic
  }
  
  async createShipment(order) {
    // Shipment logic
  }
  
  async sendConfirmation(order) {
    // Email logic
  }
}

const processor = new OrderProcessor();

// Set up event handlers
processor.on('orderStarted', (order) => {
  console.log(`Processing order ${order.id}`);
});

processor.on('paymentProcessed', (order) => {
  console.log(`Payment received: $${order.total}`);
});

processor.on('orderCompleted', (order) => {
  console.log(`Order ${order.id} completed successfully`);
  // Update database, send notifications, etc.
});

processor.on('orderFailed', ({ order, error }) => {
  console.error(`Order ${order.id} failed:`, error.message);
  // Log to monitoring, send alerts, etc.
});

// Process an order
await processor.processOrder({
  id: 'ORDER-123',
  total: 99.99,
  items: [{ id: 1, quantity: 2 }]
});
```

---

## 6. Module System - CommonJS vs ES Modules

### CommonJS (Legacy - Still Common in 2026)

```javascript
// math.js - Exporting with CommonJS
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

const PI = 3.14159;

// Export individual items
exports.add = add;
exports.subtract = subtract;
exports.PI = PI;

// Or export object
module.exports = {
  add,
  subtract,
  PI
};

// Or export class
class Calculator {
  add(a, b) {
    return a + b;
  }
}

module.exports = Calculator;

// app.js - Importing with CommonJS
const math = require('./math');
console.log(math.add(5, 3)); // 8

// Destructuring
const { add, subtract } = require('./math');
console.log(add(10, 5)); // 15

// Import class
const Calculator = require('./calculator');
const calc = new Calculator();

// Built-in modules
const fs = require('fs');
const path = require('path');
const http = require('http');

// Third-party modules
const express = require('express');
const mongoose = require('mongoose');

// require.cache - all loaded modules
console.log(Object.keys(require.cache));

// require.resolve - get full path
console.log(require.resolve('express'));
// /node_modules/express/index.js
```

### ES Modules (Modern Standard - 2026)

```javascript
// math.mjs or with "type": "module" in package.json

// Named exports
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

export const PI = 3.14159;

// Or export at end
function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

export { multiply, divide };

// Default export
export default class Calculator {
  add(a, b) {
    return a + b;
  }
}

// Or
class Calculator {
  // ...
}

export default Calculator;

// app.mjs - Importing ES Modules

// Named imports
import { add, subtract, PI } from './math.mjs';
console.log(add(5, 3)); // 8

// Import all as namespace
import * as math from './math.mjs';
console.log(math.add(5, 3)); // 8

// Default import
import Calculator from './calculator.mjs';
const calc = new Calculator();

// Mix default and named
import Calculator, { add, subtract } from './math.mjs';

// Rename imports
import { add as addition } from './math.mjs';
console.log(addition(5, 3)); // 8

// Dynamic imports (async)
async function loadModule() {
  const math = await import('./math.mjs');
  console.log(math.add(5, 3));
}

// Conditional loading
if (needsAdvancedMath) {
  const advanced = await import('./advanced-math.mjs');
  advanced.calculateComplexFormula();
}

// Built-in modules (use node: prefix)
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';

// Using promises
import { promises as fs } from 'node:fs';

// Top-level await (only in ES modules)
const config = await import('./config.mjs');
const data = await fs.readFile('./data.json', 'utf8');

// import.meta
console.log(import.meta.url); // file:///path/to/current/module.mjs
console.log(import.meta.dirname); // /path/to/current (Node 20.11+)
console.log(import.meta.filename); // /path/to/current/file.mjs (Node 20.11+)

// Real-world: __dirname and __filename in ES modules (before Node 20.11)
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(__dirname); // Current directory
console.log(__filename); // Current file
```

### Package.json Configuration

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "type": "module",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "node --watch index.js"
  },
  "dependencies": {
    "express": "^4.18.0"
  }
}
```

---

## 7. Environment Variables & Configuration

```javascript
// .env file
// NODE_ENV=development
// PORT=3000
// DATABASE_URL=mongodb://localhost:27017/mydb
// JWT_SECRET=your-secret-key
// API_KEY=abc123xyz

// Using dotenv package (most common)
import dotenv from 'dotenv';
dotenv.config();

console.log(process.env.NODE_ENV); // 'development'
console.log(process.env.PORT); // '3000'
console.log(process.env.DATABASE_URL);

// Or with path
dotenv.config({ path: '.env.local' });

// Built-in support (Node 20.6+)
// node --env-file=.env index.js

// Real-world: Configuration module
// config.js
const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT) || 3000,
  
  database: {
    url: process.env.DATABASE_URL || 'mongodb://localhost:27017/mydb',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  
  jwt: {
    secret: process.env.JWT_SECRET || 'change-me',
    expiresIn: process.env.JWT_EXPIRES || '7d'
  },
  
  api: {
    key: process.env.API_KEY,
    baseUrl: process.env.API_BASE_URL || 'https://api.example.com'
  },
  
  // Different configs per environment
  get isDevelopment() {
    return this.env === 'development';
  },
  
  get isProduction() {
    return this.env === 'production';
  }
};

export default config;

// Usage
import config from './config.js';

console.log(`Server running on port ${config.port}`);
console.log(`Environment: ${config.env}`);

if (config.isDevelopment) {
  console.log('Development mode - verbose logging enabled');
}

// Real-world: Validate required env variables
function validateEnv() {
  const required = [
    'NODE_ENV',
    'PORT',
    'DATABASE_URL',
    'JWT_SECRET'
  ];
  
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

validateEnv();

// Real-world: Type-safe env with validation (using zod)
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.string().transform(Number),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  API_KEY: z.string().optional()
});

const env = envSchema.parse(process.env);

// Now TypeScript knows the types!
export default env;
```

---

## 8. Child Processes - Running External Commands

```javascript
import { exec, spawn, execFile, fork } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

// exec - Execute command and buffer output
exec('ls -la', (error, stdout, stderr) => {
  if (error) {
    console.error('Error:', error);
    return;
  }
  console.log('Output:', stdout);
  if (stderr) {
    console.error('Errors:', stderr);
  }
});

// Modern async/await version
async function runCommand() {
  try {
    const { stdout, stderr } = await execPromise('npm --version');
    console.log('NPM version:', stdout.trim());
  } catch (error) {
    console.error('Command failed:', error);
  }
}

// spawn - Stream output (better for long-running processes)
const ls = spawn('ls', ['-la', '/usr']);

ls.stdout.on('data', (data) => {
  console.log(`Output: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.error(`Error: ${data}`);
});

ls.on('close', (code) => {
  console.log(`Process exited with code ${code}`);
});

// Real-world: Run npm install
async function installDependencies() {
  return new Promise((resolve, reject) => {
    const npm = spawn('npm', ['install'], {
      cwd: process.cwd(),
      stdio: 'inherit' // Show output in terminal
    });
    
    npm.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`npm install failed with code ${code}`));
      }
    });
  });
}

// Real-world: Git operations
async function gitStatus() {
  const git = spawn('git', ['status', '--short']);
  
  let output = '';
  
  git.stdout.on('data', (data) => {
    output += data.toString();
  });
  
  return new Promise((resolve, reject) => {
    git.on('close', (code) => {
      if (code === 0) {
        resolve(output);
      } else {
        reject(new Error('Git command failed'));
      }
    });
  });
}

const status = await gitStatus();
console.log('Git status:', status);

// fork - Run another Node.js script
// worker.js
if (process.send) {
  process.on('message', (data) => {
    const result = heavyComputation(data);
    process.send({ result });
  });
}

// main.js
const worker = fork('./worker.js');

worker.on('message', (message) => {
  console.log('Result from worker:', message.result);
});

worker.send({ data: 'process this' });

// Real-world: Image processing worker
// imageProcessor.js
import sharp from 'sharp';

process.on('message', async ({ imagePath, outputPath }) => {
  try {
    await sharp(imagePath)
      .resize(800, 600)
      .toFile(outputPath);
    
    process.send({ success: true, outputPath });
  } catch (error) {
    process.send({ success: false, error: error.message });
  }
});

// main.js
const imageWorker = fork('./imageProcessor.js');

imageWorker.on('message', ({ success, outputPath, error }) => {
  if (success) {
    console.log('Image processed:', outputPath);
  } else {
    console.error('Processing failed:', error);
  }
});

imageWorker.send({
  imagePath: './input.jpg',
  outputPath: './output.jpg'
});
```

---

## 9. Worker Threads - True Parallelism

```javascript
import { Worker, isMainThread, parentPort, workerData } from 'worker_threads';

// worker.js
if (!isMainThread) {
  // This code runs in worker thread
  const result = heavyComputation(workerData);
  parentPort.postMessage(result);
}

// main.js
function runWorker(data) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./worker.js', {
      workerData: data
    });
    
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });
  });
}

const result = await runWorker({ number: 1000000 });

// Real-world: CPU-intensive task (prime number calculation)
// primeWorker.js
import { parentPort, workerData } from 'worker_threads';

function isPrime(num) {
  if (num <= 1) return false;
  if (num <= 3) return true;
  
  if (num % 2 === 0 || num % 3 === 0) return false;
  
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) {
      return false;
    }
  }
  
  return true;
}

function findPrimes(start, end) {
  const primes = [];
  for (let i = start; i <= end; i++) {
    if (isPrime(i)) {
      primes.push(i);
    }
  }
  return primes;
}

const { start, end } = workerData;
const primes = findPrimes(start, end);
parentPort.postMessage(primes);

// main.js - Using worker pool
class WorkerPool {
  constructor(workerPath, poolSize = 4) {
    this.workerPath = workerPath;
    this.poolSize = poolSize;
    this.workers = [];
    this.queue = [];
    
    this.initializeWorkers();
  }
  
  initializeWorkers() {
    for (let i = 0; i < this.poolSize; i++) {
      this.workers.push({
        worker: null,
        busy: false
      });
    }
  }
  
  async exec(data) {
    return new Promise((resolve, reject) => {
      const task = { data, resolve, reject };
      this.queue.push(task);
      this.processQueue();
    });
  }
  
  processQueue() {
    if (this.queue.length === 0) return;
    
    const availableWorker = this.workers.find(w => !w.busy);
    if (!availableWorker) return;
    
    const task = this.queue.shift();
    this.runTask(availableWorker, task);
  }
  
  runTask(workerSlot, task) {
    workerSlot.busy = true;
    
    const worker = new Worker(this.workerPath, {
      workerData: task.data
    });
    
    worker.on('message', (result) => {
      task.resolve(result);
      worker.terminate();
      workerSlot.busy = false;
      this.processQueue();
    });
    
    worker.on('error', (error) => {
      task.reject(error);
      worker.terminate();
      workerSlot.busy = false;
      this.processQueue();
    });
  }
  
  async close() {
    await Promise.all(
      this.workers.map(w => w.worker?.terminate())
    );
  }
}

// Usage
const pool = new WorkerPool('./primeWorker.js', 4);

// Find primes in different ranges using worker pool
const ranges = [
  { start: 1, end: 10000 },
  { start: 10001, end: 20000 },
  { start: 20001, end: 30000 },
  { start: 30001, end: 40000 }
];

const results = await Promise.all(
  ranges.map(range => pool.exec(range))
);

console.log('All primes found:', results.flat());

await pool.close();
```

---

## 10. Modern Node.js Features (2024-2026)

### Built-in Test Runner

```javascript
// test/math.test.js
import { test, describe } from 'node:test';
import assert from 'node:assert';
import { add, subtract } from '../src/math.js';

describe('Math operations', () => {
  test('add two numbers', () => {
    assert.strictEqual(add(2, 3), 5);
    assert.strictEqual(add(-1, 1), 0);
  });
  
  test('subtract two numbers', () => {
    assert.strictEqual(subtract(5, 3), 2);
    assert.strictEqual(subtract(0, 5), -5);
  });
  
  test('async operations', async () => {
    const result = await asyncOperation();
    assert.strictEqual(result, 'success');
  });
});

// Run: node --test
```

### Watch Mode (Node 18+)

```bash
# Automatically restart on file changes
node --watch index.js

# Watch with environment file
node --watch --env-file=.env index.js
```

### Permission Model (Experimental)

```bash
# Restrict file system access
node --experimental-permission --allow-fs-read=/app/data index.js

# Restrict network access
node --experimental-permission --allow-net=api.example.com index.js
```

### Native Fetch API

```javascript
// No need for axios or node-fetch anymore!

// GET request
const response = await fetch('https://api.example.com/users');
const data = await response.json();

// POST request
const response = await fetch('https://api.example.com/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Hassan',
    email: 'hassan@example.com'
  })
});

// With timeout using AbortController
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 5000);

try {
  const response = await fetch('https://api.example.com/data', {
    signal: controller.signal
  });
  clearTimeout(timeoutId);
  const data = await response.json();
} catch (error) {
  if (error.name === 'AbortError') {
    console.error('Request timed out');
  }
}
```

### Web Crypto API

```javascript
import { webcrypto as crypto } from 'node:crypto';

// Generate random values
const randomBytes = crypto.getRandomValues(new Uint8Array(16));

// Hash data
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

const hashed = await hashPassword('mypassword');
```

---

# Express.js - Complete Guide (Web Framework for Node.js)

## Express.js Fundamentals - Building Web Applications

### What is Express.js?

Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. Think of it as the structure that makes building web servers and APIs much easier than using plain Node.js HTTP module.

**Why Express? (Industry Standard 2026):**
- **Minimalist & Unopinionated**: You choose your tools and structure
- **Middleware Ecosystem**: Thousands of plugins available
- **Routing**: Clean URL routing system
- **Template Engines**: Support for Pug, EJS, Handlebars, etc.
- **Industry Adoption**: Used by IBM, Uber, Accenture, Fox Sports

---

## 1. Getting Started with Express

### Basic Setup

```javascript
// Install: npm install express

import express from 'express';

const app = express();
const port = 3000;

// Simple route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

### Application Settings

```javascript
import express from 'express';
const app = express();

// Set view engine (for server-side rendering)
app.set('view engine', 'ejs');
app.set('views', './views');

// Enable/disable settings
app.enable('trust proxy'); // Trust proxy headers
app.disable('x-powered-by'); // Remove Express header (security)

// Custom settings
app.set('port', process.env.PORT || 3000);

// Get settings
const port = app.get('port');

// Check if setting is enabled
if (app.enabled('trust proxy')) {
  console.log('Proxy trust is enabled');
}

// Application-level locals (available in all views)
app.locals.siteName = 'My Awesome App';
app.locals.version = '1.0.0';

// Real-world: Environment-based configuration
const isDevelopment = process.env.NODE_ENV === 'development';

if (isDevelopment) {
  app.set('json spaces', 2); // Pretty print JSON
} else {
  app.enable('view cache'); // Cache compiled views
}
```

---

## 2. Routing - Handling Different URLs

### Basic Routes

```javascript
// GET request
app.get('/', (req, res) => {
  res.send('GET request to homepage');
});

// POST request
app.post('/users', (req, res) => {
  res.send('POST request to create user');
});

// PUT request
app.put('/users/:id', (req, res) => {
  res.send(`PUT request to update user ${req.params.id}`);
});

// DELETE request
app.delete('/users/:id', (req, res) => {
  res.send(`DELETE request to remove user ${req.params.id}`);
});

// PATCH request
app.patch('/users/:id', (req, res) => {
  res.send(`PATCH request to partially update user ${req.params.id}`);
});

// Handle multiple HTTP methods for same route
app.route('/users/:id')
  .get((req, res) => {
    res.send('Get user');
  })
  .put((req, res) => {
    res.send('Update user');
  })
  .delete((req, res) => {
    res.send('Delete user');
  });

// ALL - matches all HTTP methods
app.all('/secret', (req, res, next) => {
  console.log('Accessing secret section...');
  next(); // Pass to next handler
});
```

### Route Parameters

```javascript
// Basic parameter
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`User ID: ${userId}`);
});

// Multiple parameters
app.get('/users/:userId/posts/:postId', (req, res) => {
  const { userId, postId } = req.params;
  res.json({ userId, postId });
});

// Optional parameter (using ?)
app.get('/users/:id?', (req, res) => {
  if (req.params.id) {
    res.send(`User ID: ${req.params.id}`);
  } else {
    res.send('All users');
  }
});

// Regular expression constraints
app.get('/users/:id(\\d+)', (req, res) => {
  // Only matches numeric IDs
  res.send(`User ID: ${req.params.id}`);
});

// Multiple route patterns
app.get('/user/:id', (req, res) => {
  res.send('User route');
});

app.get('/profile/:id', (req, res) => {
  res.send('Profile route');
});

// Wildcard
app.get('/files/*', (req, res) => {
  // Matches /files/anything/here
  res.send(`File path: ${req.params[0]}`);
});

// Real-world: API versioning
app.get('/api/v1/users/:id', (req, res) => {
  res.json({ version: 1, userId: req.params.id });
});

app.get('/api/v2/users/:id', (req, res) => {
  res.json({ version: 2, userId: req.params.id });
});
```

### Query Parameters

```javascript
// URL: /search?q=javascript&page=2&limit=10
app.get('/search', (req, res) => {
  const query = req.query.q;        // 'javascript'
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  
  res.json({
    searchTerm: query,
    page,
    limit,
    results: []
  });
});

// URL: /filter?tags=nodejs&tags=express&tags=mongodb
app.get('/filter', (req, res) => {
  const tags = req.query.tags;
  // If single value: 'nodejs'
  // If multiple: ['nodejs', 'express', 'mongodb']
  
  const tagsArray = Array.isArray(tags) ? tags : [tags];
  
  res.json({ tags: tagsArray });
});

// Real-world: Pagination and filtering
app.get('/api/products', (req, res) => {
  const {
    page = 1,
    limit = 20,
    sort = 'createdAt',
    order = 'desc',
    category,
    minPrice,
    maxPrice,
    search
  } = req.query;
  
  const filters = {};
  
  if (category) filters.category = category;
  if (minPrice) filters.price = { $gte: parseFloat(minPrice) };
  if (maxPrice) {
    filters.price = { ...filters.price, $lte: parseFloat(maxPrice) };
  }
  if (search) filters.name = { $regex: search, $options: 'i' };
  
  // Use filters with database query
  const products = await Product.find(filters)
    .sort({ [sort]: order === 'asc' ? 1 : -1 })
    .limit(limit)
    .skip((page - 1) * limit);
  
  res.json({
    data: products,
    page: parseInt(page),
    limit: parseInt(limit),
    total: await Product.countDocuments(filters)
  });
});
```

### Router - Modular Routes

```javascript
// routes/users.js
import express from 'express';
const router = express.Router();

// Middleware specific to this router
router.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

// Define routes
router.get('/', (req, res) => {
  res.json({ message: 'Get all users' });
});

router.get('/:id', (req, res) => {
  res.json({ message: `Get user ${req.params.id}` });
});

router.post('/', (req, res) => {
  res.json({ message: 'Create user' });
});

router.put('/:id', (req, res) => {
  res.json({ message: `Update user ${req.params.id}` });
});

router.delete('/:id', (req, res) => {
  res.json({ message: `Delete user ${req.params.id}` });
});

export default router;

// app.js - Using the router
import userRoutes from './routes/users.js';

app.use('/api/users', userRoutes);
// All routes now accessible under /api/users
// GET /api/users
// GET /api/users/123
// POST /api/users
// etc.

// Real-world: Complete API structure
// routes/api/index.js
import express from 'express';
import userRoutes from './users.js';
import postRoutes from './posts.js';
import commentRoutes from './comments.js';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

// Health check
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date(),
    uptime: process.uptime()
  });
});

export default router;

// app.js
import apiRoutes from './routes/api/index.js';

app.use('/api/v1', apiRoutes);
// Now all routes are under /api/v1
// /api/v1/users
// /api/v1/posts
// /api/v1/comments
```

---

## 3. Middleware - Request Processing Pipeline

### Understanding Middleware

Middleware functions are functions that have access to the request object (req), response object (res), and the next middleware function in the application's request-response cycle.

```javascript
// Basic middleware structure
function myMiddleware(req, res, next) {
  console.log('Middleware executed');
  next(); // Pass control to next middleware
}

app.use(myMiddleware);

// Middleware that modifies request
app.use((req, res, next) => {
  req.requestTime = Date.now();
  next();
});

// Then in routes
app.get('/', (req, res) => {
  res.send(`Request received at: ${req.requestTime}`);
});

// Middleware can end request-response cycle
app.use((req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: 'No authorization token' });
  }
  next();
});

// Middleware with async operations
app.use(async (req, res, next) => {
  try {
    const user = await getUserFromToken(req.headers.authorization);
    req.user = user;
    next();
  } catch (error) {
    next(error); // Pass error to error handler
  }
});
```

### Built-in Middleware

```javascript
// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies (form data)
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));
// Files in 'public' folder are accessible:
// /public/style.css -> http://localhost:3000/style.css

// Static with virtual path prefix
app.use('/static', express.static('public'));
// /public/style.css -> http://localhost:3000/static/style.css

// Multiple static directories
app.use(express.static('public'));
app.use(express.static('uploads'));

// Static with options
app.use(express.static('public', {
  maxAge: '1d',              // Cache for 1 day
  etag: true,                // Enable ETag
  index: 'index.html',       // Default file
  dotfiles: 'ignore',        // Ignore hidden files
  extensions: ['html', 'htm'] // Try these extensions
}));

// Real-world: Combined middleware setup
app.use(express.json({ limit: '10mb' })); // Limit request size
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static('public', { maxAge: '7d' }));
```

### Third-Party Middleware

```javascript
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

// CORS - Cross-Origin Resource Sharing
app.use(cors());

// Or with options
app.use(cors({
  origin: 'https://example.com',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Dynamic CORS
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = ['https://example.com', 'https://app.example.com'];
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

// Helmet - Security headers
app.use(helmet());

// Morgan - HTTP request logger
app.use(morgan('combined')); // Apache combined format

// Different formats for different environments
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // Colored, concise output
} else {
  app.use(morgan('combined')); // Standard Apache combined format
}

// Compression - Gzip responses
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: 'Too many requests from this IP'
});

app.use('/api/', limiter);

// Different limits for different routes
const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5
});

app.use('/api/auth/login', strictLimiter);

// Cookie parser
import cookieParser from 'cookie-parser';

app.use(cookieParser('secret-key')); // Secret for signed cookies

// Session management
import session from 'express-session';

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// File upload
import multer from 'multer';

const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

app.post('/upload', upload.single('file'), (req, res) => {
  console.log(req.file); // Uploaded file info
  res.send('File uploaded');
});

// Multiple files
app.post('/upload-multiple', upload.array('files', 10), (req, res) => {
  console.log(req.files); // Array of files
  res.send(`${req.files.length} files uploaded`);
});
```

### Custom Middleware Examples

```javascript
// Logging middleware
function logger(req, res, next) {
  const start = Date.now();
  
  // Log request
  console.log(`${req.method} ${req.url}`);
  
  // Log response when finished
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.url} ${res.statusCode} - ${duration}ms`);
  });
  
  next();
}

app.use(logger);

// Authentication middleware
async function authenticate(req, res, next) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    
    if (!req.user) {
      return res.status(401).json({ error: 'User not found' });
    }
    
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Use on protected routes
app.get('/api/profile', authenticate, (req, res) => {
  res.json(req.user);
});

// Authorization middleware (role-based)
function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    
    next();
  };
}

// Usage
app.delete('/api/users/:id', 
  authenticate, 
  authorize('admin'),
  (req, res) => {
    // Only admin can delete users
  }
);

// Request validation middleware
import { z } from 'zod';

function validateBody(schema) {
  return (req, res, next) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      res.status(400).json({
        error: 'Validation failed',
        details: error.errors
      });
    }
  };
}

// Usage
const userSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  age: z.number().int().positive()
});

app.post('/api/users', 
  validateBody(userSchema),
  (req, res) => {
    // req.body is validated and typed
  }
);

// Response time middleware
app.use((req, res, next) => {
  const start = process.hrtime.bigint();
  
  res.on('finish', () => {
    const end = process.hrtime.bigint();
    const duration = Number(end - start) / 1_000_000; // Convert to ms
    res.setHeader('X-Response-Time', `${duration.toFixed(2)}ms`);
  });
  
  next();
});

// Cache middleware
const cache = new Map();

function cacheMiddleware(duration) {
  return (req, res, next) => {
    const key = req.originalUrl;
    const cached = cache.get(key);
    
    if (cached && Date.now() < cached.expires) {
      return res.json(cached.data);
    }
    
    // Override res.json to cache the response
    const originalJson = res.json;
    res.json = function(data) {
      cache.set(key, {
        data,
        expires: Date.now() + duration
      });
      return originalJson.call(this, data);
    };
    
    next();
  };
}

// Usage
app.get('/api/products', 
  cacheMiddleware(60000), // Cache for 1 minute
  async (req, res) => {
    const products = await Product.find();
    res.json(products);
  }
);
```

---

## 4. Request and Response Objects

### Request Object Properties

```javascript
app.get('/test', (req, res) => {
  // HTTP Method
  console.log(req.method); // 'GET'
  
  // URL information
  console.log(req.url); // '/test?name=john'
  console.log(req.originalUrl); // Full URL including base
  console.log(req.path); // '/test' (without query)
  console.log(req.baseUrl); // If using router
  
  // Route parameters
  console.log(req.params); // { id: '123' } from /users/:id
  
  // Query string
  console.log(req.query); // { name: 'john' } from ?name=john
  
  // Request body (requires body parser middleware)
  console.log(req.body); // { username: 'hassan' }
  
  // Headers
  console.log(req.headers); // All headers
  console.log(req.get('Content-Type')); // Specific header
  console.log(req.header('Authorization')); // Same as get()
  
  // Cookies (requires cookie-parser)
  console.log(req.cookies); // { sessionId: 'abc123' }
  console.log(req.signedCookies); // Signed cookies
  
  // Client information
  console.log(req.ip); // Client IP address
  console.log(req.ips); // Array of IPs (if proxy)
  console.log(req.hostname); // 'example.com'
  console.log(req.protocol); // 'http' or 'https'
  console.log(req.secure); // true if HTTPS
  console.log(req.subdomains); // ['api'] from api.example.com
  
  // Content negotiation
  console.log(req.accepts('json')); // Check if client accepts JSON
  console.log(req.accepts(['json', 'html'])); // Best match
  console.log(req.acceptsLanguages(['en', 'es']));
  console.log(req.acceptsCharsets(['utf-8']));
  
  // Check content type
  console.log(req.is('json')); // true if Content-Type is application/json
  console.log(req.is('application/*')); // Wildcard matching
  
  // XHR (Ajax) request check
  console.log(req.xhr); // true if X-Requested-With: XMLHttpRequest
  
  res.send('Check console');
});
```

### Response Object Methods

```javascript
app.get('/response-examples', (req, res) => {
  // Send various types of responses
  
  // Simple string
  res.send('Hello');
  
  // HTML
  res.send('<h1>Hello</h1>');
  
  // JSON
  res.json({ message: 'Hello', user: 'Hassan' });
  
  // JSON with status code
  res.status(201).json({ message: 'Created' });
  
  // Send status message
  res.sendStatus(200); // Sends 'OK'
  res.sendStatus(404); // Sends 'Not Found'
  
  // Set status code (then send)
  res.status(404).send('Page not found');
  
  // Set headers
  res.set('Content-Type', 'text/plain');
  res.set({
    'Content-Type': 'application/json',
    'X-Custom-Header': 'Value'
  });
  
  // Type (Content-Type shorthand)
  res.type('json'); // Sets Content-Type to application/json
  res.type('html'); // text/html
  res.type('png');  // image/png
  
  // Get header value
  console.log(res.get('Content-Type'));
  
  // Append to header
  res.append('Link', '<http://example.com>');
  
  // Redirect
  res.redirect('/new-url');
  res.redirect(301, '/permanent-url'); // Permanent redirect
  res.redirect('back'); // Back to referrer
  res.redirect('http://example.com');
  
  // Send file
  res.sendFile('/path/to/file.pdf');
  
  // Download file (sets Content-Disposition)
  res.download('/path/to/file.pdf');
  res.download('/path/to/file.pdf', 'report.pdf'); // Custom filename
  
  // Attachment header
  res.attachment('report.pdf');
  
  // Cookie operations
  res.cookie('name', 'value');
  res.cookie('user', 'hassan', {
    maxAge: 900000,  // 15 minutes
    httpOnly: true,
    secure: true,
    signed: true
  });
  
  // Clear cookie
  res.clearCookie('name');
  
  // Format response based on Accept header
  res.format({
    'text/plain': () => {
      res.send('Hey');
    },
    'text/html': () => {
      res.send('<p>Hey</p>');
    },
    'application/json': () => {
      res.json({ message: 'Hey' });
    },
    'default': () => {
      res.status(406).send('Not Acceptable');
    }
  });
  
  // Links header (for pagination)
  res.links({
    next: 'http://api.example.com/users?page=2',
    last: 'http://api.example.com/users?page=5'
  });
  
  // Location header
  res.location('/users/123');
  
  // Vary header (for caching)
  res.vary('User-Agent');
  
  // Render view (template engine)
  res.render('index', { title: 'Home', user: req.user });
});

// Real-world: API responses with standard format
function sendSuccess(res, data, message = 'Success') {
  res.json({
    success: true,
    message,
    data
  });
}

function sendError(res, statusCode, message) {
  res.status(statusCode).json({
    success: false,
    error: message
  });
}

// Usage
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return sendError(res, 404, 'User not found');
    }
    
    sendSuccess(res, user);
  } catch (error) {
    sendError(res, 500, 'Server error');
  }
});
```

---

## 5. Error Handling - Professional Error Management

### Basic Error Handling

```javascript
// Synchronous errors are caught automatically
app.get('/sync-error', (req, res) => {
  throw new Error('Something went wrong!');
  // Express catches this and sends 500 error
});

// Async errors need explicit handling
app.get('/async-error', async (req, res, next) => {
  try {
    await someAsyncOperation();
    res.json({ success: true });
  } catch (error) {
    next(error); // Pass to error handler
  }
});

// Error-handling middleware (4 parameters!)
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  res.status(err.status || 500).json({
    error: {
      message: err.message,
      status: err.status || 500
    }
  });
});
```

### Custom Error Classes

```javascript
// errors/AppError.js
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // Distinguish from programming errors
    
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends AppError {
  constructor(message = 'Bad Request') {
    super(message, 400);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden') {
    super(message, 403);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Not Found') {
    super(message, 404);
  }
}

export class ValidationError extends AppError {
  constructor(errors) {
    super('Validation Failed', 422);
    this.errors = errors;
  }
}

// Usage in routes
import { NotFoundError, BadRequestError } from './errors/AppError.js';

app.get('/users/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      throw new NotFoundError('User not found');
    }
    
    res.json(user);
  } catch (error) {
    next(error);
  }
});
```

### Comprehensive Error Handler

```javascript
// middleware/errorHandler.js
export function errorHandler(err, req, res, next) {
  // Log error
  console.error('Error:', {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method
  });
  
  // Default error values
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  
  // Handle specific error types
  
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map(e => e.message).join(', ');
  }
  
  // Mongoose duplicate key error
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyPattern)[0];
    message = `${field} already exists`;
  }
  
  // Mongoose cast error (invalid ID)
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }
  
  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
  }
  
  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired';
  }
  
  // Send response
  const response = {
    success: false,
    error: {
      message,
      status: statusCode
    }
  };
  
  // Include stack trace in development
  if (process.env.NODE_ENV === 'development') {
    response.error.stack = err.stack;
  }
  
  // Include validation errors if present
  if (err.errors) {
    response.error.details = err.errors;
  }
  
  res.status(statusCode).json(response);
}

// 404 handler (must be before error handler)
export function notFoundHandler(req, res, next) {
  const error = new NotFoundError(`Route ${req.originalUrl} not found`);
  next(error);
}

// app.js
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

// ... all routes ...

// 404 handler
app.use(notFoundHandler);

// Error handler (must be last)
app.use(errorHandler);
```

### Async Error Wrapper

```javascript
// utils/asyncHandler.js
export function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

// Usage - no more try-catch!
app.get('/users/:id', asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  
  if (!user) {
    throw new NotFoundError('User not found');
  }
  
  res.json(user);
}));

// Or as route decorator
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new NotFoundError();
  res.json(user);
});

app.get('/users/:id', getUser);
```

---

## 6. Real-World Project Structure

### Professional Folder Structure

```
project/
├── src/
│   ├── config/
│   │   ├── database.js
│   │   ├── env.js
│   │   └── constants.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   └── productController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── validation.js
│   │   ├── errorHandler.js
│   │   └── rateLimiter.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── index.js
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   └── productRoutes.js
│   ├── services/
│   │   ├── authService.js
│   │   ├── emailService.js
│   │   └── paymentService.js
│   ├── utils/
│   │   ├── asyncHandler.js
│   │   ├── ApiError.js
│   │   └── logger.js
│   ├── validators/
│   │   ├── userValidator.js
│   │   └── productValidator.js
│   └── app.js
├── tests/
├── .env
├── .env.example
├── .gitignore
├── package.json
└── server.js
```

### Example Implementation

```javascript
// config/database.js
import mongoose from 'mongoose';
import config from './env.js';

export async function connectDatabase() {
  try {
    await mongoose.connect(config.database.url);
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
}

// config/env.js
import dotenv from 'dotenv';
dotenv.config();

export default {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT) || 3000,
  
  database: {
    url: process.env.DATABASE_URL
  },
  
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  },
  
  email: {
    from: process.env.EMAIL_FROM,
    apiKey: process.env.SENDGRID_API_KEY
  }
};

// controllers/userController.js
import User from '../models/User.js';
import { NotFoundError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password');
  
  res.json({
    success: true,
    data: users
  });
});

export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  
  if (!user) {
    throw new NotFoundError('User not found');
  }
  
  res.json({
    success: true,
    data: user
  });
});

export const createUser = asyncHandler(async (req, res) => {
  const user = await User.create(req.body);
  
  res.status(201).json({
    success: true,
    data: user
  });
});

export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  
  if (!user) {
    throw new NotFoundError('User not found');
  }
  
  res.json({
    success: true,
    data: user
  });
});

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  
  if (!user) {
    throw new NotFoundError('User not found');
  }
  
  res.json({
    success: true,
    message: 'User deleted successfully'
  });
});

// routes/userRoutes.js
import express from 'express';
import * as userController from '../controllers/userController.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { validateUser } from '../validators/userValidator.js';

const router = express.Router();

router.get('/', 
  authenticate,
  userController.getAllUsers
);

router.get('/:id',
  authenticate,
  userController.getUserById
);

router.post('/',
  authenticate,
  authorize('admin'),
  validateUser,
  userController.createUser
);

router.put('/:id',
  authenticate,
  authorize('admin'),
  validateUser,
  userController.updateUser
);

router.delete('/:id',
  authenticate,
  authorize('admin'),
  userController.deleteUser
);

export default router;

// app.js
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import routes from './routes/index.js';

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api', routes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;

// server.js
import app from './src/app.js';
import { connectDatabase } from './src/config/database.js';
import config from './src/config/env.js';

async function startServer() {
  try {
    // Connect to database
    await connectDatabase();
    
    // Start server
    app.listen(config.port, () => {
      console.log(`🚀 Server running on port ${config.port}`);
      console.log(`📝 Environment: ${config.env}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing server gracefully');
  server.close(() => {
    console.log('Server closed');
    mongoose.connection.close();
  });
});
```

---

## 7. Best Practices (2026 Industry Standards)

### Security Best Practices

```javascript
// 1. Use helmet for security headers
import helmet from 'helmet';
app.use(helmet());

// 2. Rate limiting
import rateLimit from 'express-rate-limit';
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api/', limiter);

// 3. CORS configuration
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  credentials: true
}));

// 4. Input validation
import { z } from 'zod';

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

// 5. SQL injection prevention (use ORM)
// DON'T: db.query(`SELECT * FROM users WHERE id = ${userId}`)
// DO: db.query('SELECT * FROM users WHERE id = ?', [userId])

// 6. XSS prevention
import xss from 'xss-clean';
app.use(xss());

// 7. Secure cookies
res.cookie('token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 24 * 60 * 60 * 1000
});

// 8. Environment variables
// Never commit .env to git
// Use strong, random secrets
```

### Performance Best Practices

```javascript
// 1. Compression
import compression from 'compression';
app.use(compression());

// 2. Caching
app.use(express.static('public', {
  maxAge: '1y',
  etag: true
}));

// 3. Database connection pooling
mongoose.connect(uri, {
  maxPoolSize: 10,
  minPoolSize: 5
});

// 4. Async/await properly
// BAD: Sequential
const user = await User.findById(id);
const posts = await Post.find({ userId: id });

// GOOD: Parallel
const [user, posts] = await Promise.all([
  User.findById(id),
  Post.find({ userId: id })
]);

// 5. Pagination
app.get('/api/posts', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;
  
  const [posts, total] = await Promise.all([
    Post.find().skip(skip).limit(limit),
    Post.countDocuments()
  ]);
  
  res.json({
    posts,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

// 6. Database indexes
// In your models
userSchema.index({ email: 1 });
userSchema.index({ createdAt: -1 });

// 7. Avoid blocking operations
// Use worker threads for CPU-intensive tasks
```

### Code Organization Best Practices

```javascript
// 1. Separation of concerns
// Controllers handle HTTP
// Services handle business logic
// Models handle data

// 2. Dependency injection
class UserService {
  constructor(userRepository, emailService) {
    this.userRepository = userRepository;
    this.emailService = emailService;
  }
  
  async createUser(userData) {
    const user = await this.userRepository.create(userData);
    await this.emailService.sendWelcome(user.email);
    return user;
  }
}

// 3. Environment-based configuration
const config = {
  development: {
    logLevel: 'debug'
  },
  production: {
    logLevel: 'error'
  }
}[process.env.NODE_ENV];

// 4. Proper error handling everywhere
// Always use try-catch or asyncHandler

// 5. Logging
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// 6. Testing
// Write tests for critical paths
import { describe, it } from 'node:test';
import assert from 'node:assert';

describe('User API', () => {
  it('should create a user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ name: 'Test', email: 'test@example.com' });
    
    assert.strictEqual(response.status, 201);
  });
});
```

---

# MongoDB & Mongoose - Complete Database Guide

## MongoDB Fundamentals - NoSQL Database

### What is MongoDB?

MongoDB is a NoSQL document database that stores data in flexible, JSON-like documents. Instead of tables and rows like SQL databases, MongoDB uses collections and documents.

**Why MongoDB? (Industry Standard 2026):**
- **Flexible Schema**: Documents can have different structures
- **Scalability**: Horizontal scaling with sharding
- **Performance**: Fast reads and writes
- **JSON-like Documents**: Natural fit for JavaScript
- **Rich Query Language**: Powerful querying capabilities
- **Used By**: Google, Facebook, eBay, Adobe, Forbes

---

## 1. MongoDB Basics - Understanding Documents

### Document Structure

```javascript
// A MongoDB document (similar to JavaScript object)
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  name: "Hassan Ahmed",
  email: "hassan@example.com",
  age: 25,
  address: {
    street: "123 Main St",
    city: "Lahore",
    country: "Pakistan"
  },
  hobbies: ["coding", "reading", "gaming"],
  createdAt: ISODate("2024-01-15T10:30:00Z"),
  isActive: true
}

// Documents are grouped in collections
// Collection = Array of documents
// Database = Multiple collections
```

### Basic MongoDB Shell Commands

```javascript
// Show databases
show dbs

// Use/create database
use myapp

// Show collections
show collections

// Insert document
db.users.insertOne({
  name: "Hassan",
  email: "hassan@example.com",
  age: 25
})

// Insert multiple documents
db.users.insertMany([
  { name: "Ali", email: "ali@example.com", age: 30 },
  { name: "Sara", email: "sara@example.com", age: 28 }
])

// Find all documents
db.users.find()

// Find with filter
db.users.find({ age: { $gte: 25 } })

// Find one document
db.users.findOne({ email: "hassan@example.com" })

// Update document
db.users.updateOne(
  { email: "hassan@example.com" },
  { $set: { age: 26 } }
)

// Update multiple documents
db.users.updateMany(
  { age: { $lt: 25 } },
  { $set: { category: "junior" } }
)

// Delete document
db.users.deleteOne({ email: "hassan@example.com" })

// Delete multiple documents
db.users.deleteMany({ age: { $lt: 18 } })

// Count documents
db.users.countDocuments({ age: { $gte: 25 } })

// Drop collection
db.users.drop()
```

---

## 2. MongoDB with Node.js - Native Driver

### Connecting to MongoDB

```javascript
import { MongoClient, ObjectId } from 'mongodb';

const url = 'mongodb://localhost:27017';
const dbName = 'myapp';

// Create client
const client = new MongoClient(url);

async function main() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log('Connected to MongoDB');
    
    // Get database
    const db = client.db(dbName);
    
    // Get collection
    const users = db.collection('users');
    
    // Insert one
    const result = await users.insertOne({
      name: 'Hassan',
      email: 'hassan@example.com',
      age: 25
    });
    console.log('Inserted:', result.insertedId);
    
    // Find all
    const allUsers = await users.find().toArray();
    console.log('All users:', allUsers);
    
    // Find with filter
    const adults = await users.find({ age: { $gte: 18 } }).toArray();
    
    // Find one
    const user = await users.findOne({ email: 'hassan@example.com' });
    
    // Update
    await users.updateOne(
      { email: 'hassan@example.com' },
      { $set: { age: 26 } }
    );
    
    // Delete
    await users.deleteOne({ email: 'hassan@example.com' });
    
  } finally {
    await client.close();
  }
}

main().catch(console.error);
```

### Query Operators

```javascript
// Comparison operators
db.users.find({ age: { $eq: 25 } });      // Equal
db.users.find({ age: { $ne: 25 } });      // Not equal
db.users.find({ age: { $gt: 25 } });      // Greater than
db.users.find({ age: { $gte: 25 } });     // Greater than or equal
db.users.find({ age: { $lt: 30 } });      // Less than
db.users.find({ age: { $lte: 30 } });     // Less than or equal
db.users.find({ age: { $in: [25, 30, 35] } });  // In array
db.users.find({ age: { $nin: [25, 30] } });     // Not in array

// Logical operators
db.users.find({
  $and: [
    { age: { $gte: 25 } },
    { city: 'Lahore' }
  ]
});

db.users.find({
  $or: [
    { age: { $lt: 18 } },
    { age: { $gt: 65 } }
  ]
});

db.users.find({
  age: { $not: { $gte: 25 } }
});

// Element operators
db.users.find({ email: { $exists: true } });  // Has email field
db.users.find({ age: { $type: 'number' } });  // Age is number

// Array operators
db.users.find({ hobbies: 'coding' });  // Array contains 'coding'
db.users.find({ hobbies: { $all: ['coding', 'reading'] } });  // Has all
db.users.find({ hobbies: { $size: 3 } });  // Array has 3 elements

// String operators
db.users.find({ name: { $regex: /^Hassan/ } });  // Starts with Hassan
db.users.find({ name: { $regex: /Ahmed$/i } });  // Ends with Ahmed (case-insensitive)

// Nested document queries
db.users.find({ 'address.city': 'Lahore' });
db.users.find({ 'address.zipCode': { $exists: true } });
```

### Update Operators

```javascript
// Set field value
db.users.updateOne(
  { email: 'hassan@example.com' },
  { $set: { age: 26, city: 'Lahore' } }
);

// Unset (remove) field
db.users.updateOne(
  { email: 'hassan@example.com' },
  { $unset: { tempField: '' } }
);

// Increment/Decrement
db.users.updateOne(
  { email: 'hassan@example.com' },
  { $inc: { age: 1, loginCount: 1 } }  // Increase by 1
);

db.users.updateOne(
  { email: 'hassan@example.com' },
  { $inc: { credits: -10 } }  // Decrease by 10
);

// Multiply
db.users.updateOne(
  { email: 'hassan@example.com' },
  { $mul: { score: 1.1 } }  // Multiply by 1.1
);

// Rename field
db.users.updateOne(
  { email: 'hassan@example.com' },
  { $rename: { 'name': 'fullName' } }
);

// Set if doesn't exist
db.users.updateOne(
  { email: 'hassan@example.com' },
  { $setOnInsert: { createdAt: new Date() } },
  { upsert: true }  // Create if doesn't exist
);

// Array update operators
// Add to array
db.users.updateOne(
  { email: 'hassan@example.com' },
  { $push: { hobbies: 'gaming' } }
);

// Add multiple to array
db.users.updateOne(
  { email: 'hassan@example.com' },
  { $push: { hobbies: { $each: ['reading', 'coding'] } } }
);

// Add to array only if doesn't exist
db.users.updateOne(
  { email: 'hassan@example.com' },
  { $addToSet: { hobbies: 'gaming' } }
);

// Remove from array
db.users.updateOne(
  { email: 'hassan@example.com' },
  { $pull: { hobbies: 'gaming' } }
);

// Remove first/last element
db.users.updateOne(
  { email: 'hassan@example.com' },
  { $pop: { hobbies: 1 } }  // 1 = last, -1 = first
);

// Update array element
db.users.updateOne(
  { email: 'hassan@example.com', 'hobbies': 'coding' },
  { $set: { 'hobbies.$': 'programming' } }  // $ is matched element
);
```

### Aggregation Pipeline

```javascript
// Aggregation for complex queries and transformations
db.users.aggregate([
  // Stage 1: Match (filter)
  { $match: { age: { $gte: 18 } } },
  
  // Stage 2: Group
  { $group: {
    _id: '$city',
    count: { $sum: 1 },
    avgAge: { $avg: '$age' },
    maxAge: { $max: '$age' },
    minAge: { $min: '$age' }
  }},
  
  // Stage 3: Sort
  { $sort: { count: -1 } },
  
  // Stage 4: Limit
  { $limit: 5 }
]);

// Real-world: Order statistics
db.orders.aggregate([
  // Match orders from last month
  { $match: {
    createdAt: { $gte: new Date('2024-01-01') }
  }},
  
  // Group by customer
  { $group: {
    _id: '$customerId',
    totalOrders: { $sum: 1 },
    totalAmount: { $sum: '$amount' },
    avgOrderValue: { $avg: '$amount' }
  }},
  
  // Filter high-value customers
  { $match: {
    totalAmount: { $gte: 1000 }
  }},
  
  // Sort by total amount
  { $sort: { totalAmount: -1 } },
  
  // Join with users collection
  { $lookup: {
    from: 'users',
    localField: '_id',
    foreignField: '_id',
    as: 'customerInfo'
  }},
  
  // Unwind array
  { $unwind: '$customerInfo' },
  
  // Project (select fields)
  { $project: {
    customerName: '$customerInfo.name',
    totalOrders: 1,
    totalAmount: 1,
    avgOrderValue: 1
  }}
]);
```

---

## 3. Mongoose - MongoDB ODM (Object Document Mapper)

### What is Mongoose?

Mongoose provides a schema-based solution to model your application data. It includes built-in type casting, validation, query building, and business logic hooks.

### Setup and Connection

```javascript
import mongoose from 'mongoose';

// Connection string
const mongoURL = 'mongodb://localhost:27017/myapp';

// Connect with options
mongoose.connect(mongoURL, {
  // Connection options (2026 best practices)
  maxPoolSize: 10,        // Maximum connections
  minPoolSize: 5,         // Minimum connections
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
});

// Connection events
mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB connected');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️  MongoDB disconnected');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed');
  process.exit(0);
});

// Real-world: Connection with retry
async function connectDB() {
  const maxRetries = 5;
  let retries = 0;
  
  while (retries < maxRetries) {
    try {
      await mongoose.connect(mongoURL);
      console.log('Database connected successfully');
      return;
    } catch (error) {
      retries++;
      console.error(`Connection attempt ${retries} failed:`, error.message);
      
      if (retries < maxRetries) {
        console.log(`Retrying in 5 seconds...`);
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }
  }
  
  console.error('Failed to connect after maximum retries');
  process.exit(1);
}

connectDB();
```

### Schemas - Defining Document Structure

```javascript
import mongoose from 'mongoose';

// Define schema
const userSchema = new mongoose.Schema({
  // String
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [3, 'Name must be at least 3 characters'],
    maxlength: [50, 'Name cannot exceed 50 characters'],
    trim: true  // Remove whitespace
  },
  
  // Email with validation
  email: {
    type: String,
    required: true,
    unique: true,  // Create unique index
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
  },
  
  // Number
  age: {
    type: Number,
    min: [0, 'Age cannot be negative'],
    max: [120, 'Age cannot exceed 120']
  },
  
  // Boolean
  isActive: {
    type: Boolean,
    default: true
  },
  
  // Date
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  // Array of strings
  hobbies: [String],
  
  // Array of objects
  addresses: [{
    street: String,
    city: String,
    zipCode: String,
    isPrimary: Boolean
  }],
  
  // Nested object
  profile: {
    bio: String,
    avatar: String,
    socialLinks: {
      twitter: String,
      linkedin: String
    }
  },
  
  // Reference to another model
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'  // References User model
  },
  
  // Enum
  role: {
    type: String,
    enum: ['user', 'admin', 'moderator'],
    default: 'user'
  },
  
  // Mixed type (any type)
  metadata: mongoose.Schema.Types.Mixed
}, {
  // Schema options
  timestamps: true,  // Adds createdAt and updatedAt
  versionKey: false  // Remove __v field
});

// Create model
const User = mongoose.model('User', userSchema);

// Export model
export default User;
```

### Schema Types and Options

```javascript
// All schema types
const schema = new mongoose.Schema({
  // String
  name: String,
  
  // Number
  age: Number,
  
  // Date
  birthday: Date,
  
  // Buffer (binary data)
  profilePicture: Buffer,
  
  // Boolean
  isActive: Boolean,
  
  // Mixed (any type)
  any: mongoose.Schema.Types.Mixed,
  
  // ObjectId
  userId: mongoose.Schema.Types.ObjectId,
  
  // Array
  tags: [String],
  numbers: [Number],
  
  // Nested object
  address: {
    street: String,
    city: String
  },
  
  // Decimal (for precise numbers like money)
  price: mongoose.Schema.Types.Decimal128,
  
  // BigInt (for large integers)
  bigNumber: BigInt,
  
  // Map (key-value pairs)
  socialLinks: {
    type: Map,
    of: String
  }
});

// Common field options
const fieldSchema = {
  type: String,
  required: true,              // Field is required
  unique: true,                // Create unique index
  index: true,                 // Create index
  sparse: true,                // Sparse index
  default: 'value',            // Default value
  validate: {                  // Custom validation
    validator: function(v) {
      return v.length > 3;
    },
    message: 'Must be longer than 3 characters'
  },
  get: v => Math.round(v),     // Getter (when reading)
  set: v => Math.round(v),     // Setter (when writing)
  lowercase: true,             // Convert to lowercase
  uppercase: true,             // Convert to uppercase
  trim: true,                  // Remove whitespace
  match: /pattern/,            // Regex validation
  enum: ['value1', 'value2'],  // Allowed values
  min: 0,                      // Minimum value (numbers/dates)
  max: 100,                    // Maximum value
  minlength: 3,                // Min string length
  maxlength: 50,               // Max string length
  immutable: true,             // Cannot be changed after creation
  select: false                // Exclude from queries by default
};
```

### CRUD Operations with Mongoose

```javascript
import User from './models/User.js';

// CREATE

// Create single document
const user = await User.create({
  name: 'Hassan Ahmed',
  email: 'hassan@example.com',
  age: 25
});

// Create with new + save
const newUser = new User({
  name: 'Ali Khan',
  email: 'ali@example.com'
});
await newUser.save();

// Create multiple documents
const users = await User.create([
  { name: 'Sara', email: 'sara@example.com' },
  { name: 'Ahmed', email: 'ahmed@example.com' }
]);

// INSERT MANY (faster for bulk)
const manyUsers = await User.insertMany([
  { name: 'User1', email: 'user1@example.com' },
  { name: 'User2', email: 'user2@example.com' }
]);

// READ

// Find all
const allUsers = await User.find();

// Find with filter
const adults = await User.find({ age: { $gte: 18 } });

// Find one
const user = await User.findOne({ email: 'hassan@example.com' });

// Find by ID
const user = await User.findById('507f1f77bcf86cd799439011');

// Select specific fields
const users = await User.find().select('name email');
const users = await User.find().select('-password'); // Exclude password

// Sort
const users = await User.find().sort({ createdAt: -1 }); // Descending
const users = await User.find().sort({ name: 1 }); // Ascending

// Limit and skip (pagination)
const users = await User.find()
  .limit(10)
  .skip(20); // Page 3, 10 per page

// Count
const count = await User.countDocuments({ age: { $gte: 18 } });

// Exists
const exists = await User.exists({ email: 'hassan@example.com' });

// UPDATE

// Update one
const result = await User.updateOne(
  { email: 'hassan@example.com' },
  { $set: { age: 26 } }
);

// Update many
await User.updateMany(
  { age: { $lt: 18 } },
  { $set: { category: 'minor' } }
);

// Find and update (returns updated document)
const user = await User.findOneAndUpdate(
  { email: 'hassan@example.com' },
  { $set: { age: 26 } },
  { new: true }  // Return updated document
);

// Find by ID and update
const user = await User.findByIdAndUpdate(
  '507f1f77bcf86cd799439011',
  { $set: { age: 26 } },
  { new: true, runValidators: true }
);

// DELETE

// Delete one
await User.deleteOne({ email: 'hassan@example.com' });

// Delete many
await User.deleteMany({ age: { $lt: 18 } });

// Find and delete (returns deleted document)
const deletedUser = await User.findOneAndDelete({ email: 'hassan@example.com' });

// Find by ID and delete
const user = await User.findByIdAndDelete('507f1f77bcf86cd799439011');
```

---

### Mongoose Middleware (Hooks)

```javascript
// Middleware runs before or after certain operations

// PRE middleware - runs before operation
userSchema.pre('save', function(next) {
  // 'this' refers to the document being saved
  console.log('About to save user:', this.name);
  
  // Modify document before saving
  this.updatedAt = Date.now();
  
  next(); // Continue to next middleware or save
});

// Real-world: Hash password before saving
import bcrypt from 'bcrypt';

userSchema.pre('save', async function(next) {
  // Only hash if password is modified
  if (!this.isModified('password')) {
    return next();
  }
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// POST middleware - runs after operation
userSchema.post('save', function(doc, next) {
  console.log('User saved:', doc.name);
  next();
});

// Query middleware
userSchema.pre('find', function(next) {
  // 'this' is the query
  this.start = Date.now();
  next();
});

userSchema.post('find', function(docs, next) {
  console.log(`Query took ${Date.now() - this.start}ms`);
  next();
});

// Aggregate middleware
userSchema.pre('aggregate', function(next) {
  // Add stage to pipeline
  this.pipeline().unshift({ $match: { isActive: true } });
  next();
});

// Remove/Delete middleware
userSchema.pre('remove', async function(next) {
  // Clean up related data
  await Post.deleteMany({ author: this._id });
  next();
});

// findOneAndDelete middleware
userSchema.pre('findOneAndDelete', async function(next) {
  const doc = await this.model.findOne(this.getFilter());
  if (doc) {
    // Cleanup associated data
    await Comment.deleteMany({ userId: doc._id });
  }
  next();
});
```

### Virtual Properties

```javascript
// Virtuals are document properties that don't get saved to MongoDB

userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.virtual('fullName').set(function(name) {
  const parts = name.split(' ');
  this.firstName = parts[0];
  this.lastName = parts[1];
});

// Usage
const user = new User({
  firstName: 'Hassan',
  lastName: 'Ahmed'
});

console.log(user.fullName); // 'Hassan Ahmed'

user.fullName = 'Ali Khan';
console.log(user.firstName); // 'Ali'
console.log(user.lastName); // 'Khan'

// Virtual populate (for relationships)
userSchema.virtual('posts', {
  ref: 'Post',  // Model to use
  localField: '_id',  // Field on User
  foreignField: 'author'  // Field on Post
});

// Must explicitly populate
const user = await User.findById(id).populate('posts');
console.log(user.posts); // Array of user's posts

// Include virtuals in JSON
userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });
```

### Instance Methods

```javascript
// Methods available on document instances

userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    { id: this._id, email: this.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
  return token;
};

userSchema.methods.toPublicJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  return obj;
};

// Usage
const user = await User.findOne({ email: 'hassan@example.com' });

// Compare password
const isMatch = await user.comparePassword('password123');

// Generate token
const token = user.generateAuthToken();

// Get public data
const publicData = user.toPublicJSON();
```

### Static Methods

```javascript
// Methods available on the Model (not instances)

userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() });
};

userSchema.statics.findActive = function() {
  return this.find({ isActive: true });
};

userSchema.statics.createWithHashedPassword = async function(userData) {
  const salt = await bcrypt.genSalt(10);
  userData.password = await bcrypt.hash(userData.password, salt);
  return this.create(userData);
};

// Usage
const user = await User.findByEmail('hassan@example.com');
const activeUsers = await User.findActive();
const newUser = await User.createWithHashedPassword({
  email: 'ali@example.com',
  password: 'password123'
});
```

### Query Helpers

```javascript
// Custom query methods

userSchema.query.byAge = function(age) {
  return this.where({ age });
};

userSchema.query.active = function() {
  return this.where({ isActive: true });
};

userSchema.query.recent = function() {
  return this.sort({ createdAt: -1 });
};

// Usage (chain custom query methods)
const users = await User
  .find()
  .active()
  .recent()
  .limit(10);

const user25 = await User
  .findOne()
  .byAge(25)
  .active();
```

### Population (Joins)

```javascript
// Define schemas with references
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'  // Reference to User model
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }]
});

// Basic populate
const post = await Post.findById(id).populate('author');
console.log(post.author.name); // Full author object

// Populate with field selection
const post = await Post.findById(id)
  .populate('author', 'name email'); // Only name and email

// Populate multiple fields
const post = await Post.findById(id)
  .populate('author')
  .populate('comments');

// Nested populate
const post = await Post.findById(id)
  .populate({
    path: 'comments',
    populate: {
      path: 'author',
      select: 'name avatar'
    }
  });

// Conditional populate
const post = await Post.findById(id)
  .populate({
    path: 'author',
    match: { isActive: true },
    select: 'name email'
  });

// Real-world: Complex populate
const posts = await Post.find()
  .populate({
    path: 'author',
    select: 'name email avatar',
    match: { isActive: true }
  })
  .populate({
    path: 'comments',
    select: 'text createdAt',
    options: { sort: { createdAt: -1 }, limit: 5 },
    populate: {
      path: 'author',
      select: 'name avatar'
    }
  })
  .sort({ createdAt: -1 })
  .limit(20);
```

### Validation

```javascript
// Built-in validators
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email']
  },
  
  age: {
    type: Number,
    min: [0, 'Age cannot be negative'],
    max: [120, 'Age too high']
  },
  
  role: {
    type: String,
    enum: {
      values: ['user', 'admin', 'moderator'],
      message: '{VALUE} is not a valid role'
    }
  }
});

// Custom validators
userSchema.path('password').validate(function(value) {
  return value.length >= 8;
}, 'Password must be at least 8 characters');

// Async validator
userSchema.path('email').validate(async function(value) {
  const count = await mongoose.models.User.countDocuments({ email: value });
  return count === 0;
}, 'Email already exists');

// Validator function
function validatePhone(phone) {
  return /^\d{10}$/.test(phone);
}

userSchema.path('phone').validate(validatePhone, 'Invalid phone number');

// Conditional validation
userSchema.path('website').validate(function(value) {
  if (this.role === 'business') {
    return value && value.length > 0;
  }
  return true;
}, 'Website required for business accounts');

// Real-world: Password strength validator
userSchema.path('password').validate(function(value) {
  // At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
  const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return strongPassword.test(value);
}, 'Password must be strong');

// Handling validation errors
try {
  await user.save();
} catch (error) {
  if (error.name === 'ValidationError') {
    const messages = Object.values(error.errors).map(e => e.message);
    console.log('Validation errors:', messages);
  }
}
```

### Indexes - Performance Optimization

```javascript
// Single field index
userSchema.index({ email: 1 }); // 1 = ascending

// Compound index
userSchema.index({ lastName: 1, firstName: 1 });

// Unique index
userSchema.index({ email: 1 }, { unique: true });

// Sparse index (only index if field exists)
userSchema.index({ phone: 1 }, { sparse: true });

// Text index (for text search)
postSchema.index({ title: 'text', content: 'text' });

// Usage
const posts = await Post.find({ $text: { $search: 'javascript' } });

// TTL index (auto-delete after time)
sessionSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 3600 } // Delete after 1 hour
);

// Geospatial index
placeSchema.index({ location: '2dsphere' });

// Usage
const nearbyPlaces = await Place.find({
  location: {
    $near: {
      $geometry: {
        type: 'Point',
        coordinates: [longitude, latitude]
      },
      $maxDistance: 5000 // 5km
    }
  }
});

// Check index performance
const explain = await User.find({ email: 'hassan@example.com' }).explain();
console.log(explain);
```

### Transactions - ACID Operations

```javascript
// Start session
const session = await mongoose.startSession();

try {
  // Start transaction
  session.startTransaction();
  
  // Operations within transaction
  const user = await User.create([{ 
    name: 'Hassan',
    email: 'hassan@example.com'
  }], { session });
  
  await Account.create([{
    userId: user[0]._id,
    balance: 1000
  }], { session });
  
  // Commit transaction
  await session.commitTransaction();
  console.log('Transaction successful');
  
} catch (error) {
  // Rollback on error
  await session.abortTransaction();
  console.error('Transaction failed:', error);
  throw error;
} finally {
  session.endSession();
}

// Real-world: Money transfer
async function transferMoney(fromId, toId, amount) {
  const session = await mongoose.startSession();
  
  try {
    session.startTransaction();
    
    // Deduct from sender
    const sender = await Account.findByIdAndUpdate(
      fromId,
      { $inc: { balance: -amount } },
      { session, new: true }
    );
    
    if (sender.balance < 0) {
      throw new Error('Insufficient funds');
    }
    
    // Add to receiver
    await Account.findByIdAndUpdate(
      toId,
      { $inc: { balance: amount } },
      { session }
    );
    
    // Create transaction record
    await Transaction.create([{
      from: fromId,
      to: toId,
      amount,
      timestamp: new Date()
    }], { session });
    
    await session.commitTransaction();
    return { success: true };
    
  } catch (error) {
    await session.abortTransaction();
    return { success: false, error: error.message };
  } finally {
    session.endSession();
  }
}
```

### Aggregation with Mongoose

```javascript
// Basic aggregation
const stats = await User.aggregate([
  { $match: { isActive: true } },
  { $group: {
    _id: '$city',
    count: { $sum: 1 },
    avgAge: { $avg: '$age' }
  }},
  { $sort: { count: -1 } }
]);

// Real-world: Order analytics
const orderStats = await Order.aggregate([
  // Match orders from last 30 days
  { $match: {
    createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
  }},
  
  // Lookup customer info
  { $lookup: {
    from: 'users',
    localField: 'customerId',
    foreignField: '_id',
    as: 'customer'
  }},
  
  // Unwind customer array
  { $unwind: '$customer' },
  
  // Group by customer
  { $group: {
    _id: '$customerId',
    customerName: { $first: '$customer.name' },
    totalOrders: { $sum: 1 },
    totalAmount: { $sum: '$total' },
    avgOrderValue: { $avg: '$total' },
    lastOrder: { $max: '$createdAt' }
  }},
  
  // Filter high-value customers
  { $match: { totalAmount: { $gte: 1000 } } },
  
  // Sort by total amount
  { $sort: { totalAmount: -1 } },
  
  // Limit to top 10
  { $limit: 10 },
  
  // Project final fields
  { $project: {
    _id: 0,
    customerId: '$_id',
    customerName: 1,
    totalOrders: 1,
    totalAmount: { $round: ['$totalAmount', 2] },
    avgOrderValue: { $round: ['$avgOrderValue', 2] },
    lastOrder: 1
  }}
]);

// Aggregation with facets (multiple pipelines)
const analytics = await Product.aggregate([
  { $facet: {
    // Price ranges
    priceRanges: [
      { $bucket: {
        groupBy: '$price',
        boundaries: [0, 50, 100, 500, 1000, Infinity],
        default: 'Other',
        output: { count: { $sum: 1 } }
      }}
    ],
    
    // Top categories
    topCategories: [
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ],
    
    // Overall stats
    stats: [
      { $group: {
        _id: null,
        totalProducts: { $sum: 1 },
        avgPrice: { $avg: '$price' },
        maxPrice: { $max: '$price' },
        minPrice: { $min: '$price' }
      }}
    ]
  }}
]);
```

---

## 4. Best Practices (Industry Standards 2026)

### Schema Design Patterns

```javascript
// 1. Embedding vs Referencing

// Embed when: 1-to-few relationship, data doesn't change often
const userSchema = new mongoose.Schema({
  name: String,
  addresses: [{ // Embedded
    street: String,
    city: String,
    zipCode: String
  }]
});

// Reference when: 1-to-many, many-to-many, data changes frequently
const postSchema = new mongoose.Schema({
  title: String,
  author: { // Referenced
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

// 2. Timestamps
const schema = new mongoose.Schema({
  // fields
}, { timestamps: true }); // Auto createdAt, updatedAt

// 3. Soft delete (don't actually delete)
const userSchema = new mongoose.Schema({
  name: String,
  isDeleted: { type: Boolean, default: false },
  deletedAt: Date
});

userSchema.query.notDeleted = function() {
  return this.where({ isDeleted: false });
};

// Usage
const users = await User.find().notDeleted();

// 4. Versioning for critical data
const documentSchema = new mongoose.Schema({
  title: String,
  content: String,
  version: { type: Number, default: 1 }
});

// 5. Subdocument best practices
const orderSchema = new mongoose.Schema({
  items: [{
    _id: false, // Disable _id for subdocuments
    productId: mongoose.Schema.Types.ObjectId,
    quantity: Number,
    price: Number
  }]
});
```

### Query Optimization

```javascript
// 1. Use lean() for read-only operations (faster)
const users = await User.find().lean(); // Returns plain JS objects

// 2. Select only needed fields
const users = await User.find().select('name email');

// 3. Use indexes
userSchema.index({ email: 1 });
userSchema.index({ lastName: 1, firstName: 1 }); // Compound

// 4. Limit results
const users = await User.find().limit(20);

// 5. Use explain to analyze queries
const explain = await User.find({ email: 'test@example.com' }).explain();

// 6. Batch operations
// BAD: Loop with individual saves
for (const user of users) {
  await user.save();
}

// GOOD: Bulk write
await User.bulkWrite([
  { updateOne: { filter: { _id: id1 }, update: { $set: { active: true } } } },
  { updateOne: { filter: { _id: id2 }, update: { $set: { active: false } } } }
]);

// 7. Cursor for large datasets
const cursor = User.find().cursor();

for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
  // Process doc
  await processUser(doc);
}
```

### Security Best Practices

```javascript
// 1. Never store passwords in plain text
userSchema.pre('save', async function() {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

// 2. Sanitize user input
import mongoSanitize from 'express-mongo-sanitize';
app.use(mongoSanitize()); // Prevents NoSQL injection

// 3. Rate limiting for database operations
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

// 4. Validate all inputs
const createUserSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(8)
});

// 5. Use select to exclude sensitive fields
userSchema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret.password;
    delete ret.__v;
    return ret;
  }
});

// 6. Connection string in environment variables
const mongoURL = process.env.MONGODB_URI; // Never hardcode
```

### Error Handling

```javascript
// Centralized error handling
mongoose.connection.on('error', (err) => {
  logger.error('MongoDB error:', err);
});

// Handle validation errors
try {
  await user.save();
} catch (error) {
  if (error.name === 'ValidationError') {
    const errors = Object.values(error.errors).map(e => ({
      field: e.path,
      message: e.message
    }));
    return res.status(400).json({ errors });
  }
  
  if (error.code === 11000) {
    return res.status(409).json({ 
      error: 'Duplicate key error'
    });
  }
  
  throw error;
}
```

---

## Complete MERN Example

```javascript
// models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^\S+@\S+\.\S+$/
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model('User', userSchema);

// routes/auth.js
import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    
    const user = await User.create({ name, email, password });
    
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
```

---

# TypeScript - Complete Guide (JavaScript with Types)

## TypeScript Fundamentals - Understanding Static Typing

### What is TypeScript?

TypeScript is a superset of JavaScript that adds static types. Every valid JavaScript code is also valid TypeScript, but TypeScript adds optional type annotations that help catch errors during development.

**Why TypeScript? (Industry Standard 2026):**
- **Early Error Detection**: Catch bugs before runtime
- **Better IDE Support**: Autocomplete, refactoring, navigation
- **Self-Documenting**: Types serve as documentation
- **Refactoring Safety**: Rename and restructure with confidence
- **Team Collaboration**: Clear contracts between code modules
- **Industry Adoption**: Used by Microsoft, Google, Airbnb, Slack, Netflix

---

## 1. Basic Types - Building Blocks

### Primitive Types

```typescript
// String
let name: string = 'Hassan';
let message: string = `Hello, ${name}!`;

// Number (all numbers are floating point)
let age: number = 25;
let price: number = 99.99;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

// Boolean
let isActive: boolean = true;
let hasPermission: boolean = false;

// Null and Undefined
let nothing: null = null;
let notDefined: undefined = undefined;

// Any (avoid when possible - defeats TypeScript's purpose)
let anything: any = 'hello';
anything = 42;
anything = true; // All valid, no type checking

// Unknown (safer than any - must check type before use)
let userInput: unknown = getUserInput();

// Must check type before using
if (typeof userInput === 'string') {
  console.log(userInput.toUpperCase());
}

// Void (no return value)
function logMessage(message: string): void {
  console.log(message);
  // No return statement
}

// Never (function never returns)
function throwError(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {
    // Never exits
  }
}

// Symbol
let sym: symbol = Symbol('unique');

// BigInt
let bigNumber: bigint = 100n;
```

### Type Inference

```typescript
// TypeScript infers types automatically
let inferredString = 'hello'; // Type: string
let inferredNumber = 42; // Type: number
let inferredBoolean = true; // Type: boolean

// TypeScript infers from function return
function double(x: number) {
  return x * 2; // Return type inferred as number
}

let result = double(5); // result is inferred as number

// Best practice: Let TypeScript infer when obvious
let name = 'Hassan'; // Good, type is obvious
let age: number = 25; // Redundant, type is inferred

// Explicit types when needed
let notObvious: string | null = getSomeValue(); // Good, union type
```

### Arrays

```typescript
// Array of numbers
let numbers: number[] = [1, 2, 3, 4, 5];

// Alternative syntax (generic)
let numbers: Array<number> = [1, 2, 3, 4, 5];

// Array of strings
let names: string[] = ['Ali', 'Sara', 'Hassan'];

// Array of any type (avoid)
let mixed: any[] = [1, 'text', true];

// Array of specific types (union)
let mixedTyped: (number | string)[] = [1, 'text', 2, 'hello'];

// Readonly array (immutable)
let readonlyNumbers: ReadonlyArray<number> = [1, 2, 3];
// readonlyNumbers.push(4); // Error: push doesn't exist

// Or using readonly modifier
let readonlyNames: readonly string[] = ['Ali', 'Sara'];

// Multi-dimensional arrays
let matrix: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

// Real-world: Array of user objects
interface User {
  id: number;
  name: string;
  email: string;
}

let users: User[] = [
  { id: 1, name: 'Hassan', email: 'hassan@example.com' },
  { id: 2, name: 'Ali', email: 'ali@example.com' }
];
```

### Tuples - Fixed-Length Arrays

```typescript
// Tuple with 2 elements
let coordinate: [number, number] = [10, 20];

// Tuple with 3 elements
let person: [string, number, boolean] = ['Hassan', 25, true];

// Accessing tuple elements
let name = person[0]; // Type: string
let age = person[1];  // Type: number

// Destructuring tuples
let [userName, userAge, isActive] = person;

// Optional tuple elements
let optional: [string, number?] = ['Hassan'];
optional = ['Ali', 30]; // Also valid

// Rest elements in tuples
let tuple: [string, ...number[]] = ['Hassan', 1, 2, 3, 4];

// Readonly tuples
let readonlyTuple: readonly [string, number] = ['Hassan', 25];
// readonlyTuple[0] = 'Ali'; // Error: readonly

// Real-world: React useState
const [count, setCount]: [number, (value: number) => void] = useState(0);

// Real-world: Function returning tuple
function getUser(): [string, number] {
  return ['Hassan', 25];
}

const [name, age] = getUser();

// Real-world: Key-value pair
type Entry = [string, number];
const entries: Entry[] = [
  ['apple', 5],
  ['banana', 3],
  ['orange', 7]
];
```

### Enums - Named Constants

```typescript
// Numeric enum (default starts at 0)
enum Direction {
  Up,    // 0
  Down,  // 1
  Left,  // 2
  Right  // 3
}

let move: Direction = Direction.Up;
console.log(Direction.Up); // 0

// Numeric enum with custom values
enum Status {
  Pending = 1,
  Approved = 2,
  Rejected = 3
}

// String enum (recommended for better debugging)
enum Color {
  Red = 'RED',
  Green = 'GREEN',
  Blue = 'BLUE'
}

let favoriteColor: Color = Color.Blue;
console.log(favoriteColor); // 'BLUE'

// Heterogeneous enum (mixed - not recommended)
enum Mixed {
  No = 0,
  Yes = 'YES'
}

// Const enum (better performance, inlined at compile time)
const enum HttpStatus {
  Ok = 200,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
  ServerError = 500
}

let status: HttpStatus = HttpStatus.Ok;

// Real-world: User roles
enum UserRole {
  Admin = 'ADMIN',
  Editor = 'EDITOR',
  Viewer = 'VIEWER'
}

function hasPermission(role: UserRole): boolean {
  return role === UserRole.Admin || role === UserRole.Editor;
}

// Real-world: Order status
enum OrderStatus {
  Pending = 'PENDING',
  Processing = 'PROCESSING',
  Shipped = 'SHIPPED',
  Delivered = 'DELIVERED',
  Cancelled = 'CANCELLED'
}

interface Order {
  id: number;
  status: OrderStatus;
}

const order: Order = {
  id: 1,
  status: OrderStatus.Pending
};

// Modern alternative: Union of string literals (often preferred)
type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

// This is more lightweight and flexible
```

---

## 2. Type Annotations and Type Aliases

### Function Types

```typescript
// Function with typed parameters and return type
function add(a: number, b: number): number {
  return a + b;
}

// Arrow function
const multiply = (a: number, b: number): number => {
  return a * b;
};

// Implicit return
const subtract = (a: number, b: number): number => a - b;

// Optional parameters
function greet(name: string, greeting?: string): string {
  return greeting ? `${greeting}, ${name}!` : `Hello, ${name}!`;
}

greet('Hassan'); // "Hello, Hassan!"
greet('Hassan', 'Hi'); // "Hi, Hassan!"

// Default parameters
function createUser(name: string, age: number = 18): object {
  return { name, age };
}

// Rest parameters
function sum(...numbers: number[]): number {
  return numbers.reduce((total, num) => total + num, 0);
}

sum(1, 2, 3, 4, 5); // 15

// Function type as variable
let calculate: (x: number, y: number) => number;

calculate = (a, b) => a + b;
calculate = (a, b) => a * b;
// calculate = (a, b) => `${a}${b}`; // Error: return type must be number

// Void return type
function logMessage(message: string): void {
  console.log(message);
  // No return or return undefined
}

// Never return type (for functions that never return)
function throwError(message: string): never {
  throw new Error(message);
}

// Function overloads
function getValue(id: number): string;
function getValue(name: string): number;
function getValue(param: number | string): string | number {
  if (typeof param === 'number') {
    return 'Value for ID: ' + param;
  } else {
    return param.length;
  }
}

let result1 = getValue(123); // Type: string
let result2 = getValue('Hassan'); // Type: number

// Real-world: Callback types
type Callback = (error: Error | null, data?: any) => void;

function fetchData(url: string, callback: Callback): void {
  // Simulate async operation
  setTimeout(() => {
    if (url.startsWith('http')) {
      callback(null, { data: 'success' });
    } else {
      callback(new Error('Invalid URL'));
    }
  }, 1000);
}

// Real-world: Event handler type
type EventHandler = (event: MouseEvent) => void;

const handleClick: EventHandler = (event) => {
  console.log('Clicked at:', event.clientX, event.clientY);
};
```

### Type Aliases

```typescript
// Simple type alias
type Username = string;
type Age = number;
type ID = string | number;

let userId: ID = 123;
userId = 'abc-123'; // Also valid

// Object type alias
type User = {
  id: number;
  name: string;
  email: string;
  age?: number; // Optional property
};

const user: User = {
  id: 1,
  name: 'Hassan',
  email: 'hassan@example.com'
  // age is optional
};

// Union types
type Status = 'pending' | 'approved' | 'rejected';
type Theme = 'light' | 'dark';

let currentTheme: Theme = 'dark';
// currentTheme = 'blue'; // Error: not in union

// Intersection types
type Person = {
  name: string;
  age: number;
};

type Employee = {
  employeeId: number;
  department: string;
};

type EmployeePerson = Person & Employee;

const employee: EmployeePerson = {
  name: 'Hassan',
  age: 25,
  employeeId: 12345,
  department: 'Engineering'
};

// Function type alias
type MathOperation = (a: number, b: number) => number;

const add: MathOperation = (a, b) => a + b;
const multiply: MathOperation = (a, b) => a * b;

// Generic type alias
type Result<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

const userResult: Result<User> = {
  success: true,
  data: { id: 1, name: 'Hassan', email: 'hassan@example.com' }
};

const numberResult: Result<number> = {
  success: false,
  error: 'Calculation failed'
};

// Real-world: API response type
type ApiResponse<T> = {
  status: number;
  message: string;
  data: T;
  timestamp: Date;
};

type UserListResponse = ApiResponse<User[]>;
type SingleUserResponse = ApiResponse<User>;

// Real-world: Nullable type
type Nullable<T> = T | null;

let userName: Nullable<string> = 'Hassan';
userName = null; // Valid
```

---

## 3. Interfaces - Defining Object Shapes

### Basic Interfaces

```typescript
// Interface definition
interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: 'Hassan',
  email: 'hassan@example.com'
};

// Optional properties
interface Product {
  id: number;
  name: string;
  price: number;
  description?: string; // Optional
}

// Readonly properties
interface Config {
  readonly apiUrl: string;
  readonly timeout: number;
}

const config: Config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000
};

// config.apiUrl = 'other'; // Error: readonly property

// Index signatures (for dynamic properties)
interface StringMap {
  [key: string]: string;
}

const translations: StringMap = {
  hello: 'مرحبا',
  goodbye: 'الوداع',
  thanks: 'شكرا'
};

// Numeric index signature
interface NumberArray {
  [index: number]: number;
}

const fibonacci: NumberArray = [1, 1, 2, 3, 5, 8];

// Method signatures
interface Calculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
}

const calc: Calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b
};

// Function type in interface
interface SearchFunction {
  (query: string, limit: number): Promise<string[]>;
}

const search: SearchFunction = async (query, limit) => {
  // Implementation
  return ['result1', 'result2'];
};

// Real-world: API endpoint interface
interface ApiEndpoint {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
}
```

### Extending Interfaces

```typescript
// Base interface
interface Person {
  name: string;
  age: number;
}

// Extending interface
interface Employee extends Person {
  employeeId: number;
  department: string;
}

const employee: Employee = {
  name: 'Hassan',
  age: 25,
  employeeId: 12345,
  department: 'Engineering'
};

// Multiple inheritance
interface Timestamped {
  createdAt: Date;
  updatedAt: Date;
}

interface Document extends Person, Timestamped {
  id: string;
  title: string;
}

const doc: Document = {
  id: 'doc-1',
  title: 'TypeScript Guide',
  name: 'Hassan',
  age: 25,
  createdAt: new Date(),
  updatedAt: new Date()
};

// Real-world: Model inheritance
interface BaseModel {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

interface User extends BaseModel {
  email: string;
  password: string;
  role: 'admin' | 'user';
}

interface Post extends BaseModel {
  title: string;
  content: string;
  authorId: string;
  published: boolean;
}
```

### Interface vs Type Alias

```typescript
// Key differences

// 1. Declaration merging (interfaces only)
interface User {
  name: string;
}

interface User {
  email: string;
}

// Merged into single interface
const user: User = {
  name: 'Hassan',
  email: 'hassan@example.com'
};

// 2. Extends vs intersection
// Interface
interface A {
  a: string;
}
interface B extends A {
  b: string;
}

// Type
type C = {
  a: string;
}
type D = C & {
  b: string;
}

// 3. Type aliases can do more
type ID = string | number; // Union
type Callback = (data: any) => void; // Function
type Tuple = [string, number]; // Tuple

// 4. When to use which?
// Use interface for:
// - Object shapes
// - When you might extend/merge
// - Public API definitions

// Use type for:
// - Unions and intersections
// - Primitive aliases
// - Function types
// - Tuples
// - Utility type compositions

// Real-world example: Combining both
interface UserBase {
  id: string;
  email: string;
}

type UserRole = 'admin' | 'user' | 'moderator';

interface User extends UserBase {
  role: UserRole;
  permissions: string[];
}
```

---

## 4. Generics - Reusable Type Parameters

### Basic Generics

```typescript
// Generic function
function identity<T>(arg: T): T {
  return arg;
}

let output1 = identity<string>('hello'); // Type: string
let output2 = identity<number>(42); // Type: number
let output3 = identity('hello'); // Type inferred as string

// Generic function with constraints
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: 'Hassan', age: 25 };
let name = getProperty(user, 'name'); // Type: string
let age = getProperty(user, 'age'); // Type: number
// getProperty(user, 'invalid'); // Error: 'invalid' not in user

// Generic array function
function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

let first = firstElement([1, 2, 3]); // Type: number | undefined
let firstString = firstElement(['a', 'b']); // Type: string | undefined

// Generic with multiple type parameters
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

let stringAndNumber = pair('hello', 42); // Type: [string, number]
let boolAndString = pair(true, 'yes'); // Type: [boolean, string]

// Real-world: API response wrapper
function wrapResponse<T>(data: T, success: boolean = true) {
  return {
    success,
    data,
    timestamp: new Date()
  };
}

const userResponse = wrapResponse({ id: 1, name: 'Hassan' });
// Type: { success: boolean; data: { id: number; name: string }; timestamp: Date }
```

### Generic Interfaces and Types

```typescript
// Generic interface
interface Box<T> {
  value: T;
}

let stringBox: Box<string> = { value: 'hello' };
let numberBox: Box<number> = { value: 42 };

// Generic type alias
type Container<T> = {
  item: T;
  count: number;
};

let apples: Container<string> = {
  item: 'apple',
  count: 5
};

// Generic with default type
interface Response<T = any> {
  data: T;
  status: number;
}

let response1: Response = { data: 'anything', status: 200 };
let response2: Response<User> = { 
  data: { id: 1, name: 'Hassan', email: 'hassan@example.com' },
  status: 200
};

// Real-world: API response
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Usage
type UserResponse = ApiResponse<User>;
type UsersResponse = ApiResponse<User[]>;
type DeleteResponse = ApiResponse<{ id: string }>;

async function fetchUser(id: string): Promise<ApiResponse<User>> {
  try {
    const response = await fetch(`/api/users/${id}`);
    const data = await response.json();
    return {
      success: true,
      data
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to fetch user'
    };
  }
}
```

### Generic Classes

```typescript
// Generic class
class DataStore<T> {
  private items: T[] = [];
  
  add(item: T): void {
    this.items.push(item);
  }
  
  get(index: number): T | undefined {
    return this.items[index];
  }
  
  getAll(): T[] {
    return [...this.items];
  }
  
  remove(index: number): T | undefined {
    return this.items.splice(index, 1)[0];
  }
  
  clear(): void {
    this.items = [];
  }
}

// Usage
const numberStore = new DataStore<number>();
numberStore.add(1);
numberStore.add(2);
console.log(numberStore.getAll()); // [1, 2]

const userStore = new DataStore<User>();
userStore.add({ id: 1, name: 'Hassan', email: 'hassan@example.com' });

// Real-world: Repository pattern
class Repository<T extends { id: string | number }> {
  private items = new Map<string | number, T>();
  
  create(item: T): T {
    this.items.set(item.id, item);
    return item;
  }
  
  findById(id: string | number): T | undefined {
    return this.items.get(id);
  }
  
  findAll(): T[] {
    return Array.from(this.items.values());
  }
  
  update(id: string | number, updates: Partial<T>): T | undefined {
    const item = this.items.get(id);
    if (item) {
      const updated = { ...item, ...updates };
      this.items.set(id, updated);
      return updated;
    }
    return undefined;
  }
  
  delete(id: string | number): boolean {
    return this.items.delete(id);
  }
}

// Usage
interface Product {
  id: number;
  name: string;
  price: number;
}

const productRepo = new Repository<Product>();
productRepo.create({ id: 1, name: 'Laptop', price: 999 });
productRepo.update(1, { price: 899 });
```

### Generic Constraints

```typescript
// Constraint using extends
function getLength<T extends { length: number }>(arg: T): number {
  return arg.length;
}

getLength('hello'); // OK: string has length
getLength([1, 2, 3]); // OK: array has length
getLength({ length: 10, value: 'test' }); // OK: has length property
// getLength(42); // Error: number doesn't have length

// Using keyof constraint
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// Constructor constraint
function create<T>(Constructor: new () => T): T {
  return new Constructor();
}

class User {
  constructor(public name: string = 'Guest') {}
}

const user = create(User); // Type: User

// Real-world: Type-safe event emitter
class TypedEventEmitter<Events extends Record<string, any>> {
  private listeners: { [K in keyof Events]?: Array<(data: Events[K]) => void> } = {};
  
  on<K extends keyof Events>(event: K, listener: (data: Events[K]) => void): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(listener);
  }
  
  emit<K extends keyof Events>(event: K, data: Events[K]): void {
    const listeners = this.listeners[event];
    if (listeners) {
      listeners.forEach(listener => listener(data));
    }
  }
}

// Define events
interface AppEvents {
  userLoggedIn: { userId: string; timestamp: Date };
  userLoggedOut: { userId: string };
  dataUpdated: { type: string; id: number };
}

const emitter = new TypedEventEmitter<AppEvents>();

// Type-safe event handling
emitter.on('userLoggedIn', (data) => {
  console.log(`User ${data.userId} logged in at ${data.timestamp}`);
});

emitter.emit('userLoggedIn', {
  userId: '123',
  timestamp: new Date()
});
```

---

## 5. Advanced Types

### Union and Intersection Types

```typescript
// Union types (OR)
type StringOrNumber = string | number;

let value: StringOrNumber = 'hello';
value = 42; // Also valid

// Union with type narrowing
function formatValue(value: string | number): string {
  if (typeof value === 'string') {
    return value.toUpperCase();
  } else {
    return value.toFixed(2);
  }
}

// Intersection types (AND)
type Person = {
  name: string;
  age: number;
};

type Employee = {
  employeeId: number;
  department: string;
};

type EmployeePerson = Person & Employee;

const employee: EmployeePerson = {
  name: 'Hassan',
  age: 25,
  employeeId: 12345,
  department: 'Engineering'
};

// Real-world: Combining API response types
type SuccessResponse<T> = {
  success: true;
  data: T;
};

type ErrorResponse = {
  success: false;
  error: string;
};

type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

function handleResponse<T>(response: ApiResponse<T>): void {
  if (response.success) {
    console.log('Data:', response.data);
  } else {
    console.error('Error:', response.error);
  }
}
```

### Literal Types

```typescript
// String literal types
type Direction = 'north' | 'south' | 'east' | 'west';
let heading: Direction = 'north';
// heading = 'up'; // Error

// Numeric literal types
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;
let roll: DiceRoll = 4;

// Boolean literal types
type Success = true;
type Failure = false;

// Combining literals
type Status = 'idle' | 'loading' | 'success' | 'error';
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// Real-world: Component props
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger';
  size: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

const button: ButtonProps = {
  variant: 'primary',
  size: 'medium'
};
```

### Template Literal Types

```typescript
// Basic template literal type
type EmailEvent = `email-${string}`;

let event1: EmailEvent = 'email-sent';
let event2: EmailEvent = 'email-opened';
// let event3: EmailEvent = 'sms-sent'; // Error

// Combining literals
type Color = 'red' | 'blue' | 'green';
type Size = 'small' | 'large';
type Style = `${Color}-${Size}`;

// Results in: 'red-small' | 'red-large' | 'blue-small' | 'blue-large' | 'green-small' | 'green-large'

let style: Style = 'red-small';

// Real-world: Event names
type EventName = 'click' | 'focus' | 'blur';
type EventHandler = `on${Capitalize<EventName>}`;

// Results in: 'onClick' | 'onFocus' | 'onBlur'

interface ComponentProps {
  onClick?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

// Real-world: CSS properties
type CSSProperty = 'color' | 'background' | 'font-size';
type CSSValue<T extends CSSProperty> = T extends 'font-size'
  ? `${number}px` | `${number}em`
  : string;
```

### Mapped Types

```typescript
// Make all properties optional
type Partial<T> = {
  [P in keyof T]?: T[P];
};

interface User {
  id: number;
  name: string;
  email: string;
}

type PartialUser = Partial<User>;
// { id?: number; name?: string; email?: string; }

// Make all properties required
type Required<T> = {
  [P in keyof T]-?: T[P]; // -? removes optional modifier
};

// Make all properties readonly
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type ReadonlyUser = Readonly<User>;
// { readonly id: number; readonly name: string; readonly email: string; }

// Pick specific properties
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type UserCredentials = Pick<User, 'email'>;
// { email: string }

// Omit specific properties
type Omit<T, K extends keyof T> = {
  [P in Exclude<keyof T, K>]: T[P];
};

type UserWithoutId = Omit<User, 'id'>;
// { name: string; email: string; }

// Custom mapped type
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type UserGetters = Getters<User>;
// {
//   getId: () => number;
//   getName: () => string;
//   getEmail: () => string;
// }

// Real-world: Form state
type FormState<T> = {
  [K in keyof T]: {
    value: T[K];
    error: string | null;
    touched: boolean;
  };
};

type UserFormState = FormState<User>;
```

### Conditional Types

```typescript
// Basic conditional type
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false

// Conditional with infer
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function getUser() {
  return { id: 1, name: 'Hassan' };
}

type User = ReturnType<typeof getUser>;
// { id: number; name: string; }

// Distributive conditional types
type ToArray<T> = T extends any ? T[] : never;

type StrOrNumArray = ToArray<string | number>;
// string[] | number[]

// Real-world: Extract nullable types
type NonNullable<T> = T extends null | undefined ? never : T;

type MaybeString = string | null | undefined;
type DefinitelyString = NonNullable<MaybeString>; // string

// Real-world: Extract function parameters
type Parameters<T> = T extends (...args: infer P) => any ? P : never;

function createUser(name: string, age: number) {
  return { name, age };
}

type CreateUserParams = Parameters<typeof createUser>;
// [name: string, age: number]

// Complex conditional type
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type Resolved = UnwrapPromise<Promise<string>>; // string
type NotPromise = UnwrapPromise<number>; // number
```

---

## 6. Utility Types (Built-in)

```typescript
// Partial<T> - Make all properties optional
interface User {
  id: number;
  name: string;
  email: string;
}

function updateUser(id: number, updates: Partial<User>) {
  // updates can have any subset of User properties
}

updateUser(1, { name: 'Ali' }); // OK
updateUser(2, { email: 'ali@example.com' }); // OK

// Required<T> - Make all properties required
interface Config {
  apiUrl?: string;
  timeout?: number;
  retries?: number;
}

type RequiredConfig = Required<Config>;
// { apiUrl: string; timeout: number; retries: number; }

// Readonly<T> - Make all properties readonly
const user: Readonly<User> = {
  id: 1,
  name: 'Hassan',
  email: 'hassan@example.com'
};

// user.name = 'Ali'; // Error: readonly

// Record<K, T> - Create object type with keys K and values T
type UserRoles = Record<string, string[]>;

const roles: UserRoles = {
  admin: ['read', 'write', 'delete'],
  editor: ['read', 'write'],
  viewer: ['read']
};

// More specific
type PageInfo = Record<'home' | 'about' | 'contact', { title: string; url: string }>;

// Pick<T, K> - Pick specific properties
type UserPreview = Pick<User, 'id' | 'name'>;
// { id: number; name: string; }

// Omit<T, K> - Omit specific properties
type UserWithoutEmail = Omit<User, 'email'>;
// { id: number; name: string; }

// Exclude<T, U> - Exclude types from union
type T1 = Exclude<'a' | 'b' | 'c', 'a' | 'b'>; // 'c'
type T2 = Exclude<string | number | (() => void), Function>; // string | number

// Extract<T, U> - Extract types from union
type T3 = Extract<'a' | 'b' | 'c', 'a' | 'f'>; // 'a'
type T4 = Extract<string | number | (() => void), Function>; // () => void

// NonNullable<T> - Remove null and undefined
type T5 = NonNullable<string | number | null | undefined>; // string | number

// ReturnType<T> - Get function return type
function createUser() {
  return { id: 1, name: 'Hassan' };
}

type User = ReturnType<typeof createUser>;
// { id: number; name: string; }

// Parameters<T> - Get function parameter types
function greet(name: string, age: number) {
  console.log(`Hello ${name}, age ${age}`);
}

type GreetParams = Parameters<typeof greet>;
// [name: string, age: number]

// ConstructorParameters<T> - Get constructor parameter types
class Person {
  constructor(public name: string, public age: number) {}
}

type PersonParams = ConstructorParameters<typeof Person>;
// [name: string, age: number]

// InstanceType<T> - Get instance type of constructor
type PersonInstance = InstanceType<typeof Person>;
// Person

// Awaited<T> - Get type of awaited Promise
type AsyncReturnType = Awaited<Promise<string>>; // string
type NestedAsync = Awaited<Promise<Promise<number>>>; // number

// Real-world: API response handling
interface ApiResponse<T> {
  data: T;
  status: number;
}

async function fetchUser(): Promise<ApiResponse<User>> {
  const response = await fetch('/api/user');
  return response.json();
}

type FetchUserReturn = Awaited<ReturnType<typeof fetchUser>>;
// ApiResponse<User>

type UserData = Awaited<ReturnType<typeof fetchUser>>['data'];
// User
```

---

## 7. Classes and OOP

```typescript
// Basic class
class Person {
  // Properties
  name: string;
  age: number;
  
  // Constructor
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  
  // Method
  greet(): string {
    return `Hello, I'm ${this.name}`;
  }
}

const person = new Person('Hassan', 25);
console.log(person.greet());

// Access modifiers
class User {
  public name: string;        // Accessible everywhere (default)
  private password: string;   // Only within class
  protected role: string;     // Within class and subclasses
  
  constructor(name: string, password: string, role: string) {
    this.name = name;
    this.password = password;
    this.role = role;
  }
  
  private hashPassword(): string {
    return `hashed_${this.password}`;
  }
  
  public login(password: string): boolean {
    return this.password === password;
  }
}

const user = new User('Hassan', 'secret123', 'admin');
console.log(user.name); // OK
// console.log(user.password); // Error: private
// console.log(user.role); // Error: protected

// Parameter properties (shorthand)
class Product {
  constructor(
    public id: number,
    public name: string,
    private price: number
  ) {
    // Properties automatically assigned
  }
  
  getPrice(): number {
    return this.price;
  }
}

// Readonly properties
class Point {
  readonly x: number;
  readonly y: number;
  
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

const point = new Point(10, 20);
// point.x = 30; // Error: readonly

// Getters and setters
class Temperature {
  private _celsius: number = 0;
  
  get celsius(): number {
    return this._celsius;
  }
  
  set celsius(value: number) {
    if (value < -273.15) {
      throw new Error('Temperature below absolute zero');
    }
    this._celsius = value;
  }
  
  get fahrenheit(): number {
    return (this._celsius * 9/5) + 32;
  }
  
  set fahrenheit(value: number) {
    this._celsius = (value - 32) * 5/9;
  }
}

const temp = new Temperature();
temp.celsius = 25;
console.log(temp.fahrenheit); // 77

// Static members
class MathUtils {
  static PI: number = 3.14159;
  
  static circleArea(radius: number): number {
    return this.PI * radius * radius;
  }
}

console.log(MathUtils.PI);
console.log(MathUtils.circleArea(10));

// Abstract classes
abstract class Animal {
  constructor(public name: string) {}
  
  abstract makeSound(): string; // Must be implemented by subclass
  
  move(): string {
    return `${this.name} is moving`;
  }
}

class Dog extends Animal {
  makeSound(): string {
    return 'Woof!';
  }
}

// const animal = new Animal('Generic'); // Error: cannot instantiate abstract class
const dog = new Dog('Max');

// Implementing interfaces
interface Flyable {
  fly(): void;
  altitude: number;
}

class Bird implements Flyable {
  altitude: number = 0;
  
  fly(): void {
    this.altitude += 10;
    console.log(`Flying at ${this.altitude}m`);
  }
}

// Real-world: Repository pattern
interface Repository<T> {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  create(item: T): Promise<T>;
  update(id: string, item: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}

class UserRepository implements Repository<User> {
  private users: Map<string, User> = new Map();
  
  async findAll(): Promise<User[]> {
    return Array.from(this.users.values());
  }
  
  async findById(id: string): Promise<User | null> {
    return this.users.get(id) || null;
  }
  
  async create(user: User): Promise<User> {
    this.users.set(user.id.toString(), user);
    return user;
  }
  
  async update(id: string, updates: Partial<User>): Promise<User> {
    const user = this.users.get(id);
    if (!user) throw new Error('User not found');
    const updated = { ...user, ...updates };
    this.users.set(id, updated);
    return updated;
  }
  
  async delete(id: string): Promise<void> {
    this.users.delete(id);
  }
}
```

---

## 8. Decorators (Experimental - Enable in tsconfig.json)

```typescript
// tsconfig.json
// {
//   "compilerOptions": {
//     "experimentalDecorators": true,
//     "emitDecoratorMetadata": true
//   }
// }

// Class decorator
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class BugReport {
  type = 'report';
  title: string;
  
  constructor(title: string) {
    this.title = title;
  }
}

// Method decorator
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  
  descriptor.value = function(...args: any[]) {
    console.log(`Calling ${propertyKey} with:`, args);
    const result = originalMethod.apply(this, args);
    console.log(`Result:`, result);
    return result;
  };
  
  return descriptor;
}

class Calculator {
  @log
  add(a: number, b: number): number {
    return a + b;
  }
}

// Property decorator
function required(target: any, propertyKey: string) {
  let value: any;
  
  const getter = function() {
    return value;
  };
  
  const setter = function(newVal: any) {
    if (newVal === null || newVal === undefined) {
      throw new Error(`${propertyKey} is required`);
    }
    value = newVal;
  };
  
  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true
  });
}

class User {
  @required
  email: string;
  
  constructor(email: string) {
    this.email = email;
  }
}

// Real-world: Validation decorator
function validate(validationRules: any) {
  return function(target: any, propertyKey: string) {
    // Validation logic
  };
}

class CreateUserDTO {
  @validate({ minLength: 3, maxLength: 50 })
  name: string;
  
  @validate({ email: true })
  email: string;
  
  @validate({ min: 18, max: 120 })
  age: number;
}
```

---

## 9. Modules and Namespaces

```typescript
// ES6 Modules (recommended)

// math.ts
export function add(a: number, b: number): number {
  return a + b;
}

export function subtract(a: number, b: number): number {
  return a - b;
}

export const PI = 3.14159;

// user.ts
export interface User {
  id: number;
  name: string;
}

export default class UserService {
  getUser(id: number): User {
    return { id, name: 'Hassan' };
  }
}

// app.ts
import { add, subtract, PI } from './math';
import UserService, { User } from './user';
import * as MathUtils from './math';

// Type-only imports (no runtime code)
import type { User } from './user';

// Namespaces (legacy - avoid in modern code)
namespace Validation {
  export interface StringValidator {
    isValid(s: string): boolean;
  }
  
  export class EmailValidator implements StringValidator {
    isValid(s: string): boolean {
      return /\S+@\S+\.\S+/.test(s);
    }
  }
}

let validator = new Validation.EmailValidator();

// Module augmentation
// original-module.d.ts
export interface Config {
  apiUrl: string;
}

// augment.ts
import { Config } from './original-module';

declare module './original-module' {
  interface Config {
    timeout?: number; // Add new property
  }
}

// Global augmentation
declare global {
  interface Window {
    myCustomProperty: string;
  }
}

window.myCustomProperty = 'value';
```

---

## 10. Type Guards and Narrowing

```typescript
// typeof type guard
function printValue(value: string | number) {
  if (typeof value === 'string') {
    console.log(value.toUpperCase()); // TypeScript knows it's string
  } else {
    console.log(value.toFixed(2)); // TypeScript knows it's number
  }
}

// instanceof type guard
class Dog {
  bark() { console.log('Woof!'); }
}

class Cat {
  meow() { console.log('Meow!'); }
}

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark(); // TypeScript knows it's Dog
  } else {
    animal.meow(); // TypeScript knows it's Cat
  }
}

// in operator narrowing
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
  if ('swim' in animal) {
    animal.swim();
  } else {
    animal.fly();
  }
}

// Custom type guards
function isString(value: any): value is string {
  return typeof value === 'string';
}

function processValue(value: string | number) {
  if (isString(value)) {
    console.log(value.toUpperCase()); // TypeScript knows it's string
  }
}

// Discriminated unions
type SuccessResponse = {
  status: 'success';
  data: any;
};

type ErrorResponse = {
  status: 'error';
  error: string;
};

type ApiResponse = SuccessResponse | ErrorResponse;

function handleResponse(response: ApiResponse) {
  if (response.status === 'success') {
    console.log(response.data); // TypeScript knows it has data
  } else {
    console.error(response.error); // TypeScript knows it has error
  }
}

// Real-world: Form field validation
type TextField = {
  type: 'text';
  value: string;
  placeholder: string;
};

type NumberField = {
  type: 'number';
  value: number;
  min: number;
  max: number;
};

type Field = TextField | NumberField;

function validateField(field: Field): boolean {
  switch (field.type) {
    case 'text':
      return field.value.length > 0; // TypeScript knows all TextField properties
    case 'number':
      return field.value >= field.min && field.value <= field.max; // Knows NumberField properties
  }
}
```

---

## 11. Best Practices (Industry Standards 2026)

```typescript
// 1. Use strict mode
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictPropertyInitialization": true
  }
}

// 2. Prefer interfaces for object shapes
interface User {
  id: number;
  name: string;
}

// 3. Use type aliases for unions, intersections, primitives
type ID = string | number;
type Status = 'active' | 'inactive';

// 4. Always specify function return types
function getUser(id: number): Promise<User> {
  // ...
}

// 5. Use readonly for immutable data
interface Config {
  readonly apiUrl: string;
  readonly timeout: number;
}

// 6. Avoid any, use unknown instead
function processData(data: unknown) {
  if (typeof data === 'string') {
    return data.toUpperCase();
  }
  // Handle other cases
}

// 7. Use const assertions for literal types
const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000
} as const;

// config.apiUrl is type 'https://api.example.com', not string

// 8. Use never for exhaustive checking
type Shape = Circle | Square | Triangle;

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2;
    case 'square':
      return shape.size ** 2;
    case 'triangle':
      return (shape.base * shape.height) / 2;
    default:
      const _exhaustive: never = shape;
      throw new Error('Unhandled shape');
  }
}

// 9. Use discriminated unions for complex types
type LoadingState = {
  status: 'loading';
};

type SuccessState<T> = {
  status: 'success';
  data: T;
};

type ErrorState = {
  status: 'error';
  error: string;
};

type AsyncState<T> = LoadingState | SuccessState<T> | ErrorState;

// 10. Organize types in separate files
// types/user.ts
// types/api.ts
// types/common.ts
```

---

# Redis - Complete Guide (In-Memory Data Store)

## Redis Fundamentals - Understanding In-Memory Storage

### What is Redis?

Redis (REmote DIctionary Server) is an in-memory data structure store used as a database, cache, message broker, and streaming engine. Think of it as super-fast storage that lives in RAM (memory) instead of disk.

**Why Redis? (Industry Standard 2026):**
- **Blazing Fast**: All data in RAM, microsecond latency
- **Versatile**: Caching, sessions, real-time analytics, pub/sub, queues
- **Data Structures**: Strings, Lists, Sets, Hashes, Sorted Sets, Streams
- **Persistence**: Can save to disk for durability
- **Scalability**: Replication and clustering built-in
- **Used By**: Twitter, GitHub, Instagram, Stack Overflow, Airbnb

**Common Use Cases:**
- **Caching**: Store frequently accessed data
- **Session Storage**: User sessions in web applications
- **Rate Limiting**: Track API request counts
- **Real-time Analytics**: Leaderboards, counters, metrics
- **Message Queues**: Background job processing
- **Pub/Sub**: Real-time notifications

---

## 1. Redis Data Types - Core Structures

### Strings - The Simplest Type

```redis
# SET - Store a string value
SET user:1:name "Hassan"
SET user:1:email "hassan@example.com"

# GET - Retrieve value
GET user:1:name
# Returns: "Hassan"

# SET with expiration (in seconds)
SET session:abc123 "user_data" EX 3600
# Expires after 1 hour

# SET with expiration (milliseconds)
SET session:xyz789 "user_data" PX 60000
# Expires after 60 seconds

# SET only if key doesn't exist
SET user:1:name "Ali" NX
# Returns: (nil) - key already exists

# SET only if key exists
SET user:1:name "Ali" XX
# Updates existing key

# SETEX - Set with expiration in one command
SETEX session:abc123 3600 "user_data"

# MSET - Set multiple keys at once
MSET user:1:name "Hassan" user:1:age "25" user:1:city "Lahore"

# MGET - Get multiple keys at once
MGET user:1:name user:1:age user:1:city
# Returns: ["Hassan", "25", "Lahore"]

# INCR / DECR - Increment/Decrement numbers
SET views:post:123 100
INCR views:post:123  # Now 101
DECR views:post:123  # Now 100
INCRBY views:post:123 10  # Increase by 10
DECRBY views:post:123 5   # Decrease by 5

# APPEND - Append to string
SET message "Hello"
APPEND message " World"
GET message  # Returns: "Hello World"

# STRLEN - Get string length
STRLEN message  # Returns: 11

# DEL - Delete key
DEL user:1:name

# EXISTS - Check if key exists
EXISTS user:1:name  # Returns: 0 (false) or 1 (true)

# EXPIRE - Set expiration on existing key
SET user:1:name "Hassan"
EXPIRE user:1:name 3600  # Expires in 1 hour

# TTL - Time to live (seconds until expiration)
TTL user:1:name  # Returns: remaining seconds or -1 (no expiry) or -2 (doesn't exist)

# PERSIST - Remove expiration
PERSIST user:1:name
```

### Hashes - Objects/Maps

```redis
# HSET - Set hash field
HSET user:1 name "Hassan"
HSET user:1 email "hassan@example.com"
HSET user:1 age 25

# HMSET - Set multiple fields (deprecated, use HSET)
HSET user:1 name "Hassan" email "hassan@example.com" age 25

# HGET - Get hash field
HGET user:1 name
# Returns: "Hassan"

# HGETALL - Get all fields and values
HGETALL user:1
# Returns: ["name", "Hassan", "email", "hassan@example.com", "age", "25"]

# HMGET - Get multiple fields
HMGET user:1 name email
# Returns: ["Hassan", "hassan@example.com"]

# HEXISTS - Check if field exists
HEXISTS user:1 name  # Returns: 1 (true)

# HDEL - Delete field
HDEL user:1 age

# HKEYS - Get all field names
HKEYS user:1
# Returns: ["name", "email"]

# HVALS - Get all values
HVALS user:1
# Returns: ["Hassan", "hassan@example.com"]

# HLEN - Number of fields
HLEN user:1  # Returns: 2

# HINCRBY - Increment hash field
HSET user:1 score 100
HINCRBY user:1 score 50  # Now 150

# Real-world: Store user object
HSET user:123 
  name "Hassan Ahmed" 
  email "hassan@example.com" 
  age 25 
  city "Lahore" 
  role "admin"
  created_at "2024-01-15"
```

### Lists - Ordered Collections

```redis
# LPUSH - Add to left (beginning)
LPUSH tasks "Task 3"
LPUSH tasks "Task 2"
LPUSH tasks "Task 1"
# List: ["Task 1", "Task 2", "Task 3"]

# RPUSH - Add to right (end)
RPUSH tasks "Task 4"
# List: ["Task 1", "Task 2", "Task 3", "Task 4"]

# LRANGE - Get range of elements
LRANGE tasks 0 -1  # All elements
LRANGE tasks 0 2   # First 3 elements

# LPOP - Remove and return from left
LPOP tasks  # Returns: "Task 1"

# RPOP - Remove and return from right
RPOP tasks  # Returns: "Task 4"

# LLEN - Length of list
LLEN tasks  # Returns: 2

# LINDEX - Get element by index
LINDEX tasks 0  # First element

# LSET - Set element at index
LSET tasks 0 "Updated Task"

# LTRIM - Trim list to range
LTRIM tasks 0 9  # Keep only first 10 elements

# LINSERT - Insert before/after element
LINSERT tasks BEFORE "Task 2" "Task 1.5"
LINSERT tasks AFTER "Task 2" "Task 2.5"

# LREM - Remove elements
LREM tasks 0 "Task 2"  # Remove all occurrences

# Real-world: Activity log (keep last 100)
LPUSH activity:user:123 "Logged in"
LTRIM activity:user:123 0 99  # Keep only last 100
```

### Sets - Unique Unordered Collections

```redis
# SADD - Add members to set
SADD tags:post:123 "javascript" "nodejs" "redis"

# SMEMBERS - Get all members
SMEMBERS tags:post:123
# Returns: ["javascript", "nodejs", "redis"]

# SISMEMBER - Check membership
SISMEMBER tags:post:123 "javascript"  # Returns: 1 (true)

# SREM - Remove member
SREM tags:post:123 "redis"

# SCARD - Set cardinality (count)
SCARD tags:post:123  # Returns: 2

# SPOP - Remove and return random member
SPOP tags:post:123

# SRANDMEMBER - Get random member (without removing)
SRANDMEMBER tags:post:123

# Set operations
SADD set1 "a" "b" "c"
SADD set2 "b" "c" "d"

# SUNION - Union (all unique elements)
SUNION set1 set2  # ["a", "b", "c", "d"]

# SINTER - Intersection (common elements)
SINTER set1 set2  # ["b", "c"]

# SDIFF - Difference (in set1 but not set2)
SDIFF set1 set2  # ["a"]

# Real-world: Online users
SADD online:users "user:1" "user:2" "user:3"
SISMEMBER online:users "user:1"  # Is user online?
SREM online:users "user:1"  # User logged out
SCARD online:users  # Count online users
```

### Sorted Sets - Sets with Scores

```redis
# ZADD - Add members with scores
ZADD leaderboard 100 "hassan"
ZADD leaderboard 150 "ali"
ZADD leaderboard 120 "sara"

# ZRANGE - Get range by rank (ascending)
ZRANGE leaderboard 0 -1
# Returns: ["hassan", "sara", "ali"]

# ZRANGE with scores
ZRANGE leaderboard 0 -1 WITHSCORES
# Returns: ["hassan", "100", "sara", "120", "ali", "150"]

# ZREVRANGE - Get range (descending)
ZREVRANGE leaderboard 0 2 WITHSCORES
# Top 3: ["ali", "150", "sara", "120", "hassan", "100"]

# ZSCORE - Get score of member
ZSCORE leaderboard "hassan"  # Returns: "100"

# ZINCRBY - Increment score
ZINCRBY leaderboard 50 "hassan"  # Now 150

# ZRANK - Get rank (0-based, ascending)
ZRANK leaderboard "hassan"  # Returns: 0 (lowest score)

# ZREVRANK - Get rank (descending)
ZREVRANK leaderboard "ali"  # Returns: 0 (highest score)

# ZREM - Remove member
ZREM leaderboard "sara"

# ZCARD - Count members
ZCARD leaderboard  # Returns: 2

# ZCOUNT - Count members in score range
ZCOUNT leaderboard 100 150

# ZRANGEBYSCORE - Get members by score range
ZRANGEBYSCORE leaderboard 100 150

# Real-world: Trending posts (by engagement)
ZADD trending:posts 1500 "post:123"  # 1500 engagement
ZADD trending:posts 2000 "post:456"
ZADD trending:posts 1200 "post:789"

ZREVRANGE trending:posts 0 9 WITHSCORES  # Top 10 trending
```

---

## 2. Redis with Node.js - Using ioredis

### Setup and Connection

```javascript
// Install: npm install ioredis

import Redis from 'ioredis';

// Basic connection
const redis = new Redis({
  host: 'localhost',
  port: 6379,
  password: 'your-password',  // If authentication is enabled
  db: 0  // Database number (0-15 by default)
});

// Connection from URL
const redis = new Redis(process.env.REDIS_URL);
// Example: redis://user:password@localhost:6379/0

// With options
const redis = new Redis({
  host: 'localhost',
  port: 6379,
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  maxRetriesPerRequest: 3,
  enableReadyCheck: true,
  enableOfflineQueue: true
});

// Connection events
redis.on('connect', () => {
  console.log('✅ Redis connected');
});

redis.on('error', (err) => {
  console.error('❌ Redis error:', err);
});

redis.on('ready', () => {
  console.log('✅ Redis ready');
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  await redis.quit();
  console.log('Redis connection closed');
  process.exit(0);
});
```

### Basic Operations

```javascript
// Strings
await redis.set('user:1:name', 'Hassan');
const name = await redis.get('user:1:name');
console.log(name); // 'Hassan'

// Set with expiration (seconds)
await redis.set('session:abc', 'data', 'EX', 3600);
// Or using setex
await redis.setex('session:abc', 3600, 'data');

// Multiple get/set
await redis.mset('key1', 'value1', 'key2', 'value2');
const values = await redis.mget('key1', 'key2');

// Increment/Decrement
await redis.set('views', 100);
await redis.incr('views');  // 101
await redis.incrby('views', 10);  // 111
await redis.decr('views');  // 110

// Hashes
await redis.hset('user:1', 'name', 'Hassan');
await redis.hset('user:1', 'email', 'hassan@example.com');
await redis.hset('user:1', 'age', 25);

// Or set multiple fields at once
await redis.hset('user:1', {
  name: 'Hassan',
  email: 'hassan@example.com',
  age: 25
});

const user = await redis.hgetall('user:1');
console.log(user);
// { name: 'Hassan', email: 'hassan@example.com', age: '25' }

const name = await redis.hget('user:1', 'name');
await redis.hdel('user:1', 'age');

// Lists
await redis.rpush('tasks', 'Task 1', 'Task 2', 'Task 3');
await redis.lpush('tasks', 'Urgent Task');
const tasks = await redis.lrange('tasks', 0, -1);

const task = await redis.lpop('tasks');
const lastTask = await redis.rpop('tasks');

// Sets
await redis.sadd('tags', 'javascript', 'nodejs', 'redis');
const tags = await redis.smembers('tags');
const isMember = await redis.sismember('tags', 'javascript');

// Sorted Sets
await redis.zadd('leaderboard', 100, 'hassan', 150, 'ali', 120, 'sara');
const top3 = await redis.zrevrange('leaderboard', 0, 2, 'WITHSCORES');

// Delete keys
await redis.del('user:1');

// Check existence
const exists = await redis.exists('user:1');

// Get TTL (time to live)
const ttl = await redis.ttl('session:abc');
```

---

## 3. Caching Patterns - Real-World Usage

### Cache-Aside Pattern (Most Common)

```javascript
// Cache-aside: Application handles caching logic

class UserService {
  constructor(redis, database) {
    this.redis = redis;
    this.db = database;
  }
  
  async getUser(userId) {
    const cacheKey = `user:${userId}`;
    
    // Try to get from cache
    const cached = await this.redis.get(cacheKey);
    if (cached) {
      console.log('Cache hit');
      return JSON.parse(cached);
    }
    
    // Cache miss - get from database
    console.log('Cache miss - fetching from database');
    const user = await this.db.users.findById(userId);
    
    if (!user) {
      return null;
    }
    
    // Store in cache (expire in 1 hour)
    await this.redis.setex(
      cacheKey,
      3600,
      JSON.stringify(user)
    );
    
    return user;
  }
  
  async updateUser(userId, updates) {
    // Update database
    const user = await this.db.users.update(userId, updates);
    
    // Invalidate cache
    await this.redis.del(`user:${userId}`);
    
    return user;
  }
}

// Usage
const userService = new UserService(redis, database);
const user = await userService.getUser(123);
```

### Function Result Caching

```javascript
// Cache function results
async function cachedFetch(url, ttl = 3600) {
  const cacheKey = `fetch:${url}`;
  
  // Check cache
  const cached = await redis.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }
  
  // Fetch data
  const response = await fetch(url);
  const data = await response.json();
  
  // Cache result
  await redis.setex(cacheKey, ttl, JSON.stringify(data));
  
  return data;
}

// Usage
const users = await cachedFetch('https://api.example.com/users');
```

### Database Query Caching

```javascript
class ProductRepository {
  constructor(redis, db) {
    this.redis = redis;
    this.db = db;
  }
  
  async getProducts(filters) {
    // Create cache key from filters
    const cacheKey = `products:${JSON.stringify(filters)}`;
    
    // Try cache
    const cached = await this.redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }
    
    // Query database
    const products = await this.db.query(`
      SELECT * FROM products 
      WHERE category = $1 AND price < $2
    `, [filters.category, filters.maxPrice]);
    
    // Cache for 5 minutes
    await this.redis.setex(cacheKey, 300, JSON.stringify(products));
    
    return products;
  }
  
  async invalidateCategory(category) {
    // Simple invalidation: delete specific cache
    // Better: use key patterns with SCAN
    const pattern = `products:*"category":"${category}"*`;
    
    // Note: KEYS is slow on large datasets, use SCAN in production
    const keys = await this.redis.keys(pattern);
    if (keys.length > 0) {
      await this.redis.del(...keys);
    }
  }
}
```

### Cache Warming (Pre-populate Cache)

```javascript
// Warm cache with frequently accessed data
async function warmCache() {
  console.log('Warming cache...');
  
  // Get most popular products
  const popularProducts = await db.query(`
    SELECT * FROM products 
    ORDER BY views DESC 
    LIMIT 100
  `);
  
  // Store in cache
  for (const product of popularProducts) {
    await redis.setex(
      `product:${product.id}`,
      3600,
      JSON.stringify(product)
    );
  }
  
  console.log(`Cached ${popularProducts.length} products`);
}

// Run on server start
warmCache();

// Run periodically
setInterval(warmCache, 30 * 60 * 1000);  // Every 30 minutes
```

---

## 4. Session Management

```javascript
// Express session with Redis
import session from 'express-session';
import RedisStore from 'connect-redis';
import Redis from 'ioredis';

const redis = new Redis();

app.use(session({
  store: new RedisStore({ client: redis }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000  // 24 hours
  }
}));

// Usage in routes
app.post('/login', async (req, res) => {
  const user = await authenticateUser(req.body);
  
  // Store user in session
  req.session.userId = user.id;
  req.session.role = user.role;
  
  res.json({ message: 'Logged in' });
});

app.get('/profile', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  
  res.json({ userId: req.session.userId });
});

app.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ message: 'Logged out' });
});
```

---

## 5. Rate Limiting - API Protection

### Simple Rate Limiter

```javascript
// Rate limit using Redis counters
async function rateLimit(userId, maxRequests = 100, windowSeconds = 60) {
  const key = `rate_limit:${userId}`;
  
  // Increment counter
  const current = await redis.incr(key);
  
  // Set expiration on first request
  if (current === 1) {
    await redis.expire(key, windowSeconds);
  }
  
  // Check if limit exceeded
  if (current > maxRequests) {
    const ttl = await redis.ttl(key);
    throw new Error(`Rate limit exceeded. Try again in ${ttl} seconds`);
  }
  
  return {
    allowed: true,
    remaining: maxRequests - current
  };
}

// Usage in Express middleware
app.use(async (req, res, next) => {
  try {
    const userId = req.user?.id || req.ip;
    const result = await rateLimit(userId, 100, 60);
    
    res.setHeader('X-RateLimit-Remaining', result.remaining);
    next();
  } catch (error) {
    res.status(429).json({ error: error.message });
  }
});
```

### Sliding Window Rate Limiter (More Accurate)

```javascript
class SlidingWindowRateLimiter {
  constructor(redis) {
    this.redis = redis;
  }
  
  async check(userId, maxRequests = 100, windowSeconds = 60) {
    const key = `rate_limit:${userId}`;
    const now = Date.now();
    const windowStart = now - (windowSeconds * 1000);
    
    // Use sorted set with timestamps as scores
    const multi = this.redis.multi();
    
    // Remove old requests
    multi.zremrangebyscore(key, 0, windowStart);
    
    // Count current requests
    multi.zcard(key);
    
    // Add current request
    multi.zadd(key, now, `${now}-${Math.random()}`);
    
    // Set expiration
    multi.expire(key, windowSeconds);
    
    const results = await multi.exec();
    const currentRequests = results[1][1];
    
    if (currentRequests >= maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        resetIn: Math.ceil((windowStart + windowSeconds * 1000 - now) / 1000)
      };
    }
    
    return {
      allowed: true,
      remaining: maxRequests - currentRequests - 1
    };
  }
}

// Usage
const limiter = new SlidingWindowRateLimiter(redis);

app.use(async (req, res, next) => {
  const userId = req.user?.id || req.ip;
  const result = await limiter.check(userId, 100, 60);
  
  if (!result.allowed) {
    return res.status(429).json({
      error: 'Rate limit exceeded',
      resetIn: result.resetIn
    });
  }
  
  res.setHeader('X-RateLimit-Remaining', result.remaining);
  next();
});
```

---

## 6. Pub/Sub - Real-Time Messaging

### Basic Pub/Sub

```javascript
// Publisher
import Redis from 'ioredis';

const publisher = new Redis();

// Publish message
await publisher.publish('notifications', JSON.stringify({
  type: 'new_message',
  userId: 123,
  message: 'Hello!'
}));

// Subscriber (separate instance!)
const subscriber = new Redis();

subscriber.subscribe('notifications', (err, count) => {
  console.log(`Subscribed to ${count} channel(s)`);
});

subscriber.on('message', (channel, message) => {
  console.log(`Received from ${channel}:`, message);
  
  const data = JSON.parse(message);
  // Handle notification
  handleNotification(data);
});

// Unsubscribe
subscriber.unsubscribe('notifications');
```

### Real-World: WebSocket Notifications

```javascript
// notifications.js
import { Server } from 'socket.io';
import Redis from 'ioredis';

const io = new Server(server);
const subscriber = new Redis();

// Subscribe to notification channel
subscriber.subscribe('user:notifications');

subscriber.on('message', (channel, message) => {
  const notification = JSON.parse(message);
  
  // Send to specific user's socket
  io.to(`user:${notification.userId}`).emit('notification', notification);
});

// When user connects
io.on('connection', (socket) => {
  const userId = socket.handshake.auth.userId;
  
  // Join user-specific room
  socket.join(`user:${userId}`);
  
  console.log(`User ${userId} connected`);
});

// In your application, publish notifications
const publisher = new Redis();

async function sendNotification(userId, notification) {
  await publisher.publish('user:notifications', JSON.stringify({
    userId,
    ...notification
  }));
}

// Usage
await sendNotification(123, {
  type: 'new_message',
  title: 'New Message',
  body: 'You have a new message from Ali'
});
```

### Pattern Subscription

```javascript
// Subscribe to pattern
subscriber.psubscribe('user:*:notifications');

subscriber.on('pmessage', (pattern, channel, message) => {
  console.log(`Pattern ${pattern} matched ${channel}`);
  
  // Extract userId from channel name
  const userId = channel.split(':')[1];
  
  // Handle message
  const data = JSON.parse(message);
  handleUserNotification(userId, data);
});

// Publish to specific user
publisher.publish('user:123:notifications', JSON.stringify({
  type: 'like',
  postId: 456
}));
```

---

## 7. Job Queues with Bull

### Setup Bull Queue

```javascript
// Install: npm install bull

import Queue from 'bull';
import Redis from 'ioredis';

// Create queue
const emailQueue = new Queue('email', {
  redis: {
    host: 'localhost',
    port: 6379
  }
});

// Add job to queue
await emailQueue.add('welcome-email', {
  to: 'hassan@example.com',
  name: 'Hassan',
  templateId: 'welcome'
});

// Add job with options
await emailQueue.add('password-reset', {
  to: 'user@example.com',
  resetToken: 'abc123'
}, {
  delay: 5000,  // Delay 5 seconds
  attempts: 3,  // Retry 3 times
  backoff: {
    type: 'exponential',
    delay: 2000
  },
  removeOnComplete: true,
  removeOnFail: false
});

// Process jobs (in separate worker process)
emailQueue.process('welcome-email', async (job) => {
  const { to, name, templateId } = job.data;
  
  console.log(`Sending welcome email to ${to}`);
  
  // Send email
  await sendEmail({
    to,
    subject: 'Welcome!',
    template: templateId,
    data: { name }
  });
  
  return { sent: true, timestamp: new Date() };
});

// Job events
emailQueue.on('completed', (job, result) => {
  console.log(`Job ${job.id} completed:`, result);
});

emailQueue.on('failed', (job, error) => {
  console.error(`Job ${job.id} failed:`, error.message);
});

emailQueue.on('progress', (job, progress) => {
  console.log(`Job ${job.id} progress: ${progress}%`);
});

// Real-world: Image processing queue
const imageQueue = new Queue('image-processing');

imageQueue.process(async (job) => {
  const { imagePath, userId } = job.data;
  
  // Report progress
  job.progress(10);
  
  // Generate thumbnail
  const thumbnail = await generateThumbnail(imagePath);
  job.progress(50);
  
  // Optimize image
  const optimized = await optimizeImage(imagePath);
  job.progress(80);
  
  // Upload to S3
  const url = await uploadToS3(optimized);
  job.progress(100);
  
  return { thumbnail, url };
});

// Add image processing job
await imageQueue.add({
  imagePath: '/uploads/image.jpg',
  userId: 123
});
```

---

## 8. Leaderboards and Rankings

```javascript
// Game leaderboard
class Leaderboard {
  constructor(redis, name) {
    this.redis = redis;
    this.key = `leaderboard:${name}`;
  }
  
  async addScore(userId, score) {
    await this.redis.zadd(this.key, score, userId);
  }
  
  async incrementScore(userId, points) {
    await this.redis.zincrby(this.key, points, userId);
  }
  
  async getTopPlayers(count = 10) {
    // Get top N with scores
    const results = await this.redis.zrevrange(
      this.key,
      0,
      count - 1,
      'WITHSCORES'
    );
    
    // Format: [player1, score1, player2, score2, ...]
    const leaderboard = [];
    for (let i = 0; i < results.length; i += 2) {
      leaderboard.push({
        userId: results[i],
        score: parseInt(results[i + 1]),
        rank: i / 2 + 1
      });
    }
    
    return leaderboard;
  }
  
  async getUserRank(userId) {
    // Get rank (0-based, reverse order)
    const rank = await this.redis.zrevrank(this.key, userId);
    
    if (rank === null) {
      return null;
    }
    
    const score = await this.redis.zscore(this.key, userId);
    
    return {
      userId,
      rank: rank + 1,  // 1-based rank
      score: parseInt(score)
    };
  }
  
  async getPlayerCount() {
    return await this.redis.zcard(this.key);
  }
  
  async getScoreRange(minScore, maxScore) {
    const results = await this.redis.zrangebyscore(
      this.key,
      minScore,
      maxScore,
      'WITHSCORES'
    );
    
    const players = [];
    for (let i = 0; i < results.length; i += 2) {
      players.push({
        userId: results[i],
        score: parseInt(results[i + 1])
      });
    }
    
    return players;
  }
}

// Usage
const gameLeaderboard = new Leaderboard(redis, 'global');

await gameLeaderboard.addScore('user:123', 1500);
await gameLeaderboard.incrementScore('user:123', 100);

const topPlayers = await gameLeaderboard.getTopPlayers(10);
const myRank = await gameLeaderboard.getUserRank('user:123');

console.log('Top 10:', topPlayers);
console.log('My rank:', myRank);
```

---

## 9. Distributed Locks

```javascript
// Prevent race conditions in distributed systems
class RedisLock {
  constructor(redis) {
    this.redis = redis;
  }
  
  async acquire(lockKey, ttl = 10000) {
    const lockValue = `${Date.now()}-${Math.random()}`;
    
    // Try to set lock (only if doesn't exist)
    const result = await this.redis.set(
      lockKey,
      lockValue,
      'PX',  // Milliseconds
      ttl,
      'NX'   // Only if not exists
    );
    
    if (result === 'OK') {
      return lockValue;  // Lock acquired
    }
    
    return null;  // Lock already held
  }
  
  async release(lockKey, lockValue) {
    // Only delete if we own the lock (prevent deleting others' locks)
    const script = `
      if redis.call("get", KEYS[1]) == ARGV[1] then
        return redis.call("del", KEYS[1])
      else
        return 0
      end
    `;
    
    const result = await this.redis.eval(script, 1, lockKey, lockValue);
    return result === 1;
  }
  
  async withLock(lockKey, callback, ttl = 10000) {
    const lockValue = await this.acquire(lockKey, ttl);
    
    if (!lockValue) {
      throw new Error('Could not acquire lock');
    }
    
    try {
      return await callback();
    } finally {
      await this.release(lockKey, lockValue);
    }
  }
}

// Usage: Prevent double-processing
const lock = new RedisLock(redis);

async function processOrder(orderId) {
  const lockKey = `lock:order:${orderId}`;
  
  await lock.withLock(lockKey, async () => {
    // This code won't run concurrently for same order
    const order = await getOrder(orderId);
    
    if (order.status === 'processing') {
      console.log('Already processing');
      return;
    }
    
    await updateOrder(orderId, { status: 'processing' });
    await chargePayment(order);
    await createShipment(order);
    await updateOrder(orderId, { status: 'completed' });
  });
}
```

---

## 10. Best Practices (2026 Industry Standards)

### Connection Management

```javascript
// Use connection pooling
const redis = new Redis({
  host: 'localhost',
  port: 6379,
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  maxRetriesPerRequest: 3
});

// Reuse connections, don't create new ones for each request
// DON'T:
app.get('/user/:id', async (req, res) => {
  const redis = new Redis();  // BAD!
  const user = await redis.get(`user:${req.params.id}`);
  await redis.quit();
  res.json(user);
});

// DO:
const redis = new Redis();  // Create once
app.get('/user/:id', async (req, res) => {
  const user = await redis.get(`user:${req.params.id}`);
  res.json(user);
});
```

### Key Naming Conventions

```javascript
// Use consistent naming patterns
// Pattern: object:id:field or namespace:object:id

// Good patterns
user:123:profile
user:123:sessions
post:456:views
cache:api:users:list
rate_limit:user:123
leaderboard:global
session:abc123def456

// Bad patterns
user123profile  // Hard to scan
userProfile_123  // Inconsistent
123  // Not descriptive
```

### Memory Management

```javascript
// Set expiration on cache keys
await redis.setex('cache:users', 3600, data);  // 1 hour

// Use LRU eviction policy in redis.conf
maxmemory 2gb
maxmemory-policy allkeys-lru

// Monitor memory usage
const info = await redis.info('memory');
console.log(info);

// Use smaller data structures when possible
// Hash is more memory-efficient than multiple string keys
// Instead of:
await redis.set('user:1:name', 'Hassan');
await redis.set('user:1:email', 'hassan@example.com');

// Use:
await redis.hset('user:1', {
  name: 'Hassan',
  email: 'hassan@example.com'
});
```

### Error Handling

```javascript
// Always handle Redis errors
redis.on('error', (err) => {
  console.error('Redis error:', err);
  // Don't crash the app, log to monitoring service
});

// Wrap operations in try-catch
async function getUserFromCache(userId) {
  try {
    const user = await redis.get(`user:${userId}`);
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Cache error:', error);
    // Fail gracefully - return null and fetch from database
    return null;
  }
}

// Use circuit breaker pattern for cache failures
let cacheEnabled = true;

async function getUser(userId) {
  if (cacheEnabled) {
    try {
      const cached = await redis.get(`user:${userId}`);
      if (cached) return JSON.parse(cached);
    } catch (error) {
      console.error('Cache error, disabling for 60s');
      cacheEnabled = false;
      setTimeout(() => { cacheEnabled = true; }, 60000);
    }
  }
  
  // Fetch from database
  return await database.getUser(userId);
}
```

### Pipelining for Batch Operations

```javascript
// Pipeline multiple commands
const pipeline = redis.pipeline();

pipeline.set('key1', 'value1');
pipeline.set('key2', 'value2');
pipeline.get('key1');
pipeline.incr('counter');

const results = await pipeline.exec();
// Results is array of [error, result] pairs

// Real-world: Batch cache multiple users
async function getUsersFromCache(userIds) {
  const pipeline = redis.pipeline();
  
  userIds.forEach(id => {
    pipeline.get(`user:${id}`);
  });
  
  const results = await pipeline.exec();
  
  return results.map((result, index) => {
    const [error, data] = result;
    if (error || !data) return null;
    return JSON.parse(data);
  });
}
```

---


# Prisma & TypeScript - Complete Guide

## Part 1: Prisma ORM - Modern Database Toolkit

### What is Prisma?

Prisma is a next-generation ORM (Object-Relational Mapping) that provides type-safe database access for Node.js & TypeScript. Think of it as a bridge between your code and your database that writes SQL for you AND gives you autocompletion!

**Why Prisma? (2026 Industry Standard):**
- **Type-Safe**: Full TypeScript support with autocomplete
- **Auto-Generated**: Client code generated from your schema
- **Migrations**: Database version control built-in
- **Multiple Databases**: PostgreSQL, MySQL, SQLite, MongoDB, SQL Server
- **Intuitive API**: Easy to learn, powerful to use
- **Used By**: Vercel, Netlify, Twilio, and thousands of companies

---

## 1. Prisma Setup & Schema

### Installation

```bash
# Install Prisma CLI
npm install -D prisma

# Install Prisma Client
npm install @prisma/client

# Initialize Prisma
npx prisma init
# Creates: prisma/schema.prisma and .env
```

### Database Connection

```env
# .env
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
# Or for other databases:
# DATABASE_URL="mysql://user:password@localhost:3306/mydb"
# DATABASE_URL="mongodb+srv://user:password@cluster.mongodb.net/mydb"
```

### Schema Definition

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"  // or "mysql", "sqlite", "mongodb"
  url      = env("DATABASE_URL")
}

// Define models (tables)
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?  // ? means optional
  password  String
  role      Role     @default(USER)
  posts     Post[]   // One-to-many relationship
  profile   Profile? // One-to-one relationship
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("users")  // Custom table name
}

model Profile {
  id     Int     @id @default(autoincrement())
  bio    String?
  avatar String?
  user   User    @relation(fields: [userId], references: [id])
  userId Int     @unique

  @@map("profiles")
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
  tags      Tag[]    // Many-to-many
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([authorId])
  @@map("posts")
}

model Tag {
  id    Int    @id @default(autoincrement())
  name  String @unique
  posts Post[]

  @@map("tags")
}

enum Role {
  USER
  ADMIN
  MODERATOR
}
```

### Field Types & Modifiers

```prisma
model Example {
  // String types
  text      String
  limitText String   @db.VarChar(255)
  longText  String   @db.Text

  // Number types
  integer   Int
  bigInt    BigInt
  float     Float
  decimal   Decimal  @db.Decimal(10, 2)

  // Boolean
  isActive  Boolean  @default(true)

  // DateTime
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  birthday  DateTime @db.Date

  // JSON
  metadata  Json?

  // Enum
  role      Role     @default(USER)

  // Arrays (PostgreSQL only)
  tags      String[]

  // Field modifiers
  @id                    // Primary key
  @unique                // Unique constraint
  @default(value)        // Default value
  @updatedAt            // Auto-update timestamp
  @map("custom_name")   // Custom column name

  // Indexes
  @@index([field1, field2])
  @@unique([field1, field2])
  @@id([field1, field2])  // Composite primary key
}
```

### Migrations

```bash
# Create migration
npx prisma migrate dev --name init

# Generate Prisma Client (after schema changes)
npx prisma generate

# Apply migrations in production
npx prisma migrate deploy

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# View migration status
npx prisma migrate status

# Create migration without applying
npx prisma migrate dev --create-only
```

---

## 2. Prisma Client - CRUD Operations

### Setup Client

```typescript
// prisma/client.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'error', 'warn'],  // Logging
});

export default prisma;

// In development, prevent multiple instances
declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

export default prisma;
```

### CREATE Operations

```typescript
import prisma from './prisma/client';

// Create single record
const user = await prisma.user.create({
  data: {
    email: 'hassan@example.com',
    name: 'Hassan',
    password: 'hashed_password',
  },
});

// Create with relations
const userWithPost = await prisma.user.create({
  data: {
    email: 'ali@example.com',
    name: 'Ali',
    password: 'hashed',
    posts: {
      create: {
        title: 'My First Post',
        content: 'Hello World!',
      },
    },
  },
  include: {
    posts: true,  // Include related posts in result
  },
});

// Create many
const users = await prisma.user.createMany({
  data: [
    { email: 'user1@example.com', name: 'User 1', password: 'hash1' },
    { email: 'user2@example.com', name: 'User 2', password: 'hash2' },
  ],
  skipDuplicates: true,  // Skip if email exists
});
```

### READ Operations

```typescript
// Find many
const allUsers = await prisma.user.findMany();

// Find with filters
const activeUsers = await prisma.user.findMany({
  where: {
    role: 'USER',
    posts: {
      some: {
        published: true,
      },
    },
  },
});

// Find unique
const user = await prisma.user.findUnique({
  where: { email: 'hassan@example.com' },
});

// Find first
const firstAdmin = await prisma.user.findFirst({
  where: { role: 'ADMIN' },
});

// Find with relations
const userWithPosts = await prisma.user.findUnique({
  where: { id: 1 },
  include: {
    posts: true,
    profile: true,
  },
});

// Select specific fields
const usersEmail = await prisma.user.findMany({
  select: {
    id: true,
    email: true,
    name: true,
  },
});

// Pagination
const page = 1;
const limit = 20;

const users = await prisma.user.findMany({
  skip: (page - 1) * limit,
  take: limit,
});

// Ordering
const sortedUsers = await prisma.user.findMany({
  orderBy: [
    { createdAt: 'desc' },
    { name: 'asc' },
  ],
});

// Count
const userCount = await prisma.user.count({
  where: { role: 'USER' },
});

// Aggregate
const stats = await prisma.user.aggregate({
  _count: true,
  _avg: { id: true },
  _sum: { id: true },
  _min: { createdAt: true },
  _max: { createdAt: true },
});
```

### UPDATE Operations

```typescript
// Update one
const updatedUser = await prisma.user.update({
  where: { id: 1 },
  data: {
    name: 'Hassan Ahmed',
    updatedAt: new Date(),
  },
});

// Update many
const result = await prisma.user.updateMany({
  where: { role: 'USER' },
  data: { role: 'MODERATOR' },
});

// Upsert (update if exists, create if not)
const user = await prisma.user.upsert({
  where: { email: 'hassan@example.com' },
  update: { name: 'Hassan Updated' },
  create: {
    email: 'hassan@example.com',
    name: 'Hassan',
    password: 'hash',
  },
});

// Update with relations
const updatedPost = await prisma.post.update({
  where: { id: 1 },
  data: {
    title: 'Updated Title',
    tags: {
      connect: [{ id: 1 }, { id: 2 }],  // Connect to existing tags
    },
  },
});
```

### DELETE Operations

```typescript
// Delete one
const deletedUser = await prisma.user.delete({
  where: { id: 1 },
});

// Delete many
const result = await prisma.user.deleteMany({
  where: {
    createdAt: {
      lt: new Date('2023-01-01'),
    },
  },
});
```

---

## Part 2: TypeScript - Complete Guide

### What is TypeScript?

TypeScript is JavaScript with syntax for types. It's a strongly typed programming language that builds on JavaScript, giving you better tooling and catching errors before your code runs.

**Why TypeScript? (2026 Industry Standard):**
- **Type Safety**: Catch errors at compile-time, not runtime
- **Better IDE Support**: Autocomplete, refactoring, navigation
- **Self-Documenting**: Types serve as documentation
- **Easier Refactoring**: Rename, restructure with confidence
- **Industry Standard**: 90%+ of new projects use TypeScript

### Basic Types

```typescript
// Primitives
let name: string = 'Hassan';
let age: number = 25;
let isActive: boolean = true;
let notDefined: undefined = undefined;
let nothing: null = null;

// Arrays
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ['Ali', 'Sara'];

// Tuple (fixed-length array with known types)
let user: [string, number] = ['Hassan', 25];

// Object type
let person: { name: string; age: number } = {
  name: 'Hassan',
  age: 25,
};

// Any (avoid when possible!)
let anything: any = 'could be anything';
anything = 123;
anything = true;

// Unknown (safer than any)
let value: unknown = 'hello';
if (typeof value === 'string') {
  console.log(value.toUpperCase());  // OK inside type guard
}

// Void (no return value)
function logMessage(message: string): void {
  console.log(message);
}

// Never (never returns)
function throwError(message: string): never {
  throw new Error(message);
}
```

### Interfaces and Types

```typescript
// Interface
interface User {
  id: number;
  name: string;
  email: string;
  age?: number;  // Optional
  readonly createdAt: Date;  // Read-only
}

const user: User = {
  id: 1,
  name: 'Hassan',
  email: 'hassan@example.com',
  createdAt: new Date(),
};

// Type alias
type ID = string | number;
type Point = { x: number; y: number };

// Union types
type Status = 'pending' | 'approved' | 'rejected';
let orderStatus: Status = 'pending';

// Intersection types
type Admin = User & { role: 'admin'; permissions: string[] };

// Function types
type MathOperation = (a: number, b: number) => number;

const add: MathOperation = (a, b) => a + b;
```

### Generics

```typescript
// Generic function
function identity<T>(arg: T): T {
  return arg;
}

const num = identity<number>(42);
const str = identity<string>('hello');

// Generic interface
interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

const userResponse: ApiResponse<User> = {
  success: true,
  data: {
    id: 1,
    name: 'Hassan',
    email: 'hassan@example.com',
    createdAt: new Date(),
  },
};

// Generic class
class DataStore<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  get(index: number): T | undefined {
    return this.items[index];
  }
}

const userStore = new DataStore<User>();
userStore.add(user);
```

### Utility Types

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// Partial - all properties optional
type PartialUser = Partial<User>;

// Required - all properties required
type RequiredUser = Required<User>;

// Pick - select specific properties
type UserPreview = Pick<User, 'id' | 'name' | 'email'>;

// Omit - exclude properties
type UserWithoutPassword = Omit<User, 'password'>;

// Readonly - make all properties readonly
type ImmutableUser = Readonly<User>;

// Record - object type with specific keys
type UserRoles = Record<string, 'admin' | 'user'>;

// ReturnType - infer function return type
function getUser() {
  return { id: 1, name: 'Hassan' };
}
type UserType = ReturnType<typeof getUser>;
```

---

