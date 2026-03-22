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
    |-- process.chdir(dir)
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

```
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
    |-- path.join(...parts)
    |-- path.resolve(...paths)
    |-- path.basename / dirname / extname
    |-- path.parse / format
    |-- path.sep / delimiter

|-- url
    |-- new URL(input, base)
    |-- url.parse(str, true)         → legacy
    |-- url.format(obj)

|-- os
    |-- os.cpus()                    → array of CPU info
    |-- os.freemem() / totalmem()
    |-- os.homedir() / tmpdir()
    |-- os.hostname() / userInfo()
    |-- os.networkInterfaces()
    |-- os.platform() / arch() / release() / type() / uptime()

|-- events
    |-- const EventEmitter = require('node:events')
    |-- class MyEmitter extends EventEmitter {}
    |-- emitter.on('event', listener)
    |-- emitter.once()
    |-- emitter.emit('event', ...args)
    |-- emitter.off() / removeListener / removeAllListeners
    |-- emitter.setMaxListeners(n)

|-- stream
    |-- Readable / Writable / Duplex / Transform
    |-- pipeline(source, ...transforms, destination, callback)   → modern & recommended
    |-- finished(stream, callback)
    |-- stream.promises.pipeline

|-- buffer
    |-- Buffer.from(str, encoding) / Buffer.alloc(size)
    |-- buf.toString() / slice() / copy() / equals()
    |-- Buffer.concat(list)
    |-- global Buffer (still exists but prefer import { Buffer } from 'node:buffer')

|-- crypto
    |-- crypto.createHash('sha256').update(data).digest('hex')
    |-- crypto.randomBytes(size)
    |-- crypto.createCipheriv / createDecipheriv
    |-- crypto.generateKeyPair / sign / verify

|-- zlib
    |-- zlib.gzip / gunzip / deflate / inflate

|-- child_process
    |-- spawn(command, args, options)        → streaming I/O
    |-- exec(command, callback)              → buffers output
    |-- execFile / fork                      → fork = new Node process
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
```

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
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const server = createServer(async (req, res) => {
  if (req.url === '/') {
    const html = await readFile(path.join(__dirname, 'index.html'), 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```
