import React from 'react'
import {Theme} from '@openmined/omui'
import {QueryCache, QueryClient, QueryClientProvider} from 'react-query'

import Header from '../components/Header'
import {AxiosProvider} from '../contexts/axios-context'

import '../styles/globals.css'

const queryCache = new QueryCache()
const queryClient = new QueryClient({queryCache: queryCache})

const Layout = ({children}) => (
  <div className="layout">
    <Header />
    {children}
  </div>
)

// const Layout = ({ children }) => <div className="layout">{children}</div>

function PyGridAdmin({Component, pageProps}) {
  return (
    <AxiosProvider>
      <QueryClientProvider client={queryClient}>
        <Theme>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Theme>
      </QueryClientProvider>
    </AxiosProvider>
  )
}

export default PyGridAdmin
