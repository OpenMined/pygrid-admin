import {IGroup, IRole, IUser} from './users'
import {IDataset} from './datasets'

export type IFetchUsersResponse = IUser[]

export type IFetchRolesResponse = IRole[]

export type IFetchRoleResponse = IRole

export type IFetchGroupsResponse = IGroup[]

export type IFetchGroupResponse = IRole

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

export interface IFetchDatasetResponse {
  dataset: IDataset
}

export interface ICreateDatasetResponse {
  dataset: IDataset
}

export interface IEditDatasetResponse {
  message: string
}

export interface IDeleteDatasetResponse {
  message: string
}

export interface ICreateRoleResponse {
  message: string
}

export interface IEditRoleResponse {
  message: string
}

export interface IDeleteRoleResponse {
  message: string
}

export interface IDeleteGroupResponse {
  message: string
}
