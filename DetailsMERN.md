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
