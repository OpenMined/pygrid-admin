import {useQuery} from 'react-query'
import {useAxios} from './axios'

// Sample Hook using React Query + axios
export function useDatasets() {
  const axios = useAxios()

  return useQuery('datasets', async () => {
    // 'any' should be replaced by the response type
    const {data} = await axios.get<any>('/api/datasets')
    return data
  })
}
