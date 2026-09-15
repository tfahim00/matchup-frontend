import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { createLocation, fetchLocations } from '../lib/api/locations'
import { createMatch } from '../lib/api/matches'

type LocationChoice = {
  id?: number
  name: string
  address: string
  city: string
  district: string
  latitude?: number
  longitude?: number
}

export default function CreateMatchPage(){
  const [title,setTitle] = useState('')
  const [description,setDescription] = useState('')
  const [matchDate,setMatchDate] = useState('')
  const [location,setLocation] = useState<LocationChoice | null>(null)
  const [savedLocations,setSavedLocations] = useState<LocationChoice[]>([])
  const [savedLocationsLoading,setSavedLocationsLoading] = useState(false)
  const [savedLocationsError,setSavedLocationsError] = useState<string|undefined>()
  const [error,setError] = useState<string|undefined>()
  const [loading,setLoading] = useState(false)
  const nav = useNavigate()
  const [search] = useSearchParams()

  useEffect(() => {
    let active = true

    async function loadSavedLocations() {
      try {
        setSavedLocationsLoading(true)
        setSavedLocationsError(undefined)

        const items = await fetchLocations()

        if (active) setSavedLocations(items)
      } catch (err: any) {
        if (active) {
          setSavedLocationsError(err.message || 'Failed to load saved locations')
          setSavedLocations([])
        }
      } finally {
        if (active) setSavedLocationsLoading(false)
      }
    }

    loadSavedLocations()
    return () => {
      active = false
    }
  }, [])

  useEffect(()=>{
    const locId = search.get('locationId')
    const locName = search.get('locationName')
    if(locId && locName){
      const nextLocation = {
        id: Number(locId),
        name: locName,
        address: '',
        city: '',
        district: '',
      }

      setLocation(nextLocation)
    }
  },[search])

  async function ensureLocationId() {
    if (!location?.name?.trim()) {
      throw new Error('Please choose a location before creating a match.')
    }

    if (location?.id) return location.id

    const savedLocation = await createLocation({
      name: location.name.trim(),
      address: location.address || location.name.trim(),
      city: location.city || '',
      district: location.district || '',
      latitude: location.latitude,
      longitude: location.longitude,
    })

    return savedLocation.id
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError(undefined)

    if (!title) return setError('Title is required')
    if (!matchDate) return setError('Match date is required')

    setLoading(true)
    try {
      const locationId = await ensureLocationId()
      const m = await createMatch({
        title,
        description,
        match_date: matchDate,
        location_id: locationId,
        skill_level: 'beginner',
        match_type: '5v5',
        slots_available: 1,
        visibility: 'public',
      })
      nav(`/matches/${m.id}`)
    } catch (err: any) {
      setError(err.message || 'Failed to create match')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-6">
      <div className="card">
        <h2 className="text-2xl font-bold mb-3">Create match</h2>
        {error && <div className="text-red-600 mb-3">{error}</div>}
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-600">Title</label>
            <input value={title} onChange={e=>setTitle(e.target.value)} className="input mt-1" />
          </div>
          <div>
            <label className="block text-sm text-slate-600">Description</label>
            <textarea value={description} onChange={e=>setDescription(e.target.value)} className="input mt-1 h-24" />
          </div>
          <div>
            <label className="block text-sm text-slate-600">Match date</label>
            <input value={matchDate} onChange={e=>setMatchDate(e.target.value)} className="input mt-1" placeholder="YYYY-MM-DD HH:mm" />
          </div>

          <div>
            <label className="block text-sm text-slate-600">Location</label>
            <div className="mt-1 space-y-3">
              <div className="flex items-center gap-2">
                <select
                  value={location?.id ?? ''}
                  onChange={(e) => {
                    const selectedId = e.target.value
                    if (!selectedId) {
                      setLocation(null)
                      return
                    }

                    const selected = savedLocations.find((item) => String(item.id) === selectedId)
                    if (!selected) return

                    setLocation(selected)
                  }}
                  className="input flex-1"
                  disabled={savedLocationsLoading || savedLocations.length === 0}
                >
                  <option value="">Choose a location</option>
                  {savedLocations.map((item) => (
                    <option key={item.id} value={String(item.id)}>
                      {item.name}{item.city || item.district ? ` • ${[item.city, item.district].filter(Boolean).join(' • ')}` : ''}
                    </option>
                  ))}
                </select>
                <Link to="/locations" className="text-sm text-blue-600">Manage</Link>
              </div>

              {savedLocationsError && (
                <div className="text-xs text-red-600">{savedLocationsError}</div>
              )}

              {location && (
                <div className="rounded border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
                  <div className="font-medium text-slate-800">{location.name}</div>
                  {location.address && <div>{location.address}</div>}
                  {(location.city || location.district) && (
                    <div>{[location.city, location.district].filter(Boolean).join(' • ')}</div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">{loading ? 'Creating...' : 'Create'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
