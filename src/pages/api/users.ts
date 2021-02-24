import axios from '@/utils/api-axios'
import {
  ICreateGroupResponse,
  ICreateUserResponse,
  IFetchGroupsResponse,
  IFetchRolesResponse,
  IFetchUsersResponse
} from '@/types'

export const fetchUsers = async () => {
  const {data} = await axios.get<IFetchUsersResponse>('/users')
  return data.users
}

export const fetchRoles = async () => {
  const {data} = await axios.get<IFetchRolesResponse>('/roles')

  return data.roles
}

export const fetchGroups = async () => {
  const {data} = await axios.get<IFetchGroupsResponse>('/groups')
  return data.groups
}

export const createUser = async ({email, password, role}) => {
  const payload = {
    email: email,
    password: password,
    role: role
  }

  // TODO: Create Types for all responses
  const {data} = await axios.post<ICreateUserResponse>('/users', payload)

  return data
}

export const createGroup = async ({name}) => {
  const payload = {
    name: name
  }

  // TODO: Create Types for all responses
  const {data} = await axios.post<ICreateGroupResponse>('/groups', payload)

  return data
}
