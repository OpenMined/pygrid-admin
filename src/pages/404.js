import React from 'react'
import {Title, Subtitle, ButtonRound} from '@/components/lib'
import Link from 'next/link'

const NoMatch = () => {
  return (
    <article className="flex justify-center items-center">
      <div className="text-center justify-items-center grid grid-flow-row auto-rows-max space-y-4">
        <header>
          <Title>Ooops!</Title>
          <Subtitle>This page is unknown or does not exist</Subtitle>
        </header>
        <Link href="/">
          <button className="w-full btn">Back to Dashboard</button>
        </Link>
      </div>
    </article>
  )
}

export default NoMatch
