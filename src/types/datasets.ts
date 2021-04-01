export interface ITensor {
  id: string
  tags: string[]
  description: string
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
  id: string
  name: string
  description: string
  manifest: string
  tags: string[]
  createdAt: Date
  tensors: {
    [key: string]: ITensor
  }
}

export interface IRequest {
  id: number
  userId: number
  userName: string
  objectId: string
  reason: string
  status: 'accepted' | 'pending' | 'denied'
  requestType: 'budget' | 'permissions'
  date: Date
}
