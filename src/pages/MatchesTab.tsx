import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchMatches } from '../lib/api/matches'
import StatusChip from '../components/StatusChip'
import { Link } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import ErrorState from '../components/ErrorState'
import Button from '../components/Button'

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
const {
  data,
  isLoading,
  error,
  refetch,
} = useQuery({
  queryKey: ['matches'],
  queryFn: fetchMatches,
})

  console.log('MatchesTab data:', data)

  if(isLoading) return <div className="card">Loading matches...</div>
  if(error) return <ErrorState onRetry={refetch} />

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Matches</h2>
        <Link to="/create-match" className="hidden sm:inline-block bg-[#2F6FED] text-white px-4 py-2 rounded-[12px]">+ Create</Link>
      </div>

      <div>
        {data && data.length === 0 && (
          <EmptyState title="No matches yet" subtitle="Post the first match and invite players." />
        )}
        {data && data.data.map((m:any)=> (
          <Link key={m.id} to={`/matches/${m.id}`}>
            <MatchCard m={m} />
          </Link>
        ))}
      </div>

      <Link to="/create-match" className="fixed bottom-6 right-6 z-50">
        <Button variant="primary" className="w-14 h-14 rounded-full text-xl">+</Button>
      </Link>
    </div>
  )
}
