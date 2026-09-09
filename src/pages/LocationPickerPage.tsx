import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchLocations } from '../lib/api/locations'
import { useNavigate } from 'react-router-dom'

export default function LocationPickerPage(){
  const {data,isLoading,error} = useQuery(['locations'], fetchLocations)
  const nav = useNavigate()

  if(isLoading) return <div>Loading locations...</div>
  if(error) return <div className="card">Error loading locations</div>

  return (
    <div className="max-w-2xl mx-auto mt-6">
      <div className="card">
        <h2 className="text-xl font-bold mb-3">Choose location</h2>
        <div className="space-y-2">
          {data.map((l:any)=> (
            <div key={l.id} className="p-3 border rounded hover:bg-slate-50 cursor-pointer" onClick={()=>{
              nav(`/create-match?locationId=${l.id}&locationName=${encodeURIComponent(l.name)}`)
            }}>
              <div className="font-medium">{l.name}</div>
              <div className="text-sm text-slate-600">{l.city} • {l.district}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
