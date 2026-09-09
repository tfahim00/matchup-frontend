import * as mock from './mock'
const API_BASE = (import.meta.env.VITE_API_BASE as string) || ''

export async function fetchProfile(userId?:number){
  if(API_BASE && userId){
    const res = await fetch(`${API_BASE}/api/profiles/${userId}`)
    if(res.ok) return res.json()
  }
  return mock.fetchProfile(userId)
}

export async function updateProfile(payload:any){
  if(API_BASE){
    const res = await fetch(`${API_BASE}/api/profiles/${payload.user_id || ''}`, {method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)})
    if(res.ok) return res.json()
  }
  return mock.updateProfile(payload)
}
