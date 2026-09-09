import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchMatches } from '../lib/api/mock'
import StatusChip from '../components/StatusChip'
import { Link } from 'react-router-dom'

function MatchCard({m}:{m:any}){
  return (
    <div className="card mb-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{m.title}</h3>
          <div className="text-sm text-slate-600">{m.location?.name}</div>
        </div>
        <StatusChip status={m.status} />
      </div>
      <div className="mt-3 text-sm text-slate-700">{m.match_date}</div>
    </div>
  )
}

export default function MatchesTab(){
  const {data, isLoading, error, refetch} = useQuery(['matches'], fetchMatches)

  if(isLoading) return <div>Loading matches...</div>
  if(error) return <div className="card">Error loading matches <button onClick={()=>refetch()} className="ml-2 text-blue-600">Retry</button></div>

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Matches</h2>
        <Link to="/create-match" className="bg-blue-600 text-white px-3 py-2 rounded">+ Create</Link>
      </div>

      <div>
        {data && data.length === 0 && (
          <div className="card">No matches yet. Tap the + button to post the first one.</div>
        )}
        {data && data.map((m:any)=> <Link key={m.id} to={`/matches/${m.id}`}><MatchCard m={m} /></Link>)}
      </div>
    </div>
  )
}
