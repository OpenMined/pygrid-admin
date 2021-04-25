export interface PyGridWorker {
  id: string
  state: number
  provider: string
  region: string
  instanceType: string
  address: string
  syftAddress: string
  createdAt: Date
  destroyedAt: Date
}

export interface PyGridAssociationRequest {
  id: string
  date: Date
  name: string
  address: string
  sender_address: string
  accepted: boolean
  pending: boolean
  handshake_value: string
}
