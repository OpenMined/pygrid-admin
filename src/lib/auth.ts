import domainAPI, {handleAxiosErrors, ErrorMessage} from '@/utils/api-axios'
import jwtDecode from 'jwt-decode'

const AUTH_KEY = '__pygrid_admin_auth'

export function setToken(token: string): string {
  localStorage.setItem(AUTH_KEY, token)
  return token
}

export function getToken(): string {
  const token = localStorage.getItem(AUTH_KEY)
  return token
}

export function getDecodedToken(): {id: number} {
  const token = getToken()
  return jwtDecode(token)
}

export function logout() {
  localStorage.removeItem(AUTH_KEY)
}

export function login(credentials: {email: string; password: string}): Promise<string | ErrorMessage> {
  return domainAPI
    .post<{token: string}>('/users/login', credentials)
    .then(response => setToken(response.data.token))
    .catch(handleAxiosErrors)
}
