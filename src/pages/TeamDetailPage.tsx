import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchTeamById } from '../lib/api/teams'

export default function TeamDetailPage(){
  const {id} = useParams()
  const {data,isLoading,error} = useQuery(['team', id], ()=>fetchTeamById(Number(id)))

  if(isLoading) return <div>Loading team...</div>
  if(error) return <div className="card">Error loading team</div>
  if(!data) return <div className="card">Team not found</div>

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <h2 className="text-2xl font-bold">{data.name}</h2>
        <div className="text-sm text-slate-600">{data.visibility} • {data.city}</div>
        <div className="mt-4">
          <h3 className="font-semibold">Members</h3>
          <ul className="mt-2">
            {(data.members || []).map((m:any)=> <li key={m.id} className="py-2 border-b">{m.user?.name || 'Member'}</li>)}
          </ul>
        </div>
      </div>
    </div>
  )
}
