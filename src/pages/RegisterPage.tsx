import React, {useState} from 'react'
import { registerUser } from '../lib/api/mock'
import { useNavigate, Link } from 'react-router-dom'

export default function RegisterPage(){
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [confirm,setConfirm] = useState('')
  const [error,setError] = useState<string|undefined>()
  const [loading,setLoading] = useState(false)
  const [success,setSuccess] = useState(false)
  const nav = useNavigate()

  async function submit(e:React.FormEvent){
    e.preventDefault()
    setError(undefined)
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
    <div className="max-w-md mx-auto mt-12">
      <div className="card">
        <h2 className="text-2xl font-bold mb-4">Create account</h2>
        {error && <div className="mb-3 text-red-600">{error}</div>}
        {success && <div className="mb-3 text-green-700">Account created — redirecting...</div>}
        <form className="space-y-4" onSubmit={submit}>
          <div>
            <label className="block text-sm text-slate-600">Full name</label>
            <input value={name} onChange={e=>setName(e.target.value)} className="input mt-1" />
          </div>
          <div>
            <label className="block text-sm text-slate-600">Email</label>
            <input value={email} onChange={e=>setEmail(e.target.value)} className="input mt-1" type="email" />
          </div>
          <div>
            <label className="block text-sm text-slate-600">Password</label>
            <input value={password} onChange={e=>setPassword(e.target.value)} className="input mt-1" type="password" />
          </div>
          <div>
            <label className="block text-sm text-slate-600">Confirm password</label>
            <input value={confirm} onChange={e=>setConfirm(e.target.value)} className="input mt-1" type="password" />
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600">Already have an account? <Link to="/login" className="text-blue-600">Log in</Link></div>
            <button disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">{loading? 'Creating...':'Create account'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
