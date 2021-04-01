import type {FunctionComponent} from 'react'

import {Card} from '@/components/lib'
import {IGroup} from '@/types/users'

const GroupCard: FunctionComponent<IGroup> = ({id, name, users}) => (
  <Card className="space-y-2 cursor-pointer">
    <span className="max-w-lg font-light text-gray-400 xl:max-w-5xl">
      ID: {id} - Members: {users.length}
    </span>
    <h2 className="text-xl text-gray-800 text-semibold">{name}</h2>
  </Card>
)

export {GroupCard}
