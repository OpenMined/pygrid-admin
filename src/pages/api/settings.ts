import axios from '@/utils/api-axios'
import {PyGridSettings} from '@/types/settings'

export const fetchSettings = async () => {
  const {data} = await axios.get<PyGridSettings>('/setup/')
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
  const {data} = await axios.post<PyGridSettings>('/setup/', payload)

  return data
}
