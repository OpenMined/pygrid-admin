import {useRouter} from 'next/router'
import {getLayout} from '@/layouts/blank'
import {useDomainStatus} from '@/lib/data/useMe'

export default function Offline() {
  const router = useRouter()
  const {data} = useDomainStatus()

  if (data) {
    router.push('/')
    return null
  }

  return (
    <main className="max-w-7xl py-8 px-4 flex flex-col items-center justify-center h-screen mx-auto">
      <h1 className="text-xl tracking-tight">The Domain is offline.</h1>
      <p>Trying to reach the API at {process.env.NEXT_PUBLIC_API_URL}.</p>
      <div>
        <img className="absolute w-20 animate-ping" alt="PyGrid logo" src="/assets/logo.png" />
        <img className="w-20" alt="PyGrid logo" src="/assets/logo.png" />
      </div>
    </main>
  )
}

Offline.getLayout = getLayout
