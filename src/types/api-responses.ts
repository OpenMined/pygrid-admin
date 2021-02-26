import {IGroup, IRole, IUser} from './users'

export interface IFetchUsersResponse {
  users: IUser[]
}

export interface IFetchRolesResponse {
  roles: IRole[]
}

export interface IFetchGroupsResponse {
  groups: IGroup[]
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
