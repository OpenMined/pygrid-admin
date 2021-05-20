import {useCallback, useState} from 'react'
import {Tabs, TabList, Tab, TabPanels, TabPanel} from '@reach/tabs'
import Dialog from '@reach/dialog'
import {XMark} from '@/components/icons/marks'
import {SearchBar, Subtitle, Title} from '@/components/lib'
import {AssociationRequestCard} from '@/components/pages/infrastructure/cards/requests'
import {useFetch} from '@/utils/query-builder'
import api from '@/utils/api-axios'
import type {PyGridAssociationRequest, PyGridWorker} from '@/types'

import '@reach/dialog/styles.css'
import {useQueryClient} from 'react-query'

const DeleteWorkerModal = ({isOpen, onClose, onClickAccept}) => (
  <Dialog
    aria-label="delete worker "
    isOpen={isOpen}
    onDismiss={onClose}
    className="relative w-auto my-6 mx-auto max-w-md border-b border-solid border-gray-300 rounded-t shadow-lg">
    <div className="flex items-start justify-between">
      <h3 className="text-3xl font-semibold">Delete Worker</h3>
      <button
        className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none focus:outline-none"
        onClick={onClose}>
        <span className="block w-6 h-6 text-2xl text-black bg-transparent outline-none focus:outline-none">×</span>
      </button>
    </div>
    <div>
      <p className="py-4 text-lg">Are you sure you want to delete this worker? </p>
    </div>
    <div className="flex items-center justify-end pt-6 border-t border-gray-300 border-solid rounded-b">
      <button
        type="button"
        className="px-6 py-2 mb-1 mr-3 text-sm font-bold text-red-500 uppercase outline-none background-transparent rounded-md focus:outline-none"
        onClick={() => {
          onClose()
        }}>
        Cancel
      </button>
      <button
        type="button"
        className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase bg-green-500 shadow outline-none active:bg-green-600 disabled:opacity-50 rounded-md hover:shadow-lg focus:outline-none"
        onClick={() => {
          onClickAccept()
          onClose()
        }}>
        Delete
      </button>
    </div>
  </Dialog>
)

const Infrastructure = () => {
  const queryClient = useQueryClient()
  const [searchText, setSearchText] = useState('')
  const [selectedWorker, setSelectedWorker] = useState('')
  const [openDeleteWorkerModal, setOpenDeleteWorkerModal] = useState(false)

  const {isLoading: isLoadingWorkers, data: workers, error: workersError} = useFetch<PyGridWorker>(
    '/data-centric/workers'
  )
  const {isLoading: isLoadingRequests, data: requests, error: requestsError} = useFetch<PyGridAssociationRequest>(
    '/association-requests'
  )

  const TableHead = () => {
    const headers = ['ID', 'State', 'Provider', 'Region', 'Instance Type', 'Created At', 'Deleted At', '']
    return (
      <thead>
        <tr className="text-sm font-medium text-left text-gray-700 bg-gray-100 rounded-lg">
          {headers.map(header => (
            <th key={`worker-h -${header}`} className="px-4 py-2 my-4">
              {header}
            </th>
          ))}
        </tr>
      </thead>
    )
  }

  const STATES = {
    0: 'Creating',
    1: 'Failed',
    2: 'Success',
    3: 'Destroyed'
  }

  const deleteWorker = useCallback(
    id => {
      api.delete(`/data-centric/workers/${id}`).then(() => {
        queryClient.invalidateQueries('/data-centric/workers')
      })
    },
    [queryClient]
  )

  const handleAssocRequest = useCallback(
    (request, isAccepted) => {
      api
        .post('/association-requests/respond', {
          address: request.senderAddress,
          value: isAccepted ? 'accept' : 'deny',
          handshake: request.handshakeValue
        })
        .then(() => {
          queryClient.invalidateQueries('/association-requests')
        })
    },
    [queryClient]
  )

  console.log(workers)

  return (
    <main className="space-y-4">
      <header>
        <Title>Infrastructure</Title>
        <Subtitle>Manage your entire infrastructure setup of Domains and Workers</Subtitle>
      </header>
      <Tabs>
        <TabList>
          <Tab>Main</Tab>
          <Tab>Workers</Tab>
          <Tab>Autoscaling</Tab>
        </TabList>
        <hr />
        <TabPanels>
          <TabPanel>
            {true && (
              <>
                <section className="space-y-6">
                  <h3 className="pt-4 text-xl font-semibold tracking-wide">Active Workers</h3>
                  <table className="w-full border-collapse table-auto">
                    <TableHead />
                    <tbody className="text-sm font-normal text-gray-700">
                      {!isLoadingWorkers &&
                        !workersError &&
                        workers !== undefined &&
                        workers
                          ?.filter(w => w.state === 2)
                          .map(worker => (
                            <tr key={`worker-${worker.id}`} className="py-10 border-b border-gray-200 hover:bg-gray-50">
                              <td className="px-4 py-4">{worker.id}</td>
                              <td className="px-4 py-4">{STATES[worker.state]}</td>
                              <td className="px-4 py-4">{worker.provider}</td>
                              <td className="px-4 py-4">{worker.region}</td>
                              <td className="px-4 py-4">{worker.instanceType}</td>
                              <td className="px-4 py-4">{worker.createdAt}</td>
                              <td className="px-4 py-4">{worker.destroyedAt}</td>
                              <td />
                            </tr>
                          ))}
                    </tbody>
                  </table>
                </section>
                <section className="space-y-6">
                  <h3 className="pt-4 text-xl font-semibold tracking-wide">Association Requests</h3>
                  <div className="space-y-6">
                    {!isLoadingRequests && !requestsError && requests.filter(r => r.pending === true).length > 0 ? (
                      requests
                        .filter(r => r.pending === true)
                        .sort((a, b) => {
                          return new Date(b.date).getTime() - new Date(a.date).getTime()
                        })
                        .map(request => (
                          <AssociationRequestCard
                            {...request}
                            key={`request-card-${request.id}`}
                            onClickAccept={() => handleAssocRequest(request, true)}
                            onClickReject={() => handleAssocRequest(request, false)}
                          />
                        ))
                    ) : (
                      <span className="text-gray-400"> There is no association requests</span>
                    )}
                  </div>
                </section>
              </>
            )}
          </TabPanel>
          <TabPanel>
            <section className="flex flex-col mt-4 space-y-1">
              <SearchBar placeholder={'Search Workers'} search={searchText} onChange={text => setSearchText(text)} />
              <table className="w-full border-collapse table-auto">
                <TableHead />
                <tbody className="text-sm font-normal text-gray-700">
                  {!isLoadingWorkers &&
                    !workersError &&
                    workers !== undefined &&
                    workers
                      .filter(w => Object.entries(w).some(entry => String(entry[1]).toLowerCase().includes(searchText)))
                      .map(worker => (
                        <tr key={`worker-${worker.id}`} className="py-10 border-b border-gray-200 hover:bg-gray-50">
                          <td className="px-4 py-4">{worker.id}</td>
                          <td className="px-4 py-4">{STATES[worker.state]}</td>
                          <td className="px-4 py-4">{worker.provider}</td>
                          <td className="px-4 py-4">{worker.region}</td>
                          <td className="px-4 py-4">{worker.instanceType}</td>
                          <td className="px-4 py-4">{worker.createdAt}</td>
                          <td className="px-4 py-4">{worker.destroyedAt}</td>
                          <td className="px-4 py-4">
                            <button
                              onClick={() => {
                                setSelectedWorker(worker.id)
                                setOpenDeleteWorkerModal(true)
                              }}>
                              <XMark className="w-4 h-4 text-red-600" />
                            </button>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </section>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <DeleteWorkerModal
        isOpen={openDeleteWorkerModal}
        onClose={() => setOpenDeleteWorkerModal(false)}
        onClickAccept={() => deleteWorker(selectedWorker)}
      />
    </main>
  )
}

export default Infrastructure
