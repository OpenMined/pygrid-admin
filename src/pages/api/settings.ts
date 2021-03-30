import axios from '@/utils/api-axios'
import {ISettings} from '@/types/settings'

export const fetchSettings = async () => {
  const {data} = await axios.get<ISettings>('/setup/')
  return data
}

export const updateSettings = async ({
  domainName,
  awsCredentials,
  gcpCredentials,
  azureCredentials,
  cacheStrategy,
  tensorExpirationPolicy,
  replicateDatabase,
  autoScale,
  allowUserSignup
}) => {
  const payload = {
    domainName: domainName,
    awsCredentials: awsCredentials,
    gcpCredentials: gcpCredentials,
    azureCredentials: azureCredentials,
    cacheStrategy: cacheStrategy,
    tensorExpirationPolicy: tensorExpirationPolicy,
    replicateDatabase: replicateDatabase,
    autoScale: autoScale,
    allowUserSignup: allowUserSignup
  }

  const {data} = await axios.post<ISettings>('/setup', payload)

  return data
}
