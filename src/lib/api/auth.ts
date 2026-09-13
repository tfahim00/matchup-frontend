import { authFetch } from './client'

const API_BASE = (import.meta.env.VITE_API_BASE as string) || ''

function ensureApiBase() {
  if (!API_BASE) {
    throw new Error('VITE_API_BASE is not configured. Set the frontend API base URL before making requests.')
  }
}

export type RegisterPayload = {
  name?: string
  email: string
  password: string
  password_confirmation?: string
}

export async function registerUser(payload: RegisterPayload) {
  ensureApiBase()

  const res = await fetch(`${API_BASE}/api/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new Error(data.message || 'Registration failed')
  }

  return data
}

export async function loginUser(payload: { email: string; password: string }) {
  ensureApiBase()

  const res = await fetch(`${API_BASE}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new Error(data.message || 'Login failed')
  }

  return data
}

export async function sendResetLink(email: string) {
  ensureApiBase()

  const res = await fetch(`${API_BASE}/api/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new Error(data.message || 'Failed to send reset link')
  }

  return data
}

export async function createTeam(payload: any) {
  ensureApiBase()

  const res = await authFetch(`${API_BASE}/api/teams`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new Error(data.message || 'Failed to create team')
  }

  return data
}
