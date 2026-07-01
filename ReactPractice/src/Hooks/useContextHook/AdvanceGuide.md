# React Context API Setup Guide

> A practical, scalable Context API architecture for professional React applications.

---

# Folder Structure

```text
src/
│
├── context/
│   ├── AppContext.jsx
│   ├── AppProvider.jsx
│   ├── useAppContext.js
│   └── index.js
│
├── hooks/
├── services/
├── components/
├── pages/
└── App.jsx
```

---

# 1. Create the Context

```jsx
// context/AppContext.jsx

import { createContext } from "react";

export const AppContext = createContext(null);
```

---

# 2. Create the Provider

Keep all global state and business logic inside the provider.

```jsx
// context/AppProvider.jsx

import { useMemo, useState } from "react";
import { AppContext } from "./AppContext";

export function AppProvider({ children }) {
    const [user, setUser] = useState(null);
    const [theme, setTheme] = useState("light");

    const value = useMemo(() => ({
        user,
        setUser,
        theme,
        setTheme,
    }), [user, theme]);

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}
```

---

# 3. Create a Custom Hook

Never import `useContext` throughout the app.

```jsx
// context/useAppContext.js

import { useContext } from "react";
import { AppContext } from "./AppContext";

export function useAppContext() {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error("useAppContext must be used inside AppProvider");
    }

    return context;
}
```

---

# 4. Export Everything

```jsx
// context/index.js

export * from "./AppProvider";
export * from "./useAppContext";
```

---

# 5. Wrap the Application

```jsx
// main.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppProvider } from "./context";

ReactDOM.createRoot(document.getElementById("root")).render(
    <AppProvider>
        <App />
    </AppProvider>
);
```

---

# 6. Consume Context

```jsx
import { useAppContext } from "@/context";

function Dashboard() {
    const { user, theme } = useAppContext();

    return (
        <>
            <h1>{user?.name}</h1>
            <p>{theme}</p>
        </>
    );
}
```

---

# Best Practices

### ✅ Split Contexts

Avoid one massive global context.

```text
AuthContext
ThemeContext
CartContext
NotificationContext
SettingsContext
```

Each context should own a single responsibility.

---

### ✅ Memoize Provider Value

Always memoize the value object.

```jsx
const value = useMemo(() => ({
    user,
    setUser,
}), [user]);
```

Without this, every consumer re-renders unnecessarily.

---

### ✅ Hide Context Implementation

Only export custom hooks.

```jsx
// Good
const auth = useAuth();

// Avoid
useContext(AuthContext);
```

This keeps the implementation replaceable.

---

### ✅ Keep Business Logic Inside Providers

```jsx
const login = async (credentials) => {
    const user = await api.login(credentials);
    setUser(user);
};
```

Components should only call methods, not manage global logic.

---

### ✅ Separate State from API Calls

```text
services/
    auth.service.js

context/
    AuthProvider.jsx
```

Providers orchestrate services; they shouldn't contain HTTP logic.

---

### ✅ Keep Context Small

Context is for:

- Authentication
- Theme
- Language
- Feature flags
- User preferences
- Global UI state

Avoid storing:

- Large lists
- Pagination
- Search results
- Frequently changing data

Use dedicated state libraries for complex server state.

---

# Performance Tips

### Memoize callbacks

```jsx
const logout = useCallback(() => {
    setUser(null);
}, []);
```

---

### Memoize derived values

```jsx
const isLoggedIn = useMemo(() => !!user, [user]);
```

---

### Avoid unnecessary state

Instead of:

```jsx
const [fullName, setFullName] = useState("");
```

Prefer:

```jsx
const fullName = `${user.firstName} ${user.lastName}`;
```

Derived data should not be stored.

---

# Recommended Architecture

```text
src/
│
├── context/
│   ├── auth/
│   ├── theme/
│   ├── settings/
│   └── notifications/
│
├── services/
├── hooks/
├── utils/
├── layouts/
├── pages/
├── components/
└── main.jsx
```

Each context owns:

- Context
- Provider
- Custom Hook
- Types (if using TypeScript)
- Tests

---

# When NOT to Use Context

Avoid Context for:

- Server state
- API caching
- Infinite scrolling
- Complex forms
- Frequently updating collections

Prefer tools like **TanStack Query**, **Redux Toolkit**, or **Zustand** when application complexity or update frequency grows.

---

# Professional Rules

- One responsibility per context.
- Never expose raw `useContext`.
- Always provide a custom hook.
- Memoize provider values.
- Keep providers lightweight.
- Move API logic into services.
- Split contexts instead of creating one global store.
- Store only truly global state.
- Fail fast by throwing when a hook is used outside its provider.
- Design contexts so they can be replaced without affecting consuming components.

---

# Summary

A production-ready Context API should be:

- Modular
- Lightweight
- Memoized
- Encapsulated
- Easy to test
- Easy to scale
- Focused on global UI and application state—not server data