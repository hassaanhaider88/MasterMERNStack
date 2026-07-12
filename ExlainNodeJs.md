## 1. Globals & Process

Globals are objects, variables, and functions available anywhere in your codebase without having to import or require them.

* `process`: An object providing control and information about the currently executing Node.js application.
* `globalThis`: The unified global object across both web browsers (`window`) and backend environments (`global`).
* `__dirname` / `__filename`: Native strings providing absolute directory and file paths (available out of the box in CommonJS format).

```javascript
// file: index.js

// 1. Check your system specs & environments
console.log(`Current OS Platform: ${process.platform}`); // e.g., 'darwin', 'win32'
console.log(`Current Working Directory: ${process.cwd()}`);

// 2. Reading custom variables and measuring exact execution time
process.env.APP_MODE = "development"; 
const startHighResTime = process.hrtime.bigint();

// 3. Advanced console logging structures
console.table([
  { module: "Auth", status: "Active" },
  { module: "Database", status: "Connecting" }
]);

console.time("LoopDuration");
for(let i = 0; i < 1_000_000; i++) {} // Quick loop
console.timeEnd("LoopDuration");

const endHighResTime = process.hrtime.bigint();
console.log(`Precise execution took: ${endHighResTime - startHighResTime} nanoseconds.`);

```

---

## 2. Core Modules

Core modules are pre-compiled libraries shipped directly inside Node.js. To prevent collisions with third-party npm libraries, modern code prefixes them with `node:`.

### A. File System (`fs`) & `path`

Manages files safely. Instead of hardcoding string paths, we use `path.join` or `path.resolve` to ensure compatibility across macOS, Linux, and Windows.

```javascript
import fs from 'node:fs/promises';
import { join } from 'node:path';

async function manageFiles() {
  const folderPath = join(process.cwd(), 'logs');
  const filePath = join(folderPath, 'server.log');

  try {
    // Create directory securely if it doesn't exist
    await fs.mkdir(folderPath, { recursive: true });
    
    // Write or overwrite a file
    await fs.writeFile(filePath, 'Initial server status: Healthy\n');
    
    // Append more content
    await fs.appendFile(filePath, 'New entry: User logged in\n');
    
    // Read the file back out
    const content = await fs.readFile(filePath, 'utf-8');
    console.log("--- File Contents --- \n", content);
  } catch (error) {
    console.error("FS Error:", error);
  }
}
manageFiles();

```

### B. Events (`EventEmitter`)

Node.js relies heavily on an architecture centered around events. You can emit specific signals and assign observers to listen for them.

```javascript
import { EventEmitter } from 'node:events';

class OrderService extends EventEmitter {}
const orderService = new OrderService();

// Register listeners
orderService.on('payment_success', (orderId, amount) => {
  console.log(`[Email Service] Receipt sent for order ${orderId} ($${amount})`);
});

orderService.once('payment_success', () => {
  console.log(`[Analytics] This metric runs only on the first payment success!`);
});

// Triggering the event
orderService.emit('payment_success', 'ORD-9981', 149.99);
orderService.emit('payment_success', 'ORD-9982', 45.00);

```

### C. Streams & Pipeline

Streams prevent your application from loading giant multi-gigabyte files into system memory all at once. Instead, data is read and written chunk by chunk.

```javascript
import fs from 'node:fs';
import { pipeline } from 'node:stream/promises';
import zlib from 'node:zlib';

async function compressLogFile() {
  // Gracefully stream data, zip it, and stream it back out to a file
  await pipeline(
    fs.createReadStream('logs/server.log'),
    zlib.createGzip(),
    fs.createWriteStream('logs/server.log.gz')
  );
  console.log('Streaming compression completed without bloating RAM.');
}
compressLogFile().catch(console.error);

```

### D. Crypto & Buffer

Buffers represent low-level binary data sequences, while the `crypto` module handles secure data manipulation like generating hashes or passwords.

```javascript
import crypto from 'node:crypto';
import { Buffer } from 'node:buffer';

// Convert text to binary data structure
const myBuffer = Buffer.from('SecureText123', 'utf-8');
console.log('Hex representation of text:', myBuffer.toString('hex'));

// Hashing a password safely
const secureHash = crypto.createHash('sha256').update('mySecretPassword').digest('hex');
console.log('SHA-256 Hashed Output:', secureHash);

// Generate cryptographically secure random bytes (useful for session tokens)
const randomToken = crypto.randomBytes(32).toString('hex');
console.log('Random Token:', randomToken);

```

### E. Child Processes & Worker Threads

* `child_process`: Allows you to execute non-JavaScript operating system tasks (like terminal commands).
* `worker_threads`: Offloads heavy mathematical or CPU-intensive tasks into a separate thread so your primary server loop stays responsive.

```javascript
import { exec } from 'node:child_process';
import { Worker, isMainThread, parentPort } from 'node:worker_threads';

// Example: Running a terminal command via Child Process
exec('node -v', (err, stdout, stderr) => {
  if (err) return console.error(err);
  console.log(`System native Node version verified: ${stdout.trim()}`);
});

// Example: Worker Thread logic isolated to one file for demonstration
if (isMainThread) {
  // This block runs in your primary server environment
  const worker = new Worker(new URL(import.meta.url));
  worker.on('message', (result) => console.log(`Heavy calculation result: ${result}`));
  worker.postMessage(40); // Request computation for the 40th Fibonacci sequence item
} else {
  // This block runs parallel inside the isolated worker thread
  parentPort.on('message', (num) => {
    let result = fibonacci(num);
    parentPort.postMessage(result);
  });

  function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
}

```

---

## 3. HTTP, HTTPS & Fetch

This is how you receive web requests and fetch resources from external servers natively.

```javascript
import http from 'node:http';

// 1. Creating a native Web Server
const server = http.createServer(async (req, res) => {
  if (req.url === '/api/status' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: "Online", timestamp: new Date() }));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Resource Not Found');
  }
});

server.listen(3000, () => {
  console.log('HTTP Server listening directly on port 3000');
});

// 2. Making requests using native global fetch
async function callExternalAPI() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout limit

    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', { signal: controller.signal });
    clearTimeout(timeoutId);
    
    const data = await response.json();
    console.log('Fetched Post Title:', data.title);
  } catch (err) {
    console.error('Fetch encountered an error or timed out:', err.message);
  }
}
callExternalAPI();

```

---

## 4. Modules System: CommonJS (CJS) vs ES Modules (ESM)

* **CommonJS**: Uses standard `require()` and `module.exports`. Historically default in legacy Node.js ecosystems.
* **ES Modules**: Uses `import`/`export`. The standardized layout for modern web apps.

To use ES Modules, append `"type": "module"` directly inside your local `package.json` file.

### CommonJS Approach (Legacy)

```javascript
// file: calculations.cjs
function add(a, b) { return a + b; }
module.exports = { add };

// file: main.cjs
const { add } = require('./calculations.cjs');

```

### ES Modules Approach (Modern Standards)

```javascript
// file: calculations.js
export function add(a, b) { return a + b; }

// file: main.js
import { add } from './calculations.js';

// Top-Level Await works immediately out of the box inside ES Modules!
const dataData = await Promise.resolve("Instant Resolution"); 
console.log(dataData);

```

---

## 5. Async Patterns

Node.js operates asynchronously inside a single thread via its internal Event Loop. Over the years, async code evolved to become cleaner and more maintainable:

```javascript
// 1. Legacy Callback Approach (Can lead to "Callback Hell")
function fetchUserCallback(id, callback) {
  setTimeout(() => callback(null, { id, name: 'Alice' }), 100);
}

// 2. Modern Promises + Async/Await Engine
const fetchUserPromise = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id, name: 'Alice' }), 100);
  });
};

async function executeAsyncTasks() {
  const user = await fetchUserPromise(101);
  console.log(`Async/Await User Resolution: ${user.name}`);
}
executeAsyncTasks();

```

---

## 6. CLI Arguments & Environment Variables

Configuring app inputs through command line controls or execution variables.

```javascript
// Execute file via terminal command: node server.js --port=8080

// Reading custom environment setups or defaulting safely
const currentPort = process.env.PORT || 3000; 
console.log(`Application target port setup: ${currentPort}`);

// Parsing CLI parameters manually
const commandLineArgs = process.argv.slice(2);
console.log('Arguments passed in via terminal:', commandLineArgs); 
// Output: ['--port=8080']

```

---

## 7. Modern Node.js Features

Modern Node.js runtime releases remove the absolute dependency on external utility modules like `dotenv` or basic testing frame builds.

### Native `.env` & Testing Implementation

Instead of relying on third-party test suites, Node.js includes integrated environmental validation options and a native test runner.

```javascript
// Run script command: node --env-file=.env index.js
// Assuming your local .env file contains: DATABASE_SECRET=MyPassword123

import { test } from 'node:test';
import assert from 'node:assert';

console.log(`Loaded environment secret directly: ${process.env.DATABASE_SECRET}`);

test('Math calculation sanity validation check', () => {
  const calculationResult = 2 + 2;
  assert.strictEqual(calculationResult, 4);
});

```

### Native Built-in SQLite Database Engine

Node.js features a high-performance native synchronous database management class: `node:sqlite`.

```javascript
import { DatabaseSync } from 'node:sqlite';

// Initialize a database completely in-memory or swap with a filename string like 'production.db'
const db = new DatabaseSync(':memory:');

// Execute structural schema setup strings
db.exec(`
  CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE
  )
`);

// Insert entries with safely prepared statement bindings
const insertStatement = db.prepare('INSERT INTO users (username) VALUES (?)');
insertStatement.run('developer_one');
insertStatement.run('developer_two');

// Query table records smoothly
const readStatement = db.prepare('SELECT * FROM users');
console.log('Database Content:', readStatement.all());

```

---

## 8. Clean Production Architecture Blueprint

When writing a professional production-level system, split routing management cleanly away from server execution structures.

Here is a robust starting framework blueprint for an express-style architecture:

```javascript
import http from 'node:http';

// Centralized error handling controller
function asyncHandler(routeFunction) {
  return async (req, res) => {
    try {
      await routeFunction(req, res);
    } catch (err) {
      console.error(`[Production App Log Error]:`, err.message);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Internal Application Server Error' }));
    }
  };
}

// Controller Logic Layer
const getUserDataController = asyncHandler(async (req, res) => {
  // Imagine reading entries from your DatabaseSync structure here
  const sampleUser = { id: 1, name: "Sarah Connor", role: "Engineer" };
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(sampleUser));
});

// Centralized Request Routing Matrix
const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/api/user') {
    return getUserDataController(req, res);
  }
  
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Route fallback triggered' }));
});

const PORT = 5000;
server.listen(PORT, () => console.log(`Production architectural matrix operating smoothly at port ${PORT}`));

```

---

Which concept or module from this guide would you like to build your first project around?