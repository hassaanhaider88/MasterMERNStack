# JavaScript

### From Basic to Advanced


JavaScript  
|-- Syntax Constructs & Declarations  
|-- Operators  
|-- Control Flow & Loops  
|-- Functions & Closures  
|-- Objects & Classes  
|-- Built-in Global Objects / Types  
 |-- Primitive wrappers & constructors  
 |-- Collections  
 |-- Async & Promises  
 |-- Iteration & Generators  
 |-- Intl & new 2025–2026  
|-- Modules  
|-- New & Experimental (2025–2026)

### 1. Syntax Constructs & Declarations

```
|-- var / let / const
    |-- Explanation          → Variable declaration (var = function/block hoisted; let/const = block-scoped; const = cannot reassign)
    |-- Temporal Dead Zone   → let & const have TDZ before declaration

|-- function declaration / function expression
    |-- function name() {}   → hoisted
    |-- const fn = function() {}   or arrow

|-- class declaration / class expression
    |-- class MyClass { … }

|-- import / export
    |-- See Modules section below

|-- block { }
    |-- Explanation          → Creates scope for let/const (since ES6)

|-- debugger;
    |-- Explanation          → Triggers debugger if dev tools open

|-- ; (automatic semicolon insertion – ASI rules apply)
```

### 2. Operators (grouped)

```
|-- Arithmetic
    |-- + - * / % ** (exponentiation ES2016)
    |-- ++ -- (pre/post)

|-- Assignment
    |-- = += -= *= /= %= **= <<= >>= >>>= &= ^= |= &&= ||= ??= (logical assignment ES2021)

|-- Comparison
    |-- == != === !== > >= < <=

|-- Logical
    |-- && || ! ?? (nullish coalescing ES2020) &&= ||= ??=

|-- Bitwise
    |-- & | ^ ~ << >> >>>

|-- Ternary
    |-- condition ? expr1 : expr2

|-- Spread / Rest
    |-- ... (array/object spread, rest parameters ES2015+)

|-- Optional chaining ?.
    |-- obj?.prop?.method?.(arg)   (ES2020)

|-- Nullish coalescing ??
    |-- value ?? default   (ES2020)

|-- Pipeline |>   (stage 1–2, not yet in 2026)

|-- Private fields / methods #name
    |-- class { #x = 1; #method() {} }   (ES2022)

|-- in / instanceof
```

### 3. Control Flow & Loops

```
|-- if / else / else if

|-- switch / case / default / fall-through (no automatic break)

|-- ternary ? :

|-- for (init; cond; update) { }

|-- for...of   (iterables: arrays, strings, Maps, Sets, generators, etc.)
    |-- for (const x of iterable) { }

|-- for...in   (object enumerable properties – avoid for arrays)

|-- while / do...while

|-- break / continue / labeled break & continue (rare)

|-- throw new Error("msg")
    |-- or throw value (any value)

|-- try { } catch (err) { } finally { }
    |-- catch without param allowed (ES2021+)
```

### 4. Functions & Closures

```
|-- function () {} / function* () {}   (generator)

|-- Arrow functions  () => { }
    |-- No own this, arguments, super, new.target
    |-- Implicit return if single expr

|-- Parameters
    |-- Default: param = value
    |-- Rest: ...args
    |-- Destructuring: ({a,b} = obj)

|-- IIFE   (Immediately Invoked Function Expression)
    |-- (function(){ ... })()

|-- Closures
    |-- Function remembers its lexical scope

|-- new.target   (in constructors)

|-- Function.prototype methods
    |-- .call() .apply() .bind()
```

### 5. Objects & Classes

```
|-- Object literal { key: value, shorthand {key}, computed [expr]: val, method() {} }

|-- class MyClass {
    constructor() {}
    method() {}
    static staticMethod() {}
    get prop() {}
    set prop(v) {}
    #privateField = 1;
    #privateMethod() {}
  }

|-- extends / super
    |-- super() in constructor
    |-- super.method()

|-- new Class()

|-- instanceof / typeof

|-- Object methods (static)
    |-- Object.keys() .values() .entries()
    |-- Object.assign()
    |-- Object.create()
    |-- Object.freeze() .seal() .preventExtensions()
    |-- Object.is() .isFrozen() etc.
```

### 6. Built-in Global Objects / Types

#### Primitives & Wrappers

```
|-- Number
    |-- .NaN Infinity parseInt() parseFloat()
    |-- .isNaN() .isFinite() .isInteger() .isSafeInteger()
    |-- .EPSILON .MAX_SAFE_INTEGER .MIN_SAFE_INTEGER

|-- String
    |-- .length .charAt() .slice() .substring() .substr() (legacy)
    |-- .toUpperCase() .trim() .padStart() .padEnd()
    |-- .includes() .startsWith() .endsWith() .repeat()
    |-- .match() .replace() .replaceAll() .split()
    |-- Template literals `Hello ${expr}`   (ES2015)

|-- Boolean
    |-- new Boolean() → wrapper (avoid)

|-- Symbol
    |-- Symbol("desc") Symbol.for("key") Symbol.keyFor()
    |-- Well-known: Symbol.iterator Symbol.toStringTag etc.

|-- BigInt
    |-- 123n   BigInt("123")
    |-- Operations need same type
```

#### Collections (ES6+)

```
|-- Array
    |-- new Array() [1,2,3]
    |-- .push() .pop() .shift() .unshift() .splice()
    |-- .map() .filter() .reduce() .reduceRight() .forEach()
    |-- .find() .findIndex() .some() .every()
    |-- .flat() .flatMap() (ES2019)
    |-- .at(index) (ES2022)   // negative supported
    |-- .toSorted() .toReversed() .toSpliced() (immutable ES2024)
    |-- .with(index, value) (immutable replace ES2024)

|-- Object   (see above)

|-- Map
    |-- new Map([[k,v], ...])
    |-- .set() .get() .has() .delete() .clear()
    |-- .keys() .values() .entries() .forEach()

|-- Set
    |-- new Set([1,2,3])
    |-- .add() .has() .delete() .clear()
    |-- .keys() .values() .entries() (same as values)
    |-- New in ES2025: .intersection() .union() .difference() .symmetricDifference() .isSubsetOf() .isSupersetOf() .isDisjointFrom()

|-- WeakMap / WeakSet   (keys must be objects, no enumeration)
```

#### Async & Concurrency

```
|-- Promise
    |-- new Promise((resolve, reject) => {})
    |-- .then() .catch() .finally()
    |-- Promise.all() .allSettled() .any() .race()
    |-- Promise.resolve() .reject()
    |-- New ES2025?: Promise.try()   (proposal for sync + async unification)

|-- async function () {}   → returns Promise
    |-- await expr   (only inside async)

|-- generators   function* () { yield 1; }
    |-- .next() .return() .throw()

|-- async generators   async function* () { yield await ... }

|-- for await...of   (async iterables)
```

#### Iteration & New 2025

```
|-- Iterable protocol   Symbol.iterator → { next() { return {value,done} } }

|-- Iterator protocol   { next() }

|-- New in ES2025: global Iterator
    |-- Iterator.from(iterable)
    |-- .map() .filter() .take() .drop() .flatMap() .reduce() .toArray() .find() .forEach() .some() .every() .includes()
    |-- Chainable iterator helpers

|-- RegExp
    |-- /pattern/flags   new RegExp()
    |-- .test() .exec() .matchAll()
    |-- New ES2025: RegExp.escape(str)   → escapes special chars
    |-- v flag (set notation, properties of strings)
```

#### Internationalization (Intl)

```
|-- Intl.DateTimeFormat() .NumberFormat() .RelativeTimeFormat() .ListFormat() .PluralRules()
    |-- .format() .formatToParts()
```

#### Temporal (likely ES2026 or very late 2025 – major date/time overhaul)

```
|-- Temporal.Now.zonedDateTimeISO()
|-- Temporal.PlainDate PlainTime PlainDateTime etc.
|-- Replaces Date object (immutable, timezone-aware, no legacy parsing issues)
```

### 7. Modules (ES2015+)

```
|-- export default expr;
|-- export { named };
|-- export * from "mod";
|-- export { default as alias } from "mod";

|-- import defaultImport from "mod";
|-- import { named } from "mod";
|-- import * as ns from "mod";
|-- import("mod").then(...)   → dynamic

|-- import attributes / JSON modules (ES2025)
    |-- import data from "./data.json" with { type: "json" };

|-- Top-level await   (in modules only)
    |-- const data = await fetchData();
```

### 8. Modern & Experimental (2024–2026 highlights)

- **ES2024** — Immutable array methods (.toSorted, .toReversed, .toSpliced, .with)
- **ES2025** — Iterator helpers, Set methods, RegExp.escape, JSON import, Promise.try (if finalized)
- **2025–2026 trends** — Temporal (new date/time), Records & Tuples (immutable compound values – still proposal), new error cause chaining, array grouping .group() .groupToMap()
- **Decorators** — @decorator syntax (stage 3 → likely 2026+)
- **Pattern matching** — match expr { when … } (early proposal)
