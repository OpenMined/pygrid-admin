import type {ReactNode} from 'react'
import type {AppProps} from 'next/app'
import {ReactQueryDevtools} from 'react-query/devtools'
import {AppProviders} from '@/context'
import {getLayout as getAppLayout} from '@/layouts/app'
import {CheckAuthRoute} from '@/components/auth-route'

import '@reach/dialog/styles.css'
import '@/styles/globals.css'

type AppPropsWithLayout = {
  Component: {getLayout: (FunctionComponent) => ReactNode}
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
