import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../components/Input'
import { useAuth } from '../context/AuthContext'

export default function LoginPage(){
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState<string|null>(null)
  const [loading,setLoading] = useState(false)
  const nav = useNavigate()
  const auth = useAuth()

  async function submit(e:React.FormEvent){
    e.preventDefault()
    setError(null)
    if(!email || !password) return setError('Email and password are required')
    setLoading(true)
    try{
      const user = await auth.login({email,password})
      nav('/matches', { replace: true })
    }catch(err:any){
      setError(err.message || 'Login failed')
    }finally{setLoading(false)}
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-[440px]">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold">MatchUp</h1>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold mb-4">Log in</h2>
          {error && <div className="mb-4 text-sm text-red-600">{error}</div>}

          <form className="space-y-6" onSubmit={submit}>
            <div>
              <label className="block text-sm text-slate-600">Email</label>
              <Input value={email} onChange={e=>setEmail(e.target.value)} type="email" />
            </div>

            <div>
              <label className="block text-sm text-slate-600">Password</label>
              <Input value={password} onChange={e=>setPassword(e.target.value)} type="password" />
            </div>

            <div className="flex items-center justify-between">
              <Link to="/forgot-password" className="text-sm text-slate-600">Forgot password?</Link>
              <button type="submit" disabled={loading} className="bg-[#2F6FED] text-white px-5 h-12 rounded-[12px]">{loading? 'Logging in...':'Log in'}</button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-slate-600">
            Don't have an account? <Link to="/register" className="text-[#2F6FED]">Register</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
