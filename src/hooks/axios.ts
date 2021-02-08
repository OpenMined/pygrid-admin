import {useContext} from 'react'
import {AxiosContext} from '../contexts/axios-context'

export const useAxios = () => {
  return useContext(AxiosContext)
}
