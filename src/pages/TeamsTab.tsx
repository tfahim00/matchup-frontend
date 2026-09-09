import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchTeams } from '../lib/api/teams'
import { Link } from 'react-router-dom'

export default function TeamsTab(){
  const {data,isLoading,error,refetch} = useQuery(['teams'], fetchTeams)
  if(isLoading) return <div>Loading teams...</div>
  if(error) return <div className="card">Error loading teams <button onClick={()=>refetch()} className="ml-2 text-blue-600">Retry</button></div>

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Teams</h2>
        <Link to="/teams/create" className="bg-blue-600 text-white px-3 py-2 rounded">+ Create</Link>
      </div>

      <div>
        {data && data.length === 0 && (
          <div className="card">No teams yet. Tap the + button to create the first team.</div>
        )}
        {data && data.map((t:any)=> (
          <Link key={t.id} to={`/teams/${t.id}`} className="block"><div className="card mb-3"><div className="flex justify-between items-center"><div><div className="font-semibold">{t.name}</div><div className="text-sm text-slate-600">{t.city}</div></div><div className="text-sm text-slate-600">{t.members?.length || 0} members</div></div></div></Link>
        ))}
      </div>
    </div>
  )
}
