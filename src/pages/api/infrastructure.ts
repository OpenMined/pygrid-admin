import axios from '@/utils/api-axios'
import {IAssociationRequest, IWorker} from '@/types/infrastructure'

type IFetchWorkersResponse = {
  workers: IWorker[]
}

export const fetchWorkers = async () => {
  const {data} = await axios.get<IFetchWorkersResponse>('/dcfl/workers')
  return data
}

export const fetchWorker = async (id: string) => {
  const {data} = await axios.get<IWorker>(`/dcfl/workers/${id}`)
  return data
}

export const deleteWorker = async (id: string) => {
  const {data} = await axios.delete<IWorker>(`/dcfl/workers/${id}`)
  return data
}

export const fetchAssociationRequests = async () => {
  const {data} = await axios.get<IAssociationRequest[]>('/association-requests/')
  return data
}

export const respondAssociationRequest = async (request, value) => {
  const payload = {
    address: request.senderAddress,
    value: value,
    handshake: request.handshakeValue
  }

  const {data} = await axios.post<string>('association-requests/respond', payload)
  return data
}
