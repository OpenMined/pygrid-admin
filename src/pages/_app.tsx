import React from 'react'
import type {AppProps} from 'next/app'
import {ReactQueryDevtools} from 'react-query/devtools'
import {QueryCache, QueryClient, QueryClientProvider} from 'react-query'

import Header from '../components/Header'
import {AxiosProvider} from '../contexts/axios-context'

import '../styles/globals.css'

const queryCache = new QueryCache()
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: 5 * 60 * 1000
    }
  },
  queryCache: queryCache
})

const Layout = ({children}) => (
  <div className="layout">
    <Header />
    {children}
  </div>
)

function PyGridAdmin({Component, pageProps}: AppProps) {
  return (
    <AxiosProvider>
      <QueryClientProvider client={queryClient}>
        <Theme>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Theme>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AxiosProvider>
  )
}

export default PyGridAdmin
