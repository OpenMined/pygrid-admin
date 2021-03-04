import type {FunctionComponent} from 'react'
import {QueryCache, QueryClient, QueryClientProvider} from 'react-query'
import {AuthProvider} from '@/context/auth-context'

const queryCache = new QueryCache()
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: 5 * 60 * 1000
    }
  },
  queryCache: queryCache
})

const AppProviders: FunctionComponent = ({children}) => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>{children}</AuthProvider>
  </QueryClientProvider>
)

export {AppProviders}
