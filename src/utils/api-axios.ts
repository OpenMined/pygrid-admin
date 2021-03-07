import {camelizeKeys, decamelizeKeys} from 'humps'
import Axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios'
import {getToken} from '@/lib/auth'

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

instance.interceptors.response.use((data: AxiosResponse) => {
  if (data?.data) {
    data.data = camelizeKeys(data.data)
  }

  return data
})

export default instance

export interface ErrorMessage {
  type: 'error'
  message: string
  status: number
}

export function handleAxiosErrors(err: AxiosError): ErrorMessage {
  const message: string = err?.response?.data?.error
  const status = err?.response?.status
  throw {message, status}
}
