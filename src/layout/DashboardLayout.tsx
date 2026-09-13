import React from 'react'
import { Outlet } from 'react-router-dom'
import TopNav from '../components/TopNav'
import BottomNav from '../components/BottomNav'

export default function DashboardLayout(){
  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <TopNav />
      <main className="max-w-6xl mx-auto p-4 pt-16">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
