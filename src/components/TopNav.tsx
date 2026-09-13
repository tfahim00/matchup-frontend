import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Button from './Button'

export default function TopNav(){
  const auth = useAuth()
  const navigate = useNavigate()
  return (
    <header className="hidden md:block sticky top-6 z-50 pointer-events-none">
      <div className="max-w-6xl mx-auto px-4">
        <div className="pointer-events-auto bg-white/95 backdrop-blur-sm border border-[var(--color-border)] rounded-2xl shadow-lg px-6 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Link to="/" className="text-2xl font-bold">MatchUp</Link>
            </div>
            <nav className="space-x-6 flex items-center">
              <Link to="/matches" className="text-base text-slate-700">Matches</Link>
              <Link to="/teams" className="text-base text-slate-700">Teams</Link>
              <Link to="/profile" className="text-base text-slate-700">Profile</Link>
              {auth && auth.user ? (
                <div className="flex items-center ml-4">
                  <div className="text-sm text-slate-700 mr-3">{auth.user.name}</div>
                  <Button variant="ghost" className="text-sm" onClick={()=>{auth.logout(); navigate?.('/login')}}>Logout</Button>
                </div>
              ) : null}
            </nav>
        </div>
      </div>
    </header>
  )
}
