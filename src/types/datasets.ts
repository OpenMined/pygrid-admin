export interface ITensor {
  shape: []
  type: string
  manifest: string
  entities: number
  permissions: {
    users: []
    groups: []
  }
}

export interface IDataset {
  name: string
  description: string
  manifest: string
  tags: string[]
  created_at: Date
  tensors: {
    [key: string]: ITensor
  }
}

export interface IRequest {
  id: number
  user_id: number
  object_id: number
  reason: string
  status: string
  request_type: string
}
