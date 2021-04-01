import {camelizeKeys, decamelizeKeys} from 'humps'
import Axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios'
import {getToken} from '@/lib/auth'

export interface ErrorMessage {
  type: 'error'
  message: string
  status: number
}

export function handleAxiosError(error: AxiosError): ErrorMessage {
  const message: string = error?.response?.data?.error
  const status: number = error?.response?.status
  throw {message, status}
}

const instance = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

instance.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = getToken()

  if (config.headers && token) {
    config.headers.token = token
  }

  decamelizeKeys(config.data)

  return config
})

instance.interceptors.response.use(
  (data: AxiosResponse) => {
    if (data?.data) {
      data.data = camelizeKeys(data.data)
    }

    return data
  },
  (error: AxiosError) => {
    if (error.isAxiosError) {
      return handleAxiosError(error)
    }

    throw error
  }
)

export default instance
