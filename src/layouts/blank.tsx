import type {FunctionComponent} from 'react'

export const BlankLayout: FunctionComponent = ({children}) => <div>{children}</div>

export const getLayout = page => <BlankLayout>{page}</BlankLayout>
