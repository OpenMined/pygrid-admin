import axios from '@/utils/api-axios'
import {ICreateUserResponse, IFetchUsersResponse} from '@/types/api-responses'

export const fetchUsers = async () => {
  const {data} = await axios.get<IFetchUsersResponse>('/users')
  return data
}

export const createUser = async ({email, password, role}) => {
  const payload = {
    email: email,
    password: password,
    role: role
  }

  const {data} = await axios.post<ICreateUserResponse>('/users', payload)

  return data
}
