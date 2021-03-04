import type {FunctionComponent} from 'react'
import {AccordionItem, AccordionButton, AccordionPanel} from '@reach/accordion'
import {Card} from '@/components/lib'
import {IRole} from '@/types/users'
import '@reach/accordion/styles.css'

const RoleCard: FunctionComponent<IRole> = ({
  name,
  canTriageRequests,
  canEditSettings,
  canCreateUsers,
  canCreateGroups,
  canEditRoles,
  canManageInfrastructure,
  canUploadData
}) => {
  const permissions = [
    {name: 'can_triage_requests', value: canTriageRequests},
    {name: 'can_edit_settings', value: canEditSettings},
    {name: 'can_create_users', value: canCreateUsers},
    {name: 'can_create_groups', value: canCreateGroups},
    {name: 'can_edit_roles', value: canEditRoles},
    {name: 'can_manage_infrastructure', value: canManageInfrastructure},
    {name: 'can_upload_data', value: canUploadData}
  ]

  return (
    <Card className="flex space-y-2 cursor-pointer">
      <AccordionItem>
        <AccordionButton>
          <h2 className="text-xl text-gray-800 text-semibold">{name}</h2>
        </AccordionButton>
        <AccordionPanel className="pt-4">
          <table>
            {permissions.map(({name, value}) => (
              <tr key={`user-${name}`} className="text-gray-600">
                <td className="pr-8">
                  <code>{name}</code>
                </td>
                <td>
                  <code>{value.toString()}</code>
                </td>
              </tr>
            ))}
          </table>
        </AccordionPanel>
      </AccordionItem>
    </Card>
  )
}
export {RoleCard}
