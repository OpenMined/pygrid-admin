import type {FunctionComponent} from 'react'
import {Header} from '@/components/header'

export const Layout: FunctionComponent = ({children}) => (
  <>
    <Header />
    <div className="container mx-auto mt-8 mb-12">{children}</div>
  </>
)

export const getLayout = page => <Layout>{page}</Layout>
