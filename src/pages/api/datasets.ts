import axios from '@/utils/api-axios'
import {IFetchDataset, IAcceptRequest, IMessageResponse, IFetchTensors} from '@/types/api-responses'
import {IDataset, IRequest, ITensor} from '@/types/datasets'

export const fetchDatasets = async () => {
  const {data} = await axios.get<IDataset[]>('/dcfl/datasets')
  return data
}

export const fetchDataset = async (id: string) => {
  const {data} = await axios.get<IFetchDataset>('/dcfl/datasets/' + id)
  return data.dataset
}

export const fetchRequests = async () => {
  const {data} = await axios.get<IRequest[]>('/dcfl/requests')
  return data
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

export const deleteTensor = async (id: string) => {
  const {data} = await axios.delete<IMessageResponse>('/dcfl/tensors/' + id)
  return data.msg
}
