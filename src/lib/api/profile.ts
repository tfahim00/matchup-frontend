import { authFetch } from './client'

const API_BASE = ((import.meta as any).env?.VITE_API_BASE as string) || ''

function requireApiBase() {
  if (!API_BASE) {
    throw new Error('VITE_API_BASE is not configured. Set the frontend API base URL before making requests.')
  }
}

export async function fetchProfile(userId?:number){
  if (!userId) {
    return null
  }

  requireApiBase()

  const res = await authFetch(`${API_BASE}/api/profile`)

  // "Player profile not found."
  if (res.status === 404) {
    const body = await res.json()

    console.log(body.message)
    // "Player profile not found."

    return null
  }
    

  if (res.status === 401 || res.status === 403) {
    const publicRes = await fetch(`${API_BASE}/api/players/${userId}`)
    if (publicRes.ok) return publicRes.json()
  }

  // Profile exists
  if (res.ok) {
    const body = await res.json()

    return body.data
  }

  throw new Error(`Failed to fetch profile for user ${userId}`)
}

export async function updateProfile(payload:any){
  requireApiBase()

  const res = await authFetch(`${API_BASE}/api/profile`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload),
  })

  if (res.ok) return res.json()

  const data = await res.json().catch(() => ({}))
  throw new Error(data.message || 'Failed to update profile')
}
