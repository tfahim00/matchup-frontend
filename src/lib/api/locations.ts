const API_BASE = (import.meta.env.VITE_API_BASE as string) || ''

function requireApiBase() {
  if (!API_BASE) {
    throw new Error('VITE_API_BASE is not configured. Set the frontend API base URL before making requests.')
  }
}

export async function fetchLocations(){
  requireApiBase()

  const res = await fetch(`${API_BASE}/api/locations`)
  if (res.ok) return res.json()

  const data = await res.json().catch(() => ({}))
  throw new Error(data.message || 'Failed to fetch locations')
}
