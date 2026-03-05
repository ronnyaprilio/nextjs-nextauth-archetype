"use client"

import { signIn } from "next-auth/react"
import { useState, useEffect } from "react"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""

  useEffect(() => {
    if (!siteKey) return
    const id = "recaptcha-v3"
    if (document.getElementById(id)) return
    const script = document.createElement("script")
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
    script.async = true
    script.id = id
    document.head.appendChild(script)
  }, [siteKey])

  const [error, setError] = useState<string | null>(null)

  const handleLogin = async () => {
    setError(null)
    if (!siteKey) {
      console.error("reCAPTCHA site key not set")
      return
    }
    const grecaptcha = (window as any).grecaptcha
    if (!grecaptcha) {
      console.error("grecaptcha not yet available")
      return
    }
    try {
      const token = await grecaptcha.execute(siteKey, { action: "login" })
      const result = await signIn("credentials", {
        username,
        password,
        recaptchaToken: token,
        redirect: false,
        callbackUrl: "/dashboard",
      })

      if (result?.error) {
        if (result.error === "RATE_LIMIT") {
          setError("Too many attempts. Please wait a minute and try again.")
        } else {
          setError("Invalid username or password.")
        }
        return
      }

      if (result?.ok && result.url) {
        window.location.href = result.url
      }
    } catch (err) {
      console.error("reCAPTCHA execution failed", err)
      setError("Unable to complete login. Please try again.")
    }
  }

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

      <button onClick={handleLogin}>Login</button>
      {error && (
        <p style={{ color: "red", marginTop: 10 }}>{error}</p>
      )}
    </div>
  )
}