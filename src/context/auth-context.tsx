import type {FunctionComponent} from 'react'
import {createContext, useContext} from 'react'
import {logout, getToken, login} from '@/lib/auth'

const AuthContext = createContext(null)

AuthContext.displayName = 'AuthenticationContext'

export const useAuth = () => useContext(AuthContext)

export const AuthProvider: FunctionComponent = ({children}) => {
  const values = {getToken, logout, login}
  return <AuthContext.Provider value={{...values}}>{children}</AuthContext.Provider>
}
