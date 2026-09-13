import React from 'react'
import { Link } from 'react-router-dom'

export default function BottomNav(){
  return (
    <nav className="md:hidden fixed bottom-4 left-0 right-0 flex justify-center">
      <div className="bg-white shadow-md rounded-full px-4 py-2 flex space-x-4 items-center">
        <Link to="/matches" className="text-sm text-slate-700">Matches</Link>
        <Link to="/teams" className="text-sm text-slate-700">Teams</Link>
        <Link to="/profile" className="text-sm text-slate-700">Profile</Link>
      </div>
    </nav>
  )
}
