import type {FunctionComponent} from 'react'
import {AccordionItem, AccordionButton, AccordionPanel} from '@reach/accordion'
import {permissions} from '@/lib/user-permissions'
import {decamelize} from 'humps'
import {Card} from '@/components/lib'
import {IRole} from '@/types/users'

const RoleCard: FunctionComponent<IRole> = ({id, name, ...userPermissions}) => {
  return (
    <Card className="flex space-y-2 cursor-pointer">
      <AccordionItem>
        <AccordionButton>
          <h2 className="text-xl text-gray-800 text-semibold">{name}</h2>
        </AccordionButton>
        <AccordionPanel className="pt-4">
          <table>
            {permissions.map(permission => {
              return (
                <tr key={`user-${permission}`} className="text-gray-600">
                  <td className="pr-8">
                    <code>{decamelize(permission)}</code>
                  </td>
                  <td>
                    <code>{userPermissions[permission].toString()}</code>
                  </td>
                </tr>
              )
            })}
          </table>
        </AccordionPanel>
      </AccordionItem>
    </Card>
  )
}
export {RoleCard}
