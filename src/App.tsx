import React from 'react'
import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import MatchesTab from './pages/MatchesTab'
import MatchDetailPage from './pages/MatchDetailPage'
import CreateMatchPage from './pages/CreateMatchPage'
import LocationPickerPage from './pages/LocationPickerPage'
import TeamsTab from './pages/TeamsTab'
import TeamDetailPage from './pages/TeamDetailPage'
import CreateTeamPage from './pages/CreateTeamPage'
import ProfilePage from './pages/ProfilePage'
import ProfileEditorPage from './pages/ProfileEditorPage'
import DashboardLayout from './layout/DashboardLayout'
import { useAuth } from './context/AuthContext'

function RequireAuth() {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    )
  }

  return <Outlet />
}

export default function App() {
  return (
    <div className="min-h-screen">
      <Routes>

        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Protected routes */}
        <Route element={<RequireAuth />}>
          <Route element={<DashboardLayout />}>

            {/* Always go to Matches */}
            <Route path="/" element={<Navigate to="/matches" replace />} />

            <Route path="/matches" element={<MatchesTab />} />
            <Route path="/matches/:id" element={<MatchDetailPage />} />
            <Route path="/create-match" element={<CreateMatchPage />} />
            <Route path="/locations" element={<LocationPickerPage />} />

            <Route path="/teams" element={<TeamsTab />} />
            <Route path="/teams/:id" element={<TeamDetailPage />} />
            <Route path="/teams/create" element={<CreateTeamPage />} />

            <Route path="/profile" element={<ProfilePage />} />
            {/* <Route path="/profile/public/:id" element={<ProfilePage />} /> */}
            <Route path="/profile/edit" element={<ProfileEditorPage />} />

          </Route>
        </Route>

      </Routes>
    </div>
  )
}
