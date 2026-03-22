# ExpressJs

### From Basic to Advanced

Express.js  
|-- Core Concepts & Application Object  
|-- Routing  
|-- Middleware  
|-- Request & Response Objects  
|-- Built-in & Third-party Middleware  
|-- Error Handling  
|-- Template Engines  
|-- Project Structure Patterns  
|-- Modern Practices (2025–2026)

### 1. Core Concepts & Application Object

```
|-- const express = require('express')
    |-- or import express from 'express'   (ESM)

|-- const app = express()
    |-- The central Express application instance

|-- app.listen(port, hostname?, backlog?, callback?)
    |-- Starts HTTP server
    |-- Returns Node.js http.Server instance

|-- app.set(name, value) / app.get(name)
    |-- Settings examples:
        'view engine'    → 'pug' | 'ejs' | 'hbs' etc.
        'views'          → path to views directory
        'trust proxy'    → true | 'loopback' | number | array of IPs
        'json replacer' / 'json spaces'

|-- app.enable(name) / app.disable(name)
    |-- Shortcuts for boolean settings (e.g. 'case sensitive routing')

|-- app.locals / res.locals
    → app.locals.title = 'My App'
    → Available in templates & middleware
```

### 2. Routing

```
|-- app.METHOD(path, ...handlers)
    |-- METHODS: get post put patch delete options head
    |-- Examples:
        app.get('/', (req, res) => res.send('Hello'))
        app.post('/users', createUser)

|-- app.all(path, ...handlers)
    |-- Matches all HTTP methods

|-- app.use(path?, ...handlers)
    |-- Mounts middleware (with or without path)

|-- Router
    |-- const router = express.Router({ caseSensitive: true, strict: true })
    |-- router.get('/profile', ...)
    |-- app.use('/api', router)
    |-- router.route('/users/:id')
        .get(getUser)
        .put(updateUser)
        .delete(deleteUser)

|-- Route parameters
    |-- /users/:id
    |-- /files/*path   (wildcard)
    |-- /blog/:year(\\d{4})/:month(\\d{2})

|-- Route chaining
    |-- app.route('/book')
        .get(...)
        .post(...)

|-- Express 5 preview changes (if using @expressjs/next or beta)
    |-- Better Promise support in handlers
    |-- async error handling without next(err)
```

### 3. Middleware

```
|-- Signature: function middleware(req, res, next) { ... }

|-- Types
    |-- Application-level    → app.use(...)
    |-- Router-level         → router.use(...)
    |-- Error-handling       → function(err, req, res, next)
    |-- Built-in             → express.json(), express.urlencoded(), express.static()
    |-- Third-party          → cors, helmet, morgan, compression, etc.

|-- Order matters!
    → Static files → logging → auth → routes → error handler

|-- Common built-in middleware (Express 4.16+)
    |-- express.json({ limit: '1mb', type: 'application/json' })
    |-- express.urlencoded({ extended: true })
    |-- express.raw()
    |-- express.text()
    |-- express.static(root, { index: false, maxAge: '1d', etag: true })

|-- next('route')          → skip to next route handler (rare)
|-- next()                 → continue to next middleware
|-- next(err)              → jump to error-handling middleware
```

### 4. Request (req) Object – Key Properties & Methods

```
|-- req.method / req.url / req.originalUrl
|-- req.path / req.baseUrl
|-- req.params         → { id: '123' } from /users/:id
|-- req.query           → { page: '2', sort: 'asc' }
|-- req.body            → after json/urlencoded middleware
|-- req.headers
|-- req.cookies         → with cookie-parser
|-- req.ip / req.ips    → with trust proxy
|-- req.protocol / req.secure / req.hostname
|-- req.get(field) / req.header(field)
|-- req.accepts(...) / req.acceptsLanguages(...) / req.acceptsCharsets(...)
|-- req.is(type)       → checks Content-Type
|-- req.xhr            → checks X-Requested-With header
```

### 5. Response (res) Object – Key Properties & Methods

```
|-- res.status(code).send(body?)
|-- res.sendStatus(code)           → 200 OK, 404 Not Found, etc.
|-- res.json(obj) / res.jsonp(obj)
|-- res.send(string | Buffer | object | array)
|-- res.render(view, locals?, callback?)
|-- res.redirect([status,] path/url)
|-- res.type(type) / res.contentType(type)
|-- res.set(field, value) / res.header(...)
|-- res.cookie(name, value, options?)
    |-- options: maxAge, expires, httpOnly, secure, sameSite, domain, path
|-- res.clearCookie(name, options?)
|-- res.download(path, filename?, options?, fn?)
|-- res.attachment(filename?)
|-- res.links(linksObj)            → Link header for pagination
|-- res.locals                 → per-request locals
```

### 6. Built-in & Popular Third-party Middleware (2026 ecosystem)

```
|-- Built-in
    express.static
    express.json
    express.urlencoded
    express.Router

|-- Very common third-party
    cors                  → Cross-Origin Resource Sharing
    helmet                → Security headers (CSP, HSTS, etc.)
    morgan                → Logging ('dev', 'combined', 'common')
    compression           → gzip/deflate
    cookie-parser
    express-rate-limit
    express-session / connect-redis / session-file-store
    passport              → Authentication
    multer                → File uploads
    csurf / express-csrf  → CSRF protection (less common now with SameSite cookies)
    winston / pino        → Advanced logging
    zod / joi / celebrate → Validation

|-- Modern alternatives / rising in 2025–2026
    hono / elysia / fastify → faster runtimes (some use Express-like API)
    drizzle-orm / prisma   → with Express
    tRPC / ts-rest         → type-safe APIs
```

### 7. Error Handling

```
|-- Synchronous errors → next(err)
|-- Async errors       → try/catch + next(err)   or   express-async-errors / express-promise-router
|-- Error middleware (must have 4 params)
    app.use((err, req, res, next) => {
      console.error(err.stack)
      res.status(500).json({ error: 'Internal Server Error' })
    })

|-- Centralized error format
    → { status, message, code?, details?, stack? (dev only) }

|-- Express 5 preview → native async error handling (no need for next(err) in async)
```

### 8. Template Engines (still used in SSR / MPA)

```
|-- app.set('view engine', 'pug')   or ejs, hbs, nunjucks, etc.
|-- res.render('index', { title: 'Home', user })
```

### 9. Modern Project Structure Patterns (2026)

```
|-- /src
    /controllers
    /services
    /models (or /db)
    /routes
    /middlewares
    /utils
    /config
    app.js / server.js
    index.js (entry)

|-- Feature-based structure
    /features
      /auth
        auth.controller.js
        auth.routes.js
        auth.service.js

|-- With TypeScript
    ├── src
    │   ├── app.ts
    │   ├── routes/
    │   ├── controllers/
    │   ├── dtos/
    │   ├── middlewares/
    │   └── index.ts

|-- With ESM + TypeScript (recommended 2026)
    "type": "module"
    import express from 'express'
```

### Minimal Modern Express App (ESM + 2026 style)

```js
// app.js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ limit: '1mb' }));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Express 2026' });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    error: status === 500 ? 'Internal Server Error' : err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```
