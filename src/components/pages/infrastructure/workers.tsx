import type {FunctionComponent} from 'react'
import {Card} from '@/components/lib'
import {IWorker} from '@/types/infrastructure'

const WorkerCard: FunctionComponent<IWorker> = ({
  id,
  state,
  provider,
  region,
  instanceType,
  address,
  syftAddress,
  createdAt,
  destroyedAt
}) => (
  <Card className="space-y-2 cursor-pointer">
    <h2 className="text-xl text-gray-800 text-semibold">Worker #{id}</h2>
  </Card>
)

export {WorkerCard}
