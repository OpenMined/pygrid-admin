import {useContext} from 'react'
import {AxiosInstance} from 'axios'
import {AxiosContext} from '../contexts/axios-context'

export function useAxios(): AxiosInstance {
  return useContext(AxiosContext)
}
