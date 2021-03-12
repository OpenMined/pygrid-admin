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
