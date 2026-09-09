export async function fetchMatches(){
  // simulate network
  await new Promise((r)=>setTimeout(r,200))
  return [
    {
      id: 1,
      title: 'Sunday Pickup @ Riverside',
      status: 'open',
      location: {id:1, name: 'Riverside Park'},
      match_date: '2026-09-12 10:00'
    },
    {
      id: 2,
      title: 'Wednesday Evening 5-a-side',
      status: 'full',
      location: {id:2, name: 'Central Sports Complex'},
      match_date: '2026-09-16 19:30'
    }
  ]
}

export async function registerUser(payload:{name?:string,email:string,password:string}){
  await new Promise((r)=>setTimeout(r,400))
  if(!payload.email || !payload.password) throw new Error('Invalid data')
  return {id: Date.now(), name: payload.name || payload.email, email: payload.email}
}

export async function sendResetLink(email:string){
  await new Promise((r)=>setTimeout(r,300))
  if(!email.includes('@')) throw new Error('Invalid email')
  return {status: 'ok'}
}

export async function fetchMatchById(id:number){
  await new Promise((r)=>setTimeout(r,150))
  const items = await fetchMatches()
  return items.find((m:any)=>m.id === Number(id)) || null
}

export async function createMatch(payload:any){
  await new Promise((r)=>setTimeout(r,300))
  const id = Date.now()
  return {...payload, id}
}

export async function fetchLocations(){
  await new Promise((r)=>setTimeout(r,150))
  return [
    {id:1, name: 'Riverside Park', city: 'City A', district: 'North'},
    {id:2, name: 'Central Sports Complex', city: 'City B', district: 'Central'},
    {id:3, name: 'Eastside Pitch', city: 'City A', district: 'East'}
  ]
}

export async function fetchTeams(){
  await new Promise((r)=>setTimeout(r,200))
  return [
    {id:1, name: 'Riverside Rovers', visibility: 'public', city: 'City A', members: [{id:1,user:{id:2,name:'Ali'}}], owner: {id:2,name:'Ali'}},
    {id:2, name: 'Central FC', visibility: 'private', city: 'City B', members: [], owner: {id:3,name:'Sam'}}
  ]
}

export async function fetchTeamById(id:number){
  const teams = await fetchTeams()
  return teams.find((t:any)=>t.id === Number(id)) || null
}

export async function fetchProfile(userId?:number){
  await new Promise((r)=>setTimeout(r,150))
  if(!userId) return null
  return {id: userId, user_id: userId, preferred_position: 'Midfielder', skill_level: 'Intermediate', city: 'City A', district: 'North', bio: 'Love pickup games', age: 28}
}

export async function updateProfile(payload:any){
  await new Promise((r)=>setTimeout(r,200))
  return {...payload}
}
