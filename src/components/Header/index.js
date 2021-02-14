import React from 'react'
import Image from 'next/image'

import {default as NextLink} from 'next/link'

const Header = () => {
  return (
    <nav>
      <div className="flex flex-row flex-wrap items-center justify-between px-3 shadow bg-gray-50">
        <NextLink href="/" passHref>
          <Image className="cursor-pointer" src="/assets/logo.png" alt="PyGrid home" width={50} height={50} />
        </NextLink>
      </div>
    </nav>
  )
}

export default Header
