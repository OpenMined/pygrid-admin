import axios from '@/utils/api-axios'
import {} from '@/types/api-responses'
import {ISettings} from '@/types/settings'

export const fetchSettings = async () => {
  const {data} = await axios.get<ISettings>('/setup')
  return data
}

export const createSettings = async ({email, password, role}) => {
  const payload = {
    email: email,
    password: password,
    role: role
  }

  const {data} = await axios.post<ISettings>('/setup', payload)

  return data
}
