import React, {useCallback} from 'react'
import {useQueryClient} from 'react-query'
import {TensorsCard} from '@/components/pages/datasets/cards/tensors'
import {Right} from '@/components/icons/arrows'
import {useFetch} from '@/utils/query-builder'
import api from '@/utils/api-axios'
import type {PyGridRequest, PyGridTensor} from '@/types'
import {SectionHeader} from '@/components/lib'
import {Spinner} from '@/components/icons/spinner'
import Link from 'next/link'

const Tensors = () => {
  const queryClient = useQueryClient()
  const {isLoading, data, error} = useFetch<PyGridTensor[]>('/data-centric/tensors')
  const {isLoading: isLoadingRequests, data: requests} = useFetch<PyGridRequest[]>('/data-centric/requests')
  // TODO: Load settings
  const settings = null
  const deleteTensor = useCallback(
    id =>
      api.delete(`/data-centric/tensors/${id}`).then(res => {
        queryClient.invalidateQueries('/data-centric/tensors')
        return res
      }),
    [queryClient]
  )

  if (isLoading || isLoadingRequests || error) return null

  return (
    <main className="space-y-8">
      <SectionHeader>
        <SectionHeader.Title>Tensors</SectionHeader.Title>
        <SectionHeader.Description>View all tensors resulting from your private data</SectionHeader.Description>
      </SectionHeader>
      <section>
        <div className="flex flex-row justify-between max-w-xs text-sm text-gray-600 uppercase leading-6 hover:text-gray-800 focus:text-gray-800 active:text-gray-800">
          <Link href="/datasets/requests">
            <a>
              {isLoadingRequests ? (
                <Spinner className="h-3 mr-4" />
              ) : (
                requests?.filter(r => r.status === 'pending').length
              )}{' '}
              Request
              {requests?.filter(r => r.status === 'pending').length !== 1 && 's'}
              <Right className="w-4 h-4" />
            </a>
          </Link>
        </div>
      </section>
      {settings && (
        <p className="font-thin text-gray-400">
          According to{' '}
          <a href="/settings" target="blank">
            your settings
          </a>
          , tensors are automatically deleted <strong>{settings.tensorsExpiry}</strong> after being downloaded.
        </p>
      )}
      <section className="grid grid-cols-1 gap-4 xl:gap-4">
        <div className="space-y-6 xl:space-y-8">
          {data &&
            data.tensors.map(tensor => (
              <TensorsCard
                {...tensor}
                key={`tensor-${tensor.id}`}
                onDelete={() => deleteTensor(tensor.id).then(msg => alert(msg))}
              />
            ))}
        </div>
      </section>
    </main>
  )
}

export default Tensors
