import axios from '@/utils/api-axios'
import {
  ICreateDatasetResponse,
  IFetchDatasetResponse,
  IEditDatasetResponse,
  IDeleteDatasetResponse
} from '@/types/api-responses'

export const fetchDataset = async ({id}) => {
  if (id !== undefined) {
    const {data} = await axios.get<IFetchDatasetResponse>(`/dcfl/datasets/${id}`)
    return data
  }
}

export const createDataset = async ({name, description, manifest, tags, created_at, tensors}) => {
  const payload = {
    name,
    description,
    manifest,
    tags,
    created_at,
    tensors
  }

  const {data} = await axios.post<ICreateDatasetResponse>('/dcfl/datasets', payload)

  return data
}

export const editDataset = async ({id, name, description, manifest, tags, created_at, tensors}) => {
  if (id !== undefined) {
    const payload = {
      id,
      name,
      description,
      manifest,
      tags,
      created_at,
      tensors
    }

    const {data} = await axios.put<IEditDatasetResponse>(`/dcfl/datasets/${id}`, payload)
    return data
  }
}

export const deleteDataset = async ({id}) => {
  if (id !== undefined) {
    const {data} = await axios.delete<IDeleteDatasetResponse>(`/dcfl/datasets/${id}`)
    return data
  }
}
