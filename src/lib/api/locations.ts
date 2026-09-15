import { authFetch } from './client'

const API_BASE = (import.meta.env.VITE_API_BASE as string) || ''

function requireApiBase() {
  if (!API_BASE) {
    throw new Error('VITE_API_BASE is not configured. Set the frontend API base URL before making requests.')
  }
}

export async function fetchLocations(): Promise<any[]> {
  requireApiBase()

  const res = await fetch(`${API_BASE}/api/locations`)
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.message || 'Failed to fetch locations')
  }

  const data = await res.json()

  if (Array.isArray(data)) return data
  if (Array.isArray(data?.data)) return data.data
  if (Array.isArray(data?.data?.data)) return data.data.data

  return []
}

export async function createLocation(payload: {
  name: string
  address: string
  city?: string
  district?: string
  latitude?: number
  longitude?: number
}){
  requireApiBase()

  const res = await authFetch(`${API_BASE}/api/locations`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload),
  })

  if (res.ok) {
    const data = await res.json()
    return data?.data ?? data
  }

  const data = await res.json().catch(() => ({}))
  throw new Error(data.message || 'Failed to create location')
}
