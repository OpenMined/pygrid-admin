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
  createdAt: Date
  tensors: {
    [key: string]: ITensor
  }
}

export interface IRequest {
  id: number
  userId: number
  userEmail: string
  objectId: number
  reason: string
  status: 'accepted' | 'pending' | 'denied'
  requestType: 'budget' | 'permissions'
  createdAt: Date
}
