import {useEffect} from 'react'
import {useRouter} from 'next/router'
import {useQuery} from 'react-query'
import domainAPI, {handleAxiosErrors} from '@/utils/api-axios'
import type {ErrorMessage} from '@/utils/api-axios'
import {getDecodedToken} from '@/lib/auth'

interface IUser {
  type: 'user'
  user: {
    email: string
  }
}

export function getUser(id: number): Promise<IUser | ErrorMessage> {
  return domainAPI
    .get(`/users/${id}`)
    .then(response => response.data)
    .catch(handleAxiosErrors)
}

export default function useUser() {
  const router = useRouter()
  const {id} = getDecodedToken()
  const query = useQuery('users/me', () => getUser(id))

  useEffect(() => {
    if (query.data?.type === 'user' && !query.data.user) {
      router.replace(`/login`)
    }
  }, [query.data, router])

  return query
}
