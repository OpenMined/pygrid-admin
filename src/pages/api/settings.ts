import axios from '@/utils/api-axios'
import {ISettings} from '@/types/settings'

export const fetchSettings = async () => {
  const {data} = await axios.get<ISettings>('/setup/')
  return data
}

export const updateSettings = async ({
  nodeName,
  awsCredentials,
  gcpCredentials,
  azureCredentials,
  cacheStrategy,
  tensorExpirationPolicy,
  replicateDb,
  autoScale,
  allowUserSignup
}) => {
  const payload = {
    nodeName: nodeName,
    awsCredentials: awsCredentials,
    gcpCredentials: gcpCredentials,
    azureCredentials: azureCredentials,
    cacheStrategy: cacheStrategy,
    tensorExpirationPolicy: tensorExpirationPolicy,
    replicateDb: replicateDb,
    autoScale: autoScale,
    allowUserSignup: allowUserSignup
  }
  console.log(payload)
  const {data} = await axios.post<ISettings>('/setup/', payload)

  return data
}
