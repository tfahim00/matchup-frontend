import React, {useState} from 'react'
import { createMatch } from '../lib/api/matches'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'

export default function CreateMatchPage(){
  const [title,setTitle] = useState('')
  const [description,setDescription] = useState('')
  const [matchDate,setMatchDate] = useState('')
  const [location,setLocation] = useState<{id:number,name:string}|null>(null)
  const [error,setError] = useState<string|undefined>()
  const [loading,setLoading] = useState(false)
  const nav = useNavigate()
  const [search] = useSearchParams()

  React.useEffect(()=>{
    const locId = search.get('locationId')
    const locName = search.get('locationName')
    if(locId && locName){
      setLocation({id: Number(locId), name: locName})
    }
  },[search])

  async function submit(e:React.FormEvent){
    e.preventDefault()
    setError(undefined)
    if(!title) return setError('Title is required')
    setLoading(true)
    try{
      const m = await createMatch({title,description,match_date:matchDate,location})
      nav(`/matches/${m.id}`)
    }catch(err:any){
      setError(err.message || 'Failed to create match')
    }finally{setLoading(false)}
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
            <div className="mt-1 flex items-center space-x-2">
              <input readOnly value={location?.name || ''} className="input flex-1" />
              <Link to="/locations" className="text-sm text-blue-600">Choose</Link>
            </div>
          </div>
          <div className="flex justify-end">
            <button disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">{loading? 'Creating...':'Create'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
