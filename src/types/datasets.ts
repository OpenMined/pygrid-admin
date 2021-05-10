export interface PyGridTensor {
  name: string
  id: string
  dtype: string
  shape: string
}

export interface PyGridDataset {
  id: string
  name: string
  description: string
  manifest: string
  tags: string[]
  createdAt: Date
  data: PygridTensor[]
}

export interface PyGridRequest {
  id: number
  userId: number
  userName: string
  objectId: string
  reason: string
  status: 'accepted' | 'pending' | 'denied'
  requestType: 'budget' | 'permissions'
  date: Date
}
