import {IGroup, IRole, IUser} from './users'
import {IDataset, IRequest, ITensor} from './datasets'

export type IFetchUsersResponse = IUser[]

export type IFetchRolesResponse = IRole[]

export type IFetchRoleResponse = IRole

export type IFetchGroupsResponse = IGroup[]

export type IFetchGroupResponse = IRole

export interface IMessageResponse {
  msg: string
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
  tensors: ITensor[]
}

export interface IAcceptRequest {
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
