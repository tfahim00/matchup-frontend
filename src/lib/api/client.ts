const STORAGE_KEY = 'matchup_auth'

export function getAuthToken(): string | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null

    const parsed = JSON.parse(raw)
    return parsed?.token ?? null
  } catch (error) {
    console.warn('Unable to read auth token from storage:', error)
    return null
  }
}

export function getAuthHeaders(init: RequestInit = {}): Headers {
  const headers = new Headers(init.headers || {})

  const token = getAuthToken()
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  return headers
}

export async function authFetch(input: RequestInfo | URL, init: RequestInit = {}) {
  const headers = getAuthHeaders(init)
  return fetch(input, { ...init, headers })
}
