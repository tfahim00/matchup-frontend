import React, {createContext, useContext, useState, useEffect} from 'react'
import { loginUser } from '../lib/api/auth'

const API_BASE = ((import.meta as any).env?.VITE_API_BASE as string) || ''

type User = {id:number, name:string, email:string}

type AuthContextValue = {
  user: User | null
  token?: string | null
  login: (credentials:{email:string,password:string}) => Promise<User>
  logout: ()=>void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const STORAGE_KEY = 'matchup_auth'

export function AuthProvider({children}:{children:React.ReactNode}){
  const [user, setUser] = useState<User|null>(()=>{
    try{
      const raw = localStorage.getItem(STORAGE_KEY)
      if(!raw) return null
      const parsed = JSON.parse(raw)
      return parsed.user || null
    }catch(e){return null}
  })
  const [token, setToken] = useState<string|null>(()=>{
    try{const raw = localStorage.getItem(STORAGE_KEY); if(!raw) return null; return JSON.parse(raw).token}catch(e){return null}
  })

  useEffect(()=>{
    if(user && token){
      localStorage.setItem(STORAGE_KEY, JSON.stringify({user,token}))
    }else{
      localStorage.removeItem(STORAGE_KEY)
    }
  },[user,token])

  async function login(credentials:{email:string,password:string}){
    if (!API_BASE) {
      throw new Error('VITE_API_BASE is not configured. Set the frontend API base URL before making requests.')
    }

    const payload = await loginUser(credentials)
    const userFromServer = payload.user ?? payload
    const tokenFromServer = payload.token

    if (!userFromServer || !tokenFromServer) {
      throw new Error('Login response was missing the user or token')
    }

    const normalizedUser = { id: userFromServer.id, name: userFromServer.name, email: userFromServer.email }
    setUser(normalizedUser)
    setToken(tokenFromServer)
    return normalizedUser
  }

  function logout(){
    setUser(null)
    setToken(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  const val:AuthContextValue = {user, token, login, logout}
  return <AuthContext.Provider value={val}>{children}</AuthContext.Provider>
}

export function useAuth(){
  const ctx = useContext(AuthContext)
  if(!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
