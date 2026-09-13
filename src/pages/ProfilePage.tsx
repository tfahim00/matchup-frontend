import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Navigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { fetchProfile } from '../lib/api/profile'

export default function ProfilePage(){
  const { id } = useParams()
  const { user } = useAuth()
  console.log('user:', user)
  const profileId = id ? Number(id) : user?.id ?? 1

  const { data, isLoading, error } = useQuery({
    queryKey: ['profile', profileId],
    queryFn: () => fetchProfile(profileId),
    enabled: !!profileId,
    retry: false,
  })

  if(isLoading) return <div>Loading profile...</div>
  if(error) return <div className="card">Error loading profile</div>
  if(!data) return <Navigate to="/profile/edit" replace state={{ from: location.pathname }} />

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
