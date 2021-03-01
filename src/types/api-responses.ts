import {IGroup, IRole, IUser} from './users'

export type IFetchUsersResponse = IUser[]

export type IFetchRolesResponse = IRole[]

export type IFetchGroupsResponse = IGroup[]

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

export interface ICreateRoleResponse {
  message: string
}
