import {createContext, useMemo, FunctionComponent} from 'react'
import {camelizeKeys, decamelizeKeys} from 'humps'
import Axios, {AxiosInstance, AxiosResponse, AxiosRequestConfig} from 'axios'

export const AxiosContext = createContext<AxiosInstance>(undefined)

export const AxiosProvider: FunctionComponent = ({children}) => {
  const axios = useMemo(() => {
    const instance = Axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    instance.interceptors.response.use((response: AxiosResponse) => {
      if (response.data && response.headers['content-type'] === 'application/json') {
        response.data = camelizeKeys(response.data)
      }

      return response
    })

    instance.interceptors.request.use((config: AxiosRequestConfig) => {
      const newConfig = {...config}

      if (config.data) {
        newConfig.data = decamelizeKeys(config.data)
      }

      return newConfig
    })

    return instance
  }, [])

  return <AxiosContext.Provider value={axios}>{children}</AxiosContext.Provider>
}
