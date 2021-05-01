import type {FunctionComponent} from 'react'
import {Header} from '@/components/header'
import {Footer} from '@/components/footer'

export const Layout: FunctionComponent = ({children}) => (
  <div className="flex flex-col h-screen">
    <Header />
    <main className="container mx-auto mt-8 mb-12 flex-grow">{children}</main>
    <Footer />
  </div>
)

export const getLayout = page => <Layout>{page}</Layout>
