export interface IDataset {
  id: string
  name: string
  description: string
  manifest: string
  tags: string[]
  created_at: Date
  tensors: Record<string, ITensor>
}

export interface ITensor {
  manifest: string
  id: string
  shape: number[]
  dtype: string
}
