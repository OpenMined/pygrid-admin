import {camelizeKeys, decamelizeKeys} from 'humps'
import Axios from 'axios'

const instance = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  transformRequest: [].concat(data => decamelizeKeys(data), Axios.defaults.transformRequest),
  transformResponse: [].concat(Axios.defaults.transformResponse, data => camelizeKeys(data))
})

export default instance
