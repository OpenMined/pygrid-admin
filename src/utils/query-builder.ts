import {useQuery, useQueryClient, useMutation} from 'react-query'
import api, {ErrorMessage} from './api-axios'

export function useFetch<T>(url: string) {
  return useQuery<T, ErrorMessage>(url)
}

export function useMutate<T, R>({
  url,
  method = 'post',
  invalidate
}: {
  url: string
  method?: 'delete' | 'put' | 'patch' | 'post'
  invalidate?: string | string[]
}) {
  const queryClient = useQueryClient()
  const fn = api[method]
  return useMutation<R, ErrorMessage, T>(data => fn(url, data), {
    onSuccess: () => {
      if (typeof invalidate === 'string') {
        queryClient.invalidateQueries(invalidate)
      } else if (Array.isArray(invalidate)) {
        invalidate.forEach(cached => queryClient.invalidateQueries(cached))
      }
    }
  })
}
