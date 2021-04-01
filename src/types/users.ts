export interface IUser {
  id: number
  email: string
  privateKey: string
  role: number
}

export interface IRole {
  id: string
  name: string
  canTriageRequests: boolean
  canEditSettings: boolean
  canCreateUsers: boolean
  canCreateGroups: boolean
  canEditRoles: boolean
  canManageInfrastructure: boolean
  canUploadData: boolean
}

export interface IGroup {
  id: string
  name: string
  users: string[]
}

export type UserPermissions =
  | 'canTriageRequests'
  | 'canEditSettings'
  | 'canCreateUsers'
  | 'canCreateGroups'
  | 'canEditRoles'
  | 'canManageInfrastructure'
  | 'canUploadData'

type SetUserPermissions = {
  [K in UserPermissions]: boolean
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
