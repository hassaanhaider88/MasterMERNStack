# NestJS Explained for Express.js Developers

> A concept-by-concept walkthrough of NestJS architecture, written for someone who is comfortable with Express but has never touched Nest. Every section maps the Nest concept back to something you already do in Express, then shows real, runnable code.

---

## Table of Contents

1. [The Mental Model Shift: Express vs Nest](#1-the-mental-model-shift-express-vs-nest)
2. [Core Bootstrap](#2-core-bootstrap)
3. [Modules](#3-modules)
4. [Controllers](#4-controllers)
5. [Services & Providers (Dependency Injection)](#5-services--providers-dependency-injection)
6. [The Request Lifecycle](#6-the-request-lifecycle)
7. [Middleware](#7-middleware)
8. [Guards](#8-guards)
9. [Interceptors](#9-interceptors)
10. [Pipes](#10-pipes)
11. [Exception Filters](#11-exception-filters)
12. [DTOs (Data Transfer Objects)](#12-dtos-data-transfer-objects)
13. [Entities](#13-entities)
14. [Full Worked Example: A Users Module End-to-End](#14-full-worked-example-a-users-module-end-to-end)
15. [Cheat Sheet: Express → Nest](#15-cheat-sheet-express--nest)
16. [Official Documentation Links](#16-official-documentation-links)

---

## 1. The Mental Model Shift: Express vs Nest

Express gives you a router and a request/response cycle, and leaves everything else up to you: how you structure folders, how you share a database connection between route handlers, how you validate a body, how you handle errors consistently. That freedom is Express's whole selling point — but it also means every Express codebase looks different, and "architecture" is something each team invents for itself.

NestJS is opinionated on purpose. It's built with TypeScript and heavily inspired by Angular: everything is a class, decorators attach metadata to those classes, and a **Dependency Injection (DI) container** wires the classes together for you at startup. Under the hood, a default Nest app is *still* an Express app — Nest uses `@nestjs/platform-express` by default, so `req` and `res` are the same Express objects you already know. Nest doesn't replace Express; it puts a structured, testable layer of abstraction on top of it (it can also run on Fastify instead, via `@nestjs/platform-fastify`, without changing your application code).

The practical difference you'll feel immediately:

```javascript
// Express: everything lives in one flat request/response world
const express = require('express');
const app = express();
app.use(express.json());

app.get('/users', (req, res) => {
  const users = getUsersFromSomewhere(); // where did this come from? you decide.
  res.json(users);
});

app.listen(3000);
```

```typescript
// Nest: responsibilities are split into distinct, injectable classes
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {} // DI does this wiring for you

  @Get()
  findAll() {
    return this.usersService.findAll(); // no res.json() needed — see Controllers section
  }
}
```

Keep this contrast in mind: almost every Nest concept below is Express's implicit conventions turned into an explicit, framework-enforced building block.

---

## 2. Core Bootstrap

### 2.1 `NestFactory`

**Express equivalent:** `const app = express();`

`NestFactory` is Nest's entry point for creating an application instance. Instead of instantiating a bare server object, you hand it your **root module** (see [Modules](#3-modules)), and Nest reads that module's metadata to assemble the entire dependency graph — every controller, service, and imported feature module — before the server starts accepting requests.

```typescript
// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global setup that would otherwise be repeated in every Express route
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors();
  app.setGlobalPrefix('api/v1');

  await app.listen(3000);
}
bootstrap();
```

That single `NestFactory.create(AppModule)` call is effectively doing the job of every `app.use(require('./routes/users'))`, `app.use(require('./routes/orders'))`, etc. line you'd otherwise write by hand in Express — it walks your module tree and registers everything automatically.

Nest can also bootstrap **microservices** (TCP, Redis, Kafka, gRPC, etc.) instead of an HTTP server, using the same module you already wrote:

```typescript
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

const microservice = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
  transport: Transport.TCP,
  options: { host: '0.0.0.0', port: 8877 },
});
await microservice.listen();
```

There's no direct Express equivalent here — this is one of the places Nest goes beyond being "structured Express" and becomes a general-purpose Node application framework.

### 2.2 Application Listeners

**Express equivalent:** `app.listen(3000, () => console.log('running'))`

Once `NestFactory` has assembled the app, you still need to bind it to a transport. For a normal HTTP app that's `app.listen(port)`, exactly like Express (in fact it delegates to the underlying Express instance). For apps that mix HTTP with microservices ("hybrid applications"), you also get `app.startAllMicroservices()`.

```typescript
await app.listen(3000);
// or, for a hybrid app:
app.connectMicroservice<MicroserviceOptions>({ transport: Transport.REDIS });
await app.startAllMicroservices();
await app.listen(3000);
```

📖 [docs.nestjs.com/first-steps](https://docs.nestjs.com/first-steps)

---

## 3. Modules

### 3.1 Why Modules Exist

**Express equivalent:** manually `require()`-ing and `app.use()`-ing a bunch of `express.Router()` files from a central `app.js`, with no formal boundary around what belongs to what feature.

In a growing Express app, you typically end up with a `routes/` folder, a `services/` (or `controllers/`) folder, and a `models/` folder, connected by relative-path `require()` calls. Nothing stops a "users" route from directly reaching into an "orders" service's internals — there's no enforced boundary, just convention.

A Nest **Module** is a class decorated with `@Module()` that declares, explicitly, what belongs to a feature and what that feature exposes to the rest of the app:

```typescript
// users/users.module.ts
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],   // request handlers this module owns
  providers: [UsersService],        // injectable classes this module owns
  exports: [UsersService],          // what other modules are allowed to use
})
export class UsersModule {}
```

```typescript
// app.module.ts — the root module, comparable to your top-level app.js
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [UsersModule, OrdersModule], // like "mounting" routers, but DI-aware
})
export class AppModule {}
```

Modules are **singletons** by default: Nest creates one instance of `UsersModule` for the whole application, and every other module that imports it shares the same instance (and, by extension, the same `UsersService` instance, unless you change the [injection scope](#5-services--providers-dependency-injection)). If you truly need a module's providers available everywhere without explicitly importing it in every consumer, you can mark it `@Global()` — but Nest's own docs recommend using this sparingly, since it works against the explicit-dependency philosophy that makes modules useful in the first place.

**Best practice:** group files by *feature* (`users/`, `orders/`, `payments/`), not by *technical layer* (`controllers/`, `services/`, `models/`). This is the opposite of how a lot of Express codebases are laid out, and it's the single biggest structural habit to unlearn.

### 3.2 Dynamic Modules

**Express equivalent:** configuring a middleware factory, e.g. `app.use(session({ secret: 'xyz', resave: false }))` — you're calling a function that returns a configured middleware, rather than using it as-is.

A static `@Module({...})` has fixed, hardcoded providers. A **Dynamic Module** is a module that exposes a static method — conventionally named `register()`, `forRoot()`, or `forFeature()` — which returns a module definition built from options you pass in at import time. This is how virtually every Nest integration library (`@nestjs/config`, `@nestjs/typeorm`, `@nestjs/jwt`, `@nestjs/mongoose`) lets you configure itself while still participating fully in Nest's DI system.

```typescript
// app.module.ts
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      entities: [User],
      synchronize: false,
    }),
  ],
})
export class AppModule {}
```

You can write your own dynamic module the same way:

```typescript
// database/database.module.ts
import { DynamicModule, Module } from '@nestjs/common';

@Module({})
export class DatabaseModule {
  static register(options: { uri: string }): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [{ provide: 'DB_CONNECTION', useValue: createConnection(options.uri) }],
      exports: ['DB_CONNECTION'],
    };
  }
}

// usage:
DatabaseModule.register({ uri: process.env.MONGO_URI })
```

**Best practice:** reach for dynamic modules for anything that needs environment-specific configuration — database connections, third-party API clients, feature toggles.

📖 [docs.nestjs.com/modules](https://docs.nestjs.com/modules) · [docs.nestjs.com/fundamentals/dynamic-modules](https://docs.nestjs.com/fundamentals/dynamic-modules)

---

## 4. Controllers

**Express equivalent:** an `express.Router()` file.

```javascript
// Express: routes/users.route.js
const router = require('express').Router();

router.get('/', (req, res) => {
  const users = usersService.findAll();
  res.status(200).json(users);
});

router.get('/:id', (req, res) => {
  const user = usersService.findOne(req.params.id);
  if (!user) return res.status(404).json({ message: 'Not found' });
  res.json(user);
});

module.exports = router;
```

```typescript
// Nest: users/users.controller.ts
import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users') // prefix, equivalent to app.use('/users', router)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Query('role') role?: string) {
    return this.usersService.findAll(role); // returned value → auto-serialized as JSON
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
```

Key differences from Express routing to internalize:

- **No manual `res.json()`.** Whatever the handler method *returns* becomes the response body, serialized to JSON automatically, with a `200` (or `201` for `@Post()`) status by default. This trips up a lot of people coming from Express — if you find yourself writing `res.send(...)`, you're fighting the framework.
- **Decorators replace `req.params`, `req.query`, `req.body`.** `@Param('id')`, `@Query('role')`, and `@Body()` extract exactly what you ask for, and — combined with [Pipes](#10-pipes) — can validate/transform it before your method body even runs.
- **You *can* still drop to raw Express** with `@Res() res: Response` if you need full manual control (streaming a file, setting a very custom header sequence), but doing so opts you out of Nest's automatic response handling — mixing `@Res()` with a `return` value is a common source of confusing bugs, so pick one style per handler.
- **Status codes** are set declaratively: `@HttpCode(204)`, or by throwing one of Nest's built-in exceptions (`NotFoundException`, `BadRequestException`, etc.) which are caught automatically — see [Exception Filters](#11-exception-filters).

**Best practice:** keep controllers thin. A controller's job is routing and shaping the HTTP contract (status codes, params, DTOs) — not business logic, database calls, or third-party API calls. All of that belongs in a **Service**.

📖 [docs.nestjs.com/controllers](https://docs.nestjs.com/controllers)

---

## 5. Services & Providers (Dependency Injection)

This is the concept with the steepest learning curve coming from Express, because Express has no built-in equivalent — most Express apps fake it with `module.exports = new SomeService()` singletons or by passing a shared `db` object around manually.

**Express equivalent (a common pattern):**

```javascript
// services/users.service.js
class UsersService {
  constructor(db) { this.db = db; }
  findAll() { return this.db.query('SELECT * FROM users'); }
}
module.exports = new UsersService(dbConnection); // manual singleton, manually wired

// routes/users.route.js
const usersService = require('../services/users.service'); // tight coupling to the file path
router.get('/', (req, res) => res.json(usersService.findAll()));
```

This works, but it's brittle: swapping `UsersService` for a mock in a test means monkey-patching the module cache, and every consumer is hard-wired to that exact file path.

**Nest equivalent:** a **Provider** is any class Nest can create and inject — most commonly a **Service** holding your business logic. You mark it `@Injectable()`, register it in a module's `providers` array, and then simply *ask for it* in another class's constructor. Nest's DI container figures out how to build it (and everything *it* depends on) and hands you a ready-to-use instance:

```typescript
// users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [{ id: '1', name: 'Ada Lovelace' }];

  findAll(role?: string) {
    return role ? this.users.filter(u => u.role === role) : this.users;
  }

  findOne(id: string) {
    const user = this.users.find(u => u.id === id);
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return user;
  }
}
```

```typescript
// users/users.controller.ts
@Controller('users')
export class UsersController {
  // Nest sees the type `UsersService` in the constructor and injects it automatically.
  // You never write `new UsersService()` yourself.
  constructor(private readonly usersService: UsersService) {}
}
```

This is called **constructor-based dependency injection**. The huge practical win: in a unit test, you can hand `UsersController` a fake `UsersService` (or a Jest mock) with zero file-path gymnastics, because the controller never hardcoded *which* implementation it gets — it just declared *what type* it needs.

### Provider Scopes

By default, a provider is a **singleton** — one instance shared across the entire application's lifetime, just like the manual singleton pattern above, except Nest manages it for you. Two other scopes exist for less common cases:

| Scope | Behaviour | Express analogy |
|---|---|---|
| `Scope.DEFAULT` | One instance, shared everywhere (default) | `module.exports = new Service()` |
| `Scope.REQUEST` | New instance created per incoming request | Attaching a fresh object to `req` in middleware |
| `Scope.TRANSIENT` | New instance every time it's injected anywhere | `new Service()` inline, every call site |

```typescript
@Injectable({ scope: Scope.REQUEST })
export class RequestScopedService { /* ... */ }
```

**Best practice:** keep providers stateless (no per-request mutable fields) so the default singleton scope is safe and fast — request-scoped providers carry a real performance cost because Nest has to rebuild the dependency sub-tree on every request.

📖 [docs.nestjs.com/providers](https://docs.nestjs.com/providers) · [docs.nestjs.com/fundamentals/injection-scopes](https://docs.nestjs.com/fundamentals/injection-scopes) · [docs.nestjs.com/fundamentals/custom-providers](https://docs.nestjs.com/fundamentals/custom-providers)

---

## 6. The Request Lifecycle

Before diving into Middleware, Guards, Interceptors, Pipes, and Exception Filters individually, it helps enormously to see where each one sits. In Express, you're used to one linear chain: `middleware → middleware → route handler → error-handling middleware`. Nest inserts several more checkpoints into that chain, each with a narrow, specific job:

```
Incoming HTTP Request
        │
        ▼
┌───────────────────┐
│    Middleware      │   raw req/res access, same as Express middleware
└───────────────────┘
        │
        ▼
┌───────────────────┐
│      Guards         │   "can this request proceed at all?" (auth/roles)
└───────────────────┘
        │
        ▼
┌───────────────────┐
│  Interceptors (in)  │   logic that runs before the handler
└───────────────────┘
        │
        ▼
┌───────────────────┐
│       Pipes         │   validate & transform incoming @Body/@Param/@Query
└───────────────────┘
        │
        ▼
┌───────────────────┐
│  Controller Handler │   your route method → delegates to a Service
└───────────────────┘
        │
        ▼
┌───────────────────┐
│ Interceptors (out)  │   logic that runs after the handler, can reshape response
└───────────────────┘
        │
        ▼
   Response sent to client

   (An exception thrown at ANY of the above stages skips straight to:)
┌───────────────────┐
│  Exception Filters  │   formats the final error response
└───────────────────┘
```

Everything below the middleware layer — Guards, Interceptors, Pipes — has access to a rich **`ExecutionContext`** object, which knows exactly which controller and handler is about to run (including custom metadata you attach with your own decorators). Plain Express middleware, by contrast, is "dumb": it only ever sees `req`/`res`/`next` and has no idea which route handler comes next. That single distinction is *why* Nest has more than one "middleware-like" concept instead of just one.

---

## 7. Middleware

**Express equivalent:** exactly the same concept — a function with `(req, res, next)`.

Nest's middleware is functionally identical to Express middleware (Nest even reuses Express's own middleware signature when running on the Express adapter), with two additions: you can write it as an **injectable class** so it can use dependency injection, and you bind it explicitly per-module instead of globally by default.

```javascript
// Express
function requestLogger(req, res, next) {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
}
app.use(requestLogger);
```

```typescript
// Nest — class-based, can inject other providers (e.g. a LoggerService)
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`${req.method} ${req.originalUrl}`);
    next(); // exactly like Express — forget this and the request hangs
  }
}
```

```typescript
// users.module.ts — wiring it up, scoped to specific routes
import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';

@Module({ controllers: [UsersController], providers: [UsersService] })
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'users*', method: RequestMethod.ALL }); // or just 'users'
  }
}
```

You can also skip the class entirely and write a plain function middleware, identical to Express — Nest supports both styles. Global middleware (applied to every route, no DI) is registered the Express way, directly on the app instance: `app.use(helmet())`.

**Best practice:** use middleware for concerns that genuinely don't need to know *which* controller/handler is about to run — request logging, raw cookie/body parsing, integrating an existing Express library like `helmet` or `compression`. The moment your logic needs to know "which route is this?" or "what roles does this endpoint require?", reach for a **Guard** or **Interceptor** instead — they get that information for free via `ExecutionContext`.

📖 [docs.nestjs.com/middleware](https://docs.nestjs.com/middleware)

---

## 8. Guards

**Express equivalent:** none, exactly — usually faked with an `isAuthenticated` middleware function placed in front of specific routes: `router.get('/admin', requireAuth, requireAdminRole, handler)`.

A **Guard** is a class implementing `CanActivate` whose single job is to answer one yes/no question: *should this request be allowed to reach the route handler?* Unlike middleware, a guard has access to `ExecutionContext`, so it can inspect metadata about the exact handler being called — which is what makes patterns like role-based access control clean to implement.

```typescript
// auth/auth.guard.ts
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    if (!token || !isValidToken(token)) {
      throw new UnauthorizedException('Invalid or missing token');
    }
    request.user = decodeToken(token); // attach user, just like Express middleware would
    return true;
  }
}
```

```typescript
// users.controller.ts
@Controller('users')
@UseGuards(AuthGuard) // every route in this controller now requires auth
export class UsersController { /* ... */ }
```

A very common real-world pattern combines a Guard with a **custom decorator** and Nest's `Reflector` to build role-based access control:

```typescript
// roles.decorator.ts
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

// roles.guard.ts
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) return true; // no @Roles() on this route → allow
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some(role => user.roles?.includes(role));
  }
}

// users.controller.ts
@Delete(':id')
@UseGuards(AuthGuard, RolesGuard)
@Roles('admin')
remove(@Param('id') id: string) {
  return this.usersService.remove(id);
}
```

Guards can be applied at the method level (`@UseGuards()` on one handler), controller level (on the whole class), or globally (`app.useGlobalGuards(new AuthGuard())` in `main.ts`).

**Best practice:** use guards strictly for authentication/authorization decisions. If you're transforming the request or response, that's an [Interceptor's](#9-interceptors) job, not a Guard's.

📖 [docs.nestjs.com/guards](https://docs.nestjs.com/guards)

---

## 9. Interceptors

**Express equivalent:** the closest analogue is a middleware that wraps `res.json` to reshape the outgoing payload, or a `try/finally` block around `next()` to measure timing — both are hacky in vanilla Express because middleware only naturally runs *before* the handler.

An **Interceptor** implements `NestInterceptor` and can run logic **both before and after** the route handler executes, because it wraps the handler call in an RxJS `Observable` stream. This makes it the right tool for cross-cutting concerns that care about the *response*, not just the request.

```typescript
// logging.interceptor.ts — timing, run before AND after
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();
    const req = context.switchToHttp().getRequest();
    console.log(`→ ${req.method} ${req.url}`); // before the handler runs

    return next.handle().pipe(
      tap(() => console.log(`← ${req.method} ${req.url} +${Date.now() - start}ms`)), // after
    );
  }
}
```

```typescript
// transform.interceptor.ts — reshaping every response into a standard envelope
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => ({ success: true, data })), // { id: 1, name: 'Ada' } → { success: true, data: {...} }
    );
  }
}
```

```typescript
// main.ts — apply globally, so every controller in the app gets it for free
app.useGlobalInterceptors(new TransformInterceptor(), new LoggingInterceptor());
```

Interceptors are also how Nest implements built-in caching (`CacheInterceptor`) and request timeout handling (`TimeoutInterceptor`) — both require "do something, call the handler, then do something else with whatever comes back," which is exactly the shape an interceptor is built for.

**Best practice:** use interceptors for response shaping, logging/timing, caching, and serialization concerns that apply broadly. Keep the actual business logic in the Service, not the interceptor.

📖 [docs.nestjs.com/interceptors](https://docs.nestjs.com/interceptors)

---

## 10. Pipes

**Express equivalent:** the validation block you write by hand (or with `express-validator`/Joi) at the top of every route handler:

```javascript
// Express — validation logic mixed directly into the handler
router.post('/users', (req, res) => {
  const { error } = createUserSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  // ...now actually do the work
});
```

A **Pipe** implements `PipeTransform` and runs immediately before your controller method's parameters are handed to it, for exactly one job: **validate and/or transform input**. Nest ships two pipes you'll use constantly — `ValidationPipe` (works with a DTO class, see next section) and `ParseIntPipe`/`ParseUUIDPipe` for coercing route params:

```typescript
// Coercing and validating a single param — no manual `parseInt` + isNaN check needed
@Get(':id')
findOne(@Param('id', ParseIntPipe) id: number) {
  return this.usersService.findOne(id); // `id` is already guaranteed to be a number here
}
```

The real power shows up when `ValidationPipe` is combined with a DTO class decorated with `class-validator` rules (see [DTOs](#12-dtos-data-transfer-objects) below) and registered globally, so **every** endpoint in the app gets consistent validation with zero repeated boilerplate:

```typescript
// main.ts
app.useGlobalPipes(new ValidationPipe({
  whitelist: true,        // strips properties not declared in the DTO
  forbidNonWhitelisted: true, // reject requests containing unknown fields
  transform: true,        // auto-transforms payloads into DTO class instances
}));
```

With that in place, if a `POST /users` request body fails validation, Nest automatically throws a `400 Bad Request` with a descriptive message — your controller method body never even executes, and you never wrote an `if` statement for it.

You can also write fully custom pipes for domain-specific transformation logic (e.g., resolving a slug to a database entity before the handler runs).

**Best practice:** validate once, at the boundary, using a DTO + `ValidationPipe`, applied globally. Don't re-validate the same fields again deeper in the service layer.

📖 [docs.nestjs.com/pipes](https://docs.nestjs.com/pipes) · [docs.nestjs.com/techniques/validation](https://docs.nestjs.com/techniques/validation)

---

## 11. Exception Filters

**Express equivalent:** the four-argument error-handling middleware at the bottom of your middleware stack:

```javascript
// Express — must be defined AFTER all routes, and must have 4 args
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Internal server error' });
});
```

Nest already has this concept built in — any exception thrown anywhere in the request pipeline (a Guard, a Pipe, a Controller, a Service) that isn't caught manually bubbles up to Nest's **built-in global exception filter**, which already knows how to turn Nest's own `HttpException` subclasses (`NotFoundException`, `BadRequestException`, `ForbiddenException`, etc. — the same ones used throughout this guide) into sensible JSON error responses out of the box. In practice, this means a lot of Express error-handling boilerplate simply isn't needed at all:

```typescript
// This alone produces a proper 404 JSON response, no custom filter required
throw new NotFoundException(`User ${id} not found`);
// → { "statusCode": 404, "message": "User 1 not found", "error": "Not Found" }
```

You write a **custom Exception Filter** when you want to standardize that response shape further (e.g., adding a timestamp and request path to every error, or catching a specific error type like a database exception and remapping it):

```typescript
// http-exception.filter.ts
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.getResponse(),
    });
  }
}
```

```typescript
// main.ts — apply globally so every controller shares one error format
app.useGlobalFilters(new HttpExceptionFilter());
```

Filters can also be scoped to a single controller or handler with `@UseFilters(HttpExceptionFilter)`, mirroring how guards and interceptors can be scoped.

**Best practice:** write one global exception filter per app to standardize your error JSON shape, then let Nest's built-in `HttpException` subclasses do the heavy lifting inside your services/controllers rather than hand-rolling `try/catch` everywhere.

📖 [docs.nestjs.com/exception-filters](https://docs.nestjs.com/exception-filters)

---

## 12. DTOs (Data Transfer Objects)

**Express equivalent:** an ad-hoc validation schema, often defined with Joi/Yup/Zod, that lives separately from any type definition of the request body.

A DTO is simply a class that defines the *shape* of data crossing a network boundary — the request body for a `POST`, for instance. The important, easy-to-miss detail for anyone coming from TypeScript-with-Express: **it has to be a class, not an `interface`**. TypeScript interfaces are a compile-time-only construct — they're erased completely once your code is transpiled to JavaScript, so there's nothing left at runtime for `ValidationPipe` to inspect. A class, by contrast, still exists as a real, instantiable JavaScript construct after compilation, which is what lets `class-validator` attach and later read decorator metadata on it at runtime.

```typescript
// dto/create-user.dto.ts
import { IsString, IsEmail, IsInt, Min, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // optional, for auto-generated API docs

export class CreateUserDto {
  @ApiProperty({ example: 'Ada Lovelace' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'ada@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 28, required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  age?: number;
}
```

```typescript
// dto/update-user.dto.ts — reuse the create DTO, but make every field optional
import { PartialType } from '@nestjs/swagger'; // or @nestjs/mapped-types
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
```

```typescript
// controller usage — the DTO is both the compile-time TYPE and the runtime VALIDATOR
@Post()
create(@Body() createUserDto: CreateUserDto) {
  return this.usersService.create(createUserDto);
}
```

If `email` isn't a valid email address, `ValidationPipe` rejects the request with a `400` before `create()` ever runs — the same job `express-validator` does in Express, except the schema and the TypeScript type are the same file, so they can never drift out of sync.

**Best practice:** one DTO per operation (`CreateUserDto`, `UpdateUserDto`, `QueryUsersDto`), not one giant `User` type reused everywhere — an update payload legitimately needs different validation rules (mostly-optional fields) than a create payload.

📖 [docs.nestjs.com/techniques/validation](https://docs.nestjs.com/techniques/validation)

---

## 13. Entities

**Express equivalent:** a Mongoose schema (`new mongoose.Schema({...})`) or a raw SQL table you interact with via `pg`/`mysql2`/Sequelize/Knex.

An **Entity** maps an application-level class to a persistence-level structure — a SQL table row (TypeORM, Prisma) or a MongoDB document (Mongoose). Where it differs conceptually from a DTO: a DTO describes data going *over the wire*; an Entity describes data *at rest* in your database. They often share some field names, but they should be defined and evolved independently — your database schema and your public API contract are allowed to diverge.

```typescript
// TypeORM (SQL) — user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: false })
  isAdmin: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
```

```typescript
// Mongoose (MongoDB) — user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: false })
  isAdmin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
```

```typescript
// users.module.ts — registering the entity/schema with the module (TypeORM version)
@Module({
  imports: [TypeOrmModule.forFeature([User])], // makes the User repository injectable
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
```

```typescript
// users.service.ts — using the injected repository (this replaces your Mongoose/Sequelize model calls)
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  findAll() {
    return this.usersRepository.find();
  }

  create(dto: CreateUserDto) {
    const user = this.usersRepository.create(dto);
    return this.usersRepository.save(user);
  }
}
```

**Best practice:** never return an Entity directly from a controller as your API response, and never accept an Entity as your `@Body()` type. Keep DTOs and Entities decoupled — map between them in the service layer — so a database column rename doesn't silently change your public API, and so you never accidentally leak an internal field (like a password hash) to a client.

📖 [docs.nestjs.com/techniques/database](https://docs.nestjs.com/techniques/database) (TypeORM) · [docs.nestjs.com/techniques/mongodb](https://docs.nestjs.com/techniques/mongodb) (Mongoose) · [docs.nestjs.com/recipes/prisma](https://docs.nestjs.com/recipes/prisma) (Prisma)

---

## 14. Full Worked Example: A Users Module End-to-End

Here's how every concept above fits together in one real feature — compare the file tree to what you'd have in an equivalent Express app.

```
src/
├── main.ts                       # NestFactory.create() + global pipes/filters/interceptors
├── app.module.ts                 # root module, imports UsersModule
└── users/
    ├── users.module.ts           # wires controller + service + entity + middleware together
    ├── users.controller.ts       # HTTP routes
    ├── users.service.ts          # business logic + DB access
    ├── entities/
    │   └── user.entity.ts        # TypeORM table definition
    ├── dto/
    │   ├── create-user.dto.ts    # POST body validation
    │   └── update-user.dto.ts    # PATCH body validation
    ├── guards/
    │   └── auth.guard.ts         # protects routes
    └── middleware/
        └── logger.middleware.ts  # logs every request to /users
```

```typescript
// users/users.module.ts — the piece that ties it all together
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // so e.g. an OrdersModule could inject UsersService too
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(UsersController);
  }
}
```

```typescript
// users/users.controller.ts — every layer visible in one file
import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from './guards/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id); // throws NotFoundException → auto 404
  }

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto); // dto already validated by global ValidationPipe
  }

  @Patch(':id')
  @UseGuards(AuthGuard) // only logged-in users can update
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
```

Walking a single `PATCH /users/123` request through this file, top to bottom:

1. **Middleware** (`LoggerMiddleware`) logs the raw request.
2. **Guard** (`AuthGuard`) checks the `Authorization` header; rejects with `401` if invalid.
3. **Pipe** (global `ValidationPipe`) validates `req.body` against `UpdateUserDto`.
4. **Controller** delegates to `usersService.update(id, dto)`.
5. **Service** talks to the `User` entity/repository, throws `NotFoundException` if no match.
6. Any **global Interceptor** reshapes the successful response; any **Exception Filter** formats a thrown error.

That's the entire request lifecycle from Section 6, made concrete.

---

## 15. Cheat Sheet: Express → Nest

| Concept | Express Equivalent | Nest Purpose | Runs When |
|---|---|---|---|
| `NestFactory` | `express()` | Bootstraps the app from a root module | App startup |
| Module | folder of `require()`'d route files | Groups controllers/providers, defines DI boundaries | App startup |
| Controller | `express.Router()` | Maps HTTP routes to methods | Per request, after Pipes |
| Service/Provider | manual singleton module export | Business logic, injected via constructor | Called by controller |
| Middleware | `(req, res, next) => {}` | Raw request/response preprocessing | First, before Guards |
| Guard | ad-hoc "requireAuth" middleware | Authorization yes/no decision | After Middleware, before Interceptors |
| Interceptor | `res.json` wrapper hacks | Before/after handler logic, response shaping | Wraps the handler call |
| Pipe | `express-validator`/Joi block in handler | Validates/transforms `@Body`/`@Param`/`@Query` | Just before the handler runs |
| Exception Filter | 4-arg error middleware | Formats thrown errors into responses | Whenever an exception is thrown |
| DTO | Joi/Yup schema | Typed, validated shape of request payloads | Read by Pipes |
| Entity | Mongoose schema / SQL table | Maps a class to persisted data | Used inside Services |

---

## 16. Official Documentation Links

- Getting started / `NestFactory`: <https://docs.nestjs.com/first-steps>
- Controllers: <https://docs.nestjs.com/controllers>
- Providers: <https://docs.nestjs.com/providers>
- Modules: <https://docs.nestjs.com/modules>
- Dynamic Modules: <https://docs.nestjs.com/fundamentals/dynamic-modules>
- Injection Scopes: <https://docs.nestjs.com/fundamentals/injection-scopes>
- Custom Providers: <https://docs.nestjs.com/fundamentals/custom-providers>
- Middleware: <https://docs.nestjs.com/middleware>
- Guards: <https://docs.nestjs.com/guards>
- Interceptors: <https://docs.nestjs.com/interceptors>
- Pipes: <https://docs.nestjs.com/pipes>
- Validation (DTOs + `class-validator`): <https://docs.nestjs.com/techniques/validation>
- Exception Filters: <https://docs.nestjs.com/exception-filters>
- Database / TypeORM (Entities): <https://docs.nestjs.com/techniques/database>
- MongoDB / Mongoose: <https://docs.nestjs.com/techniques/mongodb>
- Prisma recipe: <https://docs.nestjs.com/recipes/prisma>
- OpenAPI / Swagger (`@ApiProperty`): <https://docs.nestjs.com/openapi/introduction>
- Microservices basics: <https://docs.nestjs.com/microservices/basics>