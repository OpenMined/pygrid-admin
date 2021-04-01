import {FunctionComponent, useState} from 'react'
import {Tabs, TabList, Tab, TabPanels, TabPanel} from '@reach/tabs'
import Dialog from '@reach/dialog'
import {
  deleteWorker,
  fetchAssociationRequests,
  fetchWorkers,
  respondAssociationRequest
} from '@/pages/api/infrastructure'
import {XMark} from '@/components/icons/marks'
import {SearchBar} from '@/components/lib'
import {AssociationRequestCard} from '@/components/pages/infrastructure/cards/requests'

import '@reach/dialog/styles.css'
import {IAssociationRequest, IWorker} from '@/types/infrastructure'
import {useQuery} from 'react-query'

const DeleteWorkerModal = ({isOpen, onClose, onClickAccept}) => (
  <Dialog
    aria-label="delete worker "
    isOpen={isOpen}
    onDismiss={onClose}
    className="relative w-auto my-6 mx-auto max-w-md border-b border-solid border-gray-300 rounded-t shadow-lg">
    <div className="flex items-start justify-between">
      <h3 className="text-3xl font-semibold">Delete Worker</h3>
      <button
        className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
        onClick={onClose}>
        <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
      </button>
    </div>
    <div>
      <p className="py-4 text-lg">Are you sure you want to delete this worker? </p>
    </div>
    <div className="flex items-center justify-end pt-6 border-t border-solid border-gray-300 rounded-b">
      <button
        type="button"
        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm rounded-md outline-none focus:outline-none mr-3 mb-1"
        onClick={() => {
          onClose()
        }}>
        Cancel
      </button>
      <button
        type="button"
        className="bg-green-500 text-white active:bg-green-600 disabled:opacity-50 font-bold uppercase text-sm px-6 py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
        onClick={() => {
          onClickAccept()
          onClose()
        }}>
        Delete
      </button>
    </div>
  </Dialog>
)

const Infrastructure: FunctionComponent = () => {
  const [searchText, setSearchText] = useState('')
  const [selectedWorker, setSelectedWorker] = useState('')
  const [openDeleteWorkerModal, setOpenDeleteWorkerModal] = useState(false)

  const {isLoading: isLoadingWorkers, data: workers, error: workersError} = useQuery<IWorker[], Error>(
    'workers',
    fetchWorkers
  )
  const {isLoading: isLoadingRequests, data: requests, error: requestsError} = useQuery<IAssociationRequest[], Error>(
    'requests',
    fetchAssociationRequests
  )

  const TableHead = () => {
    const headers = ['ID', 'State', 'Provider', 'Region', 'Instance Type', 'Created At', 'Deleted At', '']
    return (
      <thead>
        <tr className="bg-gray-100 rounded-lg text-sm font-medium text-gray-700 text-left">
          {headers.map(header => (
            <th key={`worker-h -${header}`} className="my-4 px-4 py-2">
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

  return (
    <main className="space-y-4">
      <div className="flex flex-col-reverse items-start space-y-4 space-y-reverse md:space-y-0 md:flex-row md:justify-between">
        <h1 className="pr-4 text-4xl leading-12">Infrastructure</h1>
      </div>
      <p className="pb-4 mb-6 text-xl font-light text-gray-400">
        Manage your entire infrastructure setup of Domains and Workers
      </p>
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
                  <h3 className="font-semibold tracking-wide pt-4 text-xl">Active Workers</h3>
                  <table className="table-auto border-collapse w-full">
                    <TableHead />
                    <tbody className="text-sm font-normal text-gray-700">
                      {!isLoadingWorkers &&
                        !workersError &&
                        workers !== undefined &&
                        workers
                          .filter(w => w.state === 2)
                          .map(worker => (
                            <tr key={`worker-${worker.id}`} className="hover:bg-gray-50 border-b border-gray-200 py-10">
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
                  <h3 className="font-semibold tracking-wide pt-4 text-xl">Association Requests</h3>
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
                            onClickAccept={() =>
                              respondAssociationRequest(request, 'accept').then(res => console.log(res))
                            }
                            onClickReject={() =>
                              respondAssociationRequest(request, 'deny').then(res => console.log(res))
                            }
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
              <table className="table-auto border-collapse w-full">
                <TableHead />
                <tbody className="text-sm font-normal text-gray-700">
                  {!isLoadingWorkers &&
                    !workersError &&
                    workers !== undefined &&
                    workers
                      .filter(w => Object.entries(w).some(entry => String(entry[1]).toLowerCase().includes(searchText)))
                      .map(worker => (
                        <tr key={`worker-${worker.id}`} className="hover:bg-gray-50 border-b border-gray-200 py-10">
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
