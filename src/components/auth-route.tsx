import {useEffect} from 'react'
import {useRouter} from 'next/router'
import {getLayout} from '@/layouts/blank'
import {LoadingPyGrid} from '@/components'
import {useAuth} from '@/context/auth-context'
import {useDomainStatus} from '@/lib/data/useMe'
import type {ReactNode} from 'react'

interface Pages {
  children: ReactNode
}

export function CheckAuthRoute({children}: Pages) {
  const router = useRouter()
  const {getToken} = useAuth()
  const {data, isError} = useDomainStatus()
  const publicRoutes = ['/offline', '/login', '/start']
  const isPublicRoute = publicRoutes.includes(router.route)

  useEffect(() => {
    if (data && !data.init) {
      router.push('/start')
      return null
    }

    if (!isPublicRoute) {
      if (isError) {
        router.push('/offline')
        return null
      }

      const token = getToken()

      if (!token) {
        router.push('/login')
        return null
      }
    }
  }, [data?.init])

  if (!data && !isPublicRoute) {
    return <LoadingPyGrid />
  }

  return <>{children}</>
}

CheckAuthRoute.getLayout = getLayout
