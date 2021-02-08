import {createContext, useMemo} from 'react'
import Axios, {AxiosInstance} from 'axios'

export const AxiosContext = createContext<AxiosInstance>(undefined)

export const AxiosProvider = ({children}: React.PropsWithChildren<unknown>) => {
  const axios = useMemo(() => {
    const axios = Axios.create({
      headers: {
        'Content-Type': 'application/json'
      }
    })

    /* Set up interceptors if needed
    axios.interceptors.request.use(config => {
      // Do some stuff here
      return config
    })*/

    return axios
  }, [])

  return <AxiosContext.Provider value={axios}>{children}</AxiosContext.Provider>
}
