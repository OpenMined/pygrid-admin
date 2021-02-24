export interface IUser {
  id: number
  email: string
  privateKey: string
  role: number
}

export interface IRole {
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
  name: string
}

/*** Response Types (axios) ***/

export interface IFetchUsersResponse {
  users: Record<string, IUser>
}

export interface IFetchRolesResponse {
  roles: Record<string, IRole>
}

export interface IFetchGroupsResponse {
  groups: Record<string, IGroup>
}

export interface IFetchLoginResponse {
  token: string
  key: string
  metadata: string
}

export interface ICreateUserResponse {
  message: string
}

export interface ICreateGroupResponse {
  message: string
}
