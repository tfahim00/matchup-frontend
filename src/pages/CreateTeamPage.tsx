import React, {useState} from 'react'
import { createTeam } from '../lib/api/auth'
import { useNavigate } from 'react-router-dom'
import Input from '../components/Input'
import Button from '../components/Button'

export default function CreateTeamPage(){
  const [name,setName] = useState('')
  const [city,setCity] = useState('')
  const [visibility,setVisibility] = useState<'public'|'private'>('public')
  const [description,setDescription] = useState('')
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState<string|undefined>()
  const nav = useNavigate()

  async function submit(e:React.FormEvent){
    e.preventDefault()
    setError(undefined)
    if(!name) return setError('Team name is required')
    setLoading(true)
    try{
      const team = await createTeam({name,city,visibility,description})
      nav(`/teams/${team.id}`)
    }catch(err:any){
      setError(err.message || 'Failed to create team')
    }finally{setLoading(false)}
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="card">
        <h2 className="text-2xl font-bold mb-4">Create Team</h2>
        {error && <div className="mb-3 text-red-600">{error}</div>}
        <form className="space-y-4" onSubmit={submit}>
          <div>
            <label className="block text-sm text-slate-600">Team name</label>
            <Input value={name} onChange={e=>setName(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm text-slate-600">City</label>
            <Input value={city} onChange={e=>setCity(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm text-slate-600">Visibility</label>
            <select value={visibility} onChange={e=>setVisibility(e.target.value as any)} className="input mt-1 w-full">
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-slate-600">Description</label>
            <textarea value={description} onChange={e=>setDescription(e.target.value)} className="w-full border border-[#E3E7EE] rounded-[12px] px-3 py-2 mt-1" rows={4} />
          </div>
          <div className="flex items-center justify-end">
            <Button type="submit" variant="primary" className="px-5 h-12 rounded-[12px]" disabled={loading}>{loading? 'Creating...':'Create team'}</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
