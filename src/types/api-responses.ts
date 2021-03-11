import {IGroup, IRole, IUser} from './users'
import {IDataset, IRequest} from './datasets'

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

export interface IFetchDatasets {
  datasets: IDataset[]
}

export interface IFetchDataset {
  dataset: IDataset
}

export interface IFetchRequests {
  requests: IRequest[]
}

export interface IFetchTensors {
  tensors: IDataset[]
}

export interface IAcceptRequest {
  message: string
}
