import type {FunctionComponent} from 'react'
import {Header} from '@/components/header'

export const Layout: FunctionComponent = ({children}) => (
  <>
    <Header />
    <main className="container mx-auto mt-8 mb-12">{children}</main>
    <footer />
  </>
)

export const getLayout = page => <Layout>{page}</Layout>
