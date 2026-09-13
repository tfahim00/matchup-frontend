import React, {useState} from 'react'
import { sendResetLink } from '../lib/api/auth'
import { Link } from 'react-router-dom'
import Input from '../components/Input'
import Button from '../components/Button'

export default function ForgotPasswordPage(){
  const [email,setEmail] = useState('')
  const [loading,setLoading] = useState(false)
  const [success,setSuccess] = useState<string|undefined>()
  const [error,setError] = useState<string|undefined>()

  async function submit(e:React.FormEvent){
    e.preventDefault()
    setError(undefined)
    setSuccess(undefined)
    setLoading(true)
    try{
      await sendResetLink(email)
      setSuccess('Reset link sent. Check your inbox.')
    }catch(err:any){
      setError(err.message || 'Failed to send reset link')
    }finally{setLoading(false)}
  }

  return (
    <div className="max-w-md mx-auto mt-12">
      <div className="card">
        <h2 className="text-2xl font-bold mb-4">Reset password</h2>
        <p className="text-sm text-slate-600 mb-3">Enter your email and we'll send a reset link.</p>
        {error && <div className="mb-3 text-red-600">{error}</div>}
        {success && <div className="mb-3 text-green-700">{success}</div>}
        <form onSubmit={submit} className="space-y-6">
          <div>
            <label className="block text-sm text-slate-600">Email</label>
            <Input value={email} onChange={e=>setEmail(e.target.value)} type="email" />
          </div>
          <div className="flex items-center justify-between">
            <Link to="/login" className="text-sm text-[#2F6FED]">Back to log in</Link>
            <Button type="submit" className="px-5 h-12 rounded-[12px]" variant="primary" disabled={loading}>{loading? 'Sending...':'Send reset link'}</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
