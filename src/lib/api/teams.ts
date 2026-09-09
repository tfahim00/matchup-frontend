import * as mock from './mock'
const API_BASE = (import.meta.env.VITE_API_BASE as string) || ''

export async function fetchTeams(){
  if(API_BASE){
    const res = await fetch(`${API_BASE}/api/teams`)
    if(res.ok) return res.json()
  }
  return mock.fetchTeams()
}

export async function fetchTeamById(id:number){
  if(API_BASE){
    const res = await fetch(`${API_BASE}/api/teams/${id}`)
    if(res.ok) return res.json()
  }
  return mock.fetchTeamById(id)
}
