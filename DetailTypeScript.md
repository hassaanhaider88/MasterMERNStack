# TypeScript — Detailed Line-by-Line Guide


```
TypeScript
|-- Core Language Features & Syntax
|-- Types & Type Annotations
|-- Interfaces vs Types
|-- Generics
|-- Advanced Types & Utilities
|-- Modules & Namespaces
|-- Classes & OOP Features
|-- Decorators
|-- Configuration (tsconfig.json)
|-- Modern / 2025–2026 Features
|-- Integration Patterns (Node.js, React, Express, etc.)
```

---

## 1. Core Language Features & Syntax

### 1.1 Type annotations
You explicitly tell TypeScript what type a variable holds. This is optional when TypeScript can infer it, but useful for function parameters, empty arrays, or documentation.

```ts
let age: number = 30;
const name: string = "Hassaan";

// Annotations matter most when there's no initial value to infer from:
let score: number; // no value yet
score = 95;         // OK
// score = "high";  // Error: string is not assignable to number
```

### 1.2 Inference
When you don't write a type, TypeScript figures it out from the assigned value.

```ts
let count = 42;        // inferred as: number
const isActive = true; // inferred as the literal type: true (not boolean)

// Why "true" and not "boolean"?
// `const` can never be reassigned, so TS narrows to the exact literal.
let isOnline = true;   // inferred as: boolean (because `let` can change)
```

### 1.3 Union types
A variable can hold one of several types, joined with `|`.

```ts
let id: string | number;
id = "abc123"; // OK
id = 123;      // OK
// id = true;  // Error

function printId(id: string | number) {
  if (typeof id === "string") {
    console.log(id.toUpperCase()); // TS knows it's a string here
  } else {
    console.log(id.toFixed(2));    // TS knows it's a number here
  }
}
```

### 1.4 Literal types
Instead of a general type like `string`, you restrict a value to specific, exact strings/numbers.

```ts
let direction: "up" | "down" | "left" | "right";
direction = "up";    // OK
// direction = "north"; // Error: not one of the allowed literals

type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;
```

### 1.5 Type assertion / type guard
Assertions tell the compiler "trust me, I know the real type" — they don't change runtime behavior, only the compiler's view.

```ts
let someAny: any = "hello world";

let value = someAny as string;        // modern "as" syntax
let value2 = <string>someAny;          // older syntax (avoid in .tsx files — conflicts with JSX)

// A type guard, by contrast, checks the type at runtime:
function isString(val: unknown): val is string {
  return typeof val === "string";
}
```

### 1.6 Non-null assertion
The `!` operator tells TypeScript "this value is definitely not `null`/`undefined`", suppressing the compiler's warning.

```ts
const element = document.getElementById("app");
element!.focus(); // "I promise this isn't null"

// Risky if wrong — at runtime it will still throw if element is actually null.
// Prefer a real check when possible:
if (element) {
  element.focus();
}
```

### 1.7 Nullish coalescing & optional chaining
Inherited from modern JavaScript, but especially useful with TypeScript's strict null checks.

```ts
interface UserProfile {
  address?: { city?: string };
}

const user: UserProfile = {};

// Optional chaining (?.) short-circuits to `undefined` if any link is missing
// Nullish coalescing (??) provides a fallback only for null/undefined (not "" or 0)
const city = user?.address?.city ?? "Unknown";
console.log(city); // "Unknown"
```

---

## 2. Types & Type Annotations

### 2.1 Primitive types
The built-in base types TypeScript understands.

```ts
let a: string = "text";
let b: number = 3.14;
let c: boolean = true;
let d: bigint = 100n;
let e: symbol = Symbol("id");
let f: null = null;
let g: undefined = undefined;
let h: object = { key: "value" };
let i: any = "anything goes";       // disables type checking — avoid when possible
let j: unknown = "safer than any";  // must be narrowed before use
let k: never = (() => { throw new Error(); })(); // a value that never occurs
let l: void = undefined;            // typically used as a function return type
```

### 2.2 Array & Tuple
Arrays hold many values of the same type; tuples fix both the length and the type at each position.

```ts
const names: string[] = ["Ali", "Sara"];
const names2: Array<string> = ["Ali", "Sara"]; // equivalent syntax

const tuple: [string, number, boolean] = ["Hassaan", 30, true];
// tuple[0] is always string, tuple[1] always number, tuple[2] always boolean
// tuple.push("extra") is technically allowed but breaks the intended shape — use readonly tuples to prevent that:
const point: readonly [number, number] = [10, 20];
```

### 2.3 Object literal types
Describe the exact shape an object must have.

```ts
type Person = {
  name: string;
  age?: number;        // optional — may be omitted
  readonly id: number;  // cannot be reassigned after creation
};

const p: Person = { name: "Sara", id: 1 };
// p.id = 2; // Error: id is readonly
```

### 2.4 Function types
Describe the parameter types and return type of a function.

```ts
type Comparator = (x: number, y: string) => boolean;

const compare: Comparator = (x, y) => x.toString() === y;

type Callback = (err: Error | null, data?: any) => void;

function fetchData(cb: Callback) {
  cb(null, { success: true });
}
```

### 2.5 Enum
A named set of related constants.

```ts
enum Direction {
  Up,    // 0
  Down,  // 1
  Left,  // 2
  Right, // 3
}
let move: Direction = Direction.Up;

enum Status {
  Success = "SUCCESS",
  Error = "ERROR",
} // string enum — each member has an explicit string value
let s: Status = Status.Success; // "SUCCESS"
```

### 2.6 Type alias
Gives a name to any type — object shape, union, primitive, etc.

```ts
type UserId = string | number;
type Point = { x: number; y: number };

function getUser(id: UserId) {
  /* ... */
}
```

---

## 3. Interfaces vs Types

### 3.1 `interface`
Best for describing object shapes that you expect to extend or that other code might add to later (declaration merging).

```ts
interface User {
  name: string;
  age: number;
}

// Extension:
interface Admin extends User {
  role: string;
}

// Declaration merging — two interfaces with the same name combine automatically:
interface User {
  email: string; // now User has name, age, AND email
}
```

### 3.2 `type`
Cannot be reopened/merged the way interfaces can, but is more flexible for unions, intersections, and primitive aliases.

```ts
type User = {
  name: string;
  age: number;
};
// A second `type User = {...}` here would be a compile ERROR (duplicate identifier)

type ID = string | number;             // unions need `type`
type FullUser = User & { role: string }; // intersections need `type`
```

### 3.3 Key differences (2026 view)
- Use `interface` for object shapes you expect to extend — classes, React component props.
- Use `type` for unions, mapped types, and utility-type compositions.

```ts
// React props example (interface is the common convention)
interface ButtonProps {
  label: string;
  onClick: () => void;
}

// Union / utility example (must be `type`)
type Theme = "light" | "dark" | "system";
```

---

## 4. Generics

### 4.1 Generic functions
`<T>` is a placeholder type filled in when the function is called, keeping type safety without duplicating code per type.
it like telling typescript that the function's parameter and return type at calling time not at initializing time

```ts
function identity<T>(arg: T): T {
  return arg;
}

identity<string>("hello"); // T = string
identity(42);              // T inferred as number
```

### 4.2 Generic interfaces / types
Reusable shapes parameterized by type.

```ts
interface Box<T> {
  value: T;
}
const stringBox: Box<string> = { value: "hi" };

type Pair<K, V> = { key: K; value: V };
const entry: Pair<string, number> = { key: "age", value: 30 };
```

### 4.3 Generic classes
A class whose internal data type is decided when it's instantiated.

```ts
class Stack<T> {
  private data: T[] = [];
  push(item: T) {
    this.data.push(item);
  }
  pop(): T | undefined {
    return this.data.pop();
  }
}

const numberStack = new Stack<number>();
numberStack.push(10);
```

### 4.4 Constraints
Restrict what types `T` is allowed to be, using `extends`.

```ts
function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}

longest("short", "much longer string"); // OK — strings have .length
longest([1, 2], [1, 2, 3]);             // OK — arrays have .length
// longest(1, 2); // Error — number has no .length
```

### 4.5 Default type parameters
Give `T` a fallback type if none is provided.

```ts
type Response<T = unknown> = { data: T; status: number };

const r1: Response = { data: "anything", status: 200 }; // T defaults to unknown
const r2: Response<number> = { data: 42, status: 200 };  // T explicitly number
```

### 4.6 `keyof`, `typeof`
Extract type-level information from existing types or values.

```ts
type User = { name: string; age: number };
type Keys = keyof User; // "name" | "age"

const user = { name: "Sara", age: 25 };
type UserType = typeof user; // { name: string; age: number }
```

---

## 5. Advanced Types & Utilities

### 5.1 Union & Intersection
Union (`|`) = "one of these"; Intersection (`&`) = "all of these combined."

```ts
type User = { name: string };
type Admin = User & { role: string }; // has BOTH name and role

type ID = string | number; // is EITHER string OR number
```

### 5.2 Mapped types
Build a new type by transforming every property of an existing type.

```ts
type MyReadonly<T> = { readonly [K in keyof T]: T[K] };
type MyPartial<T> = { [K in keyof T]?: T[K] };

type User = { name: string; age: number };
type ReadonlyUser = MyReadonly<User>; // { readonly name: string; readonly age: number }
type PartialUser = MyPartial<User>;   // { name?: string; age?: number }
```

### 5.3 Conditional types
`T extends U ? X : Y` — chooses a type based on a condition, evaluated like an if/else for types.

```ts
type MyNonNullable<T> = T extends null | undefined ? never : T;
type A = MyNonNullable<string | null>; // string

type MyExtract<T, U> = T extends U ? T : never;
type B = MyExtract<"a" | "b" | "c", "a" | "b">; // "a" | "b"
```

### 5.4 Template literal types
Build string literal types by combining other strings, similar to JS template literals but at the type level.

```ts
type EventName<T extends string> = `on${Capitalize<T>}`;
type MouseEvent = "click" | "hover";
type MouseHandlers = EventName<MouseEvent>; // "onClick" | "onHover"
```

### 5.5 Utility types (built-in)
TypeScript ships common transformations so you don't have to write mapped/conditional types by hand.

```ts
type User = { id: number; name: string; email: string };

type PartialUser = Partial<User>;        // all props optional
type RequiredUser = Required<User>;      // all props required
type ReadonlyUser = Readonly<User>;      // all props readonly
type NameOnly = Pick<User, "name">;      // { name: string }
type NoEmail = Omit<User, "email">;      // { id: number; name: string }
type NotString = Exclude<string | number, string>; // number
type OnlyString = Extract<string | number, string>; // string
type Cleaned = NonNullable<string | null | undefined>; // string

function greet(name: string, age: number): string { return ""; }
type Params = Parameters<typeof greet>;     // [string, number]
type Ret = ReturnType<typeof greet>;        // string

class MyClass { constructor(public x: number) {} }
type CtorParams = ConstructorParameters<typeof MyClass>; // [number]
type Instance = InstanceType<typeof MyClass>;            // MyClass

type Upper = Uppercase<"abc">;   // "ABC"
type Lower = Lowercase<"ABC">;   // "abc"
type Cap = Capitalize<"abc">;    // "Abc"
type Uncap = Uncapitalize<"Abc">; // "abc"
```

### 5.6 `infer` in conditional types
`infer` captures a type from within another type during a conditional check — most commonly used to pull out a function's return type.

```ts
type MyReturnType<T> = T extends (...args: any) => infer R ? R : never;

function getUser() {
  return { name: "Sara" };
}
type UserReturn = MyReturnType<typeof getUser>; // { name: string }
```

---

## 6. Modules & Namespaces

### 6.1 export / import
Standard ES module syntax — the recommended way to share code between files.

```ts
// types.ts
export interface User {
  name: string;
}
export function greet(name: string): string {
  return `Hello, ${name}`;
}
export default class MyClass {}

// main.ts
import { User } from "./types";
import * as Utils from "./utils";
import type { User as UserType } from "./types"; // type-only import — erased at compile time, no runtime cost
```

### 6.2 Namespaces (legacy — avoid in modern code)
An older way to group code, mostly superseded by ES modules. Still seen in some older codebases or `.d.ts` files.

```ts
namespace Utils {
  export function log(msg: string) {
    console.log(msg);
  }
}
Utils.log("hello");
```

### 6.3 `declare module`
Describes the shape of a module that has no built-in types (e.g. an untyped npm package), so TypeScript stops complaining about it.

```ts
declare module "some-untyped-package" {
  export function doSomething(input: string): number;
}
```

---

## 7. Classes & OOP Features

### 7.1 Access modifiers & fields
`readonly` prevents reassignment after construction; `private` restricts access to inside the class; `protected` allows access in subclasses too.

```ts
class User {
  readonly id: number;
  private _name: string;
  protected role: string = "member";

  constructor(public name: string, id: number) {
    this.id = id;
    this._name = name;
  }

  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value.trim();
  }
}

const u = new User("Sara", 1);
console.log(u.name); // via getter
// u.id = 2;         // Error — readonly
// u._name;          // Error — private
```

### 7.2 Abstract classes
A blueprint class that can't be instantiated directly — subclasses must implement its abstract members.

```ts
abstract class BaseRepository<T> {
  abstract findAll(): T[];
}

class UserRepository extends BaseRepository<User> {
  findAll(): User[] {
    return [];
  }
}
// const r = new BaseRepository(); // Error — cannot instantiate abstract class
```

### 7.3 `implements`
A class commits to fulfilling one or more interface contracts.

```ts
interface IUser { name: string; }
interface IAuth { login(): void; }

class Admin implements IUser, IAuth {
  name = "Sara";
  login() {
    console.log("logged in");
  }
}
```

### 7.4 Parameter properties
A shorthand that declares AND assigns a class field directly from the constructor parameters.

```ts
class Account {
  constructor(public name: string, private age: number) {}
  // equivalent to declaring `name` and `age` as fields
  // and doing `this.name = name; this.age = age;` manually
}
```

---

## 8. Decorators (Stage 3 → standard in TS 5.0+)

### 8.1 Compiler flags
Some setups (especially those targeting older decorator proposals, like NestJS/Angular) still need these flags in `tsconfig.json`.

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

### 8.2 Applying decorators
A decorator is a function that can observe or modify a class, method, property, accessor, or parameter.

```ts
function logged(target: any, key: string, desc: PropertyDescriptor) {
  const original = desc.value;
  desc.value = function (...args: any[]) {
    console.log(`Calling ${key}`);
    return original.apply(this, args);
  };
}

class Service {
  @logged
  fetchData() {
    console.log("fetching...");
  }
}

new Service().fetchData();
// Console: "Calling fetchData" then "fetching..."
```

### 8.3 Modern usage (2025–2026)
Frameworks like tRPC, NestJS, TypeORM, MobX, and Angular lean heavily on decorators for dependency injection, ORM entity mapping, and reactive state.

```ts
// NestJS-style example
@Controller("users")
class UserController {
  @Get()
  findAll() {
    return [];
  }
}
```

---

## 9. Configuration (tsconfig.json) — Common Settings 2026

Each option controls how the compiler checks and emits code:

```json
{
  "compilerOptions": {
    "target": "ES2022",                 // JS version to compile down to
    "module": "NodeNext",               // module system (or "ESNext" for bundlers)
    "moduleResolution": "NodeNext",     // how imports are resolved
    "esModuleInterop": true,            // smooths CommonJS/ESM interop
    "strict": true,                     // enables all strict type-checking flags
    "noImplicitAny": true,              // errors on untyped values defaulting to `any`
    "strictNullChecks": true,           // null/undefined are not part of every type
    "noUnusedLocals": true,             // errors on unused local variables
    "noUnusedParameters": true,         // errors on unused function parameters
    "exactOptionalPropertyTypes": true, // optional props can't be explicitly set to undefined
    "noImplicitOverride": true,         // subclass methods overriding a base must use `override`
    "noFallthroughCasesInSwitch": true, // errors on switch cases that fall through unintentionally
    "skipLibCheck": true,               // skips type-checking of .d.ts files (faster builds)
    "outDir": "./dist",                 // compiled output folder
    "rootDir": "./src",                 // source root folder
    "declaration": true,                // emits .d.ts type declaration files
    "sourceMap": true,                  // emits .map files for debugging
    "lib": ["ES2023", "DOM", "DOM.Iterable"], // built-in type libraries available
    "types": ["node"]                   // global type packages to include
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

---

## 10. Modern / 2025–2026 Features (TS 5.5–5.9)

### 10.1 Isolated Declarations (5.5)
Requires enough explicit type annotations that `.d.ts` files can be generated per-file without full type-checking — dramatically speeds up builds in large monorepos.

```ts
// With --isolatedDeclarations, exported functions need explicit return types:
export function add(a: number, b: number): number {
  return a + b;
}
```

### 10.2 Inferred type predicates (5.5+)
TypeScript can now infer that a function is a type guard, without you writing `x is T` manually, in more cases (e.g. `.filter(Boolean)`).

```ts
const items: (string | null)[] = ["a", null, "b"];
const filtered = items.filter((x) => x !== null); // inferred as string[]
```

### 10.3 `using` declarations (5.5)
Automatically calls a `.dispose()`/`Symbol.dispose` cleanup method when the variable goes out of scope — useful for resource management (files, connections, locks).

```ts
class FileHandle {
  [Symbol.dispose]() {
    console.log("closing file");
  }
}

function readFile() {
  using file = new FileHandle();
  // ...use file...
} // file is automatically disposed here
```

### 10.4 `const` type parameters (5.4)
Forces generic inference to preserve literal types instead of widening them.

```ts
function tuple<const T extends readonly unknown[]>(arr: T): T {
  return arr;
}
const result = tuple(["a", "b"]); // type: readonly ["a", "b"], not string[]
```

### 10.5 Branded types / nominal typing patterns
TypeScript's type system is structural by default; branding fakes nominal (name-based) typing using a hidden marker property.

```ts
type UserId = string & { readonly __brand: "UserId" };

function toUserId(id: string): UserId {
  return id as UserId;
}

function getUser(id: UserId) { /* ... */ }
// getUser("raw-string"); // Error — plain string isn't a UserId
getUser(toUserId("abc123")); // OK
```

### 10.6 `satisfies` operator (5.4)
Validates a value against a type WITHOUT widening or losing the value's more specific inferred type.

```ts
const config = {
  url: "https://api.example.com",
  timeout: 3000,
} satisfies Record<string, string | number>;

// config.url is still known as the literal string type, not just `string`
```

### 10.7 Improved JSX inference & React 19 support
Better type inference for component props, refs, and hooks when used with React 19's updated type definitions.

### 10.8 Better error messages & quick fixes
Recent TS versions provide clearer diagnostics and editor quick-fix suggestions (e.g. "Did you mean...?", auto-import suggestions).

---

## 11. Integration Patterns — Minimal Modern TypeScript + Node.js Example (2026 style)

Line-by-line breakdown of the Express example:

```ts
// src/index.ts
import express, { Request, Response } from 'express';
// Imports the Express library plus its Request/Response types for type-safe handlers

interface User {
  id: number;
  name: string;
  email: string;
}
// Describes the shape of a User record used throughout the app

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};
// A generic envelope type — every API response is wrapped consistently,
// with `data` typed to whatever `T` the specific endpoint returns

const app = express();
app.use(express.json());
// Creates the Express app and enables parsing of JSON request bodies

const users: User[] = [
  { id: 1, name: "Hassaan", email: "hassaan@example.com" }
];
// In-memory array acting as a fake database, strongly typed as User[]

app.get('/api/users', (req: Request, res: Response<ApiResponse<User[]>>) => {
  res.json({ success: true, data: users });
});
// GET handler: response body is type-checked to match ApiResponse<User[]>,
// so `data` must be a User[] and `success` must be present

app.post('/api/users', (req: Request<{}, {}, Omit<User, 'id'>>, res: Response<ApiResponse<User>>) => {
  const newUser: User = { id: users.length + 1, ...req.body };
  users.push(newUser);
  res.status(201).json({ success: true, data: newUser });
});
// POST handler: the request body type is `Omit<User, 'id'>` — meaning
// clients send everything except `id` (the server assigns it),
// and the response must match ApiResponse<User>

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
// Reads the port from an environment variable (falling back to 3000)
// and starts the HTTP server
```