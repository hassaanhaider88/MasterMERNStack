# NodeJs

### From Basic to Advanced

Node.js  
|-- Core Modules (built-in, no install needed)  
|-- Globals & Process  
|-- File System & Streams  
|-- HTTP / HTTPS / Fetch  
|-- Events & EventEmitter  
|-- Async Patterns & Promises  
|-- Modules System (CommonJS vs ESM)  
|-- CLI & Process.argv / Environment  
|-- New & Experimental Features (2025–2026)  
|-- Popular Patterns & Best Practices

### 1. Globals & Process (available everywhere)

```
|-- process
    |-- process.env                  → object with environment variables
    |-- process.argv                 → array of command-line arguments
    |-- process.exit(code)           → 0 = success, 1+ = error
    |-- process.cwd()                → current working directory
    |-- process.chdir(dir)           → child folder if any have
    |-- process.platform             → 'win32' | 'linux' | 'darwin' | 'freebsd' etc.
    |-- process.arch                 → 'x64' | 'arm64' | 'ia32'
    |-- process.memoryUsage()
    |-- process.title
    |-- process.uptime()
    |-- process.hrtime.bigint()      → high-resolution time

|-- globalThis / global          → Node’s global object (same as browser’s window in many ways)

|-- console
    |-- .log .info .warn .error .debug
    |-- .time / .timeEnd
    |-- .table
    |-- .dir .dirxml
    |-- .assert

|-- __dirname                    → directory of current module
|-- __filename                   → full path of current module
```

### 2. Core Modules (require('module-name') or import 'node:module-name')

````
|-- fs (File System)
    |-- fs.promises                 → promise-based API (recommended)
    |-- fs.readFile / readFileSync
    |-- fs.writeFile / writeFileSync
    |-- fs.appendFile
    |-- fs.mkdir / mkdirSync / rm / rmdir
    |-- fs.readdir / readdirSync
    |-- fs.stat / statSync / lstat
    |-- fs.watch / watchFile
    |-- fs.createReadStream(path, {encoding, highWaterMark, start, end})
    |-- fs.createWriteStream

|-- path
    |-- path.join(...parts)   → Paths ko combine karta hai
    |-- path.resolve(...paths)  → Absolute path banata hai
    |-- path.basename / dirname / extname  → File name deta hai / Folder path deta hai
    |-- path.parse / format  → string ko obj me / obj ko string me
    |-- path.sep / delimiter  → OS ka path separator / Environment PATH separator

|-- url
    |-- new URL(input, base)
    |-- url.parse(str, true)         → legacy
    |-- url.format(obj)

|-- os

    |-- os.cpus()                    → array of CPU info
    |-- os.freemem() / totalmem()   →
    |-- os.homedir() / tmpdir()     →
    |-- os.hostname() / userInfo()  → Computer ka host name.
    |-- os.networkInterfaces()       → Network interfaces ki information.
    |-- os.platform() / arch() / release() / type() / uptime()  → win32 / CPU architecture return karta hai./  10.0.26100 / / System kitni der se on hai

|-- events
    |-- const EventEmitter = require('node:events')
    |-- class MyEmitter extends EventEmitter {}
    |-- emitter.on('eventName', listener /callback)   => Kisi event ke liye listener register karta hai.;
    |-- emitter.once() => Listener sirf ek baar execute hota hai.
    |-- emitter.emit('eventName', ...args) =>Event trigger karta hai.
    |-- emitter.off() / removeListener / removeAllListeners
    |-- emitter.setMaxListeners(n) => Default limit 10 listeners hoti hai. Agar ek hi event par 10 se zyada listeners add karte hain to Node warning deta hai.

|-- stream -> Node.js ka `stream` module large data ko `chhote chhote chunks` mein process karne ke liye use hota hai. Is se poori file memory mein load nahi hoti, isliye memory efficient hota hai. Node.js mein `4` main stream types hain.
    |-- Readable -> Sirf read kar sakti hai. / Writable / Duplex  / Transform ->Duplex stream hi hoti hai lekin data ko modify bhi karti hai.
    |-- pipeline(source, ...transforms, destination, callback)   → modern & recommended Ye recommended method hai multiple streams ko connect karne ke  liye.
    |-- finished(stream, callback) -> Ye batata hai stream successfully complete hui ya error ke saath close hui.
    |-- stream.promises.pipeline -> async / await version

|-- buffer
    |-- Buffer.from(str, encoding) / Buffer.alloc(size) -> String se buffer banata hai /  Fixed size ka empty buffer banata hai.
    |-- buf.toString() buffer ko string me /
    |-- slice() Buffer ka ek hissa return karta hai. /
    |-- copy() Ek buffer ka data doosre buffer mein copy karta hai. /
    |-- equals() Do buffers compare karta hai.
    |-- Buffer.concat(list) ->Kai buffers ko combine karta hai.
    ```js
    const b1 = Buffer.from("Hello ");
const b2 = Buffer.from("World");
const result = Buffer.concat([b1, b2]);```
    |-- global Buffer (still exists but prefer import { Buffer } from 'node:buffer')

|-- crypto -> module hashing, encryption, decryption, digital signatures aur secure random values generate karne ke liye use hota hai.
    |-- crypto.createHash('sha256').update(data).digest('hex')
    |-- crypto.randomBytes(size)
    |-- crypto.createCipheriv / createDecipheriv
    |-- crypto.generateKeyPair / sign / verify

|-- zlib
    |-- zlib.gzip / gunzip / deflate / inflate

|-- child_process => Allows you to execute non-JavaScript operating system tasks (like terminal commands)
    |-- spawn(command, args, options)        → streaming I/O Recommended for large output

    |-- exec(command, callback)              → buffers output Ye bhi command chalata hai Difference Poora output memory mein collect karta hai.
    |-- execFile / fork                       → fork = new Node process  Ye executable directly run karta hai. Without shell. 
    |-- fork() => Ye sirf Node.js process create karta hai.
    |-- .on('exit') .on('error') .stdout .stderr

|-- worker_threads
    |-- const { Worker, isMainThread, parentPort, workerData } = require('node:worker_threads')
    |-- new Worker(__filename, { workerData })
    |-- parentPort.postMessage / on('message')

|-- perf_hooks
    |-- performance.now() / mark / measure
    |-- monitorEventLoopDelay

|-- dns
    |-- dns.promises.resolve / lookup / reverse

|-- net / tls / http / https
    |-- See HTTP section below

|-- util
    |-- util.promisify(fn)
    |-- util.inspect(obj, options)
    |-- util.format / formatWithOptions
    |-- util.deprecate(fn, msg)
    |-- util.callbackify(asyncFn)
````

### 3. HTTP / HTTPS / Fetch (modern Node)

```
|-- http / https
    |-- http.createServer((req, res) => { res.end('Hello') })
    |-- req.method / req.url / req.headers / req.socket
    |-- res.writeHead / res.write / res.end
    |-- res.statusCode / statusMessage

|-- fetch (Node 18+ native, stable in 21+)
    |-- global fetch(url, { method, headers, body, signal })
    |-- AbortController / AbortSignal

|-- undici (underlying fetch engine – can be used directly)
```

### 4. Modules System

```
|-- CommonJS (default until ~2024, still very common)
    |-- module.exports = ...
    |-- const x = require('./file')
    |-- require.cache / require.resolve

|-- ES Modules (recommended 2025–2026)
    |-- "type": "module" in package.json   or   .mjs extension
    |-- export default / export const ...
    |-- import ... from './file.js'
    |-- import.meta.url / import.meta.dirname (Node 20.11+)
    |-- --experimental-specifier-resolution=node (legacy bare imports)

|-- Top-level await               (only in ESM)
    |-- const data = await fetchData()
```

### 5. Async Patterns (Node-style → modern)

```
|-- Callback style                (classic)
|-- Promise style                 → util.promisify, fs.promises
|-- async / await                 → standard since Node 7.6+
|-- EventEmitter + async iterables
|-- streams + async iterators     → for await (const chunk of readable)
```

### 6. CLI & Process.argv / env

```
|-- node app.js --port=3000
    |-- process.argv[2] === '--port=3000'
    |-- process.argv.slice(2)

|-- Environment variables
    |-- process.env.PORT || 3000
    |-- .env files → use dotenv (npm package) or --env-file=node --env-file=.env
```

### 7. New & Experimental / Stabilized Features (2024–2026)

```
|-- Node 20–22 LTS highlights
    |-- Built-in .env file support (--env-file)
    |-- Stable test_runner module
    |-- fetch() + undici stable
    |-- ESM loader hooks (advanced customization)
    |-- Single executable applications (pkg-like, experimental → more stable)

|-- Node 22–23 (2025–2026)
    |-- require() of ESM from CJS (experimental flag → more usable)
    |-- Permission model (--allow-fs-read, --allow-net etc.)
    |-- SEA (Single Executable Applications) improvements
    |-- Web Crypto API almost complete parity
    |-- Built-in SQLite (experimental in 22 → likely stable-ish)
    |-- Enhanced watch mode (--watch + --env-file support)

|-- test module (node:test)
    |-- test('name', async () => { assert.strictEqual(...) })
    |-- describe / it / before / after
```

### 8. Popular Patterns & Best Practices (2026)

```
|-- Express / Fastify / Hono / Elysia / NestJS
|-- REST → tRPC / GraphQL (Apollo / Mercurius)
|-- WebSocket → ws / Socket.IO / uWebSockets.js
|-- ORM → Prisma / Drizzle / TypeORM / Sequelize
|-- Config → zod + env-var validation
|-- Logging → pino (fastest), winston
|-- Error handling → centralized middleware + asyncHandler
|-- Clustering → cluster module or pm2
|-- Docker + multi-stage builds
|-- TypeScript-first (ts-node/esm,tsx,bun,deno compatibility)
```

### Minimal Modern ESM Server (Node 22+ style – 2026)

```js
// server.js   (with "type": "module" in package.json)
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const server = createServer(async (req, res) => {
  if (req.url === "/") {
    const html = await readFile(path.join(__dirname, "index.html"), "utf8");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```
