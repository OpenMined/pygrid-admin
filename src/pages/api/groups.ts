import axios from '@/utils/api-axios'
import {ICreateGroupResponse, IFetchGroupResponse, IFetchGroupsResponse} from '@/types/api-responses'

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

export const createGroup = async ({name}) => {
  const payload = {
    name: name
  }

  const {data} = await axios.post<ICreateGroupResponse>('/groups', payload)

  return data
}
