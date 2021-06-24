import {ReactQueryDevtools} from 'react-query/devtools'
import {AppProviders} from '@/context'
import {CheckAuthRoute} from '@/components/auth-route'
import {getLayout as getAppLayout} from '@/layouts/app'
import type {ReactNode} from 'react'
import type {AppProps} from 'next/app'

import '@reach/dialog/styles.css'
import '@/styles/globals.css'

type AppPropsWithLayout = {
  Component: {getLayout: () => ReactNode}
} & AppProps

export default function PyGridAdmin({Component, pageProps}: AppPropsWithLayout) {
  const getLayout = Component.getLayout || getAppLayout
  return (
    <AppProviders>
      <CheckAuthRoute>{getLayout(<Component {...pageProps} />)}</CheckAuthRoute>
      {process.env.ENVIRONMENT === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
    </AppProviders>
  )
}
