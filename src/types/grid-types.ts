export interface Tensor {
  name?: string
  id: string
  dtype?: 'Tensor'
  shape?: string
  description?: string | string[]
  tags?: string[]
}

export interface Dataset {
  createdAt: Date | string
  data: Tensor[]
  description: string | string[]
  id: string
  manifest: string | string[]
  name: string
  tags: string[]
}

export interface Model {
  name: string
  tags: string[]
  description: string | string[]
  id: string
  createAt: Date | string
}

