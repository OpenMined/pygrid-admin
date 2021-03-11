import axios from '@/utils/api-axios'
import {IFetchDatasets, IFetchDataset, IFetchRequests, IFetchTensors, IAcceptRequest} from '@/types/api-responses'

export const fetchDatasets = async () => {
  const {data} = await axios.get<IFetchDatasets>('/dcfl/datasets')
  return data.datasets
}

export const fetchDataset = async (id: string) => {
  const {data} = await axios.get<IFetchDataset>('/dcfl/datasets/' + id)
  return data.dataset
}

export const fetchRequests = async () => {
  const {data} = await axios.get<IFetchRequests>('/dcfl/requests')
  return data.requests
}

export const acceptRequest = async (id: string) => {
  const payload = {status: 'accepted'}
  const {data} = await axios.put<IAcceptRequest>('/dcfl/requests/' + id, payload)
  return data.message
}

export const denyRequest = async (id: string) => {
  const payload = {status: 'denied'}
  const {data} = await axios.put<IAcceptRequest>('/dcfl/requests/' + id, payload)
  return data.message
}

export const fetchTensors = async () => {
  const {data} = await axios.get<IFetchTensors>('/dcfl/tensors')
  return data.tensors
}
