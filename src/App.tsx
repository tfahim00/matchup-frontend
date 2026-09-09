import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import MatchesTab from './pages/MatchesTab'
import MatchDetailPage from './pages/MatchDetailPage'
import CreateMatchPage from './pages/CreateMatchPage'
import LocationPickerPage from './pages/LocationPickerPage'
import TeamsTab from './pages/TeamsTab'
import TeamDetailPage from './pages/TeamDetailPage'
import ProfilePage from './pages/ProfilePage'

export default function App(){
  return (
    <div className="min-h-screen">
      <header className="p-4 shadow-sm bg-white">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">MatchUp</h1>
          <nav className="space-x-4">
            <Link to="/matches" className="text-sm text-slate-700">Matches</Link>
            <Link to="/login" className="text-sm text-slate-700">Login</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<MatchesTab/>} />
          <Route path="/matches" element={<MatchesTab/>} />
          <Route path="/matches/:id" element={<MatchDetailPage/>} />
          <Route path="/create-match" element={<CreateMatchPage/>} />
          <Route path="/locations" element={<LocationPickerPage/>} />
          <Route path="/teams" element={<TeamsTab/>} />
          <Route path="/teams/:id" element={<TeamDetailPage/>} />
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/forgot-password" element={<ForgotPasswordPage/>} />
        </Routes>
      </main>
    </div>
  )
}
