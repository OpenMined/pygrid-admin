import type {FunctionComponent} from 'react'
import {useRouter} from 'next/router'
import {useAuth} from '@/context/auth-context'

const CheckAuthRoute: FunctionComponent = ({children}) => {
  const router = useRouter()
  const {getToken} = useAuth()
  const publicRoutes = ['/login']

  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    const token = getToken()

    if (!token && !publicRoutes.includes(router.route)) {
      router.push('/login')
      // We could flash a return page here... or just a blank
      return null
    }
  }

  return <>{children}</>
}

export {CheckAuthRoute}
