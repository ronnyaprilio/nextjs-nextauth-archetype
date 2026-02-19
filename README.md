# Next.js Auth Archetype

A starter template for basic authentication setup using:

* Next.js (App Router)
* TypeScript
* NextAuth (Auth.js v5)
* Credentials Login
* Protected Routes (Server-side session check)

---

## ✨ Purpose

This project serves as a **base archetype** so new projects can start with authentication already configured, eliminating the need to rebuild auth from scratch each time.

Ideal for:

* New project boilerplates
* Production-ready starters
* Fullstack app foundations

---

## 📦 Tech Stack

* Next.js 15+
* TypeScript
* Auth.js (NextAuth v5 beta)
* React Server Components
* App Router Architecture

---

## 📁 Project Structure

```
/app
  /api/auth/[...nextauth]/route.ts
  /dashboard/page.tsx
  page.tsx
/components
  logout-button.tsx
/auth.ts
.env.local
```

---

## 🔐 Authentication System

Authentication uses:

**Credentials Provider**

Credentials are stored securely in environment variables.

Example:

```
AUTH_USERNAME=<your-username>
AUTH_PASSWORD=<your-password>
```

Auth logic location:

```
/auth.ts
```

Protected routes use:

```ts
const session = await auth()
```

---

## ⚙️ Setup

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

---

## 🔑 Environment Variables

Create:

```
.env.local
```

Add:

```env
AUTH_SECRET=<your-secret-here>
AUTH_USERNAME=<your-username>
AUTH_PASSWORD=<your-password>
```

Generate secret:

```bash
openssl rand -base64 32
```

---

## 🚪 Login Flow

Authentication flow:

```
Login Page → signIn() → Session created → Redirect to Dashboard
Dashboard → auth() check → Access allowed / Redirect to Login
Logout → signOut() → Session destroyed
```

---

## 🛡️ Route Protection

Dashboard is protected via server-side guard:

```ts
if (!session) {
  redirect("/login")
}
```

---

## 📌 Notes

Auth.js v5 **requires**:

```ts
export const { handlers } = NextAuth()
```

Not default export like v4.

---

## 🚀 Future Improvements

Planned upgrades:

* OAuth login (Google / GitHub)
* Database adapter integration
* Role-based authorization
* Global middleware protection
* UI system integration
* Persistent session strategies

---

## 📄 License

Free to use for personal or commercial starter templates.

---

**Archetype Philosophy:**
Reusable foundation for scalable authentication-ready applications.
