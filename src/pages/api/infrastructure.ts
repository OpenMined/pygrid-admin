import axios from '@/utils/api-axios'
import {PyGridAssociationRequest, PyGridWorker} from '@/types'

export const fetchWorkers = async () => {
  const {data} = await axios.get<PyGridWorker[]>('/data-centric/workers')
  return data
}

export const fetchWorker = async (id: string) => {
  const {data} = await axios.get<PyGridWorker>(`/data-centric/workers/${id}`)
  return data
}

export const deleteWorker = async (id: string) => {
  const {data} = await axios.delete<PyGridWorker>(`/data-centric/workers/${id}`)
  return data
}

export const fetchAssociationRequests = async () => {
  const {data} = await axios.get<PyGridAssociationRequest[]>('/association-requests/')
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
