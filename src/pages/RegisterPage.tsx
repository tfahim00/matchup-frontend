import React, { useState } from 'react'
import { registerUser } from '../lib/api/auth'
import { useNavigate, Link } from 'react-router-dom'
import Input from '../components/Input'

export default function RegisterPage(){
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [confirm,setConfirm] = useState('')
  const [error,setError] = useState<string|null>(null)
  const [loading,setLoading] = useState(false)
  const [success,setSuccess] = useState(false)
  const nav = useNavigate()

  async function submit(e:React.FormEvent){
    e.preventDefault()
    setError(null)
    if(!email || !password) return setError('Email and password are required')
    if(password !== confirm) return setError('Passwords do not match')
    setLoading(true)
    try{
      await registerUser({name,email,password})
      setSuccess(true)
      setTimeout(()=>nav('/matches'),800)
    }catch(err:any){
      setError(err.message || 'Registration failed')
    }finally{setLoading(false)}
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-[440px]">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold">MatchUp</h1>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold mb-4">Create account</h2>
          {error && <div className="mb-4 text-sm text-red-600">{error}</div>}
          {success && <div className="mb-4 text-sm text-green-700">Account created — redirecting...</div>}

          <form className="space-y-6" onSubmit={submit}>
            <div>
              <label className="block text-sm text-slate-600">Full name</label>
              <Input value={name} onChange={e=>setName(e.target.value)} />
            </div>

            <div>
              <label className="block text-sm text-slate-600">Email</label>
              <Input value={email} onChange={e=>setEmail(e.target.value)} type="email" />
            </div>

            <div>
              <label className="block text-sm text-slate-600">Password</label>
              <Input value={password} onChange={e=>setPassword(e.target.value)} type="password" />
            </div>

            <div>
              <label className="block text-sm text-slate-600">Confirm password</label>
              <Input value={confirm} onChange={e=>setConfirm(e.target.value)} type="password" />
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-600">Already have an account? <Link to="/login" className="text-[#2F6FED]">Log in</Link></div>
              <button type="submit" disabled={loading} className="bg-[#2F6FED] text-white px-5 h-12 rounded-[12px]">{loading? 'Creating...':'Create account'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
