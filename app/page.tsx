"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div style={{ padding: 20 }}>
      <h1>Login</h1>

      <input
        placeholder="username"
        onChange={e => setUsername(e.target.value)}
      />
      <br />

      <input
        type="password"
        placeholder="password"
        onChange={e => setPassword(e.target.value)}
      />
      <br />

      <button
        onClick={() =>
          signIn("credentials", {
            username,
            password,
            callbackUrl: "/dashboard"
          })
        }
      >
        Login
      </button>
    </div>
  )
}