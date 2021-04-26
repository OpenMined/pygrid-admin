import type {FunctionComponent} from 'react'
import {Card} from '@/components/pages/dashboard/card'

const Dashboard: FunctionComponent = () => (
  <div>
    <section>
      <h1 className="text-4xl text-gray-800">Dashboard</h1>
      <p className="mt-3 mb-6 text-xl font-light text-gray-400">An overview of your PyGrid Node</p>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {[].map(card => (
          <Card key={card.title} {...card} />
        ))}
      </div>
    </section>
  </div>
)

export default Dashboard
