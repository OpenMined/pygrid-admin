import {useDomainStatus} from '@/lib/data/useMe'

export function DomainConnectionStatus() {
  const {isLoading, isError} = useDomainStatus()

  let bgColor = 'green'
  let message = 'Domain online'

  if (isError) {
    bgColor = 'red'
    message = 'Domain offline'
  }

  if (isLoading) {
    bgColor = 'gray'
    message = 'Checking connection...'
  }

  return (
    <div className="flex items-center p-4 text-sm space-x-2">
      <div className="w-2 h-2 flex relative">
        {isLoading && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span>
        )}
        <span className={`relative rounded-full w-2 h-2 bg-${bgColor}-500`} />
      </div>
      <p>{message}</p>
    </div>
  )
}
