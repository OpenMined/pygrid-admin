import axios from '@/utils/api-axios'
import {IFetchDatasets} from '@/types/api-responses'

export const fetchDatasets = async () => {
  const {data} = await axios.get<IFetchDatasets>('/dcfl/datasets')
  return data.datasets
}
