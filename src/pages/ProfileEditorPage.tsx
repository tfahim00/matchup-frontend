import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchProfile, updateProfile } from '../lib/api/profile'
import Input from '../components/Input'
import Button from '../components/Button'
import { useAuth } from '../context/AuthContext'

export default function ProfileEditorPage(){
  const auth = useAuth()
  const userId = auth.user?.id
  const {data,isLoading} = useQuery(['profile', userId], ()=>fetchProfile(userId), {enabled: !!userId})
  const [position,setPosition] = useState('')
  const [skill,setSkill] = useState('')
  const [age,setAge] = useState<number|''>('')
  const [city,setCity] = useState('')
  const [district,setDistrict] = useState('')
  const [bio,setBio] = useState('')
  const [saving,setSaving] = useState(false)
  const nav = useNavigate()

  useEffect(()=>{
    if(data){
      setPosition(data.preferred_position || '')
      setSkill(data.skill_level || '')
      setAge(data.age || '')
      setCity(data.city || '')
      setDistrict(data.district || '')
      setBio(data.bio || '')
    }
  },[data])

  async function submit(e:React.FormEvent){
    e.preventDefault()
    if(!userId) return
    setSaving(true)
    try{
      await updateProfile({user_id: userId, preferred_position: position, skill_level: skill, age, city, district, bio})
      nav('/profile')
    }catch(err:any){
      // minimal error handling
      alert(err.message || 'Failed to save')
    }finally{setSaving(false)}
  }

  if(isLoading) return <div className="card">Loading...</div>

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="card">
        <h2 className="text-2xl font-bold mb-4">Set up your profile</h2>
        <form className="space-y-4" onSubmit={submit}>
          <div>
            <label className="block text-sm text-slate-600">Preferred position</label>
            <Input value={position} onChange={e=>setPosition(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm text-slate-600">Skill level</label>
            <Input value={skill} onChange={e=>setSkill(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm text-slate-600">Age</label>
            <Input value={age as any} onChange={e=>setAge(e.target.value? Number(e.target.value): '')} type="number" />
          </div>
          <div>
            <label className="block text-sm text-slate-600">City</label>
            <Input value={city} onChange={e=>setCity(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm text-slate-600">District</label>
            <Input value={district} onChange={e=>setDistrict(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm text-slate-600">Bio</label>
            <textarea value={bio} onChange={e=>setBio(e.target.value)} className="w-full border border-[#E3E7EE] rounded-[12px] px-3 py-2 mt-1" rows={4} />
          </div>
          <div className="flex items-center justify-end">
            <Button type="submit" variant="primary" className="px-5 h-12 rounded-[12px]" disabled={saving}>{saving? 'Saving...':'Save profile'}</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
