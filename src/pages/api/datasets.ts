import axios from '@/utils/api-axios'

import {IFetchDataset, IAcceptRequest, IMessageResponse, IFetchTensors} from '@/types/api-responses'
import {IDataset, IRequest} from '@/types/datasets'

export const fetchDatasets = async () => {
  const {data} = await axios.get<IDataset[]>('/data-centric/datasets')
  return data
}

export const fetchDataset = async (id: string) => {
  const {data} = await axios.get<IFetchDataset>('/data-centric/datasets/' + id)
  return data.dataset
}

export const fetchRequests = async () => {
  const {data} = await axios.get<IRequest[]>('/data-centric/requests')
  return data
}

export const acceptRequest = async (id: number) => {
  const payload = {status: 'accepted'}
  const {data} = await axios.put<IAcceptRequest>('/data-centric/requests/' + id, payload)
  return data.message
}

export const denyRequest = async (id: number) => {
  const payload = {status: 'denied'}
  const {data} = await axios.put<IAcceptRequest>('/data-centric/requests/' + id, payload)
  return data.message
}

export const fetchTensors = async () => {
  const {data} = await axios.get<IFetchTensors>('/data-centric/tensors')
  return data.tensors
}

export const deleteTensor = async (id: string) => {
  const {data} = await axios.delete<IMessageResponse>('/data-centric/tensors/' + id)
  return data.msg
}
