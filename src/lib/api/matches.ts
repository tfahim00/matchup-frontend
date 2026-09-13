import { authFetch } from './client'

const API_BASE = (import.meta.env.VITE_API_BASE as string) || ''

function requireApiBase() {
  if (!API_BASE) {
    throw new Error('VITE_API_BASE is not configured. Set the frontend API base URL before making requests.')
  }
}

export async function fetchMatches(){
  requireApiBase()

  const res = await authFetch(`${API_BASE}/api/matches`)
  if (res.ok) return res.json()

  const data = await res.json().catch(() => ({}))
  throw new Error(data.message || 'Failed to fetch matches')
}

export async function fetchMatchById(id:number){
  requireApiBase()

  const res = await authFetch(`${API_BASE}/api/matches/${id}`)
  if (res.ok) return res.json()

  const data = await res.json().catch(() => ({}))
  throw new Error(data.message || `Failed to fetch match ${id}`)
}

export async function createMatch(payload:any){
  requireApiBase()

  const res = await authFetch(`${API_BASE}/api/matches`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload),
  })

  if (res.ok) return res.json()

  const data = await res.json().catch(() => ({}))
  throw new Error(data.message || 'Failed to create match')
}
