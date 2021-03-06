import {ICreateRoleResponse, IDeleteRoleResponse, IFetchRoleResponse, IFetchRolesResponse} from '@/types/api-responses'
import axios from '@/utils/api-axios'

export const fetchRoles = async () => {
  const {data} = await axios.get<IFetchRolesResponse>('/roles')

  return data
}

export const fetchRole = async ({id}) => {
  if (id !== undefined) {
    const {data} = await axios.get<IFetchRoleResponse>(`/roles/${id}`)
    return data
  }
}

export const deleteRole = async ({id}) => {
  if (id !== undefined) {
    const {data} = await axios.delete<IDeleteRoleResponse>(`/roles/${id}`)
    return data
  }
}

export const createRole = async ({
  name,
  canTriageRequests,
  canEditSettings,
  canCreateUsers,
  canCreateGroups,
  canEditRoles,
  canManageInfrastructure,
  canUploadData
}) => {
  const payload = {
    name,
    canTriageRequests,
    canEditSettings,
    canCreateUsers,
    canCreateGroups,
    canEditRoles,
    canManageInfrastructure,
    canUploadData
  }

  const {data} = await axios.post<ICreateRoleResponse>('/roles', payload)

  return data
}
