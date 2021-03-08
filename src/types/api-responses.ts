import {IGroup, IRole, IUser} from './users'
import {IDataset} from './datasets'

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
