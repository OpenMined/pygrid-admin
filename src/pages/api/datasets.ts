import axios from '@/utils/api-axios'
import {IFetchDatasets, IFetchRequests, IFetchTensors} from '@/types/api-responses'

export const fetchDatasets = async () => {
  const {data} = await axios.get<IFetchDatasets>('/dcfl/datasets')
  return data.datasets
}

export const fetchRequests = async () => {
  const {data} = await axios.get<IFetchRequests>('/dcfl/datasets/requests')
  return data.requests
}

export const fetchTensors = async () => {
  const {data} = await axios.get<IFetchTensors>('/dcfl/datasets/tensors')
  return data.tensors
}
