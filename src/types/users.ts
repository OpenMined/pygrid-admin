export type PyGridUserPermissions =
  | 'canTriageRequests'
  | 'canEditSettings'
  | 'canCreateUsers'
  | 'canCreateGroups'
  | 'canEditRoles'
  | 'canManageInfrastructure'
  | 'canUploadData'

type SetUserPermissions = {
  [K in PyGridUserPermissions]: boolean
}

export type PyGridUserRole = {
  id: number
  name: string
} & SetUserPermissions

export interface PyGridUserGroup {
  id: number
  name: string
  users: Array<Pick<PyGridUser, 'id' | 'email'>>
}

export interface PyGridUser {
  id: number
  email: string
  groups: PyGridUserGroup[]
  role: number
  createdAt?: string
}
