import * as mock from './mock'

const API_BASE = (import.meta.env.VITE_API_BASE as string) || ''

export async function fetchMatches(){
  if(API_BASE){
    const res = await fetch(`${API_BASE}/api/matches`)
    if(res.ok) return res.json()
  }
  return mock.fetchMatches()
}

export async function fetchMatchById(id:number){
  if(API_BASE){
    const res = await fetch(`${API_BASE}/api/matches/${id}`)
    if(res.ok) return res.json()
  }
  return mock.fetchMatchById(id)
}

export async function createMatch(payload:any){
  if(API_BASE){
    const res = await fetch(`${API_BASE}/api/matches`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)})
    if(res.ok) return res.json()
  }
  return mock.createMatch(payload)
}
