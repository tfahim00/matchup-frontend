import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchMatchById } from '../lib/api/matches'
import StatusChip from '../components/StatusChip'

export default function MatchDetailPage(){
  const {id} = useParams()
  const {data,isLoading,error} = useQuery(['match', id], ()=>fetchMatchById(Number(id)))

  if(isLoading) return <div>Loading...</div>
  if(error) return <div className="card">Error loading match</div>
  if(!data) return <div className="card">Match not found</div>

  return (
    <div className="max-w-3xl mx-auto">
      <div className="card">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold">{data.title}</h2>
            <div className="text-sm text-slate-600 mt-1">{data.location?.name} • {data.match_date}</div>
          </div>
          <StatusChip status={data.status} />
        </div>

        <div className="mt-4 text-sm text-slate-700">{data.description || 'No description provided.'}</div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold">Participants</h3>
          <div className="mt-2 text-sm text-slate-600">{(data.participants || []).length} joined</div>
        </div>
      </div>
    </div>
  )
}
