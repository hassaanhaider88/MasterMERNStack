# ReactJs

### From Basic to Advanced

React  
|-- Core Concepts & JSX  
|-- Components (Class vs Function)  
|-- Built-in Hooks (use*)  
|-- React DOM APIs  
|-- Server Components & React Server Components (RSC)  
|-- New React 19 Features  
|-- Patterns & Advanced Topics  
|-- Ecosystem & Related Libraries (brief)

### 1. Core Concepts & JSX

```
|-- JSX
    |-- Explanation          → JavaScript + XML-like syntax → transpiled to React.createElement()
    |-- Syntax               → <Tag attr={value}>children</Tag>
    |-- Fragments            → <>...</>   or   <React.Fragment>...</React.Fragment>
    |-- Comments             → {/* comment */}   (not <!-- -->)

|-- React.createElement(type, props, ...children)
    |-- type                 → string (HTML tag) | Component function/class | Symbol(react.fragment)

|-- React elements vs Components
    |-- Element              → plain object { type, props, key, ref, ... }
    |-- Component            → function or class that returns element(s)
```

### 2. Components

```
|-- Function Component    (preferred since 16.8+)
    |-- const MyComp = (props) => { return <div>...</div> }
    |-- or arrow with implicit return

|-- Class Component       (still supported, legacy in new code)
    |-- class MyComp extends React.Component { render() { return ... } }

|-- Props
    |-- Read-only
    |-- Default: MyComp.defaultProps = { color: "blue" }
    |-- Children: props.children

|-- Key prop                 (must be unique among siblings)
    |-- Special: used only for reconciliation (never read inside component)

|-- Ref prop                 (special – forwarded or created with useRef / createRef)

|-- React.memo()             → memoize functional component (shallow props compare)
    |-- React.memo(MyComp, customCompareFn?)

|-- forwardRef               → expose ref to child DOM/component
    |-- const MyInput = forwardRef((props, ref) => <input ref={ref} ... />)

|-- StrictMode               → <React.StrictMode> wraps app → double renders in dev, catches issues
```

### 3. Built-in Hooks (use*)

```
|-- useState
    |-- const [state, setState] = useState(initial)
    |-- setState(newValue) | setState(prev => prev + 1)
    |-- lazy init: useState(() => expensiveCalc())

|-- useReducer
    |-- const [state, dispatch] = useReducer(reducer, initial, initFn?)
    |-- reducer(state, action) => newState

|-- useEffect
    |-- useEffect(() => { sideEffect(); return cleanup? }, [deps])
    |-- deps: [] = mount+unmount, missing = every render, undefined = every render

|-- useLayoutEffect          → runs synchronously after DOM mutations (before paint)

|-- useInsertionEffect       → very early (CSS-in-JS libraries)

|-- useContext
    |-- const value = useContext(MyContext)

|-- useRef
    |-- const ref = useRef(initialValue)   → .current persists across renders
    |-- DOM ref: <div ref={ref} />

|-- useImperativeHandle      → customize ref exposed value (with forwardRef)

|-- useMemo
    |-- const memoized = useMemo(() => expensiveCalc(a,b), [a,b])

|-- useCallback
    |-- const memoizedFn = useCallback(fn, [deps])

|-- useTransition            (React 18+)
    |-- const [isPending, startTransition] = useTransition()
    |-- startTransition(() => setTab("expensive"))

|-- useDeferredValue         (React 18+)
    |-- const deferredQuery = useDeferredValue(query)

|-- useId                    (React 18+)
    |-- const id = useId()   → unique per component tree (no collisions)

|-- useSyncExternalStore     (React 18+) → low-level subscription hook (used by libraries)

|-- use                   (React 19 – new “use” keyword hook)
    |-- const data = use(promiseOrThenable)   → suspends until resolved
    |-- Works with promises, readable streams, etc.

|-- useActionState           (React 19 – form actions)
    |-- const [state, action, isPending] = useActionState(actionFn, initialState)

|-- useOptimistic            (React 19 – optimistic UI)
    |-- const [optimisticState, setOptimistic] = useOptimistic(realState, updateFn)
```

### 4. React DOM APIs

```
|-- createRoot
    |-- ReactDOM.createRoot(container).render(<App />)

|-- hydrateRoot             (for SSR)
    |-- ReactDOM.hydrateRoot(container, <App />)

|-- flushSync               → force synchronous update (rare)

|-- preconnect / prefetchDNS / preinit / preinitModule / preload / preconnect (React 19 helpers)
    |-- <link rel="preconnect" ... /> but via React APIs for better timing
```

### 5. Server Components & React Server Components (RSC) – React 19 era

```
|-- "use server"             → directive – marks server-only file/function
    |-- async function addItem() { "use server"; ...db... }

|-- "use client"             → directive – marks client component boundary

|-- Server Component          → default in Next.js App Router / frameworks
    → Can be async
    → Cannot use state, effects, browser APIs
    → Can import client components

|-- Client Component          → marked with "use client"
    → Can use hooks, state, effects

|-- Server Actions           → async functions marked "use server"
    → Can be passed to client as props (form action, onclick, etc.)

|-- useFormStatus            → read pending state of nearest form action

|-- useFormState             → legacy name → now useActionState in React 19
```

### 6. New React 19 Features (stable / near-stable by 2026)

```
|-- Actions & useActionState
|-- Optimistic updates with useOptimistic
|-- use() hook for promises / thenables
|-- Document Metadata (<title>, <meta>, <link>) directly in components
    → Auto hoisted to <head>
|-- Stylesheets / async scripts auto management
    → <link rel="stylesheet" href="..." /> inside component → deduped & preloaded
|-- Refs as props → ref as function or object (no more forwardRef in many cases)
|-- Better error handling / hydration mismatch warnings
|-- React Compiler (optional – auto memoization – still opt-in in 19)
```

### 7. Patterns & Advanced Topics

```
|-- Compound Components
|-- Render Props
|-- Higher-Order Components (HOC)
|-- Custom Hooks
|-- Context + useReducer for global state
|-- Concurrent Mode features (useTransition, useDeferredValue)
|-- Suspense + lazy()
    |-- const LazyComp = lazy(() => import("./Comp"))
    |-- <Suspense fallback={<Loading />}> <LazyComp /> </Suspense>

|-- Error Boundaries (class component only)
    |-- componentDidCatch / getDerivedStateFromError

|-- Portals
    |-- createPortal(children, domNode)

|-- Profiler
    |-- <Profiler id="..." onRender={callback}>

|-- Concurrent rendering patterns
    → startTransition, useDeferredValue, Suspense + streaming SSR
```

### 8. Ecosystem & Related (very brief – 2026 view)

```
|-- Next.js (App Router + Server Components dominant)
|-- React Query / TanStack Query
|-- Zustand / Jotai / Recoil / Redux Toolkit
|-- React Router v6 / v7
|-- Tailwind + shadcn/ui / Radix / Headless UI
|-- React Hook Form
|-- Zod + server validation
|-- React Server Components Frameworks: Next.js, Remix, Redwood, etc.
```

### Quick Modern React 19 “Hello World” skeleton (2026 style)

```jsx
// app/page.jsx  (Server Component – Next.js style)
import ClientCounter from './ClientCounter'

export default async function Page() {
  const data = await db.posts.findMany()   // server-only
  return (
    <>
      <title>My App</title>
      <meta name="description" content="..." />
      <h1>Posts</h1>
      <ul>
        {data.map(p => <li key={p.id}>{p.title}</li>)}
      </ul>
      <ClientCounter />
    </>
  )
}

// ClientCounter.jsx
'use client'

import { useState, useOptimistic } from 'react'

export default function ClientCounter() {
  const [count, setCount] = useState(0)
  const [optimisticCount, setOptimisticCount] = useOptimistic(count)

  async function increment() {
    setOptimisticCount(c => c + 1)
    await fakeApiCall()
    setCount(c => c + 1)
  }

  return (
    <button onClick={increment}>
      Count: {optimisticCount}
    </button>
  )
}
```
