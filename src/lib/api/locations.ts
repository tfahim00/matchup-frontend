import * as mock from './mock'
const API_BASE = (import.meta.env.VITE_API_BASE as string) || ''

export async function fetchLocations(){
  if(API_BASE){
    const res = await fetch(`${API_BASE}/api/locations`)
    if(res.ok) return res.json()
  }
  return mock.fetchLocations()
}
