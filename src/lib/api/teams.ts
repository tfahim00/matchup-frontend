import { authFetch } from './client'

const API_BASE = (import.meta.env.VITE_API_BASE as string) || ''

function requireApiBase() {
  if (!API_BASE) {
    throw new Error('VITE_API_BASE is not configured. Set the frontend API base URL before making requests.')
  }
}

export async function fetchTeams(){
  requireApiBase()

  const res = await authFetch(`${API_BASE}/api/teams`)
  if (res.ok) return res.json()

  const data = await res.json().catch(() => ({}))
  throw new Error(data.message || 'Failed to fetch teams')
}

export async function fetchTeamById(id:number){
  requireApiBase()

  const res = await authFetch(`${API_BASE}/api/teams/${id}`)
  if (res.ok) return res.json()

  const data = await res.json().catch(() => ({}))
  throw new Error(data.message || `Failed to fetch team ${id}`)
}
