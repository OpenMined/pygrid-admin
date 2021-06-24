import {useRouter} from 'next/router'
import {useAuth} from '@/context/auth-context'
import type {ReactNode} from 'react'

interface Pages {
  children: ReactNode
}

const CheckAuthRoute = ({children}: Pages) => {
  const router = useRouter()
  const {getToken} = useAuth()
  const publicRoutes = ['/login', '/start']

  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    const token = getToken()

    if (!token && !publicRoutes.includes(router.route)) {
      router.push('/login')
      return null
    }
  }

  return <>{children}</>
}

export {CheckAuthRoute}
