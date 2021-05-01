import type {FunctionComponent} from 'react'
import {useFetch} from '@/utils/query-builder'
import {PyGridStatus} from '@/types'

const Footer: FunctionComponent = () => {
  const {isLoading, error, isError, data: status} = useFetch<PyGridStatus>('/setup/status')

  return (
    <footer>
      <nav className="sticky bottom-0">
        <div className="flex flex-row flex-wrap items-center justify-between py-2 shadow bg-gray-50 border">
          <div className="container mx-auto flex flex-row items-center space-x-2">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 animate-pulse fill-current text-green-500">
              <circle cx="50" cy="50" r="50" />
            </svg>
            <span className="text-xs text-gray-600">Connected to {status?.domainName}</span>
          </div>
        </div>
      </nav>
    </footer>
  )
}

export {Footer}
