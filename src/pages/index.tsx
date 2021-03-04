import type {FunctionComponent} from 'react'
import {useRouter} from 'next/router'
import {useAuth} from '@/context/auth-context'

const Homepage: FunctionComponent = () => {
  const {getToken} = useAuth()
  const router = useRouter()
  const isAuthenticated = getToken()

  if (typeof window !== 'undefined') {
    if (isAuthenticated) {
      router.replace('/dashboard')
    } else {
      router.replace('/login')
    }
  }

  return null
}

export default Homepage
