# Next.js Auth Archetype

A starter template for authentication and user management built on the App Router.

* Next.js App Router (16+)
* TypeScript
* NextAuth (Auth.js v5 beta)
* MongoDB via Mongoose
* Credential‑based login with bcrypt
* reCAPTCHA verification + rate‑limiting
* Protected server‑rendered routes
* Optional security headers added in `next.config.ts`

---

## ✨ Purpose

This project serves as a **base archetype** so new applications can start with a secure, full‑stack auth system already in place.  It demonstrates common real‑world patterns such as a database back end, brute‑force protection, and deploy‑ready configuration.

Ideal for:

1. New project boilerplates
2. Production‑ready starters
3. Fullstack app foundations

---

## 📦 Tech Stack

* **Next.js 16** (App Router)
* **React 18**
* **TypeScript**
* **NextAuth v5** (Auth.js) – Credentials provider with JWT sessions
* **MongoDB & Mongoose** for user storage
* **bcryptjs** for password hashing
* **reCAPTCHA** (v3) via Google
* **Axios** for outgoing HTTP calls
* **Tailwind CSS 4** and `clsx` / `tailwind-merge` for styling
* Simple in‑memory **rate limiting** utility

---

## 📁 Project Structure

```
/app
  /api/auth/[...nextauth]/route.ts      # NextAuth handlers
  /components
    LogoutButton.tsx
  /dashboard/page.tsx                   # protected page
  page.tsx                              # login form
  /lib
    mongodb.ts                          # Mongo connection helper
    models/User.ts                      # Mongoose user model
    rate-limit.ts                       # simple rate limiter
/auth.ts                                 # NextAuth config + logic
/seed.js                                  # script to create initial admin user
next.config.ts                            # includes security headers
.env.local                                # environment variables
```

---

## 🔐 Authentication System

Credentials are verified against a MongoDB collection.  On each sign‑in attempt we:

1. Connect to the database (`app/lib/mongodb.ts`).
2. Check the client IP against an in‑memory rate limiter (`app/lib/rate-limit.ts`).
3. Validate the reCAPTCHA token with Google (secret key stored in `.env.local`).
4. Look up the user by `username` and compare the bcrypt‑hashed password.

The login form (in `app/page.tsx`) sends `username`, `password` and a `recaptchaToken` to the provider.

Sample credentials are initially seeded using `seed.js` (run with `node seed.js` after configuring the env file).

Protected routes guard access with:

```ts
const session = await auth();
if (!session) redirect('/login');
```

---

## ⚙️ Setup

1. Clone the repo and switch to its directory.
2. Copy `.env.local.example` (or create `.env.local`) and define the variables listed below.
3. Install dependencies:

```bash
npm install
```

4. Seed the first admin user:

```bash
node seed.js
```

5. Run the development server:

```bash
npm run dev
```

---

## 🔑 Environment Variables

Create a file named `.env.local` with the following keys:

```env
# application secrets
AUTH_SECRET=<random-base64-32>

# full URL of your app (required by NextAuth)
NEXTAUTH_URL=http://localhost:3000

# database
MONGODB_URI=<your-mongo-connection-string>

# initial admin for seeding script
INIT_ADMIN_USERNAME=<desired-username>
INIT_ADMIN_PASSWORD=<desired-password>

# reCAPTCHA (v3)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=<your-site-key>
RECAPTCHA_SECRET_KEY=<your-secret-key>
```

You can generate `AUTH_SECRET` with:

```bash
echo $(openssl rand -base64 32)
```

---

## 🚪 Login Flow

```
Login Page → signIn() → reCAPTCHA check → DB lookup → JWT session → Redirect to Dashboard
Dashboard → auth() check → Access allowed / Redirect to Login
Logout → signOut() → Session destroyed
```

---

## 🛡️ Route Protection

Server components guard dashboard routes:

```ts
if (!session) {
  redirect("/login");
}
```

---

## 📌 Notes

* NextAuth v5 now returns `{ handlers, auth, signIn, signOut }` rather than a default export.
* Security headers are injected globally from `next.config.ts`.
* The `seed.js` script should only be run once — it checks for an existing user and exits if found.

---

## 🚀 Future Improvements

* OAuth login (Google / GitHub)
* Role‑based authorization
* Middleware for global route protection
* UI component library integration
* Persistent rate‑limit storage (Redis/cache)

---

## 📄 License

Free to use for personal or commercial starter templates.

---

**Archetype Philosophy:**
A reusable foundation with production‑focused auth best practices.
