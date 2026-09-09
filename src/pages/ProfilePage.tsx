import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchProfile } from '../lib/api/profile'

export default function ProfilePage(){
  // for demo we'll assume userId 1
  const userId = 1
  const {data,isLoading,error,refetch} = useQuery(['profile', userId], ()=>fetchProfile(userId))

  if(isLoading) return <div>Loading profile...</div>
  if(error) return <div className="card">Error loading profile</div>
  if(!data) return <div className="card">Set up your profile</div>

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <h2 className="text-2xl font-bold">{data.user_name || 'You'}</h2>
        <div className="text-sm text-slate-600">{data.city} • {data.district}</div>
        <div className="mt-4">
          <div className="text-sm"><strong>Position:</strong> {data.preferred_position}</div>
          <div className="text-sm"><strong>Skill:</strong> {data.skill_level}</div>
          <div className="text-sm mt-2">{data.bio}</div>
        </div>
      </div>
    </div>
  )
}
