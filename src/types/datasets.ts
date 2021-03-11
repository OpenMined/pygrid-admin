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
  user_email: string
  object_id: number
  reason: string
  status: 'accepted' | 'pending' | 'denied'
  request_type: 'budget' | 'permissions'
  date: Date
}
