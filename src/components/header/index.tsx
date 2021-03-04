import type {FunctionComponent} from 'react'
import {default as NextLink} from 'next/link'

const Header: FunctionComponent = () => {
  return (
    <nav className="sticky top-0">
      <div className="flex flex-row flex-wrap items-center justify-between px-3 shadow bg-gray-50">
        <div className="container mx-auto">
          <NextLink href="/" passHref>
            <img className="cursor-pointer" src="/assets/logo.png" alt="PyGrid home" width={50} height={50} />
          </NextLink>
        </div>
      </div>
    </nav>
  )
}

export {Header}
