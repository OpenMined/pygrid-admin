import type {FunctionComponent} from 'react'
import {useFetch} from '@/utils/query-builder'
import {PyGridStatus} from '@/types'
import cn from 'classnames'
import packageJson from '../../package.json'

const Footer: FunctionComponent = () => {
  const {isLoading, error, isError, data: status} = useFetch<PyGridStatus>('/setup/status')

  return (
    <footer>
      <nav className="sticky bottom-0">
        <div className="flex flex-row flex-wrap items-center justify-between py-2 bg-gray-50 border">
          <div className="container mx-auto flex flex-row items-center space-x-2">
            <svg
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
              className={cn(
                'h-3 w-3 animate-pulse fill-current',
                isLoading ? 'text-yellow-500' : isError ? 'text-red-500' : 'text-green-500'
              )}>
              <circle cx="50" cy="50" r="50" />
            </svg>
            {isLoading && <span className="text-xs text-gray-600">Connecting to PyGrid Domain...</span>}
            {isError && <span className="text-xs text-gray-600">PyGrid API unreachable</span>}
            {status && (
              <span className="text-xs text-gray-600">
                Connected to <b>{status?.domainName}</b> Domain
              </span>
            )}
          </div>
          <div className="absolute inset-y-0 right-10 flex items-center pr-2">
            <span className="text-xs text-gray-600">PyGrid Admin {packageJson.version}</span>
          </div>
        </div>
      </nav>
    </footer>
  )
}

export {Footer}
