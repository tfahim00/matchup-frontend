import React from 'react'

export default function LoginPage(){
  return (
    <div className="max-w-md mx-auto mt-12">
      <div className="card">
        <h2 className="text-2xl font-bold mb-4">Log in</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm text-slate-600">Email</label>
            <input className="input mt-1" type="email" />
          </div>
          <div>
            <label className="block text-sm text-slate-600">Password</label>
            <input className="input mt-1" type="password" />
          </div>
          <div className="flex justify-end">
            <button className="bg-blue-600 text-white px-4 py-2 rounded">Log in</button>
          </div>
        </form>
      </div>
    </div>
  )
}
