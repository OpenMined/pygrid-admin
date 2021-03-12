import axios from '@/utils/api-axios'
import {
  ICreateGroupResponse,
  IFetchGroupResponse,
  IDeleteGroupResponse,
  IFetchGroupsResponse,
  IFetchUsersResponse
} from '@/types/api-responses'

export const fetchGroups = async () => {
  const {data} = await axios.get<IFetchGroupsResponse>('/groups')
  return data
}

export const fetchGroup = async ({id}) => {
  if (id !== undefined) {
    const {data} = await axios.get<IFetchGroupResponse>(`/groups/${id}`)
    return data
  }
}

export const deleteGroup = async ({id}) => {
  if (id !== undefined) {
    const {data} = await axios.delete<IDeleteGroupResponse>(`/groups/${id}`)
    return data
  }
}

export const createGroup = async ({name}) => {
  const payload = {
    name: name
  }

  const {data} = await axios.post<ICreateGroupResponse>('/groups', payload)

  return data
}

export const editGroup = async ({id, name}) => {
  const payload = {
    name: name
  }

  const {data} = await axios.put<ICreateGroupResponse>(`/groups/${id}`, payload)

  return data
}

export const fetchGroupMembers = async ({id}) => {
  const payload = {
    group: id
  }

  const {data} = await axios.post<IFetchUsersResponse>('/users/search', payload)
  return data
}
