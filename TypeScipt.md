# TypeScript

### From Basic to Advanced

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

### 1. Core Language Features & Syntax

```
|-- Type annotations
    let age: number = 30
    const name: string = "Hassaan"

|-- Inference
    let count = 42          → inferred as number
    const isActive = true   → inferred as true (literal type)

|-- Union types
    let id: string | number

|-- Literal types
    let direction: "up" | "down" | "left" | "right"

|-- Type assertion / type guard
    let value = someAny as string
    let value = <string>someAny           (older syntax)

|-- Non-null assertion
    element!.focus()

|-- Nullish coalescing & optional chaining (inherited from JS)
    user?.address?.city ?? "Unknown"
```

### 2. Types & Type Annotations

```
|-- Primitive types
    string, number, boolean, bigint, symbol, null, undefined, object, any, unknown, never, void

|-- Array & Tuple
    string[] | Array<string>
    [string, number, boolean]           → tuple

|-- Object literal types
    { name: string; age?: number; readonly id: number }

|-- Function types
    (x: number, y: string) => boolean
    type Callback = (err: Error | null, data?: any) => void

|-- Enum
    enum Direction { Up, Down, Left, Right }
    enum Status { Success = "SUCCESS", Error = "ERROR" }   → string enum

|-- Type alias
    type UserId = string | number
    type Point = { x: number; y: number }
```

### 3. Interfaces vs Types

```
|-- interface User { name: string; age: number }
    → Can be extended / merged (declaration merging)
    interface Admin extends User { role: string }

|-- type User = { name: string; age: number }
    → Cannot be reopened / merged (except in very specific cases)
    → Better for unions, intersections, primitives

|-- Key differences 2026 view:
    Use interface for objects you expect to extend (classes, React props)
    Use type for unions, mapped types, utility compositions
```

### 4. Generics

```
|-- Generic functions
    function identity<T>(arg: T): T { return arg }

|-- Generic interfaces / types
    interface Box<T> { value: T }
    type Pair<K, V> = { key: K; value: V }

|-- Generic classes
    class Stack<T> {
      private data: T[] = []
      push(item: T) { this.data.push(item) }
    }

|-- Constraints
    function longest<T extends { length: number }>(a: T, b: T): T

|-- Default type parameters
    type Response<T = unknown> = { data: T; status: number }

|-- keyof, typeof
    type Keys = keyof User
    type UserType = typeof user
```

### 5. Advanced Types & Utilities

```
|-- Union & Intersection
    type Admin = User & { role: string }
    type ID = string | number

|-- Mapped types
    type Readonly<T> = { readonly [K in keyof T]: T[K] }
    type Partial<T> = { [K in keyof T]?: T[K] }

|-- Conditional types
    type NonNullable<T> = T extends null | undefined ? never : T
    type Extract<T, U> = T extends U ? T : never

|-- Template literal types
    type EventName<T extends string> = `on${Capitalize<T>}`
    type MouseEvent = "click" | "hover"
    type MouseHandlers = EventName<MouseEvent>   → "onClick" | "onHover"

|-- Utility types (built-in)
    Partial<T>, Required<T>, Readonly<T>, Pick<T,K>, Omit<T,K>, Exclude<T,U>, Extract<T,U>, NonNullable<T>, Parameters<T>, ConstructorParameters<T>, ReturnType<T>, InstanceType<T>, ThisParameterType<T>, OmitThisParameter<T>, Uppercase<T>, Lowercase<T>, Capitalize<T>, Uncapitalize<T>

|-- Infer in conditional types
    type Return<T> = T extends (...args: any) => infer R ? R : never
```

### 6. Modules & Namespaces

```
|-- export / import
    export interface User { ... }
    export function greet(name: string): string
    export default class MyClass {}

    import { User } from './types'
    import * as Utils from './utils'
    import type { User } from './types'   → type-only import (no runtime)

|-- Namespaces (legacy – avoid in modern code)
    namespace Utils { export function log(...) {} }

|-- declare module "module-name" { ... }   → ambient declarations
```

### 7. Classes & OOP Features

```
|-- class User {
    readonly id: number
    private _name: string
    protected role: string

    constructor(public name: string, id: number) {
      this.id = id
    }

    get name() { return this._name }
    set name(value: string) { this._name = value.trim() }
  }

|-- abstract class BaseRepository<T> { abstract findAll(): T[] }

|-- implements
    class Admin implements IUser, IAuth { ... }

|-- Parameter properties
    constructor(public name: string, private age: number) {}
```

### 8. Decorators (Stage 3 → standard in TS 5.0+)

```
|-- ExperimentalDecorators + emitDecoratorMetadata (still needed in some setups)

|-- Class, method, property, accessor, parameter decorators
    function logged(target: any, key: string, desc: PropertyDescriptor) { ... }

    class Service {
      @logged
      fetchData() { ... }
    }

|-- Modern usage (2025–2026): tRPC, NestJS, TypeORM, MobX, Angular heavily use them
```

### 9. Configuration (tsconfig.json) – Common Settings 2026

```
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",                // or ESNext
    "moduleResolution": "NodeNext",
    "esModuleInterop": true,
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitOverride": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "sourceMap": true,
    "lib": ["ES2023", "DOM", "DOM.Iterable"],
    "types": ["node"]
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### 10. Modern / 2025–2026 Features (TS 5.5–5.9)

```
|-- Isolated Declarations (5.5) → faster builds with --isolatedDeclarations
|-- Infer type predicates (5.5+)
|-- Using declarations (5.5) → using resource = new Disposable()
|-- const type parameters (5.4)
|-- Branded types / nominal typing patterns (community + template literals)
|-- satisfies operator (5.4)
    const config = { url: "..." } satisfies Record<string, string>
|-- Improved JSX inference & React 19 support
|-- Better error messages & quick fixes
```

### Minimal Modern TypeScript + Node.js Example (2026 style)

```ts
// src/index.ts
import express, { Request, Response } from 'express';

interface User {
  id: number;
  name: string;
  email: string;
}

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

const app = express();
app.use(express.json());

const users: User[] = [
  { id: 1, name: "Hassaan", email: "hassaan@example.com" }
];

app.get('/api/users', (req: Request, res: Response<ApiResponse<User[]>>) => {
  res.json({ success: true, data: users });
});

app.post('/api/users', (req: Request<{}, {}, Omit<User, 'id'>>, res: Response<ApiResponse<User>>) => {
  const newUser: User = { id: users.length + 1, ...req.body };
  users.push(newUser);
  res.status(201).json({ success: true, data: newUser });
});

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```
